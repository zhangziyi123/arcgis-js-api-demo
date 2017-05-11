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
define("esri/layers/MosaicRule",["dojo/_base/declare","dojo/_base/lang","dojo/_base/json","dojo/has","esri/kernel","esri/lang"],function(_1,_2,_3,_4,_5,_6){var _7=_1(null,{declaredClass:"esri.layers.MosaicRule",method:null,where:null,sortField:null,sortValue:null,ascending:false,lockRasterIds:null,viewpoint:null,objectIds:null,operation:null,toJson:function(){var _8={mosaicMethod:this.method,where:this.where,sortField:this.sortField,sortValue:this.sortValue?_3.toJson(this.sortValue):null,ascending:this.ascending,lockRasterIds:this.lockRasterIds,viewpoint:this.viewpoint?this.viewpoint.toJson():null,fids:this.objectIds,mosaicOperation:this.operation};return _6.filter(_8,function(_9){if(_9!==null){return true;}});}});_2.mixin(_7,{METHOD_NONE:"esriMosaicNone",METHOD_CENTER:"esriMosaicCenter",METHOD_NADIR:"esriMosaicNadir",METHOD_VIEWPOINT:"esriMosaicViewpoint",METHOD_ATTRIBUTE:"esriMosaicAttribute",METHOD_LOCKRASTER:"esriMosaicLockRaster",METHOD_NORTHWEST:"esriMosaicNorthwest",METHOD_SEAMLINE:"esriMosaicSeamline",OPERATION_FIRST:"MT_FIRST",OPERATION_LAST:"MT_LAST",OPERATION_MIN:"MT_MIN",OPERATION_MAX:"MT_MAX",OPERATION_MEAN:"MT_MEAN",OPERATION_BLEND:"MT_BLEND"});if(_4("extend-esri")){_2.setObject("layers.MosaicRule",_7,_5);}return _7;});