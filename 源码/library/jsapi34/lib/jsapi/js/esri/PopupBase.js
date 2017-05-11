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
define("esri/PopupBase",["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/Color","dojo/_base/Deferred","dojo/has","esri/kernel","esri/graphic","esri/geometry/Point","esri/geometry/jsonUtils","esri/geometry/mathUtils","esri/geometry/webMercatorUtils","esri/symbols/SimpleMarkerSymbol","esri/symbols/SimpleLineSymbol","esri/symbols/CartographicLineSymbol","esri/symbols/SimpleFillSymbol","dojo/has!extend-esri?esri/PopupInfo"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10){var _11=_1(null,{declaredClass:"esri.PopupBase",onSetFeatures:function(){},onClearFeatures:function(){},onSelectionChange:function(){},onDfdComplete:function(){},initialize:function(){this.count=0;this.selectedIndex=-1;},cleanup:function(){this.features=this.deferreds=null;},setFeatures:function(arg){if(!arg||!arg.length){return;}this.clearFeatures();var _12,_13;if(arg[0] instanceof _5){_13=arg;}else{_12=arg;}if(_12){this._updateFeatures(null,_12);}else{this.deferreds=_13;_13=_13.slice(0);_3.forEach(_13,function(dfd){dfd.addBoth(_2.hitch(this,this._updateFeatures,dfd));},this);}},clearFeatures:function(){this.features=this.deferreds=this._marked=null;this.count=0;var _14=this.selectedIndex;this.selectedIndex=-1;if(_14>-1){this.onSelectionChange();}this.onClearFeatures();},getSelectedFeature:function(){var _15=this.features;if(_15){return _15[this.selectedIndex];}},select:function(_16){if(_16<0||_16>=this.count){return;}this.selectedIndex=_16;this.onSelectionChange();},enableHighlight:function(map){this._highlighted=map.graphics.add(new _8(new _9(0,0,map.spatialReference)));this._highlighted.hide();if(!this.markerSymbol){var _17=(this.markerSymbol=new _d());_17.setStyle(_d.STYLE_TARGET);_17._setDim(16,16,7);_17.setOutline(new _f(_e.STYLE_SOLID,new _4([0,255,255]),2,_f.CAP_ROUND,_f.JOIN_ROUND));_17.setColor(new _4([0,0,0,0]));}if(!this.lineSymbol){this.lineSymbol=new _e(_e.STYLE_SOLID,new _4([0,255,255]),2);}if(!this.fillSymbol){this.fillSymbol=new _10(_10.STYLE_NULL,new _e(_e.STYLE_SOLID,new _4([0,255,255]),2),new _4([0,0,0,0]));}},disableHighlight:function(map){var _18=this._highlighted;if(_18){_18.hide();map.graphics.remove(_18);delete this._highlighted;}this.markerSymbol=this.lineSymbol=this.fillSymbol=null;},showHighlight:function(){var _19=this.features&&this.features[this.selectedIndex];if(this._highlighted&&_19&&_19.geometry){this._highlighted.show();}},hideHighlight:function(){if(this._highlighted){this._highlighted.hide();}},updateHighlight:function(map,_1a){var _1b=_1a.geometry,_1c=this._highlighted;if(!_1b||!_1c){if(_1c){_1c.hide();}return;}_1c.hide();if(!_1c.getLayer()&&map){map.graphics.add(_1c);}_1c.setGeometry(_a.fromJson(_1b.toJson()));var _1d;switch(_1b.type){case "point":case "multipoint":_1d=this.markerSymbol;_1d.setOffset(0,0);_1d.setAngle(0);var lyr=_1a.getLayer();if(lyr){var _1e=lyr._getSymbol(_1a),_1f,_20,_21=0,_22=0,_23=0;if(_1e){switch(_1e.type){case "simplemarkersymbol":_1f=_20=(_1e.size||0);break;case "picturemarkersymbol":_1f=(_1e.width||0);_20=(_1e.height||0);break;}_21=_1e.xoffset||0;_22=_1e.yoffset||0;_23=_1e.angle||0;}if(_1f&&_20){_1d._setDim(_1f+1,_20+1,7);}_1d.setOffset(_21,_22);_1d.setAngle(_23);}break;case "polyline":_1d=this.lineSymbol;break;case "polygon":_1d=this.fillSymbol;break;}_1c.setSymbol(_1d);},showClosestFirst:function(_24){var _25=this.features;if(_25&&_25.length){if(_25.length>1){var i,_26=Infinity,_27=-1,_28,_29=_b.getLength,_2a,_2b=_24.spatialReference,_2c,_2d;_24=_24.normalize();for(i=_25.length-1;i>=0;i--){_28=_25[i].geometry;if(!_28){continue;}_2c=_28.spatialReference;_2a=0;try{_2d=(_28.type==="point")?_28:_28.getExtent().getCenter();_2d=_2d.normalize();if(_2b&&_2c&&!_2b.equals(_2c)&&_2b._canProject(_2c)){_2d=_2b.isWebMercator()?_c.geographicToWebMercator(_2d):_c.webMercatorToGeographic(_2d);}_2a=_29(_24,_2d);}catch(e){}if(_2a>0&&_2a<_26){_26=_2a;_27=i;}}if(_27>0){_25.splice(0,0,_25.splice(_27,1)[0]);this.select(0);}}}else{if(this.deferreds){this._marked=_24;}}},_unbind:function(dfd){var _2e=_3.indexOf(this.deferreds,dfd);if(_2e===-1){return;}this.deferreds.splice(_2e,1);if(!this.deferreds.length){this.deferreds=null;return 2;}return 1;},_fireComplete:function(_2f){var _30=this._marked;if(_30){this._marked=null;this.showClosestFirst(_30);}this.onDfdComplete(_2f);},_updateFeatures:function(dfd,_31){if(dfd){if(this.deferreds){var res=this._unbind(dfd);if(!res){return;}if(_31&&_31 instanceof Error){this._fireComplete(_31);if(res===2){this.onSetFeatures();}return;}if(_31&&_31.length){if(!this.features){this.features=_31;this.count=_31.length;this.selectedIndex=0;this._fireComplete();if(res===2){this.onSetFeatures();}this.select(0);}else{var _32=_3.filter(_31,function(_33){return _3.indexOf(this.features,_33)===-1;},this);this.features=this.features.concat(_32);this.count=this.features.length;this._fireComplete();if(res===2){this.onSetFeatures();}}}else{this._fireComplete();if(res===2){this.onSetFeatures();}}}}else{this.features=_31;this.count=_31.length;this.selectedIndex=0;this.onSetFeatures();this.select(0);}}});if(_6("extend-esri")){_7.PopupBase=_11;}return _11;});