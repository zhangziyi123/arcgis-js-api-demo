'use strict'

const express = require('express');
const path = require('path');

//创建理由对象
const accountRouter = express.Router();
const accountCtrl = require(path.join(__dirname,'../controllers/accountController.js'));

//处理登录界面请求，使用getLoginPage控制器
accountRouter.get('/login',accountCtrl.getLoginPage);
//获取验证码
accountRouter.get('/vcode',accountCtrl.getVcodeImage);
//处理登录表单的post请求
accountRouter.post('/login',accountCtrl.login);

//获取注册页面
accountRouter.get('/register',accountCtrl.getRegisterPage);
//注册逻辑处理
accountRouter.post('/register',accountCtrl.register);

//退出逻辑
accountRouter.get('/logout',accountCtrl.logout)

module.exports = accountRouter;

