const service = require('../service/user.service')

class UserController {
    async create(ctx, next) {
        let message = '用户添加成功~'
        let status = 201;
        console.log('注册middleware~')
        //获取用户请求的参数
        const user = ctx.request.body;
        console.log(user)

        //通过传过来的jobName寻找到job_id

        const id = await service.getJobId(user)

        user.job_id = id[0].id;
        //操作数据库
        const result = await service.create(user)

        //返回数据
        ctx.body = {
            result,
            status,
            message
        };
    }

    async getUserDetail(ctx, next) {
        let status = 200;
        let message = '获取用户列表成功~';
        //TODO 获取要查询的用户username
        const { username } = ctx.query;

        console.log(username)
        //TODO 查询用户
        const result = await service.getUserByName(username);

        ctx.body = {
            status,
            message,
            result
        };
    }

    async getUserList(ctx, next) {
        let status = 200;
        let message = '获取用户列表成功~';

        const { id, offset, size } = ctx.query;
        console.log(id, offset, size)

        //根据id 查询到其对应的username
        let username = await service.getUserName(id)
        username = username[0].username
        console.log(username)
        //拿到 offset size  
        // 数据库查询
        let result = await service.getUserList(username,offset, size)

        ctx.body = {
            result,
            message,
            status
        }
    }

    async getAllUser(ctx, next) {
        let status = 200;
        let message = '获取用户列表成功~';

        const { id } = ctx.params;
        console.log(id)

        //根据id 查询到其对应的username
        let username = await service.getUserName(id)

        username = username[0].username

        let result = await service.getAllUser(username)

        ctx.body = {
            status,
            message,
            result
        }
    }
    async update(ctx, next) {
        //获取数据
        const message = '更新成功~'
        const status = 200;

        const { username, phone } = ctx.request.body;
        console.log(username, phone)

        //操作数据库更新数据
        const result = service.update(phone, username)
        //
        ctx.body = {
            result,
            status,
            message
        }
    }
    async changeSuperior(ctx, next) {
        const message = '修改用户上级成功~'
        const status = 200;
        //拿到要修改的员工id
        const { id } = ctx.params;
        //去修改数据库
        const result = service.changeSuperior(id, ctx)

        ctx.body = {
            result,
            message,
            status
        }

    }
    async remove(ctx, next) {
        //拿到要删除的id
        const { id } = ctx.params;

        //根据id去数据库删除数据
        const result = await service.remove(id)

        console.log(result)
        ctx.body = {
            result
        }
    }
}

module.exports = new UserController(); 