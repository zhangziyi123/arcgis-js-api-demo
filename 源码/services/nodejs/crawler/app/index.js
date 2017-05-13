/**
 * @author: zhangziyi@glondon.com
 * @description:
 * @Date: 2017/5/13 12:43
 */
//部分网站存在中文乱码的问题
var http=require('http');
var cheerio=require('cheerio');//类似与jquery
var url='http://www.imooc.com/learn/348';

function filterContent(html){
   var $=cheerio.load(html);
   var chapter=$('.learnchapter');
}
http.get(url, function(res){
    var html='';
    res.on('data',function (data) {
        html +=data
    })
    res.on('end',function () {
        filterContent(html);
        console.log(html)
    })
}).on('error',function () {
    console.log("获取数据出错");
})