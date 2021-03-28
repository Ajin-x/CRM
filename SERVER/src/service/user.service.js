const connection = require('../app/database')

class UserService {
    async create(user) {
        console.log('操作数据库~')
        // console.log(user)
        const { username, name, password, phone, job_id, department_id ,superior_id} = user;
        const statement = 'INSERT INTO `user` (`username`,`name`,`password`,`phone`,`job_id`,`department_id`,`superior_id`) VALUES(?,?,?,?,?,?,?)'
        const result = await connection.execute(statement, [username, name, password, phone, job_id, department_id,superior_id])
        //将user存储到数据库中
        return result[0];
    }

    async getUserByName(name) {
        const statement = `SELECT * FROM user where username = ?;`;
        const result = await connection.execute(statement, [name]);
        //result是一个数组 第一项是用户名 第二项是一堆其他的信息
        //result[0]拿到的也是一个数组
        return result[0];
    }

    async getUserPower(id) {
        const statement = `SELECT JSON_OBJECT('jobName',j.name,'power',j.power) job
        FROM job j
        LEFT JOIN user u ON j.id = u.id
        WHERE u.id = ?`

        const result = await connection.execute(statement, [id]);
        console.log(result[0])
        return result[0]
    }

    async getUserById(userId) {
        const statement = `
        SELECT JSON_OBJECT('jobName',j.name,'power',j.power) job , 
        JSON_OBJECT('id',u.id,'name',u.name,'phone',u.phone,'jobId',job_id) user
        FROM job j
        LEFT JOIN user u ON j.id = u.id
        WHERE u.id = ?`;
        const result = await connection.execute(statement, [userId]);
        //result是一个数组 第一项是用户名 第二项是一堆其他的信息
        //result[0]拿到的也是一个数组
        return result[0];
    }
}

module.exports = new UserService();