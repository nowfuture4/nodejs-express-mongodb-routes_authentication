var express = require("express");
const UserModel = require("../model/UserModel");
var router = express.Router();
const UserController=require("../controllers/UserController");

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});

router.post("/user/add", UserController.addUser);

// 获取userList
router.get("/user/list", UserController.getUser);


// 登录校验
router.post("/login",UserController.login);
// 注销
router.get("/logout",UserController.logout);


module.exports = router;
