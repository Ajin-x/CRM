const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../app/config')

class AuthController {
    async login(ctx, next) {
        console.log('也走到了这里')
        let status = 200;
        let message = '登陆成功~'
        const { id, name } = ctx.user;
        // console.log(ctx.user)
        const token = jwt.sign({ id, name }, PRIVATE_KEY, {
            expiresIn: 60 * 60 * 24,
            algorithm:'RS256'
        })
        ctx.body = {
            status,
            message,
            ...ctx.job,
            ...ctx.user,
            token
        }
    }
    async success(ctx,next){
        ctx.body = '授权成功~'
    }
}

module.exports = new AuthController();