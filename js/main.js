/* =====================
Leaflet Configuration
===================== */

var map = L.map('map', {
  center: [9.0765, 8.5432],
  zoom: 6
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
}).addTo(map);

/* =====================
Setup
===================== */

var dataset = 'https://raw.githubusercontent.com/bridgetrkane/webmapping/master/Nigeria.geojson';
var data2 = 'https://raw.githubusercontent.com/bridgetrkane/webmapping/master/NGAboundaries.geoJSON';
var markers;
var markers = [];
var polygons = [];

var introText = 'The Armed Conflict Location and Event Data Project (ACLED) maps points of violence across Africa. Hover over the map to learn more about the distribution of towns and provinces in Nigeria. ';
var introText2 = 'These slides help to give an overview of conflict events, proiding information on event date, type, fatalities, notes, and location.';
var t2 = 'This purpose of these slides is to help policymakers and aid workers by highlighting violent acts throughout Nigeria in greater detail. The map above features points for each event: the darker the color, the greater the number of recorded fatalities. To get more information about a location, click on that point on the map.';
var t3 = 'The map above shows the distribution of points provided by ACLED. Use the tool on the left to draw shapes around areas of interest; the sidebar on the right will populate with additional information to scroll through!';
var t4 = 'This heat map gives provides another visualization of violence throughout the country, as weighted by fatalities greater than 100. Note the concentration of violence in the northeastern corner of the country, where Boko Haram operates.';
var t5 = 'Explore clusters of violent events throughout the city. Click to get more information about each point, including notes. Reset the map using the button below.';


/* =====================
Slides
===================== */

var slide1 = function(dataset){
$('previous-button').hide('button-previous');
$('next-button').addClass('button-next-1');
$("#info").text("Introduction");
$("#info2").text(introText);
$("#info3").text(introText2);
$("#previous-button").hide();
$("#close").hide();
$("#sidebar").hide();

var defaultStyle = {
        fillColor: '#6E5550',
        weight: 1.5,
        opacity: 1,
        color: '#4D3B38',
        fillOpacity: 0.7
};

var highlightStyle = {
    color: '#081C1C',
    weight: 3,
    opacity: 0.6,
    fillOpacity: 0.7,
    fillColor: '#113B3B'
};

$.ajax(data2).done(function(data) {
var parsedData = JSON.parse(data);
markers = L.geoJson(parsedData, {
  onEachFeature: function(feature, layer) {
      // Load the default style.
      layer.setStyle(defaultStyle);
      // Create a self-invoking function that passes in the layer
      // and the properties associated with this particular record.
      (function(layer, properties) {
        // Create a mouseover event
        layer.on("mouseover", function (e) {
          // Change the style to the highlighted version
          layer.setStyle(highlightStyle);
          // Create a popup with a unique ID linked to this record
          var popup = $("<div></div>", {
              id: "popup-" + properties.OBJECTID,
              css: {
                  position: "absolute",
                  bottom: "85px",
                  left: "70%",
                  zIndex: 1002,
                  backgroundColor: "#113B3B",
                  padding: "12px",
                  //border: "3px radius #113B3B",
                  'border-radius': "3px",
                  color: '#D1D0CE',
              }
          });
          // Insert a headline into that popup
          var hed = $("<div></div>", {
              text: 'LOCATION:  ' + properties.NAME_2 + ", " + properties.NAME_1,
              css: {fontSize: "16px", marginBottom: "5px"}
          }).appendTo(popup);
          // Add the popup to the map
          popup.appendTo("#map");
        });
        // Create a mouseout event that undoes the mouseover changes
        layer.on("mouseout", function (e) {
          // Start by reverting the style back
          layer.setStyle(defaultStyle);
          // And then destroying the popup
          $("#popup-" + properties.OBJECTID).remove();
        });
        // Close the "anonymous" wrapper function, and call it while passing
        // in the variables necessary to make the events work the way we want.
      })(layer, feature.properties);
  }
});
markers.addTo(map);
});
$("#next-button").off();
$("#next-button").on("click", function(){
  slide2(dataset);
});
};

