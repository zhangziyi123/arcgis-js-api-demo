'use strict'

const path = require('path');
const express = require('express'); //插入第三方包express（对http各个功能进行了封装）
const session = require('express-session'); //session第三方包用于为每个访问的浏览器上开辟单独特殊的内存空间
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded bodyParser中间件
app.use(bodyParser.urlencoded({ extended: false }));

//使用session中间件
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));

//express.static是express内置的中间件，设置静态资源的根目录
app.use(express.static(path.join(__dirname,'src/statics')));


//权限验证
app.all('/*',(req,res,next)=>{
    if (req.url == '/account/login' || req.url == '/account/logout' || req.url.includes('/account/vcode') || req.url.includes('register')) {
        next();
    }else{//真正的权限验证
        if (req.session.username==null) {
            res.setHeader('Content-type','text/html;charset=utf8');
            res.end("<script>alert('您还没有登录,请先登录!');window.location.href='/account/login'</script>")
        }else{
            next();
        }
    }
})


//设置一级路由（即/account）路由的处理函数
const accountRouter = require(path.join(__dirname,'src/routers/accountRouter.js'));
app.use('/account',accountRouter);
//设置学生管理系统的一级路由
const studentManagerRouter = require(path.join(__dirname,'src/routers/studentManagerRouter.js'));
app.use('/studentmanager',studentManagerRouter);

//开启服务器监听
app.listen(3000,'127.0.0.1',(err)=>{
    if(err){
        console.log(err);
    }
    console.log('start server success');
})