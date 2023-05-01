var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
// 4. 在routes/index.js中设置路由拦截，只有登录成功后才获取到user字段对象从而访问路由为"/"的首页面，否则重定向到login页面
  if (req.session.user) {
    res.render('index', { title: 'ExpressIndex' });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
