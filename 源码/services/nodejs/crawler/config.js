/**
 * @author: zhangziyi@glondon.com
 * @description:
 * @Date: 2017/5/13 12:42
 */
var rootPath;
if (window.location.href.indexOf("?") != -1) {
    rootPath = window.location.href.substr(0, window.location.href.indexOf("?"));
    rootPath = rootPath.substr(0, rootPath.lastIndexOf("/") + 1);
} else {
    rootPath = window.location.href.substr(0, window.location.href.lastIndexOf("/") + 1);
}

if (window.location.href.lastIndexOf("?token=") != -1) {
    window.location.href = rootPath;
}
var config=function () {
   var config={
        //服务地址
        url:{
            webUrl:"http://www.runoob.com/nodejs/nodejs-express-framework.html"

        }
   }
return config;
}

export{config};
