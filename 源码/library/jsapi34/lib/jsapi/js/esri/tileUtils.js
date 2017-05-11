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
define("esri/tileUtils",["dojo/_base/array","dojo/has","esri/kernel","esri/geometry/Point","esri/geometry/Extent"],function(_1,_2,_3,_4,_5){function _6(_7,ti,_8){var wd=_7.width,ht=_7.height,ew=_8.xmax-_8.xmin,eh=_8.ymax-_8.ymin,_9=_7.getMinZoom(),_a=_7.getMaxZoom(),ed=-1,_b=ti.lods,i,_c=Math.abs,_d,cl,_e;_9=(_9>-1)?_9:0;_a=(_a>-1)?_a:(_b.length-1);for(i=_9;i<=_a;i++){cl=_b[i];if(!cl){continue;}_e=ew>eh?_c(eh-(ht*cl.resolution)):_c(ew-(wd*cl.resolution));if(ed<0||_e<=ed){_d=cl;ed=_e;}else{break;}}return _d;};function _f(map,_10,lod){var res=lod.resolution,cx=(_10.xmin+_10.xmax)/2,cy=(_10.ymin+_10.ymax)/2,_11=(map.width/2)*res,_12=(map.height/2)*res;return new _5(cx-_11,cy-_12,cx+_11,cy+_12,_10.spatialReference);};function _13(map,ti,_14,lod){var res=lod.resolution,tw=ti.width,th=ti.height,to=ti.origin,mv=map.__visibleDelta,_15=Math.floor,tmw=tw*res,tmh=th*res,tr=_15((to.y-_14.y)/tmh),tc=_15((_14.x-to.x)/tmw),_16=to.x+(tc*tmw),_17=to.y-(tr*tmh),oX=_15(Math.abs((_14.x-_16)*tw/tmw))+mv.x,oY=_15(Math.abs((_14.y-_17)*th/tmh))+mv.y;return {point:_14,coords:{row:tr,col:tc},offsets:{x:oX,y:oY}};};var _18={_addFrameInfo:function(_19,_1a){var _1b,_1c,_1d=2*_1a.origin[1],_1e=_1a.origin[0],_1f=_19.origin.x,_20=_19.width,_21;_1.forEach(_19.lods,function(lod){_1b=Math.round(_1d/lod.resolution);_1c=Math.ceil(_1b/_20);_21=Math.floor((_1e-_1f)/(_20*lod.resolution));if(!lod._frameInfo){lod._frameInfo=[_1c,_21,_21+_1c-1,_1b];}});},getContainingTileCoords:function(ti,_22,lod){var to=ti.origin,res=lod.resolution,tmw=ti.width*res,tmh=ti.height*res,tc=Math.floor((_22.x-to.x)/tmw),tr=Math.floor((to.y-_22.y)/tmh);return {row:tr,col:tc};},getCandidateTileInfo:function(map,ti,_23){var lod=_6(map,ti,_23),adj=_f(map,_23,lod),ct=_13(map,ti,new _4(adj.xmin,adj.ymax,_23.spatialReference),lod);return {tile:ct,lod:lod,extent:adj};},getTileExtent:function(ti,_24,row,col){var to=ti.origin,lod=ti.lods[_24],res=lod.resolution,tw=ti.width,th=ti.height;return new _5(((col*res)*tw)+to.x,to.y-((row+1)*res)*th,(((col+1)*res)*tw)+to.x,to.y-((row*res)*th),ti.spatialReference);}};if(_2("extend-esri")){_3.TileUtils=_18;}return _18;});