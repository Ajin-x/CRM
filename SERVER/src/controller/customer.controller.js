const customerService = require('../service/customer.service')

class customerController {
    //创建客户
    async create(ctx,next){
        // ctx.body = '添加客户成功~'
        //1.获取数据
        console.log(ctx.request.body)
        const customer = ctx.request.body;
        // console.log(userId,customer)
        // ctx.body = '增加完成~'

        //将数据插入到数据库
        const result = await customerService.insertCustomer(customer)
        ctx.body = result;
    }
    //获取单个客户信息
    async getCustomerByName(ctx,next){
        const message = '获取所有客户信息成功~'
        const status = 200
        const {name} = ctx.query;

        //查询该用户
        const result = await customerService.getCustomerByName(name)
        ctx.body = {
            status,
            message,
            result
        }
    }
    //获取所有用户 
    async getAllCustomers(ctx,next){
        const message = '获取所有客户信息成功~'
        const status = 200
        //从数据库获取所有用户信息返回  
        const result = await customerService.getAllCustomers()

        ctx.body = {
            status,
            message,
            result
        }
    }


    //分页获取客户
    async customerData(ctx,next){
        const message = '获得客户信息成功~'
        const status = 200
        const {offset,size} = ctx.query;

        const result = await customerService.getCustomer(offset,size)
        //返回数据
        ctx.body = {
            result,
            status,
            message
        };
    }
    //更新客户信息
    async updateCustomer(ctx,next){
        const message = '更新客户信息成功~'
        const status = 200
        const {customerId} =ctx.params;
        console.log(customerId)
        
        //根据id 去更新数据
        const result = await customerService.updateCustomers(customerId,ctx.request.body)

        ctx.body = {
            result,
            message,
            status
        };
          
    }
    //更新客户信息（将其流失）
    async update(ctx,next){
        const message = '流失客户成功~'
        const status = 200
        //获取数据
        const {customerId} = ctx.params;
        const {giveUpRea} =ctx.request.body
        //更新内容
        const result = await customerService.updateCustomer(giveUpRea,customerId)
        ctx.body = {
            result, 
            message,
            status
        };
    }
    //更新客户负责人
    async changeUserName(ctx,next){
        const message = '更改负责人成功~'
        const status = 200
        const {customerId} = ctx.params;
        const {username} = ctx.request.body;
        console.log(customerId,username)

        const result = await customerService.changeUserName(customerId,username)
        ctx.body = {
            result,
            status,
            message
        }
    }
    //删除客户
    async remove(ctx,next){
        const { customerId } = ctx.params;
        
        //删除内容
        const result = await customerService.remove(customerId);
        ctx.body = result;
    }

    
}

module.exports = new customerController();