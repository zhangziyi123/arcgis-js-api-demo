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
define("esri/PointerEvents",["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/has","esri/kernel","esri/Evented","esri/geometry/Point","esri/geometry/ScreenPoint"],function(_1,_2,_3,_4,_5,_6,_7,_8){var _9=_1([_6],{declaredClass:"esri.PointerEvents",tapRadius:8,clickRadius:2,doubleTapRadius:10,tapStartTolerance:50,doubleTapDuration:300,minWheelValue:1,maxWheelValue:1,mozWheelDivisor:_4("mac")!==-1?1:3,wheelDivisor:_4("chrome")<2?360:120,preventPageScroll:true,constructor:function(_a,_b){this.registerConnectEvents({"basic-tap":["BasicTap"],"click":["Click"],"double-click":["DblClick"],"double-tap":["DoubleTap"],"mouse-down":["MouseDown"],"mouse-out":["MouseOut"],"mouse-over":["MouseOver"],"mouse-up":["MouseUp"],"mouse-wheel":["MouseWheel"],"pinch-end":["PinchEnd"],"pinch-move":["PinchMove"],"pinch-start":["PinchStart"],"processed-double-tap":["ProcessedDoubleTap"],"processed-tap":["ProcessedTap"],"swipe-end":["SwipeEnd"],"swipe-move":["SwipeMove"],"swipe-start":["SwipeStart"],"tap":["Tap"],"two-finger-tap":["TwoFingerTap"]},{normalized:true});this.node=_a;_2.mixin(this,_b);if(_a.style.msTouchAction!==undefined){_a.style.msTouchAction="none";}else{if(_a.style.touchAction!==undefined){_a.style.touchAction="none";}}var _c=navigator.msPointerEnabled,_d=function(e){e.preventDefault();};_a.addEventListener("selectstart",_d,false);_a.addEventListener("dragstart",_d,false);this._pointerDown=_2.hitch(this,this._pointerDown);this._pointerMove=_2.hitch(this,this._pointerMove);this._pointerUp=_2.hitch(this,this._pointerUp);this._pointerCancel=_2.hitch(this,this._pointerCancel);_a.addEventListener(_c?"MSPointerDown":"pointerdown",this._pointerDown,false);_a.addEventListener(_c?"MSPointerMove":"pointermove",this._pointerMove,false);_a.addEventListener(_c?"MSPointerUp":"pointerup",this._pointerUp,false);_a.addEventListener(_c?"MSPointerCancel":"pointercancel",this._pointerCancel,false);if(this.map){this._mouseOver=_2.hitch(this,this._mouseOver);this._mouseOut=_2.hitch(this,this._mouseOut);this._mouseDown=_2.hitch(this,this._mouseDown);this._mouseUp=_2.hitch(this,this._mouseUp);this._mouseClick=_2.hitch(this,this._mouseClick);this._mouseWheel=_2.hitch(this,this._mouseWheel);_a.addEventListener("mouseover",this._mouseOver,false);_a.addEventListener("mouseout",this._mouseOut,false);_a.addEventListener("mousedown",this._mouseDown,false);_a.addEventListener("mouseup",this._mouseUp,false);_a.addEventListener("click",this._mouseClick,false);_a.addEventListener("mousewheel",this._mouseWheel,false);}this._numTouches=0;this._touches={};this._touchIds=[];this._taps=[];this._immediate=false;},_pointerDown:function(_e){var _f=this._touches,_10=this.node,_11=_e.target,pid=_e.pointerId,ids=this._touchIds,_12,_13,_14,ts=(new Date()).getTime();_12=(_f[pid]={});_12.pointerId=pid;_12.startX=_12.pageX=_e.pageX;_12.startY=_12.pageY=_e.pageY;_12.startTS=ts;ids.push(pid);this._numTouches++;if(_11.setPointerCapture){_11.setPointerCapture(pid);}else{if(_11.msSetPointerCapture){_11.msSetPointerCapture(pid);}}_13=_f[ids[0]];_14=_f[ids[1]];if(this._numTouches===1){}else{if(this._numTouches===2){if(this._swipeActive){if(_13){_13.startX=_13.pageX;_13.startY=_13.pageY;_13.moved=false;}this._swipeActive=false;this._fire("onSwipeEnd",this._processTouchEvent(_e,_13));}}else{if(this._swipeActive){this._swipeActive=false;this._fire("onSwipeEnd",this._processTouchEvent(_e,_13));}else{if(this._pinchActive){this._pinchActive=false;this._fire("onPinchEnd",this._processTouchEvent(_e,[_13,_14]));}}}}},_pointerMove:function(_15){var _16=this._touches,ids=this._touchIds,_17,dx,dy;_17=_16[_15.pointerId];if(!_17||(_17.pageX===_15.pageX&&_17.pageY===_15.pageY)){return;}_17.pageX=_15.pageX;_17.pageY=_15.pageY;dx=Math.abs(_17.pageX-_17.startX);dy=Math.abs(_17.pageY-_17.startY);if(!_17.moved&&((dx>=this.tapRadius)||(dy>=this.tapRadius))){_17.moved=_17.absMoved=true;}if(this._numTouches===1){if(!this._swipeActive){if(_17.moved){this._swipeActive=true;this._fire("onSwipeStart",this._processTouchEvent(_15,_15));}}else{this._fire("onSwipeMove",this._processTouchEvent(_15,_15));}}else{if(this._numTouches===2){var _18=_16[ids[0]],_19=_16[ids[1]];if(!this._pinchActive){if(_18.moved||_19.moved){var _1a=Math.abs(_18.startX-_19.startX),_1b=Math.abs(_18.startY-_19.startY),_1c=Math.sqrt((_1a*_1a)+(_1b*_1b)),_1d=Math.abs(_18.pageX-_19.pageX),_1e=Math.abs(_18.pageY-_19.pageY),_1f=Math.sqrt((_1d*_1d)+(_1e*_1e));if(Math.abs(_1f-_1c)>=(2*this.tapRadius)){this._pinchActive=true;this._fire("onPinchStart",this._processTouchEvent(_15,[_18,_19]));}}}else{this._fire("onPinchMove",this._processTouchEvent(_15,[_18,_19]));}}}},_pointerUp:function(_20){var _21=this._touches,_22,_23=this.node,_24=_20.target,pid=_20.pointerId,ids=this._touchIds,_25=ids.slice(0),_26=_3.map(_25,function(id){return _21[id];}),ts=(new Date()).getTime();_22=_21[pid];if(!_22){return;}_22.pageX=_20.pageX;_22.pageY=_20.pageY;_22.endTS=ts;this._numTouches--;if(_24.releasePointerCapture){_24.releasePointerCapture(pid);}else{if(_24.msReleasePointerCapture){_24.msReleasePointerCapture(pid);}}if(this._numTouches===0){this._touches={};this._touchIds=[];if(this._swipeActive){this._swipeActive=false;this._fire("onSwipeEnd",this._processTouchEvent(_20,_20));}else{if(this._pinchActive){this._pinchActive=false;this._fire("onPinchEnd",this._processTouchEvent(_20,_20));}else{if(!_22.absMoved){var _27=Infinity,_28=-Infinity,_29=Infinity,_2a=-Infinity,_2b=this.tapStartTolerance,i;for(i=0;i<_25.length;i++){_22=_26[i];if(_22.startTS<_27){_27=_22.startTS;}if(_22.startTS>_28){_28=_22.startTS;}if(_22.endTS<_29){_29=_22.endTS;}if(_22.endTS>_2a){_2a=_22.endTS;}}if(Math.abs(_28-_27)<=_2b&&Math.abs(_2a-_29)<=_2b){this._basicTap(_20,_26);}}}}}else{if(this._numTouches===1){if(this._pinchActive){ids.splice(_3.indexOf(ids,_20.pointerId),1);delete _21[_20.pointerId];var _2c=_21[ids[0]];_2c.startX=_2c.pageX;_2c.startY=_2c.pageY;_2c.moved=false;if(document.msElementsFromPoint){var _2d=document.msElementsFromPoint(_2c.pageX,_2c.pageY),_2e=_3.some(_2d,function(_2f){return (_2f===_23);});if(!_2e){this._touches={};this._touchIds=[];this._numTouches=0;}}this._pinchActive=false;this._fire("onPinchEnd",this._processTouchEvent(_20,[_20,_2c]));}}}},_pointerCancel:function(_30){if(this._numTouches){this._pointerUp(_30);}},_basicTap:function(_31,_32){var ts=(new Date()).getTime(),_33=this;_31=this._processTouchEvent(_31,_32);this._taps.push({touchInfos:_32,ts:ts,event:_31});if(this._taps.length>2){this._taps.shift();}this._fire("onBasicTap",_31);clearTimeout(this._tapTimer);if(this._immediate){this._analyzeTap(true);}else{var _34=(this._taps.length===2)?(this.doubleTapDuration/2):this.doubleTapDuration;this._tapTimer=setTimeout(function(){var _35=_33;_33=null;clearTimeout(_35._tapTimer);_35._analyzeTap();},_34);}},_analyzeTap:function(_36){var _37=this._taps,_38=_37[0],_39=_37[1],_3a=_38.touchInfos,_3b=_39&&_39.touchInfos;if(!_37.length){return;}if(!_36){this._taps=[];}if(_38&&_39){if(_3a.length===_3b.length){if((_39.ts-_38.ts)<=this.doubleTapDuration){var _3c,dx,dy;if(_3a.length===1){dx=Math.abs(_3a[0].startX-_3b[0].startX);dy=Math.abs(_3a[0].startY-_3b[0].startY);_3c=(dx<=this.doubleTapRadius)&&(dy<=this.doubleTapRadius);}else{_3c=true;}if(_3c){this._processedDoubleTap(_37);}else{this._processedTap(_39);}}else{this._processedTap(_39);}}else{this._processedTap(_39);}}else{this._processedTap(_38||_39);}},_processedTap:function(tap){var _3d=tap.event;this._fire("onProcessedTap",_3d);if(tap.touchInfos.length===1){this._fire("onTap",this._fixEvent(_3d));}else{if(tap.touchInfos.length===2){this._fire("onTwoFingerTap",_3d);}}},_processedDoubleTap:function(_3e){var _3f=(_3e[1].touchInfos.length===1),_40,_41;if(_3f){_40=[this._fixEvent(_3e[0].event),this._fixEvent(_3e[1].event)];_40[1].relatedEvents=_40;}_41=[_3e[0].event,_3e[1].event];_41[1].relatedEvents=_41;this._fire("onProcessedDoubleTap",_41[1]);if(_3f){this._fire("onDoubleTap",_40[1]);this._fire("onDblClick",_40[1]);}},_mouseOver:function(_42){this._fire("onMouseOver",this._processMouseEvent(_42));},_mouseOut:function(_43){this._fire("onMouseOut",this._processMouseEvent(_43));},_mouseDown:function(_44){this._downX=_44.pageX;this._downY=_44.pageY;this._fire("onMouseDown",this._processMouseEvent(_44));},_mouseUp:function(_45){this._fire("onMouseUp",this._processMouseEvent(_45));},_mouseClick:function(_46){if((Math.abs(_46.pageX-this._downX)<=this.clickRadius)&&(Math.abs(_46.pageY-this._downY)<=this.clickRadius)){this._fire("onClick",this._processMouseEvent(_46));}},_mouseWheel:function(_47){var map=this.map,_48=map?(map.isScrollWheelZoom||map.isScrollWheelPan):this.preventPageScroll;if(_48){_47.preventDefault();}var _49=_4("ie")||_4("webkit")?_47.wheelDelta/this.wheelDivisor:-_47.detail/this.mozWheelDivisor,_4a=Math.abs(_49);if(_4a<=this.minWheelValue){_4a=this.minWheelValue;}else{_4a=this.maxWheelValue;}_47.value=_49<0?-_4a:_4a;this._fire("onMouseWheel",this._processMouseEvent(_47));},_fire:function(_4b,evt){if(this[_4b]){this[_4b](evt);}if(this.map){if(this.map[_4b]){this.map[_4b](evt);}}},_fixEvent:function(_4c){var _4d={},i;for(i in _4c){_4d[i]=_4c[i];}if(this.map){_4d.screenPoint=_4d.screenPoints[0];_4d.mapPoint=_4d.mapPoints[0];}return _4d;},_processTouchEvent:function(evt,_4e){var map=this.map,pos=map&&map.position,_4f=0;if(pos&&_4e){if(_2.isArray(_4e)){var i,_50;evt.screenPoints=[];evt.mapPoints=[];for(i=0;i<_4e.length;i++){if(_4e[i]){_50=new _8(_4e[i].pageX-pos.x,_4e[i].pageY-pos.y);evt.screenPoints.push(_50);evt.mapPoints.push(map.extent?map.toMap(_50):new _7());}else{_4f++;}}}else{evt.screenPoint=new _8(_4e.pageX-pos.x,_4e.pageY-pos.y);evt.mapPoint=map.extent?map.toMap(evt.screenPoint):new _7();}}evt.numPoints=_4e?(_2.isArray(_4e)?(_4e.length-_4f):1):0;return evt;},_processMouseEvent:function(evt){var map=this.map,pos=map&&map.position;if(pos){evt.screenPoint=new _8(evt.pageX-pos.x,evt.pageY-pos.y);evt.mapPoint=map.extent?map.toMap(evt.screenPoint):new _7();}return evt;},setImmediateTap:function(_51){this._immediate=_51;},destroy:function(){var _52=this.node;_52.removeEventListener("MSPointerDown",this._pointerDown,false);_52.removeEventListener("MSPointerMove",this._pointerMove,false);_52.removeEventListener("MSPointerUp",this._pointerUp,false);_52.removeEventListener("MSPointerCancel",this._pointerCancel,false);if(this.map){_52.removeEventListener("mouseover",this._mouseOver,false);_52.removeEventListener("mouseout",this._mouseOut,false);_52.removeEventListener("mousedown",this._mouseDown,false);_52.removeEventListener("mouseup",this._mouseUp,false);_52.removeEventListener("click",this._mouseClick,false);}clearTimeout(this._tapTimer);this.node=this.map=this._numTouches=this._touches=this._touchIds=this._taps=null;}});if(_4("extend-esri")){_5.PointerEvents=_9;}return _9;});