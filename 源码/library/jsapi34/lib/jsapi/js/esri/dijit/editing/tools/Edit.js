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
define("esri/dijit/editing/tools/Edit",["dojo/_base/declare","dojo/_base/lang","dojo/has","esri/dijit/editing/tools/MenuItemBase","esri/kernel"],function(_1,_2,_3,_4,_5){var _6=_1([_4],{declaredClass:"esri.dijit.editing.tools.Edit",enable:function(_7){this._enabled=_7===this._geomType;this.inherited(arguments);}});if(_3("extend-esri")){_2.setObject("dijit.editing.tools.Edit",_6,_5);}return _6;});