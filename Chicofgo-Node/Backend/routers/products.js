const express = require('express');
// 利用 express 這個框架建立一個 router
const router = express.Router();
const pool = require('../utils/db');

router.get('/', async (req, res, next) => {
  // console.log('/api/products/:stockId => ', req.params.stockId);
  // 如果沒有 page 這個 query string 就預設為 1
  const page = req.query.page || 1;
  // 總筆數？
  let [results] = await pool.execute('SELECT COUNT(*) AS total FROM product_list');
  // console.log('GET /stocks/details -> count:', results[0].total);
  const total = results[0].total;

  // 總共有幾頁
  const perPage = 16; // 一頁有五筆
  const totalPage = Math.ceil(total / perPage);

  // 計算 offset, limit (一頁有幾筆)
  const limit = perPage;
  const offset = perPage * (page - 1);

  // 根據 offset, limit 去取得資料
  let [productsData] = await pool.execute('SELECT * FROM product_list ORDER BY id LIMIT ? OFFSET ?', [limit, offset]);

  // 篩出id
  const data = productsData.map((obj) => {
    return {
      id: obj.id,
    };
  });

  // 把資料回覆給前端
  res.json({
    pagination: {
      total,
      perPage,
      totalPage,
      page,
    },
    data,
  });

  // 會用 prepared statement 的方式來避免發生 sql injection
  // pool.query vs pool.execute
  // let [data] = await pool.execute('SELECT * FROM stock_prices WHERE stock_id=?', [req.params.stockId]);
  // res.json(data);
});

router.get('/productData/:productId', async (req, res, next) => {
  const product_id = req.params.productId;
  let [productDatas] = await pool.execute('SELECT * FROM product_list WHERE id = ?', [product_id]);
  // console.log("productDatas",productDatas);
  if (productDatas.length > 0) {
    const newObjects = productDatas.map((obj) => {
      return {
        product_id: obj.id,
        name: obj.name,
        price: obj.price,
        rating: obj.rating,
      };
    });
    // console.log(newObjects);
    return res.json(newObjects);
  } else {
    return res.status(400).json({
      errors: [
        {
          msg: '找不到商品',
        },
      ],
    });
  }
});

router.get('/productDetail/:productId', async (req, res, next) => {
  const product_id = req.params.productId;
  const insertSql = `
  SELECT product_list.*,
  product_type.type, 
  product_place_of_orgin.place,
  product_package.package,
  product_weight.weight,
  product_sugar_level.sugar_level,
  product_roast.roast
  FROM product_list
  LEFT JOIN product_type ON product_list.type = product_type.id
  LEFT JOIN product_place_of_orgin ON product_list.place_of_orgin = product_place_of_orgin.id
  LEFT JOIN product_package ON product_list.package = product_package.id
  LEFT JOIN product_weight ON product_list.weight = product_weight.id
  LEFT JOIN product_sugar_level ON product_list.sugar_level = product_sugar_level.id
  LEFT JOIN product_roast ON product_list.roast = product_roast.id
  WHERE product_list.id = ?
  `;
  let [productDatas] = await pool.execute(insertSql, [product_id]);
  console.log('productDatas', productDatas);
  if (productDatas.length > 0) {
    const newObjects = productDatas.map((obj) => {
      // let newDetailText = obj.detail.replace(/<br\s*\/?>/gm, '<br />');
      // newDetailText = newDetailText.replace(/&[^;]+;/gm, '');
      let newDetailText = obj.detail.replace(/&[^;]+;/gm, '');
      let newIntroduction = obj.introduction.replace(/&[^;]+;/gm, '');

      return {
        product_id: obj.id,
        name: obj.name,
        price: obj.price,
        rating: obj.rating,
        detail: newDetailText,
        introduction: newIntroduction,
        type: obj.type,
        place: obj.place,
        product_package: obj.package,
        weight: obj.weight,
        sugar_level: obj.sugar_level,
        roast: obj.roast,
      };
    });

    // console.log(newObjects);
    return res.json(newObjects);
  } else {
    return res.status(400).json({
      errors: [
        {
          msg: '找不到商品',
        },
      ],
    });
  }
});

router.get('/productReview/:productId', async (req, res, next) => {
  // let results = await connection.query('SELECT * FROM stocks');
  // let data = results[0];
  console.log('這裡是 productReview');
  const product_id = req.params.productId;
  const insertSql = `
  SELECT member_message.*, user_member.name , user_member.img
  FROM member_message
  LEFT JOIN user_member ON member_message.member_id = user_member.id
  WHERE member_message.message_with_products_id = ?
  `;
  let [reviewDatas] = await pool.query(insertSql, [product_id]);
  if (reviewDatas.length > 0) {
    console.log('productReview: ', reviewDatas);
    return res.json({ productReview: reviewDatas });
  } else {
    console.log('productReview: 無資料');
    return res.status(400).json({
      errors: [
        {
          msg: '無評論資料',
        },
      ],
    });
  }
});

// router.get('/message', async (req, res, next) => {
//   // let results = await connection.query('SELECT * FROM stocks');
//   // let data = results[0];
//   console.log('這裡是 /api/message');
//   let [data] = await pool.query('SELECT * FROM `member_message` JOIN user_member ON member_message.member_id = user_member.id');
//   console.log('product data: ', data);
//   res.json(data);
// });

router.post('/sendCart', async (req, res) => {
  console.log('body: ', req.body);
  const { cartProductId, cartPrice, cartQuantity, cartUserId } = req.body;
  // 檢查是否已在購物車
  const checkSql = `
    SELECT COUNT(1) as count
    FROM shopping_cart
    WHERE member = '?' AND product_id = '?' AND order_id = '0'
  `;
  // const result = await pool.query(checkSql, [cartUserId, cartProductId]);
  // const my_count = result[0][0].count;
  // const [apple, banana] = ['a', 1, 2, 3];
  // const result = [[{ count: 1 }], ['sdfjnklsjdflksjadfkl']];
  // const result = await pool.query(checkSql, [cartUserId, cartProductId]);
  // console.log("result: ", result);
  const [[{ count }]] = await pool.query(checkSql, [cartUserId, cartProductId]);
  // console.log("count: ", count);
  if (count >= 1) {
    res.json({ result: 'been added' });
    return;
  }

  // insert
  const insertSql = `
  INSERT INTO shopping_cart(
   product_id, price, quantity, member, order_id
  ) VALUES (
   '?','?','?','?','0'
  )`;
  try {
    const [results] = await pool.query(insertSql, [cartProductId, cartPrice, cartQuantity, cartUserId]);
    if (results.affectedRows >= 1) {
      res.json({ result: 'ok' });
    } else {
      res.json({ result: 'fail' });
    }
  } catch (e) {
    console.log(e); //對
    res.json({ result: 'fail' });
  }
});

module.exports = router;
