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
define("esri/layers/JoinDataSource",["dojo/_base/declare","dojo/_base/lang","dojo/has","esri/kernel","esri/lang","esri/layers/DataSource"],function(_1,_2,_3,_4,_5,_6){var _7=_1(_6,{declaredClass:"esri.layers.JoinDataSource",toJson:function(){var _8={type:"joinTable",leftTableSource:this.leftTableSource&&this.leftTableSource.toJson(),rightTableSource:this.rightTableSource&&this.rightTableSource.toJson(),leftTableKey:this.leftTableKey,rightTableKey:this.rightTableKey};var _9;if(this.joinType.toLowerCase()==="left-outer-join"){_9="esriLeftOuterJoin";}else{if(this.joinType.toLowerCase()==="left-inner-join"){_9="esriLeftInnerJoin";}else{_9=this.joinType;}}_8.joinType=_9;return _5.fixJson(_8);}});if(_3("extend-esri")){_2.setObject("layers.JoinDataSource",_7,_4);}return _7;});