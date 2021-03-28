const jwt = require('jsonwebtoken')

const errorTypes = require('../constants/error-types');
const service = require('../service/user.service')
const authService = require('../service/auth.service')
const md5password = require('../utils/password-handle')
const { PUBLIC_KEY } = require('../app/config')

const verifyLogin = async (ctx, next) => {
    //1.获取用户名和密码
    const { username, password } = ctx.request.body;

    //2.判断用户名和密码是否为空
    if (!username || !password) {
        //为空的话返回一个错误信息
        const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit('error', error, ctx);
    }

    //3.判断用户是否存在
    const result = await service.getUserByName(username);
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

//TODO : 根据用户ID查询POWER并返回
const verifyPower = async (ctx,next)=>{
    //  TODO:拿到用户ID
        const id = ctx.user.id;
    //  TODO: 根据ID去数据库查询POWER
        const result = await service.getUserPower(id)
    // TODO: 返回POWER及DESC

    const {job} = result[0];
    ctx.job = job;
    await next();
}


const verifyAuth = async (ctx, next) => {
    console.log('验证授权的middleware')
    //1.获取token
    const authorization = ctx.headers.authorization;
    if (!authorization) {
        const error = new Error(errorTypes.UNAUTHORIZATION);
        return ctx.app.emit('error', error, ctx)
    }
    //Bearer    ->后面有空格
    const token = authorization.replace('Bearer ', '')
    // console.log(token)
    //2.验证token 
    try {
        const result = jwt.verify(token, PUBLIC_KEY, {
            algorithms: ['RS256']
        });
        // console.log(ctx.body)
        ctx.user = result;
        await next()
    } catch (err) {
        const error = new Error(errorTypes.UNAUTHORIZATION)
        ctx.app.emit('error', error, ctx)
    }

}

const verifyPermission = async (ctx, next) => {
    console.log('验证权限的middleware')

    //获取参数
    const { customerId } = ctx.params;
    const { id } = ctx.user;
    console.log(customerId, id)
    //查询是否具备权限
    try {
        const isPermission = await authService.checkCustomer(customerId, id)
        if (!isPermission) {
            throw new Error();
        }
    await next();
    } catch (err) {
        const error = new Error(errorTypes.UNPERMISSION);
        return ctx.app.emit('error', error, ctx)

    } 

}

module.exports = {
    verifyLogin,
    verifyAuth,
    verifyPower,
    verifyPermission
}