

define(["dojo/_base/declare", "dojo/_base/kernel", "dojo/_base/lang", "dojo/_base/array", "dojo/sniff", "dojox/xml/parser", "esri/lang", "esri/request", "esri/layers/TiledMapServiceLayer", "esri/SpatialReference", "esri/geometry/Extent", "esri/geometry/Point", "esri/layers/TileInfo", "esri/WKIDUnitConversion", "esri/geometry/webMercatorUtils"], function (declare, kernel, lang, array, has, xmlParser, esriLang, esriRequest, TiledMapServiceLayer, SpatialReference, Extent, Point, TileInfo, WKIDUnitConversion, webMercatorUtils) {

    // summary:
    //      WMTS图层

    // description:
    //      暂无描述

    return declare(TiledMapServiceLayer, {

        // -----参数字段，对应constructor中的args对象的键名（小驼峰）-----
        preferNative: true, // 优先原生比例尺

        // -----公有字段（小驼峰）-----
        copyright: null,
        extent: null,
        tileUrl: null,
        spatialReference: null,
        tileInfo: null,
        version: null,
        serviceMode: null,

		title:null,
        // -----私有字段（下划线开头 + 小驼峰）-----
        _url: null,

        // -----override或自动调用方法-----
        // 构造方法
        constructor: function (url, /*Object:preferNative*/args) {
            var me = this;

            lang.mixin(me, args);
            me.version = "1.0.0";
            me._url = url;
            me.serviceMode = "KVP";

            this._getCapabilities();
        },

        // 获取瓦片url
        getTileUrl: function (level, row, col) {
            var tileUrl;
            if (this.serviceMode === "KVP") {
                tileUrl = this._url + "SERVICE=WMTS&VERSION=" + this.version + "&REQUEST=GetTile" + "&LAYER=" + this._identifier + "&STYLE=" + this._style + "&FORMAT=" + this.format + "&TILEMATRIXSET=" + this._tileMatrixSetId + "&TILEMATRIX=" + level + "&TILEROW=" + row + "&TILECOL=" + col;
            }
            //tileUrl = this.addTimestampToURL(tileUrl);

            return tileUrl;
        },

        // -----公有方法（小驼峰）-----
        // 暂无

        // -----私有方法（下划线 + 小驼峰）-----
        // 获取能力文档
        _getCapabilities: function () {
            var me = this;

            var capabilitiesUrl = me._url + (me._url.indexOf("?") > -1 ? "" : "?") + "request=GetCapabilities&service=WMTS&version=" + this.version;

            esriRequest({
                url: capabilitiesUrl,
                handleAs: "text"
            }).then(lang.hitch(me, me._parseCapabilities), lang.hitch(me, me._getCapabilitiesError));
        },

        // 解析能力文档
        _parseCapabilities: function (xmlText) {

            xmlText = xmlText.replace(/ows:/gi, "");
            var xmlNode = xmlParser.parse(xmlText);
            var contentsNode = kernel.query("Contents", xmlNode)[0];
            if (contentsNode) {
                var metaDataNode = kernel.query("OperationsMetadata", xmlNode)[0];
                var getTileNode = kernel.query("[name='GetTile']", metaDataNode)[0];
                var getNodes = kernel.query("Get", getTileNode);
                var url = this._url;
                for (var i = 0; i < getNodes.length; i++) {
                    var constraintNode = kernel.query("Constraint", getNodes[i])[0];
                    if (!constraintNode || this._getTagWithChildTagValue("AllowedValues", "Value", this.serviceMode, constraintNode)) {
                        url = getNodes[i].attributes[0].value || getNodes[i].attributes[0].nodeValue;
                        break;
                    }
                }
                url.indexOf("/1.0.0/") === -1 && this.serviceMode === "RESTful" && (url += "/");
                this.serviceMode === "KVP" && (url += -1 < url.indexOf("?") ? "" : "?");
                this._url = url;
                this.copyright = this._getTagValues("Capabilities>ServiceIdentification>AccessConstraints", xmlNode)[0];
                var layerNodes = kernel.query("Layer", contentsNode);
                var ids = [];
                this.layers = [];
                array.forEach(layerNodes, function (layerNode) {
                    var id = this._getTagValues("Identifier", layerNode)[0];
                    ids.push(id);
                    this.layers.push(this._getWMTSLayerInfo(ids, layerNode, contentsNode));
                }, this);
                this._setActiveLayer();
                this.loaded = true;
                this.onLoad(this);
            } else {
                console.error("The WMTS capabilities XML is not valid");
                this.onError(Error("The WMTS capabilities XML is not valid"));
            }
        },

        // 获取WMTS图层信息
        _getWMTSLayerInfo: function (ids, layerNode, contentsNode) {           
            var abstract = this._getTagValues("Abstract", layerNode)[0];
            var title = this._getTagValues("Title", layerNode)[0];
			this.title = title;
            var wgs84BoundingBoxNode = kernel.query("WGS84BoundingBox", layerNode)[0];
            var lowerCorner = wgs84BoundingBoxNode ? this._getTagValues("LowerCorner", wgs84BoundingBoxNode)[0].split(" ") : ["-180", "-90"];
            var upperCorner = wgs84BoundingBoxNode ? this._getTagValues("UpperCorner", wgs84BoundingBoxNode)[0].split(" ") : ["180", "90"];
            var xmin = parseFloat(lowerCorner[0]);
            var ymin = parseFloat(lowerCorner[1]);
            var xmax = parseFloat(upperCorner[0]);
            var ymax = parseFloat(upperCorner[1]);
            var extent = new Extent(xmin, ymin, xmax, ymax, new SpatialReference({
                wkid: 4326
            }));
            var styles = this._getTagValues("Identifier", kernel.query("Style", layerNode)[0]);
            var dimensionIds = this._getTagValues("Identifier", kernel.query("Dimension", layerNode)[0]);
            var dimensions = this._getTagValues("Value", kernel.query("Dimension", layerNode)[0]) || this._getTagValues("Default", kernel.query("Dimension", layerNode)[0]);
            var format = this._getTagValues("Format", layerNode);
            var tileMatrixSetInfos = this._getLayerMatrixInfos(layerNode, contentsNode);
            var layerInfo = {
                identifier: ids,
                tileMatrixSetInfos: tileMatrixSetInfos,
                formats: format,
                styles: styles,
                title: title,
                description: abstract,
                gcsExtent: extent,
                dimensions: dimensions
            };
            /*var resourceURLNodes = kernel.query("ResourceURL", layerNode);
            var resourceUrls = [];
            array.forEach(resourceURLNodes, function(resourceURLNode) {
            var template = resourceURLNode.getAttribute("template");
            dimensionIds && dimensions && ( template = template.replace("{" + dimensionIds + "}", "{dimensionValue}"));
            resourceUrls.push({
            template : template,
            format : resourceURLNode.getAttribute("format"),
            resourceType : resourceURLNode.getAttribute("resourceType")
            });
            });
            resourceUrls && resourceUrls.length > 0 && (layerInfo.resourceUrls = resourceUrls);*/

            return layerInfo;
        },

        // 获取能力文档切片矩阵信息数组
        _getLayerMatrixInfos: function (layerNode, contentsNode) {
            var matrixInfos = [];
            this._allMatrixInfos || (this._allMatrixInfos = []);
            var tileMatrixSets = this._getTagValues("TileMatrixSet", layerNode);
            if (tileMatrixSets && tileMatrixSets.length !== 0) {
                array.forEach(tileMatrixSets, function (tileMatrixSet) {
                    var matrixInfo;
                    if (this._allMatrixInfos.length > 0) {
                        for (var i = 0; i < this._allMatrixInfos.length; i++) {
                            if (this._allMatrixInfos[i].tileMatrixSet == tileMatrixSet) {
                                matrixInfo = this._allMatrixInfos[i];
                                break;
                            }
                        }
                    }

                    if (!matrixInfo) {
                        matrixInfo = this._getLayerMatrixInfo(tileMatrixSet, layerNode, contentsNode);
                        this._allMatrixInfos.push(matrixInfo);
                    }
                    matrixInfos.push(matrixInfo);
                }, this);
            }

            return matrixInfos;
        },

        // 获取能力文档切片矩阵信息
        _getLayerMatrixInfo: function (tileMatrixSet, layerNode, contentsNode) {
            var tileMatrixSetLinkNode = this._getTagWithChildTagValue("TileMatrixSetLink", "TileMatrixSet", tileMatrixSet, layerNode);
            var tileMatrixNodes = this._getTagValues("TileMatrix", tileMatrixSetLinkNode);
            var tileMatrixSetNode = this._getTagWithChildTagValue("TileMatrixSet", "Identifier", tileMatrixSet, contentsNode);
            var supportedCRS = this._getTagValues("SupportedCRS", tileMatrixSetNode)[0];
            var wkid = parseInt(supportedCRS.split(":").pop());
            if (wkid == 900913 || wkid == 3857)
                wkid = 102100;
            if (supportedCRS.toLowerCase().indexOf("crs84") > -1 || supportedCRS.toLowerCase().indexOf("crs:84") > -1)
                wkid = 4326;
            else if (supportedCRS.toLowerCase().indexOf("crs83") > -1 || supportedCRS.toLowerCase().indexOf("crs:83") > -1)
                wkid = 4269;
            else if (supportedCRS.toLowerCase().indexOf("crs27") > -1 || supportedCRS.toLowerCase().indexOf("crs:27") > -1)
                wkid = 4267;
            var spatialReference = new SpatialReference({
                wkid: wkid
            });
            var tileMatrixNode = kernel.query("TileMatrix", tileMatrixSetNode)[0];
            var tileWidth = parseInt(this._getTagValues("TileWidth", tileMatrixNode)[0], 10);
            var tileHeight = parseInt(this._getTagValues("TileHeight", tileMatrixNode)[0], 10);
            var topLeftCorner = this._getTagValues("TopLeftCorner", tileMatrixNode)[0].split(" ");
            var x = topLeftCorner[0];
            var y = topLeftCorner[1];
            x = this._parseNumber(x);
            y = this._parseNumber(y);
            var xAbs = Math.abs(x);
            var yAbs = Math.abs(y);
            if (this._isGCS(wkid) && Math.max(xAbs, yAbs) >= 90 && Math.max(xAbs, yAbs) <= 180 && xAbs > yAbs) {
                // 浙江省交换平台原点x,y顺序有误
                var originPt = new Point(parseFloat(x), parseFloat(y), spatialReference);
            } else {
                // 正常情况下原点x,y顺序
                var originPt = new Point(parseFloat(y), parseFloat(x), spatialReference);
            }

            var lods = [];
            if (tileMatrixNodes.length === 0) {
                tileMatrixNodes = kernel.query("TileMatrix", tileMatrixSetNode);
                for (i = 0; i < tileMatrixNodes.length; i++) {
                    var lod = this._getLodFromTileMatrix(tileMatrixNodes[i], wkid, tileMatrixSet);
                    lods.push(lod);
                }
            } else {
                for (i = 0; i < tileMatrixNodes.length; i++) {
                    var tileMatrixNode = this._getTagWithChildTagValue("TileMatrix", "Identifier", tileMatrixNodes[i], tileMatrixSetNode);
                    var lod = this._getLodFromTileMatrix(tileMatrixNode, wkid, tileMatrixSet);
                    lods.push(lod);
                }
            }
            var lowerCorner, upperCorner, xmin, ymin, xmax, ymax, fullExtent, initialExtent;
            var boundingBoxNode = kernel.query("BoundingBox", tileMatrixSetNode)[0] || kernel.query("BoundingBox", layerNode)[0] || kernel.query("WGS84BoundingBox", layerNode)[0];
            if (boundingBoxNode) {
                lowerCorner = this._getTagValues("LowerCorner", boundingBoxNode)[0].split(" ");
                upperCorner = this._getTagValues("UpperCorner", boundingBoxNode)[0].split(" ");
            }
            if (lowerCorner && lowerCorner.length > 1 && upperCorner && upperCorner.length > 1) {
                xmin = parseFloat(lowerCorner[0]);
                ymin = parseFloat(lowerCorner[1]);
                xmax = parseFloat(upperCorner[0]);
                ymax = parseFloat(upperCorner[1]);
            } else {
                // 以下方法需要验证
                var matrixWidth = this._getTagValues("MatrixWidth", tileMatrixNode)[0];
                var matrixHeight = this._getTagValues("MatrixHeight", tileMatrixNode)[0];
                xmin = originPt.x;
                ymax = originPt.y;
                xmax = xmin + matrixWidth * tileHeight * lods[0].resolution;
                ymin = ymax - matrixHeight * tileWidth * lods[0].resolution;
            }
            fullExtent = initialExtent = new Extent(xmin, ymin, xmax, ymax, spatialReference);

            var tileInfo = new TileInfo({
                dpi: 90.71428571428571,
                spatialReference: spatialReference,
                format: this.format,
                rows: tileWidth,
                cols: tileHeight,
                origin: originPt,
                lods: lods
            });

            return {
                tileMatrixSet: tileMatrixSet,
                fullExtent: fullExtent,
                initialExtent: initialExtent,
                tileInfo: tileInfo
            };
        },

        // 获取切片矩阵信息细节层次（lod）
        _getLodFromTileMatrix: function (tileMatrixNode, wkid, tileMatrixSet) {
            var id = this._getTagValues("Identifier", tileMatrixNode)[0];
            var matrixScale = this._getTagValues("ScaleDenominator", tileMatrixNode)[0];
            matrixScale = this._parseNumber(matrixScale);
            matrixScale = this._convertScale(matrixScale);
            // 1 degree equals to a*2*PI/360 meters
            //var unitConversion = esriLang.isDefined(WKIDUnitConversion[wkid]) ? WKIDUnitConversion.values[WKIDUnitConversion[wkid]] : 111194.6519066546;
            //var resolution = 7 * matrixScale / 25E3 / unitConversion;

            var dpi = tileMatrixSet.indexOf("028mm") > -1 ? 90.71428571428571 : 96;
            var resolution;
            if (this._isGCS(wkid)) {
                resolution = 0.0254000508 * matrixScale / dpi / 111194.87429595861;
            } else {
                resolution = 0.0254000508 * matrixScale / dpi;
            }

            return {
                level: id,
                /*levelValue : id,*/
                scale: matrixScale,
                resolution: resolution
            };
        },

        // 是否为地理坐标系（Geographic Coordinate System）
        _isGCS: function (wkid) {
            return wkid == 4326 || wkid == 4490;
        },

        // 转换比例尺
        _convertScale: function (scale) {
            /*
            * 由于天地图的比例尺与arcgis服务的比例尺不同导致瓦片叠加显示不了，故将天地图的比例尺转换为arcgis的比例尺；
            * 浙江省交换平台的比例尺与arcgis服务相同；
            * arcgis服务：http://server.arcgisonline.com/ArcGIS/rest/services/ESRI_StreetMap_World_2D/MapServer/?f=pjson
            * 天地图：http://t0.tianditu.com/vec_c/wmts?request=GetCapabilities&service=WMTS&version=1.0.0
            * 浙江省交换平台：http://ditu.zj.cn/services/wmts/zjemap
            */
            if (!this._scaleValues) {
                this._scaleValues = {
                    2.958293554545656E8: 295497598.570834,
                    1.479146777272828E8: 1.47748799285417E8,
                    7.39573388636414E7: 7.38743996427087E7,
                    3.69786694318207E7: 3.69371998213544E7,
                    1.848933471591035E7: 1.84685999106772E7,
                    9244667.357955175: 9234299.95533859,
                    4622333.678977588: 4617149.97766929,
                    2311166.839488794: 2308574.98883465,
                    1155583.419744397: 1154287.49441732,
                    577791.7098721985: 577143.747208662,
                    288895.85493609926: 288571.873604331,
                    144447.92746804963: 144285.936802165,
                    72223.96373402482: 72142.9684010827,
                    36111.98186701241: 36071.4842005414,
                    18055.990933506204: 18035.7421002707,
                    9027.995466753102: 9017.87105013534,
                    4513.997733376551: 4508.93552506767,
                    2256.998866688275: 2254.467762533835,
                    1128.4994333441375: 1127.2338812669175,
                    564.2497166720688: 563.6169406334587
                };
            }

            return this._scaleValues[scale] || scale;
        },

        // 设置激活图层
        _setActiveLayer: function () {
            var layerInfo;

            if (this.layers) {
                if (this._identifier) {
                    layerInfo = array.filter(this.layers, function (layer) {
                        return layer.identifier === this._identifier;
                    }, this)[0];
                } else {
                    layerInfo = this.layers[0];
                    this._identifier = this.layers[0].identifier;
                }

                if (layerInfo) {
                    // format
                    this.format = layerInfo.formats[0];
                    //this.format.indexOf("image/") === -1 && (this.format = "image/" + this.format);
                    // _style
                    layerInfo.styles && (this._style = layerInfo.styles[0]);
                    // _dimension
                    layerInfo.dimensions && (this._dimension = layerInfo.dimensions[0]);
                    // tileMatrixSetInfo
                    var tileMatrixSetInfo;
                    if (this.preferNative) {
                        // 优先选择nativeTileMatrixSet
                        var filterInfos = array.filter(layerInfo.tileMatrixSetInfos, function (info) {
                            return info.tileMatrixSet == "nativeTileMatrixSet";
                        });
                        tileMatrixSetInfo = filterInfos[0] || layerInfo.tileMatrixSetInfos[0];
                    } else {
                        tileMatrixSetInfo = layerInfo.tileMatrixSetInfos[0];
                    }
                    // _tileMatrixSetId
                    this._tileMatrixSetId = tileMatrixSetInfo.tileMatrixSet;
                    // description
                    this.description = layerInfo.description;
                    this.title = layerInfo.title;
                    this.spatialReference = tileMatrixSetInfo.tileInfo.spatialReference;
                    this.tileInfo = tileMatrixSetInfo.tileInfo;
                    /*this._levelToLevelValue = [];
                    array.forEach(this.tileInfo.lods, function(lod) {
                    this._levelToLevelValue[lod.level] = lod.levelValue ? lod.levelValue : lod.level;
                    }, this);*/
                    if (this.spatialReference.wkid === 102100 || this.spatialReference.wkid === 102113) {
                        this.fullExtent = this.initialExtent = webMercatorUtils.geographicToWebMercator(layerInfo.gcsExtent);
                    } else if (this.spatialReference.wkid === 4326) {
                        this.fullExtent = this.initialExtent = layerInfo.gcsExtent;
                    } else {
                        this.fullExtent = tileMatrixSetInfo.fullExtent;
                        this.initialExtent = tileMatrixSetInfo.initialExtent;
                    }
                    //this.resourceUrls = layerInfo.resourceUrls;
                    //this.UrlTemplate = this._getTileUrlTemplate();
                    this.layerInfo = {
                        identifier: this._identifier,
                        tileMatrixSet: this._tileMatrixSetId,
                        format: this.format,
                        style: this._style,
                        fullExtent: this.fullExtent,
                        initialExtent: this.initialExtent,
                        tileInfo: this.tileInfo,
                        title: this.title,
                        description: this.description
                    };
                } else {
                    console.error("couldn't find the layer " + this._identifier);
                    this.onError(Error("couldn't find the layer " + this._identifier));
                }
            }
        },

        // 获取能力文档出错
        _getCapabilitiesError: function (err) {
            console.error("Failed to get capabilities xml");
            this.onError(err);
        },

        // 解析字符串为数值
        _parseNumber: function (num) {
            var result = null;

            if (num.split("E").length > 1) {
                var temp = num.split("E");
                result = temp[0] * Math.pow(10, temp[1]);
            } else {
                result = parseFloat(num);
            }

            return result;
        },

        _getTag: function (tagName, xml) {
            var tags = kernel.query(tagName, xml);
            return (tags && tags.length > 0) ? tags[0] : null;
        },

        _getTagValues: function (tagTreeName, xml) {
            var tagValues = [];
            var tagNames = tagTreeName.split(">");
            var tag, values;
            tag = kernel.query(tagNames[0], xml)[0];
            if (tagNames.length > 1) {
                for (var i = 1; i < tagNames.length - 1; i++) {
                    tag = kernel.query(tagNames[i], tag)[0];
                }
                values = kernel.query(tagNames[tagNames.length - 1], tag);
            } else {
                values = kernel.query(tagNames[0], xml);
            }

            if (values && values.length > 0) {
                array.forEach(values, function (value) {
                    if (has("ie")) {
                        tagValues.push(value.childNodes[0].value || value.childNodes[0].nodeValue);
                    } else {
                        tagValues.push(value.textContent);
                    }
                });
            }
            return tagValues;
        },

        _getAttributeValue: function (tagName, attrName, xml, defaultValue) {
            var value = kernel.query(tagName, xml);
            if (value && value.length > 0) {
                return value[0].getAttribute(attrName);
            } else {
                return defaultValue;
            }
        },

        _getAttributeValues: function (tagName, attrName, xml) {
            var values = kernel.query(tagName, xml);
            var attrValues = [];
            if (values && values.length > 0) {
                array.forEach(values, function (value) {
                    attrValues.push(value.getAttribute(attrName));
                });
            }
            return attrValues;
        },

        _getTagWithChildTagValue: function (parentTagName, childTagName, tagValue, xml) {
            //find the immediate children with the name of parentTagName
            var children = xml.childNodes;
            var childTagValue;
            for (var j = 0; j < children.length; j++) {
                if (children[j].nodeName.indexOf(parentTagName) > -1) {
                    //tags.push(children[j]);
                    if (has("ie")) {
                        if (esriLang.isDefined(kernel.query(childTagName, children[j])[0])) {
                            childTagValue = kernel.query(childTagName, children[j])[0].childNodes[0].value || kernel.query(childTagName, children[j])[0].childNodes[0].nodeValue;
                        }
                    } else {
                        if (esriLang.isDefined(kernel.query(childTagName, children[j])[0])) {
                            childTagValue = kernel.query(childTagName, children[j])[0].textContent;
                        }
                    }
                    if (childTagValue === tagValue) {
                        return children[j];
                    }
                }
            }
        }
    });
});

