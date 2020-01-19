//中间件

const jwt = require("jsonwebtoken")

const whiteList = ['/login','/registry', '/list']
module.exports = () => {
    return async (ctx,next) =>{
        if (whiteList.includes(ctx.path)) {
            await next()
        } else {
            let token = await ctx.request.headers.authorization
            if (!token) {
                ctx.body = {
                    code: 4,
                    msg: '没有权限'
                }
                return
            }


            try {
                let userInfo = jwt.verify(token, ctx.app.config.keys)
                console.log("userInfo-解密.....",userInfo);
                await next()
            } catch (error) {
                console.log("error......", error);
            }
        }
    }
}