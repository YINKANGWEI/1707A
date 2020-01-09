
const Service = require('egg').Service;

const crypto = require("crypto")

class UserService extends Service {
    async getUser(studentNum) { //判断用户注册过
        let res = await this.app.mysql.query(`select * from user1 where studentNum='${studentNum}'`)
        return res
    }

    //注册
    async registry(studentNum, password, username) {
        let md5 = crypto.createHash("md5")
        md5.update(password)
        password = md5.digest("hex")
        let res = await this.app.mysql.insert('user1', {
            studentNum, password, username
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
}

module.exports = UserService;
