'use strict';

const Service = require('egg').Service;

class ExamService extends Service {
    //判断用户是否添加过
    async getUser(name) {
        let res = await this.app.mysql.get("exam", {
            name
        })
        return res
    }
    async add(theory, Skill, name) {
        let res = await this.app.mysql.insert("exam", {
            theory, Skill, name
        })
        return res
    }
    async del(id){
        let res = await this.app.mysql.delete("exam", {
            id
        })
        return res
    }
}

module.exports = ExamService;
