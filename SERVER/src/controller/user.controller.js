const service = require('../service/user.service')

class UserController{
    async create(ctx,next){
        console.log('注册middleware~')
        //获取用户请求的参数
        const user = ctx.request.body;
        
        //查询数据
        const  result= await service.create(user)

        //返回数据
        ctx.body = result;
    }

    async getUserDetail(ctx,next){
        //TODO 获取要查询的用户ID
        const {userId} = ctx.params;
        console.log(userId)
        
        //TODO 查询用户
        const result = await service.getUserById(userId);

        let {user} = result[0]
        let {job} = result[0]


        ctx.body = {
            ...user,
            ...job
        };
    }
}

module.exports = new UserController();