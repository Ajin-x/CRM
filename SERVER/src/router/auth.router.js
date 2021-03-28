const Router = require('koa-router');

const authRouter = new Router();

const {
    login,
    success
} = require('../controller/auth.controller')

const {
    verifyLogin,
    verifyAuth,
    verifyPower
} = require('../middleware/auth.middleware')

authRouter.post('/login',verifyLogin,verifyPower,login)

//验证是否授权的测试
authRouter.get('/test',verifyAuth,success)

//验证用户权限

module.exports = authRouter;