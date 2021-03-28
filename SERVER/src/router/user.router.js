const Router = require('koa-router')
const {
    create,
    getUserDetail
} = require('../controller/user.controller')

const {
    verifyUser,
    handlePassword
} = require('../middleware/user.middleware')

const userRouter = new Router({ prefix: '/users' })

//注册用户
userRouter.post('/', verifyUser,handlePassword,create)

//获取单个用户
userRouter.get('/:userId',getUserDetail)

module.exports = userRouter;