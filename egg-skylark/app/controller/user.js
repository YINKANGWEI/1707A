
const Controller = require('egg').Controller;

const jwt = require("jsonwebtoken")

class UserController extends Controller {

    //注册
    async registry() {
        let { ctx } = this
        let { name, pwd } = ctx.request.body
        if (!name || !pwd) {
            ctx.body = {
                code: 3,
                msg: '缺少参数'
            }
            return;
        }

        let res = await ctx.service.user.getUser(name)
        if (res.length == 0) { //没注册
            let data = await ctx.service.user.registry(name, ctx.helper.help(pwd))
            if (data.affectedRows == 1) {
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
        } else {
            ctx.body = {
                code: 2,
                msg: '该用户已注册'
            }
        }
    }

    //登录
    async login() {
        let { ctx } = this
        let { name, pwd } = ctx.request.body
        if (!name || !pwd) {
            ctx.body = {
                code: 3,
                msg: '缺少参数'
            }
            return;
        }

        let res = await ctx.service.user.login(name, ctx.helper.help(pwd))
        let token = jwt.sign({ ...res[0] }, ctx.app.config.keys, { expiresIn: '2 days' })
        if (res.length > 0) { //
            ctx.body = {
                code: 1,
                token,
                msg: '登录成功',
                data: {
                    uid: res[0].id,
                    name: res[0].name
                }
            }
        } else {
            ctx.body = {
                code: 0,
                msg: '登录失败'
            }
        }
    }

    //获取列表
    async list() {
        let { ctx } = this
        let res = await this.app.mysql.select("skylark_list")
        ctx.body = {
            code: 1,
            msg: 'success',
            data: [...res]
        }
    }
}

module.exports = UserController;
