'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  //登录注册
  //注册
  router.post('/registry', controller.user.registry);

  //登录
  router.post('/login', controller.user.login);


  //增删改查
  //添加成绩
  router.post("/exam/add", controller.exam.add)

  //删除成绩
  router.get("/exam/del", controller.exam.del)

  //修改成绩
  router.post("/exam/update", controller.exam.update)

  //查看成绩
  router.get("/exam/list", controller.exam.list)



  //用户权限及列表渲染
  //有没有添加的学生
  router.get("/user/student", controller.user.student)

  //获取身份
  router.get("/user/role", controller.user.role)

  //权限列表菜单
  router.get("/user/menu", controller.user.menu)
};
