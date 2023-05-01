const UserService = require("../services/UserService");
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

    // 6. 在controllers/UserController.js中增加登录和注销的两个方法

    // 登录校验
    login: async (req, res) => {
        const {username, password} = req.body;
        const data = await UserService.login(username, password);
        if (data.length === 0) {
            res.send({ok: 0});
        } else {
            // 登录成功 设置session,session默认是存在内存中的
            //console.log("login",data);
            req.session.user = data[0];
            // console.log("req.session",req.session);
            res.send({ok: 1});
        }
    },
    // 注销
    logout: (req, res) => {
        // 注销成功 删除session
        console.log("session", req.session);

        req.session.destroy(() => {
            res.send({ok: 1});
        });
    },
};
module.exports = UserController;
