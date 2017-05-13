'use strict'

/*
* 处理账号相关的业务逻辑
* */

const fs = require('fs');
const path = require('path');

const databaseManager = require(path.join(__dirname,'../tools/databasemanager.js'));

const captchapng = require('captchapng');
//获取登录界面
module.exports.getLoginPage = (req,res)=>{
    fs.readFile(path.join(__dirname,'../views/login.html'),(err,data)=>{
        if(err){
            console.log(err);
        }
        res.setHeader('Content-type','text/html;charset=utf8');
        res.end(data);
    })
};

//获取验证码并返回图片

module.exports.getVcodeImage = (req,res) =>{
    let vcode = parseInt(Math.random()*9000+1000);
    var p = new captchapng(80,30,vcode); // width,height,numeric captcha
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    req.session.vcode = vcode;

    var img = p.getBase64();
    var imgbase64 = new Buffer(img,'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
};

//登录表单的post请求逻辑处理
module.exports.login = (req,res)=>{
    // console.log(req.body.uname);
    /*if(req.session.vcode != req.body.vcode){
        console.log('验证码错误')
        res.setHeader("Content-Type","text/html;charset=utf-8");
        res.end("<script>alert('验证码错误');window.location.href = '/account/login'</script>");
        return;
    }
    // console.log(req.body);
    databaseManager.findOne('account',{username:req.body.uname,password:req.body.pwd},(err,doc)=>{
        if(err){
            console.log(err);
        }
        if(doc == null){
            res.setHeader("Content-Type","text/html;charset=utf-8");
            res.end("<script>alert('用户名或者密码错误');window.location.href = '/account/login'</script>");
        }else {
            //保存已经登录成功的用户名，在之后一段时间内可以免登陆
            req.session.username=req.body.uname;

            res.end("<script>window.location.href = '/studentmanager/list'</script>");
        }
    });*/
    const result = {status:1,message:"登录成功"}

    //验证码验证
    if (req.session.vcode!=req.body.vcode) {
        result.status = 2;
        result.message = "验证码错误"
        res.json(result);
        return
    }

    //查询数据库,判断用户是否存在
    databaseManager.findOne('account',{username:req.body.username,password:req.body.password},(err,doc)=>{
        if (doc==null) {
            result.status = 3;
            result.message = "用户名或是密码有误";
            res.json(result)
        }else{
            //记住我们的登录信息
            req.session.username = req.body.username;

            res.json(result);
        }
    })

}
//获取注册页面
exports.getRegisterPage = (req,res)=>{
    fs.readFile(path.join(__dirname,"../views/register.html"),(err,data)=>{
        res.setHeader("Content-Type","text/html;charset=utf-8");
        res.end(data);
    })
}

//退出
exports.logout = (req,res)=>{
    //将曾经的用户状态清空
    req.session.username = null;
    //跳转到登录页面
    res.end("<script>window.location.href='/account/login'</script>");
}

//注册
exports.register = (req,res)=>{
    const result = {status:1,message:"注册成功"}

    //1.先去我们的数据库中查询该用户名是否存在，如果存在给用户提示
    databaseManager.findOne('account',{username:req.body.username},(err,doc)=>{
        if (doc!=null) {
            result.status = 3;
            result.message = "用户名存在了"

            res.json(result)
        }else{
            //真正的新增用户
            const params = {
                username:req.body.username,
                password:req.body.password
            }

            databaseManager.insertOne('account',params,(err,doc)=>{
                if (doc==null) {
                    result.status = 0;
                    result.message = "注册失败";
                }

                res.json(result);
            })
        }
    })


}