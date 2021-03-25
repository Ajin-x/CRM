const connection = require('../app/database')

class UserService {
    async create(user) {
        const {username,name, password,phone,job_id,department_id } = user;
        const statement = 'INSERT INTO `user` (`username`,`name`,`password`,`phone`,`job_id`,`department_id`,`superior_id`) VALUES(?,?,?,?,?,?,?)'
        const result = await connection.execute(statement, [username,name, password,phone,job_id,department_id])
        //将user存储到数据库中
        return result[0];
    }

    async getUserByName(name){
        const statement = `SELECT * FROM user where username = ?;`;
        const result = await connection.execute(statement,[name]);
        //result是一个数组 第一项是用户名 第二项是一堆其他的信息
        //result[0]拿到的也是一个数组
        return result[0];
    }   

}

module.exports = new UserService();