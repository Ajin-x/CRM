const connection = require('../app/database')

class authService {
    async checkCustomer(customerId, id) {
        try {
            const statement = `SELECT * FROM client where id = ?  AND userId = ?`
            const [result] = await connection.execute(statement, [customerId, id])
            console.log(result)
            return result.length === 0 ? false : true;
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = new authService();