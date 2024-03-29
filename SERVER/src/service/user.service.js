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
        const statement = `
        SELECT * FROM user where username = ?;
        `;
        const result = await connection.execute(statement, [username]);
        //result是一个数组 第一项是用户名 第二项是一堆其他的信息
        //result[0]拿到的也是一个数组
        return result[0]; 
    } 
 
    async findUserByName(username){
        const statement = `
        SELECT JSON_OBJECT('jobName',j.name) job , 
        JSON_OBJECT('id',u.id,'username',u.username,'phone',u.phone,'jobId',job_id,'superior_name',u.superior_name) user
        FROM job j
        RIGHT JOIN user u ON j.id = u.job_id
        WHERE username = ?
        `
        const result = await connection.execute(statement,[username]);
        //result是一个数组 第一项是用户名 第二项是一堆其他的信息
        //result[0]拿到的也是一个数组 
        return result[0];
    }
    async getJobId(user){  
        const {jobName} = user; 
        const statement = `
        SELECT id FROM job WHERE name = ? 
        `

        const result = await connection.execute(statement,[jobName])
        console.log(result[0])

        return result[0]
    }

    async getUserPower(id) {
        console.log(id)
        const statement = `SELECT JSON_OBJECT('jobName',j.name,'power',j.power) job
        FROM job j
        LEFT JOIN user u ON j.id = u.job_id
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

    async getUserList(username,offset,size){
        const statement = `
        SELECT JSON_OBJECT('jobName',j.name) job , 
        JSON_OBJECT('id',u.id,'username',u.username,'phone',u.phone,'jobId',job_id,'superior_name',u.superior_name) user
        FROM job j
        RIGHT JOIN user u ON j.id = u.job_id
        LIMIT ?,?
        `
        const result = await connection.execute(statement, [offset,size]);
        //result是一个数组 第一项是用户名 第二项是一堆其他的信息
        //result[0]拿到的也是一个数组
        return result[0];
    }
    async getAllUser(username){
        const statement = `
        SELECT JSON_OBJECT('jobName',j.name) job , 
        JSON_OBJECT('id',u.id,'username',u.username,'phone',u.phone,'jobId',job_id,'superior_name',u.superior_name) user
        FROM job j
        RIGHT JOIN user u ON j.id = u.job_id
        `
        const result = await connection.execute(statement);
        //result是一个数组 第一项是用户名 第二项是一堆其他的信息
        //result[0]拿到的也是一个数组 
        return result[0];
    }
    //更新
    async update(phone,username){
        const statement = `
        UPDATE user SET phone = ? WHERE username = ?
        `

        const result = await connection.execute(statement,[phone,username])
    }
    //修改上级
    async changeSuperior(id,ctx){
        console.log(id,ctx.request.body) 
        const statement = `
        UPDATE user SET superior_name = ? WHERE id = ?
        `
        const result = await connection.execute(statement,[ctx.request.body.superior_name,id])

        return result;
    }
    async remove(id){
        const statement = `
            DELETE FROM user WHERE id = ?
        `
        const [result] = await connection.execute(statement,[id]);
        return result;
    }
    //根据id 获得username
    async getUserName(id){
        const statement=`
        SELECT username FROM user WHERE id = ?
        `
        const [result] = await connection.execute(statement,[id]);
        return result;
    }

    // todo 二稿修改 更改用户密码
    async updatePassword(username,password){
        const statement=`
        UPDATE user SET password = ? WHERE username = ?
        `

        const result = await connection.execute(statement, [password,username])

        return result;
    }

    // 查询经理
    async getManager(){
        const statement = `
        SELECT j.name value , 
        u.username label
        FROM job j
        LEFT JOIN user u ON j.id = u.job_id
        WHERE j.id in (1,2,4)
        `

        const result = await  connection.execute(statement)

        return result[0]
    }

    //删除时转移员工
    async changeClientSuperiorForSure(username,superior_name){
        const statement = `
        UPDATE user SET superior_name = ? WHERE superior_name= ? 
        `
        console.log(username,superior_name)
        const result = await  connection.execute(statement,[superior_name,username])

        return result
    }

    //获得销售部员工信息
    async getClientStaff(){
        const statement =`
        SELECT j.name value ,  
        u.username label ,u.superior_name tag
        FROM job j
        LEFT JOIN user u ON j.id = u.job_id
        WHERE j.id =3  
        `
        const result  = await connection.execute(statement)

        return result[0]
    }
    //将文件名插入数据库
    async insertDataInfo(filename){
        const statement =`
        INSERT INTO backup (name) VALUES(?)
        `
        const result  = await connection.execute(statement,[filename])

        return result
    }
    async getFilename(){
        const statement =`
        SELECT name as value FROM backup
        `
        const result = await connection.execute(statement)
        return result[0]
    }

    //重置密码
    async resetPassword(id){
        const statement =`
        UPDATE  user set password = 'e10adc3949ba59abbe56e057f20f883e' WHERE id = ?
        `
        const result = await connection.execute(statement,[id]);

        return result;
    }
}

module.exports = new UserService(); 