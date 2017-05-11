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
define("esri/dijit/analysis/AnalysisToolItem",["dijit","dojo","dojox","dojo/require!dijit/form/CheckBox,dijit/_Widget,dijit/_Templated,dijit/Menu,dijit/layout/AccordionContainer,dijit/TooltipDialog"],function(_1,_2,_3){_2.provide("esri.dijit.analysis.AnalysisToolItem");_2.require("dijit.form.CheckBox");_2.require("dijit._Widget");_2.require("dijit._Templated");_2.require("dijit.Menu");_2.require("dijit.layout.AccordionContainer");_2.require("dijit.TooltipDialog");_2.declare("esri.dijit.analysis.AnalysisToolItem",[_1._Widget,_1._Templated],{widgetsInTemplate:true,templateString:"<div class='toolContainer' data-dojo-attach-point=\"_toolCtr\" style=\"cursor:pointer;cursor:hand;\" data-dojo-attach-event=\"onclick:_handleToolIconClick\">\r\n  <div data-dojo-attach-point='_toolIcon'></div>\r\n  <div class='esriLeadingMargin5' style='margin-top:-42px;'>\r\n    <a  href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"toolDescription\" data-dojo-attach-point=\"_helpIconNode\"></a>\r\n  \t<label data-dojo-attach-point='_toolNameLabel' style=\"cursor:pointer;cursor:hand;\"></label>\r\n  </div>\r\n  <div class='esriLeadingMargin2' data-dojo-attach-point=\"optionsDiv\" style=\"margin-top:0.5em;font-size:0.85em;\"><label class=\"esriLeadingMargin5 comingSoonIcon\">${i18n.comingSoonLabel}</label></div>\t\r\n</div>\r\n",i18n:null,_helpIconNode:null,_toolIcon:null,_toolIconClass:null,_toolNameLabel:null,toolName:null,helpTopic:null,helpFileName:"Analysis",constructor:function(_4,_5){this.inherited(arguments);if(_4.toolIcon){this._toolIconClass=_4.toolIcon;}if(_4.name){this.toolName=_4.name;this.helpTopic=_4.helpTopic;}},postCreate:function(){this.inherited(arguments);this._toolNameLabel.innerHTML=this.toolName;_2.addClass(this._toolIcon,this._toolIconClass);_2.attr(this._helpIconNode,"esriHelpTopic",this.helpTopic);this.set("showComingSoonLabel",true);},postMixInProperties:function(){this.inherited(arguments);this.i18n={};_2.mixin(this.i18n,_2.i18n.getLocalization("esri","jsapi").common);_2.mixin(this.i18n,_2.i18n.getLocalization("esri","jsapi").analysisTools);},_handleToolNameClick:function(){this.onToolSelect(this);},_handleToolIconClick:function(e){_2.stopEvent(e);this.onToolSelect(this);},_setShowComingSoonLabelAttr:function(_6){_2.style(this.optionsDiv,"display",(_6===true)?"block":"none");_2.toggleClass(this._toolCtr,"esriToolContainerDisabled",_6);_2.toggleClass(this._toolNameLabel,"esriTransparentNode",_6);_2.toggleClass(this._toolIcon,"esriTransparentNode",_6);_2.style(this._toolNameLabel,"cursor",(_6===true)?"default":"pointer");_2.style(this._toolCtr,"cursor",(_6===true)?"default":"pointer");},onToolSelect:function(_7){}});});