'use strict';

const Service = require('egg').Service;

class ExamService extends Service {
    //判断用户是否添加过
    async getUser(studentNum,name) {
        let res = await this.app.mysql.get("exam", {
            name,studentNum
        })
        return res
    }

    async add(theory, Skill, name,studentNum) {
        let res = await this.app.mysql.insert("exam", {
            theory, Skill, name,studentNum
        })
        return res
    }

    async del(id){
        let res = await this.app.mysql.delete("exam", {
            id
        })
        return res
    }

    async update(id){
    }
}

module.exports = ExamService;
