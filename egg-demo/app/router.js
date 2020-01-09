'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  //注册
  router.post('/registry', controller.user.registry);

  //登录
  router.post('/login', controller.user.login);



  //添加成绩
  router.post("/exam/add",controller.exam.add)

  //删除成绩
  router.get("/exam/del",controller.exam.del)
};
