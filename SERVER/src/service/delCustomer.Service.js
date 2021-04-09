const connection = require('../app/database')

class delCustomerService {
    //增加被删客户
    async addDelCustomer(userId, delCustomer) {
        const statement = 'INSERT INTO `delClient` (`name`,`phone`,`email`,`type`,`desc`,`state`,`userId`) VALUES(?,?,?,?,?,?,?)'
        const [result] = await connection.execute(statement, [delCustomer.name, delCustomer.phone, delCustomer.email, delCustomer.type, delCustomer.desc, delCustomer.state, userId])
        return result;
    }
    async getDelCustomer() {
        console.log('????')
        const statement = `
        SELECT * FROM delclient 
;`;
        const result = await connection.execute(statement);
        //result是一个数组 第一项是用户名 第二项是一堆其他的信息
        //result[0]拿到的也是一个数组
        return result[0];
    }

    //分页获取
    async delCustomerList(offset, size) {
        const statement = `
        SELECT * FROM delclient 
        LIMIT ?,?
;`;
        const result = await connection.execute(statement, [offset, size]);
        // console.log(result[0])
        //result是一个数组 第一项是用户名 第二项是一堆其他的信息
        //result[0]拿到的也是一个数组
        return result[0];
    }
    async removeDelCustomer(delCustomerId) {
        console.log('aaa')
        const statement = `
        DELETE FROM delclient WHERE id = ?
    `
        const [result] = await connection.execute(statement, [delCustomerId]);
        return result;
    }
}


module.exports = new delCustomerService()