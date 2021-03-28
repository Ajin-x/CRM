const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../app/config')

class AuthController {
    async login(ctx, next) {
        const { id, name } = ctx.user;
        // console.log(ctx.user)
        const token = jwt.sign({ id, name }, PRIVATE_KEY, {
            expiresIn: 60 * 60 * 24,
            algorithm:'RS256'
        })
        ctx.body = {
            ...ctx.job,
            ...ctx.user,
            token
        }
        // console.log(ctx.body)
    }
    async success(ctx,next){
        ctx.body = '授权成功~'
    }
}

module.exports = new AuthController();