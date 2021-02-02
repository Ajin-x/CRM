const connection = require('../app/database');

class MomentService {
    async create(userId, content) {
        const statement = `INSERT INTO moment (content,user_id) VALUES(?,?);`;
        const [result] = await connection.execute(statement, [content, userId]);
        return result;
    }
    //根据id去查询数据
    async getMomentById(id) {
        const statement = `
        SELECT
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id',u.id,'name',u.name) author
        FROM moment m
        LEFT JOIN user u ON m.user_id = u.id
        WHERE m.id = ?;
        `;
        const [result] = await connection.execute(statement, [id])
        return result[0];
    }

    async getMomentList(offset,size){
        //limit 第一个问号是offset 第二个问号是size
        const statement = `
        SELECT
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id',u.id,'name',u.name) author
        FROM moment m
        LEFT JOIN user u ON m.user_id = u.id
        limit ?,?;
        `;
        const [result] = await connection.execute(statement,[offset,size]);
        return result;
    }
}

module.exports = new MomentService()