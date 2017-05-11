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
define("esri/dijit/analysis/HelpWindow",["dijit","dojo","dojox","dojo/require!dijit/_Widget,dijit/_Templated,dijit/TooltipDialog,dijit/popup"],function(_1,_2,_3){_2.provide("esri.dijit.analysis.HelpWindow");_2.require("dijit._Widget");_2.require("dijit._Templated");_2.require("dijit.TooltipDialog");_2.require("dijit.popup");_2.declare("esri.dijit.analysis.HelpWindow",[_1._Widget],{i18n:null,postMixInProperties:function(){this.inherited(arguments);this.i18n={};_2.mixin(this.i18n,_2.i18n.getLocalization("esri","jsapi").common);_2.mixin(this.i18n,_2.i18n.getLocalization("esri","jsapi").analysisHelp);},postCreate:function(){this.inherited(arguments);},_computeSize:function(_4){var _5={w:400,h:200};if(_4.indexOf("Category")!==-1){_5.w=400;_5.h=320;}else{if(_4.indexOf("Tool")!==-1){_5.w=400;_5.h=320;}else{if(_4.indexOf("toolDescription")!==-1){_5.w=400;_5.h=520;}}}return _5;},_setHelpTopicAttr:function(_6){if(this.tooltipHelpDlg){_1.popup.close(this.tooltipHelpDlg);_2.destroy(this.tooltipHelpDlg);_2.destroy(this.tooltipHelpDlg.domNode);}var _7=_2.baseUrl.substring(0,_2.baseUrl.indexOf("/js/"));var _8=this._computeSize(_6);var _9="<div class='' style='position=relative'"+"<div class='sizer content'>"+"<div class='contentPane'>"+"<div class='esriFloatTrailing' style='padding:0;'>"+"<a href='#' onclick='esri.dijit._helpDialog.close()' 'title='"+this.i18n.close+"'>"+"<img src='images/close.gif' border='0'/></a>"+"</div>"+"<iframe frameborder='0'  id='"+_6+"' src='"+_7+"/js/esri/dijit/analysis/help/"+this.helpFileName+".html#"+_6+"' width='"+_8.w+"' height='"+_8.h+"' marginheight='0' marginwidth='0'></iframe>"+"</div>"+"</div>"+"<div class='sizer'>"+"<div class='actionsPane'>"+"<div class='actionList hidden'>"+"<a class='action zoomTo' href='"+_7+"/js/esri/dijit/analysis/help/"+this.helpFileName+".html' target='_help'>"+"Learn More"+"</a>"+"</div>"+"</div>"+"</div>"+"</div>"+"</div>";this.tooltipHelpDlg=new _1.TooltipDialog({"preload":true,"content":_9,"class":"esriHelpPopup esriHelpPopupWrapper"});},show:function(_a,_b,_c){this.helpFileName=_c;this.set("helpTopic",_b);_1.popup.open({popup:this.tooltipHelpDlg,x:_a.pageX+40,y:_a.screenY-_a.pageY+10,onCancel:function(){log(self.id+": cancel of child");},onExecute:function(){log(self.id+": execute of child");_1.popup.close(this.tooltipHelpDlg);self.open=false;}});},close:function(_d,_e){_1.popup.close(this.tooltipHelpDlg);}});});