var slide2 = function(dataset){
$('previous-button').addClass('button-previous');
$('next-button').addClass('button-next-rest');
$("#info").text("Fatalities");
$("#info2").text("");
$("#info3").text(t2);
$("#previous-button").show();
$("#close").hide();
$("#sidebar").hide();

map.panTo(new L.LatLng(9.0765, 8.5432));

$.ajax(dataset).done(function(data) {
map.removeLayer(markers);
var parsedData = JSON.parse(data);
markers = L.geoJson(parsedData, {
style: function(feature) {
  if (feature.properties.FATALITIES <= 1)
  return {
    color: "#A5A3A7"};
  if (feature.properties.FATALITIES <= 5)
  return {
    color: "#949196"};
  if (feature.properties.FATALITIES <= 10)
  return {
    color: "#807C82"};
  if (feature.properties.FATALITIES <= 50)
  return {
    color: "#736F75"};
  if (feature.properties.FATALITIES <= 100)
 return {
    color: "#59575B"};
  if (feature.properties.FATALITIES <= 600)
  return {
    color: "#4C4A4E"};
  else
  return {
    color: "#4C4A4E"};
  },
pointToLayer: function(feature, latlng) {
return new L.CircleMarker(latlng, {radius: 7, fillOpacity: 0.75});
},
onEachFeature: function (feature, layer) {
layer.bindPopup('<b>' + 'Fatalities: ' + feature.properties.FATALITIES + '</b><br>' + 'Location: ' + feature.properties.LOCATION + '<br>' + 'Event Type: ' + feature.properties.EVENT_TYPE);
}
});
  markers.addTo(map);
});
$("#next-button").off();
$("#next-button").on("click", function(){
  slide3(dataset);
});
$("#previous-button").off();
$("#previous-button").on("click", function(){
  slide1(dataset);
  map.removeLayer(markers);
});
};

var slide3 = function(dataset){
$('previous-button').addClass('button-previous');
$('next-button').addClass('button-next-rest');
$("#info").text("Selection");
$("#info2").text("");
$("#info3").text(t3);
$("#close").hide();
$("#previous-button").show();
$("#sidebar").show();

map.panTo(new L.LatLng(9.0765, 11.5432));

var myData;
var myRectangle = [];

$.ajax(dataset).done(function(result) {
  map.removeLayer(markers);
  var parsed = JSON.parse(result);
  myData = _.chain(parsed).value();
  layer = L.geoJson(myData, {
  pointToLayer: function(feature, latlng) {
  return new L.CircleMarker(latlng, {radius: 7, fillOpacity: 0.75, color: '#9C5940'});
  },
  filter: function(feature, layer) {
        return feature.properties.FATALITIES >= 5;
    },
  onEachFeature: function (feature, layer) {
  layer.bindPopup('<b>' + 'Fatalities: ' + feature.properties.FATALITIES + '</b><br>' + 'Location: ' + feature.properties.LOCATION + '<br>' + 'Event Type: ' + feature.properties.EVENT_TYPE);
  }
  }).addTo(map);


var drawControl = new L.Control.Draw({
draw: {
  polyline: false,
  polygon: false,
  circle: false,
  marker: false,
  rectangle: true,
},
});

map.addControl(drawControl);

drawControl.setDrawingOptions({
    rectangle: {
        shapeOptions: {
            color: '6D3E2C'
        }
    }
});

map.on('draw:created', function (e) {
var type = e.layerType;
var layer = e.layer;
var id = L.stamp(layer);
var shape = layer.toGeoJSON();
var drawLayer = [];
drawLayer.push(layer);

myRectangle = {
  "type": "FeatureCollection",
  "features": [shape]
};
var Within = turf.within(myData, myRectangle);

function clearSidebar() {
  $('#shapes').empty();
}
if(typeof layer !=='undefined') {
  map.removeLayer(layer);
}

clearSidebar();

_.each(Within.features, function(element) {
  var template = '<div  class = "shape" id= "shape-'+element.id+'" data-id = "'+element.id+'"> <p> <b>Location: '+element.properties.LOCATION+' </b><br>Event Date: '+element.properties.EVENT_DATE+' <br>Event Type: '+element.properties.EVENT_TYPE+'</p></div>';
  $('#shapes').append(template);
  $('[data-id = "'+element.id+'"]').on('click',function() {
    var clickId = $(this).data('id');
    var point =_.filter(Within.features,function(ob) {
      return ob.id === clickId;
    });
  });
});
});

$("#next-button").off();
$("#next-button").on("click", function(){
  slide4(dataset);
});
$("#previous-button").off();
$("#previous-button").on("click", function(){
  slide2(dataset);
  map.removeLayer(layer);
  map.removeLayer(drawControl);
  map.addControl(removeAllControl);
});
});
};

