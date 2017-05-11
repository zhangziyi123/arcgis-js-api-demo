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
define("esri/dijit/analysis/GroupToggleButton",["dijit","dojo","dojox","dojo/require!dijit/form/ToggleButton"],function(_1,_2,_3){_2.provide("esri.dijit.analysis.GroupToggleButton");_2.require("dijit.form.ToggleButton");_2.declare("esri.dijit.analysis.GroupToggleButton",_1.form.ToggleButton,{groupName:"defaultGroup",postMixInProperties:function(){this.inherited(arguments);this.unselectChannel="/ButtonGroup/"+this.groupName;_2.subscribe(this.unselectChannel,this,"doUnselect");},postCreate:function(){this.inherited(arguments);_2.addClass(this.domNode,"esriGroupButton");},doUnselect:function(_4){if(_4!==this&&this.checked){this.set("checked",false);}},_setCheckedAttr:function(_5,_6){this.inherited(arguments);if(_5){_2.publish(this.unselectChannel,[this]);}_2.toggleClass(this.focusNode,"esriGroupChecked",_5);console.log("checked",this.id,_5);}});});