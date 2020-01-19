'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app

  //知识库--增删改查
  router.post("/know/add", controller.know.add)

  //文档--增删
  router.post("/archive/add", controller.archive.add)

  //==========================================================

  //登录
  router.post('/login', controller.user.login)

  //注册
  router.post('/registry', controller.user.registry)

  //获取列表
  router.get('/list', controller.user.list)
}
