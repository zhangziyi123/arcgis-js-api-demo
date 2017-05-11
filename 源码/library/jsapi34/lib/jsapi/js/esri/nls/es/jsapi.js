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
define("esri/nls/es/jsapi",({io:{proxyNotSet:"esri.config.defaults.io.proxyUrl no está configurado."},map:{deprecateReorderLayerString:"Map.reorderLayer(/*String*/ id, /*Number*/ index) depreciada. Utilice Map.reorderLayer(/*Layer*/ layer, /*Number*/ index).",deprecateShiftDblClickZoom:"Map.(enable/disable)ShiftDoubleClickZoom depreciado. No se admitirá el comportamiento Shift-Double-Click zoom."},geometry:{deprecateToScreenPoint:"esri.geometry.toScreenPoint depreciado. Utilice esri.geometry.toScreenGeometry.",deprecateToMapPoint:"esri.geometry.toMapPoint depreciado. Utilice esri.geometry.toMapGeometry."},layers:{tiled:{tileError:"No se puede cargar la tesela"},dynamic:{imageError:"No se puede cargar la imagen"},graphics:{drawingError:"No se puede dibujar el gráfico "},agstiled:{deprecateRoundrobin:"Opción de constructor 'roundrobin' depreciada. Utilice la opción 'tileServers'."},imageParameters:{deprecateBBox:"Propiedad 'bbox' depreciada. Utilice la propiedad 'extensión'."},FeatureLayer:{noOIDField:"objectIdField no está configurado [url: ${url}]",fieldNotFound:"no se pudo encontrar el campo '${field}' en la información de 'campos' de la capa [url: ${url}]",noGeometryField:"no se pudo encontrar un campo de tipo 'esriFieldTypeGeometry' en la información de 'campos' de la capa. Si está utilizando una capa de servicio de mapas, las entidades no tendrán geometría [url: ${url}]",invalidParams:"la consulta contiene uno o más parámetros no admitidos",updateError:"se encontró un error durante la actualización de la capa",createUserSeconds:"Creado por ${userId} hace unos segundos",createUserMinute:"Creado por ${userId} hace un minuto",editUserSeconds:"Editado por ${userId} hace unos segundos",editUserMinute:"Editado por ${userId} hace un minuto",createSeconds:"Creado hace unos segundos",createMinute:"Creado hace un minuto",editSeconds:"Editado hace unos segundos",editMinute:"Editado hace un minuto",createUserMinutes:"Creado por ${userId} hace ${minutes} minutos",createUserHour:"Creado por ${userId} hace una hora",createUserHours:"Creado por ${userId} hace ${hours} horas",createUserWeekDay:"Creado por ${userId} el ${weekDay} a las ${formattedTime}",createUserFull:"Creado por ${userId} el ${formattedDate} a las ${formattedTime}",editUserMinutes:"Editado por ${userId} hace ${minutes} minutos",editUserHour:"Editado por ${userId} hace una hora",editUserHours:"Editado por ${userId} hace ${hours} horas",editUserWeekDay:"Editado por ${userId} el ${weekDay} a las ${formattedTime}",editUserFull:"Editado por ${userId} el ${formattedDate} a las ${formattedTime}",createUser:"Creado por ${userId}",editUser:"Editado por ${userId}",createMinutes:"Creado hace ${minutes} minutos",createHour:"Creado hace una hora",createHours:"Creado hace ${hours} horas",createWeekDay:"Creado el ${weekDay} a las ${formattedTime}",createFull:"Creado el ${formattedDate} a las ${formattedTime}",editMinutes:"Editado hace ${minutes} minutos",editHour:"Editado hace una hora",editHours:"Editado hace ${hours} horas",editWeekDay:"Editado el ${weekDay} a las ${formattedTime}",editFull:"Editado el ${formattedDate} a las ${formattedTime}"}},tasks:{gp:{gpDataTypeNotHandled:"No se maneja el tipo de datos GP."},na:{route:{routeNameNotSpecified:"No se especificó 'RouteName' para al menos 1 parada en FeatureSet de paradas."}},query:{invalid:"No se pudo realizar la consulta. Verifique los parámetros."}},toolbars:{draw:{convertAntiClockwisePolygon:"Los polígonos dibujados en sentido contrario a las agujas del reloj se invertirán al sentido de las agujas del reloj.",addPoint:"Haga clic para agregar un punto",addShape:"Haga clic para agregar una forma, o mantenga presionado el botón izquierdo del ratón para comenzar y suelte para finalizar",addMultipoint:"Haga clic para comenzar a agregar puntos",freehand:"Mantenga presionado el botón izquierdo del ratón para comenzar y suelte para finalizar",start:"Haga clic para comenzar a dibujar",resume:"Haga clic para seguir dibujando",complete:"Haga doble clic para completar",finish:"Haga doble clic para finalizar",invalidType:"Tipo de geometría no admitido"},edit:{invalidType:"No se pudo activar la herramienta. Verifique si la herramienta es válida para el tipo de geometría utilizado.",deleteLabel:"Eliminar"}},virtualearth:{vetiledlayer:{bingMapsKeyNotSpecified:"Debe introducir la BingMapsKey."},vegeocode:{bingMapsKeyNotSpecified:"Debe introducir la BingMapsKey.",requestQueued:"No se obtuvo el token del servidor. Colocando la solicitud en espera para ser ejecutada después de obtener el token del servidor."}},widgets:{attributeInspector:{NLS_first:"Primera",NLS_previous:"Anterior",NLS_next:"Siguiente",NLS_last:"Última",NLS_deleteFeature:"Eliminar",NLS_title:"Editar atributos",NLS_errorInvalid:"No válido",NLS_validationInt:"El valor debe ser un entero.",NLS_validationFlt:"El valor debe ser flotante.",NLS_of:"de",NLS_noFeaturesSelected:"No se seleccionaron entidades"},overviewMap:{NLS_drag:"Arrastre para cambiar la extensión del mapa",NLS_show:"Mostrar vista general de mapa",NLS_hide:"Ocultar vista general de mapa",NLS_maximize:"Maximizar",NLS_restore:"Restaurar",NLS_noMap:"no se encontró 'mapa' en los parámetros de entrada",NLS_noLayer:"el mapa principal no tiene una capa base",NLS_invalidSR:"la referencia espacial de la capa utilizada no es compatible con el mapa principal",NLS_invalidType:"tipo de capa no admitido. Los tipos válidos son 'TiledMapServiceLayer' y 'DynamicMapServiceLayer'"},timeSlider:{NLS_first:"Primera",NLS_previous:"Anterior",NLS_next:"Siguiente",NLS_play:"Reproducir/Pausa",NLS_invalidTimeExtent:"No se especificó la TimeExtent, o bien tiene un formato incorrecto."},attachmentEditor:{NLS_attachments:"Adjuntos:",NLS_add:"Agregar",NLS_none:"Ninguno",NLS_error:"Hubo un error.",NLS_fileNotSupported:"Este tipo de archivo no es compatible."},directions:{error:{notEnoughStops:"Introduzca un origen y un destino.",unknownStop:"No se pudo encontrar la ubicación '<name>'.",routeTask:"No se pudo crear la ruta a estas direcciones.",locator:"No se pudo encontrar la ubicación.",invalidStopType:"Tipo de parada no válido",locatorUndefined:"No se pudo invertir la geocodificación. La dirección URL del localizador está sin definir.",noAddresses:"No se devolvieron direcciones.",noStops:"No se proporcionaron paradas para que se agregaran.",maximumStops:"Se ha alcanzado el número máximo de paradas"},time:{minute:"minuto",minutes:"minutos",hour:"hora",hours:"horas"},units:{KILOMETERS:{name:"kilómetros",abbr:"km."},METERS:{name:"metros",abbr:"m."},MILES:{name:"millas",abbr:"mi."},NAUTICAL_MILES:{name:"millas náuticas",abbr:"mn."}},showOptions:"Mostrar opciones",hideOptions:"Ocultar opciones",findOptimalOrder:"Buscar orden óptimo",returnToStart:"Volver al inicio",addDestination:"Agregar destino",viewFullRoute:"Acercar a ruta completa",getDirections:"Obtener indicaciones",reverseDirections:"Invertir indicaciones",print:"Imprimir",printNotes:"Introducir notas aquí",printDisclaimer:"Las indicaciones se proporcionan exclusivamente a efectos de planificación y están sujetas a los <a href='http://www.esri.com/legal/software-license' target='_blank'>términos de uso de Esri</a>. Las condiciones reales de las carreteras pueden afectar a la precisión de las indicaciones y deben tenerse en cuenta junto con la señalización y las restricciones legales. El usuario asume todos los riesgos derivados del uso."},editor:{tools:{NLS_attributesLbl:"Atributos",NLS_cutLbl:"Cortar",NLS_deleteLbl:"Eliminar",NLS_extentLbl:"Extensión",NLS_freehandPolygonLbl:"Polígono a mano alzada",NLS_freehandPolylineLbl:"Polilínea a mano alzada",NLS_pointLbl:"Punto",NLS_polygonLbl:"Polígono",NLS_polylineLbl:"Polilínea",NLS_reshapeLbl:"Cambiar de forma",NLS_selectionNewLbl:"Nueva selección",NLS_selectionAddLbl:"Agregar a la selección",NLS_selectionClearLbl:"Borrar selección",NLS_selectionRemoveLbl:"Sustraer de la selección",NLS_selectionUnionLbl:"Combinación",NLS_autoCompleteLbl:"Completar automáticamente",NLS_unionLbl:"Combinación",NLS_rectangleLbl:"Rectángulo",NLS_circleLbl:"Círculo",NLS_ellipseLbl:"Elipse",NLS_triangleLbl:"Triángulo",NLS_arrowLbl:"Flecha",NLS_arrowLeftLbl:"Flecha de desplazamiento hacia la izquierda",NLS_arrowUpLbl:"Flecha de desplazamiento hacia arriba",NLS_arrowDownLbl:"Flecha de desplazamiento hacia abajo",NLS_arrowRightLbl:"Flecha de desplazamiento hacia la derecha",NLS_undoLbl:"Deshacer",NLS_redoLbl:"Rehacer"}},Geocoder:{main:{clearButtonTitle:"Borrar búsqueda",searchButtonTitle:"Buscar",geocoderMenuButtonTitle:"Cambiar geocodificador",geocoderMenuHeader:"Seleccionar geocodificador",geocoderMenuCloseTitle:"Cerrar menú",untitledGeocoder:"Geocodificador sin título"},esriGeocoderName:"Esri World Geocoder"},HistogramTimeSlider:{NLS_range:"Alcance",NLS_cumulative:"Acumulativo",NLS_play:"Reproducir/Pausa",NLS_invalidTimeExtent:"No se especificó la TimeExtent, o bien tiene un formato incorrecto.",NLS_overview:"VISIÓN GENERAL",NLS_range:"alcance completo"},legend:{NLS_points:"Puntos",NLS_lines:"Líneas",NLS_polygons:"Polígonos",NLS_creatingLegend:"Creando leyenda",NLS_noLegend:"No hay leyenda"},popup:{NLS_moreInfo:"Más información",NLS_searching:"Buscando",NLS_prevFeature:"Entidad anterior",NLS_nextFeature:"Entidad siguiente",NLS_close:"Cerrar",NLS_prevMedia:"Elemento anterior",NLS_nextMedia:"Elemento siguiente",NLS_noInfo:"No hay información disponible",NLS_noAttach:"No se encontraron adjuntos",NLS_maximize:"Maximizar",NLS_restore:"Restaurar",NLS_zoomTo:"Acercar a",NLS_pagingInfo:"(${index} de ${total})",NLS_attach:"Adjuntos"},measurement:{NLS_distance:"Distancia",NLS_area:"Área",NLS_location:"Ubicación",NLS_resultLabel:"Resultado de la medición",NLS_length_miles:"Millas",NLS_length_kilometers:"Kilómetros",NLS_length_feet:"Pies",NLS_length_meters:"Metros",NLS_length_yards:"Yardas",NLS_area_acres:"Acres",NLS_area_sq_miles:"Millas cuadradas",NLS_area_sq_kilometers:"Kilómetros cuadrados",NLS_area_hectares:"Hectáreas",NLS_area_sq_yards:"Yardas cuadradas",NLS_area_sq_feet:"Pies cuadrados",NLS_area_sq_meters:"Metros cuadrados",NLS_deg_min_sec:"DMS",NLS_decimal_degrees:"Grados",NLS_map_coordinate:"Coordenadas del mapa",NLS_longitude:"Longitud",NLS_latitude:"Latitud"},bookmarks:{NLS_add_bookmark:"Agregar marcador",NLS_new_bookmark:"Sin título",NLS_bookmark_edit:"Editar",NLS_bookmark_remove:"Eliminar"},print:{NLS_print:"Imprimir",NLS_printing:"Imprimiendo",NLS_printout:"Impresión"},templatePicker:{creationDisabled:"La creación de entidades está deshabilitada para todas las capas.",loading:"Cargando.."}},arcgis:{utils:{baseLayerError:"No se pudo cargar la capa del mapa base",geometryServiceError:"Proporcionar un servicio de geometría para abrir el mapa Web."}},identity:{lblItem:"elemento",title:"Iniciar sesión",info:"Inicie sesión para acceder al elemento en ${server} ${resource}",lblUser:"Nombre de usuario:",lblPwd:"Contraseña:",lblOk:"Aceptar",lblSigning:"Ingresando...",lblCancel:"Cancelar",errorMsg:"Usuario/contraseña no válido. Por favor intente nuevamente.",invalidUser:"El nombre de usuario o la contraseña que ha introducido son incorrectos.",forbidden:"El nombre de usuario y la contraseña son válidos, pero no dispone de acceso a este recurso.",noAuthService:"No se pudo acceder al servicio de autenticación."},common:{cancel:"Cancelar",ok:"Aceptar",create:"Crear",close:"Cerrar",done:"Listo",apply:"Aplicar",remove:"Eliminar",open:"Abrir",edit:"Editar",share:"Compartir",save:"Guardar",help:"Ayuda",warning:"Advertencia",deleteLabel:"Eliminar",titleLabel:"Título:",newLabel:"Nuevo",arcgis:"ArcGIS",previous:"Anterior",submit:"Enviar",next:"Siguiente",yesLabel:"Sí",noLabel:"No",errorTitle:"Error",upload:"Cargar",sum:"Suma",minimum:"Mínimo",maximum:"Máximo",average:"Promedio",standardDev:"Desviación estándar",statistic:"Estadística",attribute:"Atributo",selectAttribute:"Seleccionar atributo",runAnalysis:"Ejecutar análisis",oneLabel:"1.",twoLabel:"2.",threeLabel:"3.",fourLabel:"4.",outputnameMissingMsg:"Se requiere el nombre de salida",miles:"Milla(s)",kilometers:"Kilómetro(s)",meters:"Metro(s)",feet:"Pie(s)",degree:"Grado(s) decimal(es)",inches:"Pulgada(s)",nautMiles:"Milla(s) náutica(s)",pointsUnit:"Punto(s)",yards:"Yarda(s)",comingSoonLabel:"Próximamente"},analysisTools:{performAnalysis:"Realizar análisis",summarizeData:"Resumir datos",findLocations:"Buscar ubicaciones",aggregateTool:"Agregar puntos",bufferTool:"Datos de zona de influencia",dataEnrichment:"Data Enrichment",analyzePatterns:"Analizar patrones",useProximity:"Utilizar proximidad",manageData:"Administrar datos",aggregateToolName:"Agregar puntos",bufferToolName:"Crear zonas de influencia",summarizeWithin:"Resumir dentro de",sumnearby:"Resumir cerca de",createBuffers:"Crear zonas de influencia",driveTimes:"Crear polígonos de tiempo de recorrido",findExistingLocations:"Buscar ubicaciones existentes",findNewLocations:"Derivar nuevas ubicaciones",geoenrichLayer:"Enriquecer entidades",findRoute:"Buscar ruta",findClosestFacility:"Buscar más cercano",generateFleetPlan:"Generar plan de ruta de flota",findHotSpots:"Buscar puntos calientes",createDensitySurface:"Crear superficie de densidad",correlationReporter:"Explorar correlaciones",createInterpolatedSurface:"Crear superficie",attributeCalculator:"Calculadora de atributos",overlayLayers:"Superponer capas",mergeLayers:"Fusionar capas",dissolveBoundaries:"Disolver límites",extractData:"Extraer datos",orgUsrMsg:"Debe ser miembro de una organización para ejecutar este servicio.",pubRoleMsg:"Su cuenta on-line no se ha asignado al rol de responsable de publicación.",servNameExists:"Ya dispone de un resultado con este nombre. Cambie el nombre del resultado y vuelva a enviar el análisis",outputLayerLabel:"Nombre de capa de resultados",outputFileName:"Nombre de archivo de salida",emptyResultInfoMsg:"The result of your analysis did not return any features. No layer will be created."},aggregatePointsTool:{aggregateDefine:"Contar <b>${layername}</b> dentro de",outputLayerName:"Agregación de ${pointlayername} a ${polygonlayername}",groupByLabel:"Elegir el atributo de agrupación (opcional)",itemDescription:"Servicio de entidades generado de la ejecución de las soluciones Agregar puntos. Los puntos del archivo csv ${pointlayername} se agregaron a ${polygonlayername}",itemTags:"Análisis, Agregar puntos, ${pointlayername}, ${polygonlayername}",itemSnippet:"Servicio de entidades de análisis generado de Agregar puntos",removeAttrStats:"Quitar estadísticas de atributos",keepPolygonLabel:"Mantener polígonos sin puntos",addStatsLabel:"Agregar estadística (opcional)",chooseAreaLabel:"Elegir área"},findHotSpotsTool:{hotspotsPolyDefine:"Analizar <b>${layername}</b> para encontrar puntos calientes y fríos estadísticamente significativos ",hotspotsPointDefine:"Analizar <b>${layername}</b> para encontrar puntos calientes y fríos estadísticamente significativos ",fieldLabel:"con o sin campo de análisis",noAnalysisField:"No hay campo de análisis",hotspots:"Puntos calientes",outputLayerName:"Puntos calientes ${layername}",Options:"Opciones",defineBoundingLabel:"Definir ubicación posible de incidentes",provideAggLabel:"Proporcionar áreas de agregación para sumar incidentes",defaultBoundingOption:"Seleccionar áreas de límite",defaultAggregationOption:"Seleccionar áreas de agregación",itemDescription:"Servicio de entidades generado de la ejecución de la solución Buscar puntos calientes.",itemTags:"Análisis, Puntos calientes, ${layername}, ${fieldname}",itemSnippet:"Servicio de entidades de análisis generado de Buscar puntos calientes",chooseAttributeLabel:"Elegir un campo de análisis",blayerName:"Dibujar límites"},overlayLayersTool:{overlayDefine:"Superponer <b>${layername}</b> con",chooseOverlayLayer:"Elegir capa de superposición",chooseOverlayMethod:"Elegir método de superposición",itemDescription:"Servicio de entidades generado de la ejecución de la solución Superponer capas.",itemTags:"Análisis, Superponer capas, ${layername}",itemSnippet:"Servicio de entidades de análisis generado de Superponer capas",unionOutputLyrName:"combinación de ${layername} y ${overlayname}",intersectOutputLyrName:"intersección de ${layername} y ${overlayname}",eraseOutputLyrName:"borrar ${layername} con ${overlayname}",overlayLayerPolyMsg:"La capa de superposición debería ser una capa de polígono para la superposición de combinación",notSupportedEraseOverlayMsg:"Esta capa de superposición no se admite para la superposición de borrado. Se utilizará como predeterminada la superposición de intersección.",intersect:"Intersecar",union:"Combinación",erase:"Borrar"},bufferTool:{bufferDefine:"Crear zonas de influencia desde <b>${layername}</b>",outputLayerName:"Zona de influencia de ${layername}",sizeLabel:"Introducir tamaño de zona de influencia",sizeHelp:"Para crear varias zonas de influencia, introduzca las distancias separadas por espacios (2 3 5,5).",typeLabel:"Tipo de zona de influencia",resultLabel:"Nombre de capa de resultados",optionsLabel:"Opciones",itemDescription:"Servicio de entidades generado de la ejecución de la solución Entidades de zona de influencia. Se creó una zona de influencia de ${distance_field} ${units} para la entrada de ${layername}",itemTags:"Zona de influencia, ${layername}",itemSnippet:"Servicio de entidades de análisis generado de Zona de influencia",overlap:"Superponer",dissolve:"Disolver",include:"Incluir",exclude:"Excluir",around:"Alrededor",sideType:"Tipo lateral",endType:"Tipo final",left:"Izquierda",right:"Derecha",round:"Redondo",flat:"Plano",multipleDistance:"Las zonas de influencia de varias distancias deberían ser",rings:"Anillos",disks:"Discos",areaofInputPoly:"Área de polígonos de entrada en polígonos de zona de influencia",distanceMsg:"Solo se permiten valores numéricos",distance:"Distancia",field:"Campo"},driveTimes:{toolDefine:"Crear áreas alrededor de <b>${layername}</b>",outputLayerName:"Recorrido desde ${layername}: ---",measureLabel:"Medición:",measureHelp:"Para generar una salida con varias áreas para cada punto, escriba los tamaños separados por espacios (2 3,5 5)",areaLabel:"Áreas desde diferentes puntos:",trafficLabel:"Usar condiciones del tráfico (opcional)",resultLabel:"Nombre de capa de resultados",itemDescription:"Servicio de entidades generado de ejecución de la solución Crear tiempos de recorrido.",itemTags:"Tiempos de recorrido, ${layername}",itemSnippet:"Servicio de entidades de análisis generado de Crear tiempos de recorrido"},extractDataTool:{layersToExtract:"Capas para extraer",studyArea:"Área de estudio",outputDataFormat:"Formato de datos de salida",filegdb:"Geodatabase de archivos",shpFile:"Shapefile",lyrpkg:"Paquete de capas",selectFtrs:"Seleccionar entidades",clipFtrs:"Recortar entidades",sameAsDisplay:"Igual que visualización",sameAsLayer:"Igual que ${layername}",outputfileName:"OutputName.zip",itemDescription:"Archivo generado de la ejecución de la solución Extraer datos.",itemTags:"Análisis, Extraer datos",itemSnippet:"Elemento de archivo de análisis generado de Extraer datos"}}));