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
    // 登录校验
    login: async (req, res) => {
        const {username, password} = req.body;
        const data = await UserService.login(username, password);
        if (data.length === 0) {
            res.send({ok: 0});
        } else {
            // 登录成功 设置session
            req.session.user = data[0];
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
