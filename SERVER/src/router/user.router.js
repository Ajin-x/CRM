const Router = require('koa-router')
const {
    create,
    getUserDetail,
    getUserList,
    getAllUser,
    update,
    remove
 } = require('../controller/user.controller')

const {
    verifyUser,
    handlePassword
} = require('../middleware/user.middleware')

const userRouter = new Router({ prefix: '/users' })

//注册用户
userRouter.post('/', verifyUser,handlePassword,create)

//获取单个用户
userRouter.get('/user',getUserDetail)

//获取用户列表
userRouter.get('/',getUserList)

// 获取所有用户
userRouter.get('/users',getAllUser)

//更新用户信息
userRouter.patch('/',update)

//删除用户信息
userRouter.delete('/:id',remove)

module.exports = userRouter;