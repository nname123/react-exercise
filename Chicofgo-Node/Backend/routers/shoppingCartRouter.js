const express = require('express');
const router = express.Router();
const { checkLogin } = require('../middlewares/authMiddleware');
const pool = require('../utils/db');
const { body, validationResult } = require('express-validator');

// router.get('/productData/:productId', async (req, res, next) => {
//   const product_id = req.params.productId;
//   let [productDatas] = await pool.execute('SELECT * FROM product_list WHERE id = ?', [product_id]);
//   console.log("productDatas",productDatas);
//   if (productDatas.length > 0) {
//     const newObjects = productDatas.map((obj) => {
//       return {
//         product_id: obj.id,
//         name: obj.name,
//         price: obj.price,
//         rating: obj.rating,
//       };
//     });
//     // console.log(newObjects);
//     return res.json(newObjects);
//   } else {
//     return res.status(400).json({
//       errors: [
//         {
//           msg: '找不到商品',
//         },
//       ],
//     });
//   }
// });

router.get('/shoppingCart', checkLogin, async (req, res, next) => {
  let [shoppingCartDatas] = await pool.execute(
    'SELECT shopping_cart.id AS shoppingcart_id, shopping_cart.*, product_list.*  FROM shopping_cart JOIN product_list ON shopping_cart.product_id = product_list.id WHERE shopping_cart.member = ? AND shopping_cart.order_id = 0 ',
    [req.session.member.id]
  );

  if (shoppingCartDatas.length > 0) {
    const newObjects = shoppingCartDatas.map((obj) => {
      let string = obj.detail;
      const descSubstring = string.substring(string.indexOf('：') + 1, string.indexOf('<br>'));
      descSubstring.length <= 0 ? (descSubstring = string.substring(0, string.indexOf('<br>'))) : '';
      return {
        shoppingcart_id: obj.shoppingcart_id,
        product_id: obj.id,
        brandname: obj.brand,
        title: obj.name,
        desc: descSubstring || '',
        quantity: obj.quantity,
        price: obj.price,
        // productImg: 'test.jpg',
        checked: false,
      };
    });
    // console.log(newObjects);
    // console.log('id:', shoppingCartDatas);
    return res.json(newObjects);
  } else {
    return res.status(400).json({
      errors: [
        {
          msg: '購物車無商品',
        },
      ],
    });
  }
});

router.use('/deleteShoppingCart', checkLogin, async (req, res, next) => {
  let result = await pool.execute('UPDATE shopping_cart SET order_id=? WHERE id = ?;', ['99999', req.body.deleteId]);
  // console.log('刪除結果', result);
  // 回覆給前端
  return res.json({
    msg: 'deleteShoppingCart~ok!',
  });
});

const orderRules = [
  body('name').isLength({ min: 2 }).withMessage('請輸入正確格式').notEmpty().withMessage('不得為空'),
  body('phone')
    .isLength({ min: 2 })
    .withMessage('請輸入正確格式')
    .notEmpty()
    .withMessage('不得為空')
    .custom((value, { req }) => {
      var MobileReg = /^(09)[0-9]{8}$/;
      return value.match(MobileReg);
    })
    .withMessage('請輸入正確手機號碼格式'),
  body('address').isLength({ min: 2 }).withMessage('請輸入正確格式').notEmpty().withMessage('不得為空'),
  body('pay').notEmpty().withMessage('請選擇付款方式'),
  body('bill_id').notEmpty().withMessage('請選擇發票種類'),
  body('send_information').notEmpty().withMessage('請選擇寄送方式'),
];

router.use('/sendOrder', checkLogin, orderRules, async (req, res, next) => {
  console.log('sendOrder', req.body);
  const validateResult = validationResult(req);
  console.log(validateResult);
  if (!validateResult.isEmpty()) {
    return res.status(400).json({ errors: validateResult.array() });
  }
  let result = await pool.execute(
    'INSERT INTO order_list (name, phone, pay, address, send_information, bill_id, total_price, status, mail, pay_info, price, discount ,member_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
    [
      req.body.name,
      req.body.phone,
      req.body.pay,
      req.body.address,
      req.body.send_information,
      req.body.bill_id,
      req.body.totalPrice,
      req.body.status,
      req.body.mail,
      req.body.pay_info,
      req.body.price,
      req.body.discount,
      req.session.member.id,
    ]
  );
  console.log('更新結果1', result);
  if (result[0].insertId > 0) {
    console.log(req.body.shoppingcart_id);
    let result2 = await pool.execute(`UPDATE shopping_cart SET order_id=? WHERE id IN (${req.body.shoppingcart_id});`, [result[0].insertId]);
    return res.json({
      msg: '訂單成立',
    });
  }
  console.log('購物車更改失敗');
  return res.status(400).json({
    errors: [
      {
        msg: '購物車更改失敗',
      },
    ],
  });
});

module.exports = router;
