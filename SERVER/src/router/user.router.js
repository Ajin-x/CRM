const Router = require('koa-router')
const {
    create,
    getUserDetail,
    getUserList,
    getAllUser,
    update,
    changeSuperior,
    remove,
    updatePassword,
    getManager,
    changeClientSuperiorForSure,
    getClientStaff,
    backup,
    restore,
    getFilename,
    changeJob,
    resetPassword
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
userRouter.get('/users/:id',getAllUser)  

//更新用户上级
userRouter.patch('/changeSuperior/:id',changeSuperior)

//更新用户信息 
userRouter.patch('/',update)
  
//删除用户信息
userRouter.delete('/:id',remove)

// todo 二稿修改：更改用户密码
userRouter.patch('/updatePassword',handlePassword,updatePassword)

// todo 二稿改修： 查询经理
userRouter.get('/manager',getManager)

// todo 二稿修改：转移下属员工
userRouter.patch('/changeClientSuperiorForSure',changeClientSuperiorForSure)

// todo 二稿修改：查询销售员工
userRouter.get('/getClientStaff',getClientStaff)

//备份数据库
userRouter.get('/backup',backup)

//还原数据库
userRouter.get('/restore',restore)

//获取文件名
userRouter.get('/getFilename',getFilename)

//修改角色
userRouter.patch('/changeJob',changeJob)

//重置密码
userRouter.get('/resetPassword/:id',resetPassword)
module.exports = userRouter; 