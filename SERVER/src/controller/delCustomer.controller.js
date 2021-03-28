const delCustomerService = require('../service/delCustomer.Service')

class delCustomer{
    async addDelCustomer(ctx,next){
        //todo: 拿到删除客户的人ID
        const {userId} = ctx.params;
        console.log(userId)
        // todo 拿到被删客户信息
        const delCustomer = ctx.request.body;
        // todo : 将数据插入到数据库 
        const result =await delCustomerService.addDelCustomer(userId,delCustomer)
        ctx.body = result;
    }
    async delCustomerList(ctx,next){
        // TODO : 获取offset size
        let {offset,size} = ctx.query;

        // todo 在数据库中查询获取，返回
        let result =await delCustomerService.delCustomerList(offset,size)
        console.log(result.length)
        ctx.body = result;
    }
    async removeDelCustomer(ctx,next){
        // todo 拿到恢复ID
        let {delCustomerId} = ctx.params;
        // todo 进行数据库操作
        let result = await delCustomerService.removeDelCustomer(delCustomerId)
        ctx.body = result;

    }
}

module.exports = new delCustomer()