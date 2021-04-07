const connection = require('../app/database')

class customerService {
    //添加客户
    async insertCustomer(customer) {
        console.log('aaa');
        console.log(customer)
        const statement = 'INSERT INTO `client` (`name`,`phone`,`email`,`type`,`desc`,`userId`) VALUES(?,?,?,?,?,?)'
        const [result] = await connection.execute(statement, [customer.name, customer.phone, customer.email, customer.type, customer.desc, customer.userId])
        // console.log(result)
        return result;
    }

    //获得单个客户信息
    async getCustomerByName(name) {
        const statement = `
        SELECT * FROM client WHERE name = ? 
        `
        const result = await connection.execute(statement, [name]);
        return result[0];

    }
    //获取所有客户信息
    async getAllCustomers() {
        const statement = `
        SELECT * FROM client WHERE state = 0
        `
        const result = await connection.execute(statement);
        return result[0];

    }
    //分页获取客户
    async getCustomer(offset, size) {
        const statement = `
            SELECT * FROM client WHERE state = 0
            LIMIT ?,?
    ;`;

        const result = await connection.execute(statement, [offset, size]);
        // console.log(result[0])
        //result是一个数组 第一项是用户名 第二项是一堆其他的信息
        //result[0]拿到的也是一个数组
        return result[0];
    }
    //更新客户信息
    async updateCustomers(id, body) {
        console.log(body)
        const { name, phone, email, type, clientDesc } = body;

        const statement = `
        UPDATE client SET name = ?,phone=?,email=?,type=?,clientDesc=? WHERE id = ?
        `
        // console.log(id, name, phone, email, type, desc )

        const [result] = await connection.execute(statement, [body.name, body.phone, body.email, body.type, body.clientDesc, id])
        console.log(result) 
        return result;

    } 
    //更新客户信息（将其流失）  
    async updateCustomer(giveUpRea, id) {
        console.log(giveUpRea,id)
        const statement = `
        UPDATE client SET giveUpRea = ? , state = 1 WHERE id = ?
        `
        const [result] = await connection.execute(statement, [giveUpRea, id])
        return result;
    }
    //更新指派的员工
    async changeUserName(customerId,username){
        const statement = `
        UPDATE client SET username = ?  WHERE id = ?
        `
        const [result] = await connection.execute(statement, [username,customerId])
    }
    //删除客户 
    async remove(customerId) {
        const statement = `
            DELETE FROM client WHERE id = ?
        `
        const [result] = await connection.execute(statement, [customerId]);
        return result;
    }
}

module.exports = new customerService()