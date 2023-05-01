const UserModel = require("../model/UserModel");
const UserService = {
    // add user用户
    addUser: (username, password, age) => {
        // 插入数据库
        // 创建一个模型，限制filed类型，一一映射数据库合集
        return UserModel.create({
            username,
            password,
            age,
        }).then((data) => {
            console.log("addUser", data);
        });
    },
    // getUser 查询userList
    getUser: (page, limit) => {
        return UserModel.find({}, ["username", "password", "age"])
            .sort({age: 1})
            .skip((page - 1) * limit)
            .limit(limit);
    },
    // 7. 在services/UseService.js中增加登录查询方法

    // login 查询用户
    login: (username, password) => {
        return UserModel.find({username, password});
    },
};

module.exports = UserService;
