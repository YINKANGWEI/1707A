'use strict';

const Controller = require('egg').Controller;

class ExamController extends Controller {
    async add() { //添加成绩
        let { ctx } = this
        let { theory, Skill, name, studentNum } = ctx.request.body

        let inFoId = await ctx.service.user.getUser(studentNum)
        if (userId.length == 0) {
            ctx.body = {
                code: 4,
                msg: '没有该用户'
            }
        }
        
        let res = await ctx.service.exam.getUser(name, studentNum)
        if (res == null) { //null 没有添加过
            let data = await ctx.service.exam.add(theory, Skill, name, studentNum)
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

    async del() { //删除成绩
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

    async update() { //修改成绩
        let { ctx } = this
        let { id, studentNum, theory, Skill, name, } = ctx.request.body
    }

    async list() { //查看成绩
        let { ctx } = this
        let res = await this.app.mysql.select("exam")
        if (res.length == 0) {
            ctx.body = {
                code: 0,
                msg: '查询失败'
            }
        } else {
            ctx.body = {
                code: 1,
                msg: '查询成功',
                data: [...res]
            }
        }

    }
}

module.exports = ExamController;
