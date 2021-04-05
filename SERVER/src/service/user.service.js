const connection = require('../app/database')

class UserService {
    async create(user) {
        console.log('操作数据库~')
        console.log(user)
        const { username,password, phone, job_id, department_id ,superior_name} = user;
        const statement = 'INSERT INTO `user` (`username`,`password`,`phone`,`job_id`,`department_id`,`superior_name`) VALUES(?,?,?,?,?,?)'
        const result = await connection.execute(statement, [username, password, phone, job_id, department_id,superior_name])
        console.log(result)
        //将user存储到数据库中
        return result[0];
    }

    async getUserByName(username) {
        console.log(username)
        const statement = `SELECT * FROM user where username = ?;`;
        const result = await connection.execute(statement, [username]);
        //result是一个数组 第一项是用户名 第二项是一堆其他的信息
        //result[0]拿到的也是一个数组
        console.log(result[0])
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

    async getUserList(offset,size){
        const statement = `
        SELECT * FROM user 
        LIMIT ?,?
        `
        const result = await connection.execute(statement, [offset,size]);
        //result是一个数组 第一项是用户名 第二项是一堆其他的信息
        //result[0]拿到的也是一个数组
        return result[0];
    }
    async getAllUser(){
        const statement = `
        SELECT * FROM user 
        `
        const result = await connection.execute(statement);
        //result是一个数组 第一项是用户名 第二项是一堆其他的信息
        //result[0]拿到的也是一个数组
        return result[0];
    }
    async update(phone,username){
        const statement = `
        UPDATE user SET phone = ? WHERE username = ?
        `

        const result = await connection.execute(statement,[phone,username])
    }
    async remove(id){
        const statement = `
            DELETE FROM user WHERE id = ?
        `
        const [result] = await connection.execute(statement,[id]);
        return result;
    }
}

module.exports = new UserService();