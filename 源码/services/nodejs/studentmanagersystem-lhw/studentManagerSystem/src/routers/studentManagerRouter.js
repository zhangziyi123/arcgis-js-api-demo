'use strict'

const path = require('path');
const express = require('express');

const studentManagerRouter = express.Router();
//导入学生控制系统的路由
const studentManagerCtrl = require(path.join(__dirname,'../controllers/studentManagerController.js'));
//设置学生列表页面的二级路由
studentManagerRouter.get('/list',studentManagerCtrl.getStudentListPage);
//获取新增页面
studentManagerRouter.get('/add',studentManagerCtrl.getAddPage);
//新增业务处理
studentManagerRouter.post('/add',studentManagerCtrl.addStudent);
//获取修改的页面
studentManagerRouter.get('/edit/:studentId',studentManagerCtrl.getEditPage);
//修改学生的逻辑
studentManagerRouter.post('/edit/:studentId',studentManagerCtrl.editStudent);
//删除学生逻辑
studentManagerRouter.get('/delete/:studentId',studentManagerCtrl.deleteStudent);

module.exports = studentManagerRouter;
