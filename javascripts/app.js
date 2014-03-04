$(document).foundation();

$(function() {
    var map = new OpenLayers.Map('map', {theme: null});
    var osm = new OpenLayers.Layer.OSM();

    map.addLayer(osm);
    map.zoomToMaxExtent();

    var style = {
        strokeColor: '#004c97',
        strokeOpacity: 0.7,
        strokeWidth: 2
    };

    $.get('/placesihavebeen/places.json').done(function(places) {
        var valid = _.filter(places, function(item) {
            return item.longitude && item.latitude;    
        }).map(function(item) {
            return {lonlat: new OpenLayers.LonLat(item.longitude, item.latitude), count: item.count};        
        });

        var heatmap = new OpenLayers.Layer.Heatmap( "Heatmap Layer", map, osm, 
            {visible: true, radius:10}, 
            {isBaseLayer: false, opacity: 0.3, projection: new OpenLayers.Projection("EPSG:4326")});

        map.addLayer(heatmap);

        var dataSet = {
            max: 100,
            data: valid
        };

        heatmap.setDataSet(dataSet);
    });
});
