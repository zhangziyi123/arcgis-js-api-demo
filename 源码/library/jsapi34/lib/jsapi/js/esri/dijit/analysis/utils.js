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
define("esri/dijit/analysis/utils",["dijit","dojo","dojox","dojo/i18n!esri/nls/jsapi"],function(_1,_2,_3){_2.provide("esri.dijit.analysis.utils");_2.requireLocalization("esri","jsapi");esri.dijit.analysis.utils={};_2.mixin(esri.dijit.analysis.utils,{initHelpLinks:function(_4){if(!esri.dijit._helpDialog){esri.dijit._helpDialog=new esri.dijit.analysis.HelpWindow();}if(!_4){return;}var _5=_1.byNode(_4);var _6=_5.get("helpFileName");_2.query("[esriHelpTopic]",_4).forEach(function(_7,_8,_9){if(_7){_2.connect(_7,"onclick",_2.hitch(this,function(_a){_2.stopEvent(_a);esri.dijit._helpDialog.show(_a,_2.attr(_7,"esriHelpTopic"),_6);}));}},this);}});});