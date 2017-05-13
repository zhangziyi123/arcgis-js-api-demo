#studentManagerSystem-lhw

## 项目结构介绍

###  学生信息管理系统 项目结构搭建
```
学生信息管理系统项目根目录
│ package.json        // npm 包管理配置文件和项目启动配置文件
├─node_modules         //存放项目中要用到的nodejs第三方包        
├─app.js           // 项目启动web服务器的文件
└─src                  //项目开发阶段源码存放区文  
    ├─controllers       //用于存放控制器文件  
    ├─models             //用于存放模型文件 
    ├─routes            //项目的路由文件
    ├─statics           //项目静态资源文件存放区
    │  ├─lib   			//存放html页面需要用到的第三方组件
    │  │  └─bootstarp   //后台管理系统UI组件 
    │  │  └─jquery      //jquery组件         
    │  ├─css            //整个项目的样式文件
    │  ├─images         //整个项目的图片资源
    │  ├─js              //整个项目的js资源
    └─views             //项目的所有视图文件存放区  
```