var slide4 = function(dataset){
$('previous-button').addClass('button-previous');
$('next-button').addClass('button-next-rest');
$("#info").text("Heat Map");
$("#info2").text("");
$("#info3").text(t4);
$("#close").hide();
$("#previous-button").show();
$("#sidebar").hide();

map.panTo(new L.LatLng(11.0765, 10.5432));
map.removeLayer(layer);

$.ajax(dataset).done(function(data) {

var points = [
  [11.84644,13.16027,600],
  [11.84644,13.16027,500],
  [13.09466,13.82343,400],
  [13.09466,13.82343,400],
  [13.09466,13.82343,400],
  [13.09466,13.82343,400],
  [12.92342,13.56058,400],
  [13.09771,12.49521,400],
  [10.56617,13.31976,370],
  [12.37299,14.2069,300],
  [12.37066,14.21731,208],
  [12.28295,14.47243,205],
  [11.65583,13.42133,200],
  [11.65583,13.42133,200],
  [12.00012,8.51672,200],
  [9.92849,8.89212,162],
  [11.3362,11.1322,150],
  [10.88639,13.63,150],
  [11.84644,13.16027,117],
  [11.30827,7.82275,114],
  [11.48333,12.31444,107],
  [10.98307,13.34343,106],
  [11.76057,13.2683,101],
  [11.73705,6.96368,100],
  [12.12433,6.53461,100],
  [11.73705,6.96368,100],
  [12.12433,6.53461,100],
  [11.09322,13.82058,100],
  [11.10359,13.71298,100],
  [11.65583,13.42133,100],
  [10.26761,13.26436,100],
  [10.26761,13.26436,100],
  [13.09466,13.82343,100],
  [12.02396,13.91646,100],
  [11.21029,13.79345,100],
  [11.11324,7.72518,100],
  [11.11324,7.72518,100],
  [11.11324,7.72518,100],
];

markers = L.heatLayer(points,
  {radius: 15,
          blur: 25,
          maxZoom: 6,
}).addTo(map);

});

$("#next-button").off();
$("#next-button").on("click", function(){
  slide5(dataset);
});
$("#previous-button").off();
$("#previous-button").on("click", function(){
  slide3(dataset);
  map.removeLayer(markers);
});
};

var slide5 = function(dataset) {
  $('previous-button').addClass('button-previous');
  $('next-button').addClass('button-next-rest');
  $("#info").text("Clustering of Events");
  $("#info2").text("");
  $("#info3").text(t5);
  $("#close").show();
  $("#previous-button").show();
  $("#sidebar").hide();
  $("#next-button").hide();

  map.panTo(new L.LatLng(9.0765, 8.5432));

  $.ajax(dataset).done(function(data) {
    map.removeLayer(markers);
    var parsedData = JSON.parse(data);
    markers = L.markerClusterGroup();
    points = L.geoJson(parsedData, {
      style: function(feature) {
        return {
          color: "#113B3B"};
        },
        pointToLayer: function(feature, latlng) {
          return new L.CircleMarker(latlng, {radius: 7, fillOpacity: 0.75})
          .bindPopup('<b>' + 'Location: ' + feature.properties.LOCATION + '</b><br><br>' + 'Notes: ' + feature.properties.NOTES);
        }
      });
      markers.addTo(map);
  markers.addLayer(points);
  map.addLayer(markers);
  });
  var closeResults = function() {
    $("#intro").show();
    $("#results").hide();
    this.map.setView(new L.LatLng(9.0765, 8.5432), 6);
  };
  $("#close").click(function() {
    closeResults();
  });
  $("#previous-button").off();
  $("#previous-button").on("click", function(){
    slide4(dataset);
    $("#next-button").show();
    map.removeLayer(markers);
  });
};

$(document).ready(function() {
  slide1(dataset);
});
