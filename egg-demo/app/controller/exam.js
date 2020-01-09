'use strict';

const Controller = require('egg').Controller;

class ExamController extends Controller {
    async add() { //添加成绩
        let { ctx } = this
        let {theory,  Skill, name} = ctx.request.body 
        let res = await ctx.service.exam.getUser(name)
        if (res == null) { //null 没有添加过
            let data = await ctx.service.exam.add(theory,  Skill, name)
            if (data.affectedRows == 1) {
                ctx.body = {
                    code: 1,
                    msg: '提交成功'
                }
            } else {
                ctx.body = {
                    code: 0,
                    msg: '提交失败'
                } 
            }
        } else {
            ctx.body = {
                code: 2,
                msg: '该学生已提交成绩'
            }
        }
    }

    async del(){ //删除成绩
        let { ctx } = this
        let { id } = ctx.query
        let res = await ctx.service.exam.del(id)
        if (res.affectedRows == 1) {
            ctx.body = {
                code: 1,
                msg: '删除成功'
            }
        } else {
            ctx.body = {
                code: 0,
                msg: '删除失败'
            }
        }
    }

    async update(){ //修改成绩

    }
}

module.exports = ExamController;
