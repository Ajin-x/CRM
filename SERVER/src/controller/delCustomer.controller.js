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
    //获得全部被删客户信息
    async getDelCustomer(ctx,next){
        const status = 200;
        const message = '获得全部数据成功~'
        console.log('????????')
        let result = await delCustomerService.getDelCustomer()

        ctx.body = {
            result,
            status,
            message
        }
    }

    async delCustomerList(ctx,next){
        const status = 200;
        const message = '分页获得数据成功~'

        // TODO : 获取offset size
        let {offset,size} = ctx.query;

        // todo 在数据库中查询获取，返回
        let result =await delCustomerService.delCustomerList(offset,size)
        console.log(result.length)
        ctx.body = {
            result, 
            status,
            message
        }
    }
    async removeDelCustomer(ctx,next){
        // todo 拿到恢复ID
        let {delCustomerId} = ctx.params;
        // todo 根据ID查找到该条客户信息 返回
        let delCustomerData = await delCustomerService.getDelCustomerById(delCustomerId)

        const insertResult = await delCustomerService.insertCustomer(delCustomerData) 

        // todo 进行数据库操作（删除）
        let result = await delCustomerService.removeDelCustomer(delCustomerId)
        ctx.body = result;

    }
}

module.exports = new delCustomer()