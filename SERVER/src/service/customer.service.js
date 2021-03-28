const connection = require('../app/database')

class customerService {
    async insertCustomer(userId, customer) {
        console.log('aaa');
        const statement = 'INSERT INTO `client` (`name`,`phone`,`email`,`type`,`desc`,`state`,`userId`) VALUES(?,?,?,?,?,?,?)'
        const [result] = await connection.execute(statement, [customer.name, customer.phone, customer.email, customer.type, customer.desc,customer.state,userId])
        // console.log(result)
        return result;
    }

    async getCustomer(offset, size) {
        const statement = `
            SELECT * FROM client 
            LIMIT ?,?
    ;`;

        const result = await connection.execute(statement, [offset, size]);
        // console.log(result[0])
        //result是一个数组 第一项是用户名 第二项是一堆其他的信息
        //result[0]拿到的也是一个数组
        return result[0];
    }
    async updateCustomer(giveUpRea,id){
        console.log('aaa')
        const statement = `
        UPDATE client SET giveUpRea = ? WHERE id = ?
        `
        const [result] = await connection.execute(statement,[giveUpRea,id])
        return result;
    }
    async remove(customerId){
        const statement = `
            DELETE FROM client WHERE id = ?
        `
        const [result] = await connection.execute(statement,[customerId]);
        return result;
    }
}

module.exports = new customerService()