//通过MD5对密码加密

const crypto = require('crypto');

const  md5password = (password) =>{
    //调用node库中含有的crypto中的createHash进行MD5加密
    const md5 = crypto.createHash('md5');
    //md5.update()返回的是 对象 .digest拿到的是buffer流 传hex拿到16进制的字符串
    const result = md5.update(password).digest('hex');
    return result;
}

module.exports = md5password;