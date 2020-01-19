'use strict';

const Service = require('egg').Service;

class UserService extends Service {
    async getUser(name) {
        let res = await this.app.mysql.query(`select * from user where name='${name}'`)
        return res
    }

    async registry(name, pwd) {
        let res = await this.app.mysql.insert("user",{
            name, pwd
        })
        return res
    }

    async login(name, pwd) {
        let res = await this.app.mysql.query(`select * from user where name='${name}' and pwd='${pwd}'`)
        return res
    }
}

module.exports = UserService;
