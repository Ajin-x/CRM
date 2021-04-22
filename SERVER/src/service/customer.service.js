const connection = require('../app/database')

class customerService {
    //将查询到的客户信息插到delclient表中
    async insertDelCustomer(customerData) {
        const { name, phone, email, type, clientDesc, state, username, giveUpRea } = customerData[0];
        console.log(name, phone, email, type, clientDesc, state, username, giveUpRea)
        const statement = 'INSERT INTO `delclient` (`name`,`phone`,`email`,`type`,`clientDesc`,`state`,`username`,`giveUpRea`) VALUES(?,?,?,?,?,?,?,?)'
        const result = await connection.execute(statement, [name, phone, email, type, clientDesc, state, username, giveUpRea])
        console.log(result);
        return result;
    }

    //添加客户  
    async insertCustomer(customer) {
        console.log('aaa');
        console.log(customer)
        const statement = 'INSERT INTO `client` (`name`,`phone`,`email`,`type`,`clientDesc`,`username`,`state`) VALUES(?,?,?,?,?,?,?)'
        const [result] = await connection.execute(statement, [customer.name, customer.phone, customer.email, customer.type, customer.clientDesc, customer.username, 0])
        console.log(result)
        return result;
    }

    //获得单个客户信息（根据username）
    async getCustomerByName(name) {
        const statement = `
        SELECT * FROM client WHERE name = ? 
        `
        const result = await connection.execute(statement, [name]);
        return result[0];

    }
    //获取单个用户信息 （根据id）
    async getCustomerById(customerId) {
        const statement = `
        SELECT * FROM client WHERE id = ? 
        `
        const result = await connection.execute(statement, [customerId]);
        console.log(result[0])
        return result[0];
    }

    //获取所有客户信息（没流失的）
    async getAllCustomers() {
        const statement = `
        SELECT * FROM client WHERE state = 0
        `
        const result = await connection.execute(statement);
        return result[0];

    }
    async getLossCustomers() {
        const statement = `
        SELECT * FROM client WHERE state = 1
        `
        const result = await connection.execute(statement);
        return result[0];

    }
    //分页获取流失客户
    async getLossCustomerList(offset, size) {
        const statement = `
        SELECT * FROM client WHERE state = 1
        LIMIT ?,?
;`;

        const result = await connection.execute(statement, [offset, size]);
        // console.log(result[0])
        //result是一个数组 第一项是用户名 第二项是一堆其他的信息
        //result[0]拿到的也是一个数组
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
    async updateCustomer(giveUpRea, name) {
        console.log('aaaa')
        console.log(giveUpRea, name)
        const statement = `
        UPDATE client SET giveUpRea = ? , state = 1 WHERE name = ?
        `
        const [result] = await connection.execute(statement, [giveUpRea, name])
        return result;
    }
    //更新指派的员工
    async changeUserName(name, username) {
        const statement = `
        UPDATE client SET username = ?  WHERE name = ?
        `
        const [result] = await connection.execute(statement, [username, name])
    }
    //删除客户 
    async remove(customerId) {
        const statement = `
            DELETE FROM client WHERE id = ?
        `
        const [result] = await connection.execute(statement, [customerId]);
        return result;
    }

    //获得某经理及其下属的客户
    async getMangerCustomer(username) {
        console.log(username)
        const statement = `
        select DISTINCT name,c.phone,email,type,clientDesc,state,c.username,giveUpRea,c.createAT from user as A
        RIGHT join user as B on B.superior_name=A.username
        RIGHT join client as C on C.username=B.username or C.username=?
        where A.username=? AND state=0
            `
        const result = await connection.execute(statement, [username, username]);
        return result[0];
    }

    //分页获得某经理及其下属的客户 
    async getMangerCustomerList(username, offset, size) {
        console.log(username)
        const statement = `
        select DISTINCT name,c.phone,email,type,clientDesc,state,c.username,giveUpRea,c.createAT from user as A
        RIGHT join user as B on B.superior_name=A.username
        RIGHT join client as C on C.username=B.username or C.username=?
        where A.username=? AND state=0
            LIMIT ?,?
            `
        const result = await connection.execute(statement, [username, username, offset, size]);
        console.log(result[0])
        return result[0];
    }
    //员工获取负责的客户
    async getStaffCustomer(username) {
        const statement = `
        SELECT * FROM client WHERE state = 0 and username = ?
        `
        const result = await connection.execute(statement, [username]);
        console.log(result[0])
        return result[0];
    }
    async getStaffCustomerList(username, offset, size) {
        const statement = `
        SELECT * FROM client WHERE state = 0 and username = ?
        LIMIT ?,?
        `

        const result = await connection.execute(statement, [username, offset, size]);
        console.log(result[0])
        return result[0];
    }

    async changeClientUser(changeUsername, username) {
        const statement = `
        UPDATE client SET username = ? WHERE username= ? 
        `
        const result = await connection.execute(statement, [username, changeUsername])
        return result;
    }

    //查询某员工上司的员工
    async getMangerStaff(superiorName) {
        const statement = `
        SELECT u.username value ,  
        u.superior_name label 
        FROM user u
        WHERE superior_name = ?  
        `
        const result = await connection.execute(statement, [superiorName])
        return result[0];
    }
    async getAllStaff() {
        const statement = `
        SELECT u.username value ,  
        u.superior_name label 
        FROM user u
        WHERE job_id = 3  
        `
        const result = await connection.execute(statement)
        return result[0];
    }
}

module.exports = new customerService()