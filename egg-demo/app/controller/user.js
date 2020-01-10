
const Controller = require('egg').Controller;

const jwt = require("jsonwebtoken")

const valiData = {
    studentNum: 'string',
    password: {
        type: 'password',
        required: true
    }
}

class UserController extends Controller {
    //注册
    async registry() {
        //判断学号是否注册过 没有去注册
        let { ctx } = this
        let { studentNum, password, username, role } = ctx.request.body

        if (!studentNum || !password || !username || !role) {
            ctx.body = {
                code: 3,
                msg: '缺少参数'
            }
            return;
        }

        try {
            ctx.validate(valiData)
            let data = await ctx.service.user.getUser(studentNum)
            if (data.length == 0) { // 没注册
                let res = await ctx.service.user.registry(studentNum, password, username,role)
                if (res.affectedRows == 1) {
                    ctx.body = {
                        code: 1,
                        msg: '注册成功'
                    }
                } else {
                    ctx.body = {
                        code: 0,
                        msg: '注册失败'
                    }
                }
            } else { //注册过
                ctx.body = {
                    code: 2,
                    msg: '该用户已注册'
                }
            }
        } catch (error) {
            ctx.body = {
                code: 4,
                msg: '参数类型不正确'
            }
        }
    }

    //登录
    async login() {
        let { ctx } = this
        let { studentNum, password } = ctx.request.body

        if (!studentNum || !password) {
            ctx.body = {
                code: 3,
                msg: '缺少参数'
            }
            return;
        }

        try {
            ctx.validate(valiData)
            let data = await ctx.service.user.getUser(studentNum)
            if (data.length > 0) { // 有该用户请登录
                let res = await ctx.service.user.login(studentNum, password)
                let token = jwt.sign({ ...res[0] }, this.app.config.keys, { expiresIn: '2 days' })
                if (res) {
                    ctx.body = {
                        code: 1,
                        token,
                        msg: '登录成功',
                        data: res
                    }
                } else {
                    ctx.body = {
                        code: 0,
                        msg: '登录失败'
                    }
                }
            } else {  //没有
                ctx.body = {
                    code: 2,
                    msg: '没有该用户，请注册'
                }
            }
        } catch (error) {
            ctx.body = {
                code: 4,
                msg: '参数类型不正确'
            }
        }
    }

    async student() { //没有添加成绩的学生
        let { ctx } = this
        let res = await ctx.service.user.student()
        ctx.body = res
    }

    //身份(身份id获取身份名字)
    async role() {
        let { ctx } = this
        let { id } = ctx.query
        let res = await ctx.service.user.rolenName(id)
        ctx.body = res
    }

    //权限列表菜单
    async menu() {
        let { ctx } = this
        let { role_id } =  ctx.query
        let res = await ctx.service.user.menu(role_id)
        ctx.body = res
    }
}

module.exports = UserController;

