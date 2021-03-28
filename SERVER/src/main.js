const app = require('./app')
require('./app/database')
const config = require('./app/config')
const cors = require('koa2-cors')
app.use(cors())


//端口不建议硬编码
app.listen(config.APP_PROT, (err) => {
    console.log(`服务器在${config.APP_PROT}启动成功~`)
})