const connection = require('../app/database')

class delCustomerService {
    //增加被删客户
    async addDelCustomer(userId, delCustomer) {
        const statement = 'INSERT INTO `delClient` (`name`,`phone`,`email`,`type`,`desc`,`state`,`userId`) VALUES(?,?,?,?,?,?,?)'
        const [result] = await connection.execute(statement, [delCustomer.name, delCustomer.phone, delCustomer.email, delCustomer.type, delCustomer.desc, delCustomer.state, userId])
        return result;
    }

    //将该客户插入到client表中
    async insertCustomer(customer) {
        console.log('aaa');
        console.log(customer)
        const statement = 'INSERT INTO `client` (`name`,`phone`,`email`,`type`,`clientDesc`,`username`,`state`) VALUES(?,?,?,?,?,?,?)'
        const [result] = await connection.execute(statement, [customer.name, customer.phone, customer.email, customer.type, customer.clientDesc, customer.username, 0])
        console.log(result)
        return result;
    }


    //获得所有被删客户
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

    //恢复
    async removeDelCustomer(delCustomerId) {
        console.log('aaa')
        const statement = `
        DELETE FROM delclient WHERE id = ?
    `
        const [result] = await connection.execute(statement, [delCustomerId]);
        return result;
    }


    //查找客户信息 根据id
    async getDelCustomerById(delCustomerId){
        const statement = ` 
        SELECT * FROM delclient WHERE id = ? 
        `
        const result = await connection.execute(statement, [delCustomerId]);
        console.log(result[0])
        return result[0];
    }

    //将客户信息 插入到client
    async insertCustomer(customerData){
        const { name, phone, email, type, clientDesc, state, username, giveUpRea } = customerData[0];
        console.log(name, phone, email, type, clientDesc, state, username, giveUpRea)
        const statement = 'INSERT INTO `client` (`name`,`phone`,`email`,`type`,`clientDesc`,`state`,`username`,`giveUpRea`) VALUES(?,?,?,?,?,?,?,?)'
        const result = await connection.execute(statement, [name, phone, email, type, clientDesc, state, username, giveUpRea])
        console.log(result);
        return result;
    }
}


module.exports = new delCustomerService()