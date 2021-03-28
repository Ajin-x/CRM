const Router = require('koa-router');

const customerRouter = new Router({ prefix: '/customer' });;

//验证是否登陆
const { verifyAuth,verifyPermission } = require('../middleware/auth.middleware')

//create

const { create ,customerData,update,remove} = require('../controller/customer.controller')

//增加客户
customerRouter.post('/', verifyAuth, create)

//分页获取客户信息
customerRouter.get('/',verifyAuth,customerData)

//更新客户信息
customerRouter.patch('/:customerId',verifyAuth,verifyPermission,update)

//删除客户
customerRouter.delete('/:customerId',verifyAuth,verifyPermission,remove)

module.exports = customerRouter;