const Router = require('koa-router')
const { prefix } = require('./customer.router')

const delRouter = new Router({prefix:'/delCustomer'});

const {addDelCustomer,delCustomerList ,removeDelCustomer,getDelCustomer} = require('../controller/delCustomer.controller')

//增加被删客户
delRouter.post('/:userId',addDelCustomer)

//获得全部客户信息
delRouter.get('/delCustomers',getDelCustomer)

//分页获取被删客户信息
delRouter.get('/',delCustomerList)

//从这里删除，加入到客户
delRouter.delete('/:delCustomerId',removeDelCustomer)

module.exports = delRouter
