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
define("esri/map",["require","dojo/_base/kernel","dojo/_base/declare","dojo/_base/connect","dojo/_base/lang","dojo/_base/array","dojo/_base/event","dojo/dom","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dijit/registry","esri/kernel","esri/config","esri/sniff","esri/lang","esri/_coremap","esri/MapNavigationManager"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,has,_10,_11,_12){var _13=30,_14=30,_15={up:"panUp",right:"panRight",down:"panDown",left:"panLeft"},_16={upperRight:"panUpperRight",lowerRight:"panLowerRight",lowerLeft:"panLowerLeft",upperLeft:"panUpperLeft"},dc=_4.connect,ddc=_4.disconnect,dcr=_a.create,ds=_c.set,dh=_5.hitch,_17=_b.getMarginBox,_18=_2.deprecated,_19=_5.mixin,_1a="Map.(enable/disable)ShiftDoubleClickZoom deprecated. Shift-Double-Click zoom behavior will not be supported.",_1b=0;var Map=_3(_11,{declaredClass:"esri.Map",constructor:function(_1c,_1d){_19(this,{_slider:null,_navDiv:null,_mapParams:_19({attributionWidth:0.45,slider:true,nav:false,logo:true,sliderStyle:"small",sliderPosition:"top-left",sliderOrientation:"vertical",autoResize:true},_1d||{})});_19(this,{isDoubleClickZoom:false,isShiftDoubleClickZoom:false,isClickRecenter:false,isScrollWheelZoom:false,isPan:false,isRubberBandZoom:false,isKeyboardNavigation:false,isPanArrows:false,isZoomSlider:false});if(_5.isFunction(_e._css)){_e._css=_e._css(this._mapParams.force3DTransforms);this.force3DTransforms=this._mapParams.force3DTransforms;}var _1e=(has("esri-transforms")&&has("esri-transitions"));this.navigationMode=this._mapParams.navigationMode||(_1e&&"css-transforms")||"classic";if(this.navigationMode==="css-transforms"&&!_1e){this.navigationMode="classic";}this.fadeOnZoom=_10.isDefined(this._mapParams.fadeOnZoom)?this._mapParams.fadeOnZoom:(this.navigationMode==="css-transforms");if(this.navigationMode!=="css-transforms"){this.fadeOnZoom=false;}this.setMapCursor("default");this.smartNavigation=_1d&&_1d.smartNavigation;if(!_10.isDefined(this.smartNavigation)&&has("mac")&&!has("esri-touch")&&!has("esri-pointer")&&!(has("ff")<=3.5)){var _1f=navigator.userAgent.match(/Mac\s+OS\s+X\s+([\d]+)(\.|\_)([\d]+)\D/i);if(_1f&&_10.isDefined(_1f[1])&&_10.isDefined(_1f[3])){var _20=parseInt(_1f[1],10),_21=parseInt(_1f[3],10);this.smartNavigation=((_20>10)||(_20===10&&_21>=6));}}var _22=true;this.showAttribution=_10.isDefined(this._mapParams.showAttribution)?this._mapParams.showAttribution:_22;this._onLoadHandler_connect=dc(this,"onLoad",this,"_onLoadInitNavsHandler");var _23=dcr("div",{"class":"esriControlsBR"+(this._mapParams.nav?" withPanArrows":"")},this.root);if(this.showAttribution){var _24=_5.getObject("esri.dijit.Attribution",false);if(_24){this._initAttribution(_24,_23);}else{var _25=["esri/dijit/Attribution"],rid=_1b++,_26=this;this._rids&&this._rids.push(rid);_1(_25,function(_27){var idx=_26._rids?_6.indexOf(_26._rids,rid):-1;if(idx!==-1){_26._rids.splice(idx,1);_26._initAttribution(_27,_23);}});}}if(this._mapParams.logo){var _28={};if(has("ie")===6){_28.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true', sizingMethod='crop', src='"+_1.toUrl("esri")+"/images/map/logo-med.png"+"')";}var _29=this._ogol=dcr("div",{style:_28},_23);if((this.root.clientWidth*this.root.clientHeight)<250000){_9.add(_29,"logo-sm");}else{_9.add(_29,"logo-med");}if(!has("esri-touch")&&!has("esri-pointer")){this._ogol_connect=dc(_29,"onclick",this,"_openLogoLink");}}var _2a=(this.navigationManager=new _12(this)),_2b=_2a.mouseEvents||_2a.touchEvents||_2a.pointerEvents;this.registerConnectEvents(_2b.constructor.connectEvents);if(_1d&&_1d.basemap){this._onLoadFix=true;this.setBasemap(_1d.basemap);this._onLoadFix=false;}this.autoResize=this._mapParams.autoResize;if(this.autoResize){var _2c=_d.getEnclosingWidget(this.container);this._connects.push(dc((_2c&&_2c.resize)?_2c:window,"resize",this,this.resize));this._connects.push(dc(window,"orientationchange",this,this.resize));}},_initAttribution:function(_2d,_2e){var _2f=dcr("span",{"class":"esriAttribution"},_2e,"first");ds(_2f,"width",Math.floor(this.width*this._mapParams.attributionWidth)+"px");this._connects.push(dc(_2f,"onclick",function(){var _30="esriAttributionOpen";if(_9.contains(this,_30)){_9.remove(this,_30);}else{if(this.scrollWidth>this.clientWidth){_9.add(this,_30);}}}));this.attribution=new _2d({map:this},_2f);},_cleanUp:function(){this.disableMapNavigation();this.navigationManager.destroy();var i;for(i=this._connects.length;i>=0;i--){ddc(this._connects[i]);delete this._connects[i];}ddc(this._slider_connect);ddc(this._ogol_connect);var _31=this._slider;if(_31&&_31.destroy&&!_31._destroyed){_31.destroy();}var _32=this._navDiv,_33=this.attribution;if(_32){_a.destroy(_32);}if(_33){_33.destroy();}this.attribution=this.navigationManager=this._rids=null;this.inherited("_cleanUp",arguments);},_isPanningOrZooming:function(){return this.__panning||this.__zooming;},_canZoom:function(_34){var _35=this.getLevel();return !this.__tileInfo||!((_35===this.getMinZoom()&&_34<0)||(_35===this.getMaxZoom()&&_34>0));},_onLoadInitNavsHandler:function(){this.enableMapNavigation();this._createNav();if(this._mapParams.sliderStyle==="small"||!this._createSlider){this._createSimpleSlider();}else{if(this._mapParams.slider){var _36=this._getSliderClass(true),_37=(_36.indexOf("Horizontal")!==-1),_38=_37?"dijit.form.HorizontalSlider":"dijit.form.VerticalSlider",_39=_37?"dijit.form.HorizontalRule":"dijit.form.VerticalRule",_3a=_37?"dijit.form.HorizontalRuleLabels":"dijit.form.VerticalRuleLabels",_3b=[_38,_39,_3a],_3c=_6.some(_3b,function(_3d){return !_5.getObject(_3d,false);});if(_3c){_3b=_6.map(_3b,function(_3e){return _3e.replace(/\./g,"/");});var rid=_1b++,_3f=this;this._rids&&this._rids.push(rid);_1(_3b,function(){var idx=_3f._rids?_6.indexOf(_3f._rids,rid):-1;if(idx!==-1){_3f._rids.splice(idx,1);_3f._createSlider.apply(_3f,arguments);}});}else{_3b=_6.map(_3b,function(_40){return _5.getObject(_40,false);});this._createSlider.apply(this,_3b);}}}ddc(this._onLoadHandler_connect);},_createNav:function(){if(this._mapParams.nav){var div,v,i,_41=_9.add,id=this.id;this._navDiv=dcr("div",{id:id+"_navdiv"},this.root);_41(this._navDiv,"navDiv");var w2=this.width/2,h2=this.height/2,wh;for(i in _15){v=_15[i];div=dcr("div",{id:id+"_pan_"+i},this._navDiv);_41(div,"fixedPan "+v);if(i==="up"||i==="down"){wh=parseInt(_17(div).w,10)/2;ds(div,{left:(w2-wh)+"px",zIndex:_13});}else{wh=parseInt(_17(div).h,10)/2;ds(div,{top:(h2-wh)+"px",zIndex:_13});}this._connects.push(dc(div,"onclick",dh(this,this[v])));}this._onMapResizeNavHandler_connect=dc(this,"onResize",this,"_onMapResizeNavHandler");for(i in _16){v=_16[i];div=dcr("div",{id:id+"_pan_"+i,style:{zIndex:_13}},this._navDiv);_41(div,"fixedPan "+v);this._connects.push(dc(div,"onclick",dh(this,this[v])));}this.isPanArrows=true;}},_onMapResizeNavHandler:function(_42,wd,ht){var id=this.id,w2=wd/2,h2=ht/2,_43=_8.byId,i,div,wh;for(i in _15){div=_43(id+"_pan_"+i);if(i==="up"||i==="down"){wh=parseInt(_17(div).w,10)/2;ds(div,"left",(w2-wh)+"px");}else{wh=parseInt(_17(div).h,10)/2;ds(div,"top",(h2-wh)+"px");}}},_createSimpleSlider:function(){if(this._mapParams.slider){var _44=(this._slider=dcr("div",{id:this.id+"_zoom_slider","class":this._getSliderClass(),style:{zIndex:_14}})),_45=(has("esri-touch")&&!has("ff"))?"touchstart":(has("esri-pointer")?(navigator.msPointerEnabled?"MSPointerDown":"pointerdown"):"onclick"),_46=dcr("div",{"class":"esriSimpleSliderIncrementButton"},_44),_47=dcr("div",{"class":"esriSimpleSliderDecrementButton"},_44);_46.innerHTML="+";_47.innerHTML="&ndash;";if(has("ie")<8){_9.add(_47,"dj_ie67Fix");}this._connects.push(dc(_46,_45,this,this._simpleSliderChangeHandler));this._connects.push(dc(_47,_45,this,this._simpleSliderChangeHandler));if(has("ie")<10){_8.setSelectable(_44,false);}this.root.appendChild(_44);this.isZoomSlider=true;}},_simpleSliderChangeHandler:function(evt){var _48=(evt.currentTarget.className.indexOf("IncrementButton")!==-1)?true:false;this._extentUtil({numLevels:_48?1:-1});},_getSliderClass:function(_49){var _4a="",_4b=(_49?"Large":"Simple"),_4c=this._mapParams.sliderOrientation,_4d=this._mapParams.sliderPosition||"";_4c=(_4c&&_4c.toLowerCase()==="horizontal")?"esri"+_4b+"SliderHorizontal":"esri"+_4b+"SliderVertical";if(_4d){switch(_4d.toLowerCase()){case "top-left":_4d="esri"+_4b+"SliderTL";break;case "top-right":_4d="esri"+_4b+"SliderTR";break;case "bottom-left":_4d="esri"+_4b+"SliderBL";break;case "bottom-right":_4d="esri"+_4b+"SliderBR";break;default:break;}}return "esri"+_4b+"Slider"+" "+_4c+" "+_4d;},_createSlider:function(_4e,_4f,_50){if(this._mapParams.slider){var div=dcr("div",{id:this.id+"_zoom_slider"},this.root),_51=_f.defaults.map,_52=this._getSliderClass(true),_53=(_52.indexOf("Horizontal")!==-1),_54=(_52.indexOf("SliderTL")!==-1||_52.indexOf("SliderBL")!==-1),_55=(_52.indexOf("SliderTL")!==-1||_52.indexOf("SliderTR")!==-1),_56=this.getNumLevels(),i,il,_57;if(_56>0){var _58,_59,_5a=this._mapParams.sliderLabels,_5b=!!_5a,_5c=(_5a!==false);if(_5c){var _5d,_5e=_53?"bottomDecoration":"rightDecoration";if(!_5a){_5a=[];for(i=0,il=_56;i<il;i++){_5a[i]="";}}_5d=[{"class":"esriLargeSliderTicks",container:_5e,count:_56,dijitClass:_4f},{"class":_5b&&"esriLargeSliderLabels",container:_5e,count:_56,labels:_5a,dijitClass:_50}];_6.forEach(_5d,function(_5f){var _60=dcr("div"),_61=_5f.dijitClass;delete _5f.dijitClass;div.appendChild(_60);if(_61===_4f){_58=new _61(_5f,_60);}else{_59=new _61(_5f,_60);}});}_57=(this._slider=new _4e({id:div.id,"class":_52,minimum:this.getMinZoom(),maximum:this.getMaxZoom(),discreteValues:_56,value:this.getLevel(),clickSelect:true,intermediateChanges:true,style:"z-index:"+_14+";"},div));_57.startup();if(_5c){_58.startup();_59.startup();}this._slider_connect=dc(_57,"onChange",this,"_onSliderChangeHandler");this._connects.push(dc(this,"onExtentChange",this,"_onExtentChangeSliderHandler"));this._connects.push(dc(_57._movable,"onFirstMove",this,"_onSliderMoveStartHandler"));}else{_57=(this._slider=new _4e({id:div.id,"class":_52,minimum:0,maximum:2,discreteValues:3,value:1,clickSelect:true,intermediateChanges:_51.sliderChangeImmediate,style:"height:50px; z-index:"+_14+";"},div));var _62=_57.domNode.firstChild.childNodes;for(i=1;i<=3;i++){ds(_62[i],"visibility","hidden");}_57.startup();this._slider_connect=dc(_57,"onChange",this,"_onDynSliderChangeHandler");this._connects.push(dc(this,"onExtentChange",this,"_onExtentChangeDynSliderHandler"));}var _63=_57.incrementButton,_64=_57.decrementButton;_63.style.outline="none";_64.style.outline="none";_57.sliderHandle.style.outline="none";_57._onKeyPress=function(){};var _65=_57._movable;if(_65){var _66=_65.onMouseDown;_65.onMouseDown=function(e){if(has("ie")<9&&e.button!==1){return;}_66.apply(this,arguments);};}this.isZoomSlider=true;}},_onSliderMoveStartHandler:function(){ddc(this._slider_connect);ddc(this._slidermovestop_connect);this._slider_connect=dc(this._slider,"onChange",this,"_onSliderChangeDragHandler");this._slidermovestop_connect=dc(this._slider._movable,"onMoveStop",this,"_onSliderMoveEndHandler");},_onSliderChangeDragHandler:function(_67){this._extentUtil({targetLevel:_67});},_onSliderMoveEndHandler:function(){ddc(this._slider_connect);ddc(this._slidermovestop_connect);},_onSliderChangeHandler:function(_68){this.setLevel(_68);},_updateSliderValue:function(_69,_6a){ddc(this._slider_connect);var _6b=this._slider;var _6c=_6b._onChangeActive;_6b._onChangeActive=false;_6b.set("value",_69);_6b._onChangeActive=_6c;this._slider_connect=dc(_6b,"onChange",this,_6a);},_onExtentChangeSliderHandler:function(_6d,_6e,_6f,lod){ddc(this._slidermovestop_connect);this._updateSliderValue(lod.level,"_onSliderChangeHandler");},_onDynSliderChangeHandler:function(_70){this._extentUtil({numLevels:_70>0?1:-1});},_onExtentChangeDynSliderHandler:function(){this._updateSliderValue(1,"_onDynSliderChangeHandler");},_openLogoLink:function(evt){window.open(_f.defaults.map.logoLink,"_blank");_7.stop(evt);},enableMapNavigation:function(){this.navigationManager.enableNavigation();},disableMapNavigation:function(){this.navigationManager.disableNavigation();},enableDoubleClickZoom:function(){if(!this.isDoubleClickZoom){this.navigationManager.enableDoubleClickZoom();this.isDoubleClickZoom=true;}},disableDoubleClickZoom:function(){if(this.isDoubleClickZoom){this.navigationManager.disableDoubleClickZoom();this.isDoubleClickZoom=false;}},enableShiftDoubleClickZoom:function(){if(!this.isShiftDoubleClickZoom){_18(this.declaredClass+": "+_1a,null,"v2.0");this.navigationManager.enableShiftDoubleClickZoom();this.isShiftDoubleClickZoom=true;}},disableShiftDoubleClickZoom:function(){if(this.isShiftDoubleClickZoom){_18(this.declaredClass+": "+_1a,null,"v2.0");this.navigationManager.disableShiftDoubleClickZoom();this.isShiftDoubleClickZoom=false;}},enableClickRecenter:function(){if(!this.isClickRecenter){this.navigationManager.enableClickRecenter();this.isClickRecenter=true;}},disableClickRecenter:function(){if(this.isClickRecenter){this.navigationManager.disableClickRecenter();this.isClickRecenter=false;}},enablePan:function(){if(!this.isPan){this.navigationManager.enablePan();this.isPan=true;}},disablePan:function(){if(this.isPan){this.navigationManager.disablePan();this.isPan=false;}},enableRubberBandZoom:function(){if(!this.isRubberBandZoom){this.navigationManager.enableRubberBandZoom();this.isRubberBandZoom=true;}},disableRubberBandZoom:function(){if(this.isRubberBandZoom){this.navigationManager.disableRubberBandZoom();this.isRubberBandZoom=false;}},enableKeyboardNavigation:function(){if(!this.isKeyboardNavigation){this.navigationManager.enableKeyboardNavigation();this.isKeyboardNavigation=true;}},disableKeyboardNavigation:function(){if(this.isKeyboardNavigation){this.navigationManager.disableKeyboardNavigation();this.isKeyboardNavigation=false;}},enableScrollWheelZoom:function(){if(!this.isScrollWheelZoom){this.navigationManager.enableScrollWheelZoom();this.isScrollWheelZoom=true;}},disableScrollWheelZoom:function(){if(this.isScrollWheelZoom){this.navigationManager.disableScrollWheelZoom();this.isScrollWheelZoom=false;}},showPanArrows:function(){if(this._navDiv){this._navDiv.style.display="block";this.isPanArrows=true;}},hidePanArrows:function(){if(this._navDiv){this._navDiv.style.display="none";this.isPanArrows=false;}},showZoomSlider:function(){if(this._slider){ds(this._slider.domNode||this._slider,"visibility","visible");this.isZoomSlider=true;}},hideZoomSlider:function(){if(this._slider){ds(this._slider.domNode||this._slider,"visibility","hidden");this.isZoomSlider=false;}}});if(has("extend-esri")){_e.Map=Map;}return Map;});