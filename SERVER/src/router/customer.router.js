const Router = require('koa-router');

const customerRouter = new Router({ prefix: '/customer' });;

//验证是否登陆
const { verifyAuth,verifyPermission } = require('../middleware/auth.middleware')

//create

const { create ,customerData,update,remove,getAllCustomers,getCustomerByName} = require('../controller/customer.controller')

//增加客户
customerRouter.post('/', create)

//获取所有客户
customerRouter.get('/customers',getAllCustomers)

//获得单个客户
customerRouter.get('/customer',getCustomerByName)

//分页获取客户信息
customerRouter.get('/',customerData)

//更新客户信息
customerRouter.patch('/:customerId',update)

//删除客户
customerRouter.delete('/:customerId',remove)

module.exports = customerRouter;