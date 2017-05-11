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
define("esri/layers/RasterFunction",["dojo/_base/declare","dojo/_base/lang","dojo/has","esri/kernel","esri/lang"],function(_1,_2,_3,_4,_5){var _6=_1(null,{declaredClass:"esri.layers.RasterFunction",functionName:null,"arguments":null,variableName:null,toJson:function(){var _7={rasterFunction:this.functionName,rasterFunctionArguments:this["arguments"],variableName:this.variableName};return _5.filter(_7,function(_8){if(_8!==null){return true;}});}});if(_3("extend-esri")){_2.setObject("layers.RasterFunction",_6,_4);}return _6;});