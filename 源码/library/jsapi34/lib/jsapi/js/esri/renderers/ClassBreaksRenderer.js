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
define("esri/renderers/ClassBreaksRenderer",["dojo/_base/declare","dojo/_base/array","dojo/_base/lang","dojo/has","esri/kernel","esri/lang","esri/symbols/jsonUtils","esri/renderers/Renderer"],function(_1,_2,_3,_4,_5,_6,_7,_8){var _9=_1(_8,{declaredClass:"esri.renderer.ClassBreaksRenderer",constructor:function(_a,_b){this.breaks=[];this._symbols={};this.infos=[];if(_a&&!_a.declaredClass){var _c=_a;this.attributeField=_c.field;_a=_c.defaultSymbol;if(_a){this.defaultSymbol=_7.fromJson(_a);}this.defaultLabel=_c.defaultLabel;var _d=_c.minValue,_e=_c.classBreakInfos;if(_e&&_e[0]&&_6.isDefined(_e[0].classMaxValue)){_2.forEach(_e,function(_f){var _10=_f.classMaxValue;_f.minValue=_d;_f.maxValue=_10;_d=_10;},this);}_2.forEach(_e,this._addBreakInfo,this);}else{this.defaultSymbol=_a;this.attributeField=_b;}},addBreak:function(min,max,_11){var _12=_3.isObject(min)?min:{minValue:min,maxValue:max,symbol:_11};this._addBreakInfo(_12);},removeBreak:function(min,max){var _13,_14=this.breaks,i,il=_14.length,_15=this._symbols;for(i=0;i<il;i++){_13=_14[i];if(_13[0]==min&&_13[1]==max){_14.splice(i,1);delete _15[min+"-"+max];this.infos.splice(i,1);break;}}},clearBreaks:function(){this.breaks=[];this._symbols={};this.infos=[];},getSymbol:function(_16){var _17=this.attributeField,val=_3.isFunction(_17)?_17(_16):parseFloat(_16.attributes[_17]),rs=this.breaks,i,il=rs.length,_18=this._symbols,_19,_1a=this.isMaxInclusive;for(i=0;i<il;i++){_19=rs[i];if(_19[0]<=val&&(_1a?(val<=_19[1]):(val<_19[1]))){return _18[_19[0]+"-"+_19[1]];}}return this.defaultSymbol;},setMaxInclusive:function(_1b){this.isMaxInclusive=_1b;},_addBreakInfo:function(_1c){var min=_1c.minValue,max=_1c.maxValue;this.breaks.push([min,max]);this.infos.push(_1c);var _1d=_1c.symbol;if(_1d){if(!_1d.declaredClass){_1c.symbol=_7.fromJson(_1d);}}this._symbols[min+"-"+max]=_1c.symbol;},toJson:function(){var _1e=this.infos||[],_1f=_6.fixJson;var _20=_1e[0]&&_1e[0].minValue;return _1f({type:"classBreaks",field:this.attributeField,defaultSymbol:this.defaultSymbol&&this.defaultSymbol.toJson(),defaultLabel:this.defaultLabel,minValue:(_20===-Infinity)?-Number.MAX_VALUE:_20,classBreakInfos:_2.map(_1e,function(_21){_21=_3.mixin({},_21);_21.symbol=_21.symbol&&_21.symbol.toJson();_21.classMaxValue=(_21.maxValue===Infinity)?Number.MAX_VALUE:_21.maxValue;delete _21.minValue;delete _21.maxValue;return _1f(_21);})});}});if(_4("extend-esri")){_3.setObject("renderer.ClassBreaksRenderer",_9,_5);}return _9;});