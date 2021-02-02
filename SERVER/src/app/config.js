const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

//写相对路径的时候要看项目是从哪里启动的
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname,'./keys/private.key'));
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname,'./keys/public.key'));

dotenv.config();

// console.log(process.env.APP_PROT)

module.exports = {
    APP_PROT,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD,
} = process.env

//相当于给上面那个对象加了属性，不能写上面那个对象前面
module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;
