
const Service = require('egg').Service;

const crypto = require("crypto")

class UserService extends Service {
    async getUser(studentNum) { //判断用户注册过
        let res = await this.app.mysql.query(`select * from user1 where studentNum='${studentNum}'`)
        return res
    }

    //注册
    async registry(studentNum, password, username, role) {
        let md5 = crypto.createHash("md5")
        md5.update(password)
        password = md5.digest("hex")
        let res = await this.app.mysql.insert('user1', {
            studentNum, password, username,role
        })
        return res;
    }

    //登录
    async login(studentNum, password) {
        let md5 = crypto.createHash("md5")
        md5.update(password)
        password = md5.digest("hex")
        let res = await this.app.mysql.get('user1', {
            studentNum, password
        })
        return res;
    }

    //没有添加过成绩的学生
    async student() {
        let studentNum = `select studentNum from exam`
        let sql = `select * from user1 where studentNum not in (${studentNum})`
        let res = await this.app.mysql.query(sql)
        return res;
    }

    //获取身份名字
    async rolenName(id){
        let sql = `select * from role where id='${id}'`
        let res = await this.app.mysql.query(sql)
        return res;
    }

    async menu(id){
        let power_id = `select power_id from role_power where role_id='${id}'`
        let sql = `select * from power where id in (${power_id})`
        let res = await this.app.mysql.query(sql)
        return res;
    }
}

module.exports = UserService;
