/*
 COPYRIGHT 2009 ESRI

 TRADE SECRETS: ESRI PROPRIETARY AND CONFIDENTIAL
 Unpublished material - all rights reserved under the
 Copyright Laws of the United States and applicable international
 laws, treaties, and conventions.

 For additional information, contact:
 Environmental Systems Research Institute, Inc.
 Attn: Contracts and Legal Services Department
 380 New York Street
 Redlands, California, 92373
 USA

 email: contracts@esri.com
 */
//>>built
define("esri/tasks/Task",["dojo/_base/declare","dojo/_base/lang","dojo/_base/json","dojo/has","esri/kernel","esri/deferredUtils","esri/urlUtils"],function(_1,_2,_3,_4,_5,_6,_7){var _8=_1(null,{declaredClass:"esri.tasks._Task",constructor:function(_9){if(_9&&_2.isString(_9)){this._url=_7.urlToObject(this.url=_9);}this.normalization=true;this._errorHandler=_2.hitch(this,this._errorHandler);},_useSSL:function(){var _a=this._url,re=/^http:/i,_b="https:";if(this.url){this.url=this.url.replace(re,_b);}if(_a&&_a.path){_a.path=_a.path.replace(re,_b);}},_encode:function(_c,_d,_e){var _f,_10,_11={},i,p,pl;for(i in _c){if(i==="declaredClass"){continue;}_f=_c[i];_10=typeof _f;if(_f!==null&&_f!==undefined&&_10!=="function"){if(_2.isArray(_f)){_11[i]=[];pl=_f.length;for(p=0;p<pl;p++){_11[i][p]=this._encode(_f[p]);}}else{if(_10==="object"){if(_f.toJson){var _12=_f.toJson(_e&&_e[i]);if(_f.declaredClass==="esri.tasks.FeatureSet"){if(_12.spatialReference){_12.sr=_12.spatialReference;delete _12.spatialReference;}}_11[i]=_d?_12:_3.toJson(_12);}}else{_11[i]=_f;}}}}return _11;},_successHandler:function(_13,_14,_15,dfd){if(_14){this[_14].apply(this,_13);}if(_15){_15.apply(null,_13);}if(dfd){_6._resDfd(dfd,_13);}},_errorHandler:function(err,_16,dfd){this.onError(err);if(_16){_16(err);}if(dfd){dfd.errback(err);}},setNormalization:function(_17){this.normalization=_17;},onError:function(){}});if(_4("extend-esri")){_5.Task=_8;}return _8;});