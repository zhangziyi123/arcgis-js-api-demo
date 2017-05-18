/**
 * @author: zhangziyi@glondon.com
 * @description:
 * @Date: 2017/5/18 9:48
 */
define(["dojo/_base/declare","dojo/_base/lang","esri/request",  "esri/layers/TiledMapServiceLayer",],function (declare,lang,request,TiledMapServiceLayer) {
    return declare(TiledMapServiceLayer,{

        tileUrl:null,
        spatialReference:null,
        version:null,
        _url:null,
        serviceMode:null,
        constructor:function(url,args){
            debugger;
            var me=this;
            lang.mixin(me,args);//dojo.mixin用于扩展一个实例对象
            me.version = "1.0.0";
            me._url = url;
            me.serviceMode = "KVP";

            this._getCapabilities();
        },
        // -----私有方法（下划线 + 小驼峰）-----
        // 获取能力文档
        _getCapabilities: function () {
            var me = this;
            debugger;
            var capabilitiesUrl = me._url + (me._url.indexOf("?") > -1 ? "" : "?") + "&request=GetCapabilities&service=WMTS&version=" + this.version;
            request({
                url: capabilitiesUrl,
                handleAs: "text"
            }).then(lang.hitch(me, me._parseCapabilities), lang.hitch(me, me._getCapabilitiesError));
        },
// 解析能力文档
        _parseCapabilities: function (xmlText) {
            debugger;
        },
        _getCapabilitiesError:function (error) {
            debugger;
        }



    })
})