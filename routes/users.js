var express = require("express");
var router = express.Router();
const UserController=require("../controllers/UserController");

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});

router.post("/user/add", UserController.addUser);

// 获取userList
router.get("/user/list", UserController.getUser);


// 5. 在routes/users.js文件中增加登录校验和注销的方法逻辑，或者直接写在login.js中也可以，不过和users相关的就先放一起
// 登录校验
router.post("/login",UserController.login);
// 注销
router.get("/logout",UserController.logout);


module.exports = router;
