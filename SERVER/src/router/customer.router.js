const Router = require('koa-router');

const customerRouter = new Router({ prefix: '/customer' });;

//验证是否登陆
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware')

//create

const {
    create, customerData, update, remove, getAllCustomers, getCustomerByName, updateCustomer, changeUserName
} = require('../controller/customer.controller')

//增加客户
customerRouter.post('/', create)

//获得所有客户信息
customerRouter.get('/customers', getAllCustomers)

//获得单个客户
customerRouter.get('/customer', getCustomerByName)

//分页获取客户信息
customerRouter.get('/', customerData)

//更新客户信息
customerRouter.patch('/customerData/:customerId', updateCustomer)

//更新客户信息(将其流失)
customerRouter.patch('/:customerId', update)

//更新负责员工
customerRouter.patch('/username/:customerId', changeUserName)

//删除客户 
customerRouter.delete('/:customerId', remove)

module.exports = customerRouter;