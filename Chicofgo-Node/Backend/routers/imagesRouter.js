const express = require('express');
const router = express.Router();
const { checkLogin } = require('../middlewares/authMiddleware');
const path = require('path');

// GET /api/members
router.get('/member/uploads/:imageName', (req, res, next) => {
  // 能夠通過 checkLogin 中間件，表示一定一定有 req.session.member -> 一定是登入後
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, '..', 'public', 'uploads', imageName);
  res.sendFile(imagePath);
});

const imagePath2 = path.join(__dirname, '..', 'public', 'productsImg');
router.use('/productImg', express.static(imagePath2));

//資料驗證
module.exports = router;
