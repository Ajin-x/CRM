const jwt = require('jsonwebtoken')

const errorTypes = require('../constants/error-types');
const service = require('../service/user.service')
const md5password = require('../utils/password-handle')
const {PUBLIC_KEY} = require('../app/config')


const verifyLogin = async (ctx, next) => {
    //1.获取用户名和密码
    const { name, password } = ctx.request.body;

    //2.判断用户名和密码是否为空
    if (!name || !password) {
        //为空的话返回一个错误信息
        const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit('error', error, ctx);
    }

    //3.判断用户是否存在
    const result = await service.getUserByName(name);
    const user = result[0];
    if (!user) {
        const error = new Error(errorTypes.USER_DOES_NOT_EXISTS);
        return ctx.app.emit('error', error, ctx);
    }

    // 4.判断密码是否和数据库的密码是否一致（加密）
    //为什么password是纯数字时（即不是JSON）能拿到却不能进行md5加密？
    if (md5password(password) !== user.password) {
        const error = new Error(errorTypes.PASSWORD_IS_INCORRECT);
        return ctx.app.emit('error', error, ctx)
    }
    ctx.user = user;
    await next();
}

const verifyAuth = async (ctx,next)=>{
    console.log('验证授权的middleware')
    //1.获取token
    // console.log(ctx.headers)
    const authorization = ctx.headers.authorization;
    if(!authorization){
        const error = new Error(errorTypes.UNAUTHORIZATION);
        return ctx.app.emit('error',error,ctx)
    }
    //Bearer    ->后面有空格
    const token = authorization.replace('Bearer ','')

    // console.log(token)
    //2.验证token
    try{
        const result = jwt.verify(token,PUBLIC_KEY,{
            algorithms:['RS256']
        });
        ctx.user = result;
        await next()
    }catch(err){
        const error = new Error(errorTypes.UNAUTHORIZATION)
        ctx.app.emit('error',error,ctx)
    }

}

module.exports = {
    verifyLogin,
    verifyAuth
}