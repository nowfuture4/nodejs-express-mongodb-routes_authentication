const UserService = require("../services/UserService");
const JWT = require("../util/JWT.js");
const UserController = {
    // add user用户
    addUser: async (req, res) => {
        const {username, password, age} = req.body;
        await UserService.addUser(username, password, age);
        res.send({ok: 1});
    },
    // get user list
    getUser: async (req, res) => {
        const {page, limit} = req.query;
        const data = await UserService.getUser(page, limit);
        res.send(data);
    },
    // 登录校验
    login: async (req, res) => {
        const {username, password} = req.body;
        const data = await UserService.login(username, password);
        if (data.length === 0) {
            res.send({ok: 0});
        } else {
            // 登录成功 设置token
            console.log("login", data[0]);
            const token =JWT.generate({_id:data[0]._id,username:data[0].username}, "1h");
            // token 返回在header中
            res.header("Authorization", token);
            res.send({ok: 1});
        }
    },

};
module.exports = UserController;
