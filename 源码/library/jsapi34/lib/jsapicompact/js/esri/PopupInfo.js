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
define("esri/PopupInfo",["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/json","dojo/i18n","dojo/has","esri/kernel","esri/lang","dojo/i18n!dojo/cldr/nls/number"],function(_1,_2,_3,_4,_5,_6,_7,_8){var _9=_1(null,{declaredClass:"esri.PopupInfo",initialize:function(_a,_b){if(!_a){return;}_2.mixin(this,_b);this.info=_a;this.title=this.getTitle;this.content=this.getContent;var _c=(this._fieldLabels={}),_d=(this._fieldsMap={});if(_a.fieldInfos){_3.forEach(_a.fieldInfos,function(_e){_c[_e.fieldName]=_e.label;_d[_e.fieldName]=_e;});}},toJson:function(){return _4.fromJson(_4.toJson(this.info));},getTitle:function(){},getContent:function(){},getComponents:function(_f){var _10=this.info,_11=_f.getLayer(),_12=_2.clone(_f.attributes)||{},_13=_2.clone(_12),_14=_10.fieldInfos,_15="",_16="",_17,_18,_19,_1a=_11&&_11._getDateOpts&&_11._getDateOpts().properties,_1b={dateFormat:{properties:_1a,formatter:"DateFormat"+this._insertOffset(this._dateFormats["shortDateShortTime"])}};if(_14){_3.forEach(_14,function(_1c){var _1d=_1c.fieldName,val=_13[_1d];_13[_1d]=this._formatValue(val,_1d,_1b);if(_1a&&_1c.format&&_1c.format.dateFormat){var pos=_3.indexOf(_1a,_1d);if(pos>-1){_1a.splice(pos,1);}}},this);}if(_11){var _1e=_11.types,_1f=_11.typeIdField,_20=_1f&&_12[_1f];for(_18 in _12){_19=_12[_18];if(_8.isDefined(_19)){var _21=this._getDomainName(_11,_1e,_20,_18,_19);if(_8.isDefined(_21)){_13[_18]=_21;}else{if(_18===_1f){var _22=this._getTypeName(_11,_19);if(_8.isDefined(_22)){_13[_18]=_22;}}}}}}if(_10.title){_15=_2.trim(_8.substitute(_13,this._fixTokens(_10.title),_1b)||"");}if(_10.description){_16=_2.trim(_8.substitute(_13,this._fixTokens(_10.description),_1b)||"");}if(_14){_17=[];_3.forEach(_14,function(_23){_18=_23.fieldName;if(_18&&_23.visible){_17.push([_23.label||_18,_8.substitute(_13,"${"+_18+"}",_1b)||""]);}});}var _24,_25;if(_10.mediaInfos){_24=[];_3.forEach(_10.mediaInfos,function(_26){_25=0;_19=_26.value;switch(_26.type){case "image":var url=_19.sourceURL;url=url&&_2.trim(_8.substitute(_12,this._fixTokens(url)));_25=!!url;break;case "piechart":case "linechart":case "columnchart":case "barchart":_25=_3.some(_19.fields,function(_27){return _8.isDefined(_12[_27]);});break;default:return;}if(_25){_26=_2.clone(_26);_19=_26.value;_26.title=_26.title?_2.trim(_8.substitute(_13,this._fixTokens(_26.title),_1b)||""):"";_26.caption=_26.caption?_2.trim(_8.substitute(_13,this._fixTokens(_26.caption),_1b)||""):"";if(_26.type==="image"){_19.sourceURL=_8.substitute(_12,this._fixTokens(_19.sourceURL));if(_19.linkURL){_19.linkURL=_2.trim(_8.substitute(_12,this._fixTokens(_19.linkURL))||"");}}else{var _28=_12[_19.normalizeField]||0;_19.fields=_3.map(_19.fields,function(_29){var _2a=_12[_29];_2a=(_2a===undefined)?null:_2a;if(_2a&&_28){_2a=_2a/_28;}return {y:_2a,tooltip:(this._fieldLabels[_29]||_29)+":<br/>"+this._formatValue(_2a,_29,_1b,!!_28)};},this);}_24.push(_26);}},this);}return {title:_15,description:_16,fields:(_17&&_17.length)?_17:null,mediaInfos:(_24&&_24.length)?_24:null,formatted:_13,editSummary:(_11&&_11.getEditSummary)?_11.getEditSummary(_f):""};},getAttachments:function(_2b){var _2c=_2b.getLayer(),_2d=_2b.attributes;if(this.info.showAttachments&&_2c&&_2c.hasAttachments&&_2c.objectIdField){var oid=_2d&&_2d[_2c.objectIdField];if(oid){return _2c.queryAttachmentInfos(oid);}}},_dateFormats:{"shortDate":"(datePattern: 'M/d/y', selector: 'date')","longMonthDayYear":"(datePattern: 'MMMM d, y', selector: 'date')","dayShortMonthYear":"(datePattern: 'd MMM y', selector: 'date')","longDate":"(datePattern: 'EEEE, MMMM d, y', selector: 'date')","shortDateShortTime":"(datePattern: 'M/d/y', timePattern: 'h:mm a', selector: 'date and time')","shortDateShortTime24":"(datePattern: 'M/d/y', timePattern: 'H:mm', selector: 'date and time')","shortDateLongTime":"(datePattern: 'M/d/y', timePattern: 'h:mm:ss a', selector: 'date and time')","shortDateLongTime24":"(datePattern: 'M/d/y', timePattern: 'H:mm:ss', selector: 'date and time')","longMonthYear":"(datePattern: 'MMMM y', selector: 'date')","shortMonthYear":"(datePattern: 'MMM y', selector: 'date')","year":"(datePattern: 'y', selector: 'date')"},_fixTokens:function(_2e){return _2e.replace(/(\{[^\{\r\n]+\})/g,"$$$1");},_formatValue:function(val,_2f,_30,_31){var _32=this._fieldsMap[_2f],fmt=_32&&_32.format;if(!_8.isDefined(val)||!_32||!_8.isDefined(fmt)){return val;}var _33="",_34=[],_35=fmt.hasOwnProperty("places")||fmt.hasOwnProperty("digitSeparator"),_36=fmt.hasOwnProperty("digitSeparator")?fmt.digitSeparator:true;if(_35){_33="NumberFormat";_34.push("places: "+((_8.isDefined(fmt.places)&&(!_31||fmt.places>0))?Number(fmt.places):"Infinity"));if(_34.length){_33+=("("+_34.join(",")+")");}}else{if(fmt.dateFormat){_33="DateFormat"+this._insertOffset(this._dateFormats[fmt.dateFormat]||this._dateFormats["shortDateShortTime"]);}else{return val;}}var _37=_8.substitute({"myKey":val},"${myKey:"+_33+"}",_30)||"";if(_35&&!_36){var _38=_5.getLocalization("dojo.cldr","number");if(_38.group){_37=_37.replace(new RegExp("\\"+_38.group,"g"),"");}}return _37;},_insertOffset:function(_39){if(_39){_39=_8.isDefined(this.utcOffset)?_39.replace(/\)\s*$/,", utcOffset:"+this.utcOffset+")"):_39;}return _39;},_getDomainName:function(_3a,_3b,_3c,_3d,_3e){var _3f,_40;if(_3b&&_8.isDefined(_3c)){_3.some(_3b,function(_41){if(_41.id==_3c){_3f=_41.domains&&_41.domains[_3d];if(_3f&&_3f.type==="inherited"){_3f=this._getLayerDomain(_3a,_3d);_40=true;}return true;}return false;},this);}if(!_40&&!_3f){_3f=this._getLayerDomain(_3a,_3d);}if(_3f&&_3f.codedValues){var _42;_3.some(_3f.codedValues,function(_43){if(_43.code==_3e){_42=_43.name;return true;}return false;});return _42;}},_getLayerDomain:function(_44,_45){var _46=_44.fields;if(_46){var _47;_3.some(_46,function(_48){if(_48.name===_45){_47=_48.domain;return true;}return false;});return _47;}},_getTypeName:function(_49,id){var _4a=_49.types;if(_4a){var _4b;_3.some(_4a,function(_4c){if(_4c.id==id){_4b=_4c.name;return true;}return false;});return _4b;}}});if(_6("extend-esri")){_7.PopupInfo=_7.PopupInfoTemplate=_9;}return _9;});