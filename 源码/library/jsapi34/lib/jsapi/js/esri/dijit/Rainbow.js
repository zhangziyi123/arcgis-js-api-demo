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
define("esri/dijit/Rainbow",["dojo/has","dojox/charting/themes/PlotKit/base","esri/kernel"],function(_1,pk){var _2=pk.base.clone();_2.chart.fill=_2.plotarea.fill="#e7eef6";_2.colors=["#284B70","#702828","#5F7143","#F6BC0C","#382C6C","#50224F","#1D7554","#4C4C4C","#0271AE","#706E41","#446A73","#0C3E69","#757575","#B7B7B7","#A3A3A3"];_2.series.stroke.width=1;_2.marker.stroke.width=1;if(_1("extend-esri")){pk.popup=_2;}return _2;});