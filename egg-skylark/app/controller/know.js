'use strict';

const Controller = require('egg').Controller;

class KnowController extends Controller {
    async add() { //添加知识库
        let { ctx } = this
        let { title, content, isShow } = ctx.request.body //title: 'vue', content: 'vue中的数据存储vuex', isShow: '1'
        let res = await ctx.service.know.add(title, content, isShow)
        if (res.affectedRows == 1) {
            ctx.body = {
                code: 1,
                msg: '添加成功'
            }
        } else {
            ctx.body = {
                code: 0,
                msg: '添加失败'
            }
        }
    }
}

module.exports = KnowController;
