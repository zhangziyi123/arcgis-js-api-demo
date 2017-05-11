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
define("esri/layers/QueryDataSource",["dojo/_base/declare","dojo/_base/lang","dojo/has","esri/kernel","esri/lang","esri/layers/DataSource"],function(_1,_2,_3,_4,_5,_6){var _7=_1(_6,{declaredClass:"esri.layers.QueryDataSource",toJson:function(){var _8={type:"queryTable",workspaceId:this.workspaceId,query:this.query,oidFields:this.oidFields&&this.oidFields.join(),spatialReference:this.spatialReference&&this.spatialReference.toJson()};if(this.geometryType){var _9;if(this.geometryType.toLowerCase()==="point"){_9="esriGeometryPoint";}else{if(this.geometryType.toLowerCase()==="multipoint"){_9="esriGeometryMultipoint";}else{if(this.geometryType.toLowerCase()==="polyline"){_9="esriGeometryPolyline";}else{if(this.geometryType.toLowerCase()==="polygon"){_9="esriGeometryPolygon";}else{_9=this.geometryType;}}}}_8.geometryType=_9;}return _5.fixJson(_8);}});if(_3("extend-esri")){_2.setObject("layers.QueryDataSource",_7,_4);}return _7;});