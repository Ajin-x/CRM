const Router = require('koa-router');

const customerRouter = new Router({ prefix: '/customer' });;

//验证是否登陆
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware')

//create

const {
    create, customerData, update, remove, getAllCustomers,
    getCustomerByName, updateCustomer, changeUserName, getLossCustomers,
    getLossCustomerList,getMangerCustomer,getMangerCustomerList,getStaffCustomer,getStaffCustomerList,
    changeClientUser,
} = require('../controller/customer.controller')


// todo 二稿修改：转移客户
customerRouter.patch('/changeClientUser',changeClientUser)

//增加客户
customerRouter.post('/', create)

//获得所有客户信息
customerRouter.get('/customers', getAllCustomers)

//获得所有流失客户信息
customerRouter.get('/getLossCustomers', getLossCustomers)

//分页获得流失客户信息
customerRouter.get('/getLossCustomerList', getLossCustomerList)

//获得单个客户
customerRouter.get('/customer', getCustomerByName)

//分页获取客户信息
customerRouter.get('/', customerData)

//更新客户信息
customerRouter.patch('/customerData/:customerId', updateCustomer) 

//更新客户信息(将其流失)
customerRouter.patch('/', update)

//更新负责员工
customerRouter.patch('/username/:customerId', changeUserName)

//删除客户 
customerRouter.delete('/:customerId', remove)


//获得某经理及其下属的客户
customerRouter.get('/getMangerCustomer',getMangerCustomer)

//分页获得某经理及其下属的客户
customerRouter.get('/getMangerCustomerList',getMangerCustomerList)

//获得某员工负责的客户
customerRouter.get('/getStaffCustomer',getStaffCustomer)

//分页获得某员工负责的客户
customerRouter.get('/getStaffCustomerList',getStaffCustomerList)

module.exports = customerRouter;  