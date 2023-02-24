const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const pool = require('../utils/db');
const argon2 = require('argon2');

// router.use((req, res, next) => {
//   console.log('這裡是 auth router 的中間件');
//   next();
// });

const registerRules = [
  body('account')
    .isLength({ min: 4 })
    .withMessage('帳號長度至少為 4')
    .isLength({ max: 15 })
    .withMessage('帳號長度最多為 15')
    .notEmpty()
    .withMessage('不得為空')
    .custom(async (value, { req }) => {
      if (value) {
        let [membersAccount] = await pool.execute('SELECT * FROM user_member WHERE account = ?', [value]);
        if (membersAccount.length > 0) {
          throw new Error('帳號已被註冊');
        }
        return true;
      } else {
        console.log('帳號欄位是空的');
      }
    }),
  body('email')
    .isEmail()
    .withMessage('請輸入正確格式的 Email')
    .isLength({ max: 30 })
    .withMessage('Email長度最多為 30')
    .notEmpty()
    .withMessage('不得為空')
    .custom(async (value, { req }) => {
      if (value) {
        let [membersEmail] = await pool.execute('SELECT * FROM user_member WHERE email = ?', [value]);
        if (membersEmail.length > 0) {
          throw new Error('email 已被註冊');
        }
        return true;
      } else {
        console.log('email欄位是空的');
      }
    }),

  body('phone')
    .notEmpty()
    .withMessage('不得為空')
    .custom((value, { req }) => {
      var MobileReg = /^(09)[0-9]{8}$/;
      return value.match(MobileReg);
    })
    .withMessage('請輸入正確手機號碼格式'),
  body('name').isLength({ min: 2 }).withMessage('姓名長度至少為 2').isLength({ max: 10 }).withMessage('姓名長度最多為 10'),
  body('password').isLength({ min: 8 }).withMessage('密碼長度至少為 8').isLength({ max: 20 }).withMessage('密碼長度最多為 20'),
  body('confirmPassword')
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage('確認密碼不一致')
    .notEmpty()
    .withMessage('不得為空'),
];

// /api/auth/register
router.post('/register', registerRules, async (req, res, next) => {
  // console.log('I am register', req.body);
  const validateResult = validationResult(req);
  // console.log(validateResult);
  if (!validateResult.isEmpty()) {
    return res.status(401).json({ errors: validateResult.array() });
  }

  const hashedPassword = await argon2.hash(req.body.password);
  // 存到資料庫
  let result = await pool.execute('INSERT INTO user_member (account, email, phone, name, password) VALUES (?, ?, ?, ?, ?);', [
    req.body.account,
    req.body.email,
    req.body.phone,
    req.body.name,
    hashedPassword,
  ]);
  console.log('註冊成功');
  // 回覆給前端
  res.json({
    email: req.body.email,
    member_id: result[0].insertId,
  });
});

// /api/auth/login
router.post('/login', async (req, res, next) => {
  // 確認 email 是否存在
  let [members] = await pool.execute('SELECT * FROM user_member WHERE account = ?', [req.body.account]);
  if (members.length === 0) {
    // 表示這個 email 不存在資料庫中 -> 沒註冊過
    console.log('account 不存在');
    return res.status(401).json({
      errors: [
        {
          msg: '帳號或密碼錯誤',
        },
      ],
    });
  }

  let member = members[0];
  let result = await argon2.verify(member.password, req.body.password);
  if (result === false) {
    // 密碼錯誤，回覆前端 401
    return res.status(401).json({
      errors: [
        {
          msg: '帳號或密碼錯誤',
        },
      ],
    });
  }
  // TODO: 寫入 session
  let retMember = {
    id: member.id,
    name: member.name,
    account: member.account,
    rank: member.rank,
  };
  // 寫入 session
  req.session.member = retMember;

  // TODO: 回覆前端
  res.json({
    msg: 'ok',
    member: retMember,
  });
});

router.get('/logout', (req, res, next) => {
  req.session.member = null;
  res.sendStatus(202);
});

module.exports = router;
