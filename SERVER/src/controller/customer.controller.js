const customerService = require('../service/customer.service')

class customerController {
    async create(ctx,next){
        // ctx.body = '添加客户成功~'
        //1.获取数据
        
        const userId = ctx.user.id;
        const customer = ctx.request.body;
        // console.log(userId,customer)
        // ctx.body = '增加完成~'

        //将数据插入到数据库
        const result = await customerService.insertCustomer(userId,customer)
        ctx.body = result;
    }

    async customerData(ctx,next){
        
        const {offset,size} = ctx.query;

        const result = await customerService.getCustomer(offset,size)
        //返回数据
        ctx.body = result;

    }
    async update(ctx,next){
        //获取数据
        const {customerId} = ctx.params;
        const {giveUpRea} =ctx.request.body
        //更新内容
        const result = await customerService.updateCustomer(giveUpRea,customerId)
        ctx.body = result;
    }
    async remove(ctx,next){
        const { customerId } = ctx.params;
        
        //删除内容
        const result = await customerService.remove(customerId);
        ctx.body = result;
    }

    
}

module.exports = new customerController();