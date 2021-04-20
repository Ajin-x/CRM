const jwt = require('jsonwebtoken')

const errorTypes = require('../constants/error-types');
const service = require('../service/user.service')
const authService = require('../service/auth.service')
const md5password = require('../utils/password-handle')
const { PUBLIC_KEY } = require('../app/config')

const verifyLogin = async (ctx, next) => {
    //1.获取用户名和密码
    const { username, password } = ctx.request.body;
    //定义状态码及错误信息
    let status , message;

    //2.判断用户名和密码是否为空
    if (!username || !password) {
        //为空的话返回一个错误信息
        message = '用户名或密码不能为空';
        status = 401;
       ctx.body ={
           message,
           status
       }
       return 
    }
    //3.判断用户是否存在
    const result = await service.getUserByName(username);
    const user = result[0];
    if (!user) {
         message = '用户不存在';
         status = 401;
        ctx.body ={
            message,
            status
        }
        return 
    }
    // 4.判断密码是否和数据库的密码是否一致（加密）
    //为什么password是纯数字时（即不是JSON）能拿到却不能进行md5加密？
    console.log(md5password(password))
    console.log(user.password)
    if (md5password(password) !== user.password) {
        message = '密码错误';
        status = 401;
       ctx.body ={
           message,
           status
       }
       return 
    } 
    // console.log(user) 
    ctx.user = user;
    await next();
}

//TODO : 根据用户ID查询POWER并返回
const verifyPower = async (ctx,next)=>{
    console.log('走到了这里')
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
    //1.获取token
    const authorization = ctx.headers.authorization;
    if (!authorization) {
        const error = new Error(errorTypes.UNAUTHORIZATION);
        return ctx.app.emit('error', error, ctx)
    }
    //Bearer    ->后面有空格
    const token = authorization.replace('Bearer ', '')
    //2.验证token 
    try {
        const result = jwt.verify(token, PUBLIC_KEY, {
            algorithms: ['RS256']
        });
        ctx.user = result;
        await next()
    } catch (err) {
        const error = new Error(errorTypes.UNAUTHORIZATION)
        ctx.app.emit('error', error, ctx)
    }

}

const verifyPermission = async (ctx, next) => {

    //获取参数
    const { customerId } = ctx.params;
    const { id } = ctx.user;
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