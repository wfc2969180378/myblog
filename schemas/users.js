
let mongoose = require('mongoose');

//用户的表结构
module.exports = new mongoose.Schema({

    // 用户名
    username: String,
    // 密码
    password: String,
    // 姓名
    name: String,
    // 手机号码
    phone: String,
    //是否是管理员
    isAdmin: {
        type: Boolean,
        default: false
    }

});
