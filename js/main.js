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

var introText = 'The Armed Conflict Location and Event Data Project (ACLED) maps points of violence across Africa. These points reveal the distribution of violence throughout Nigeria. ';
var introText2 = 'These slides help to give an overview of such conflicts, proiding information on actors involved, fatalities, notes, and location.';
var units = 'This purpose of these slides is to help policymakers and aid workers by highlighting violent acts throughout Nigeria in greater detail. To the right is a map showing points for each event: the darker the color, the greater the number of recorded fatalities. To get more information about a location, click on that point on the map.';
var clusters = 'Explore clusters of violence throughout the city. Click to get more information about each point, and reset the map using the button below.';

/* =====================
Slides
===================== */

var slide1 = function(dataset){
document.getElementById('previous-button').className = '';
document.getElementById('next-button').className = 'button-next-1';
$("#info").text("Introduction");
$("#info2").text(introText);
$("#info3").text(introText2);
$("#next-button").show();
$("#close").hide();
$("#legend").hide();
$("#link").hide();
$.ajax(dataset).done(function(data) {
var parsedData = JSON.parse(data);
markers = L.geoJson(parsedData, {
  style: function(feature) {
    return {
      color: "#774337"};
    },
    pointToLayer: function(feature, latlng) {
      return new L.CircleMarker(latlng, {radius: 7, fillOpacity: 0.75});
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
document.getElementById("previous-button").className = "button-previous";
document.getElementById("next-button").className = "button-next-rest";
$("#info").text("Fatalities");
$("#info2").text("");
$("#info3").text(units);
$("#close").hide();
$("#legend").hide();
$("#link").hide();
$.ajax(dataset).done(function(data) {
map.removeLayer(markers);
var parsedData = JSON.parse(data);
markers = L.geoJson(parsedData, {
style: function(feature) {
  if (feature.properties.FATALITIES <= 1)
  return {
    color: "#00B3B3"};
  if (feature.properties.FATALITIES <= 5)
  return {
    color: "#009A9A"};
  if (feature.properties.FATALITIES <= 10)
  return {
    color: "#008080"};
  if (feature.properties.FATALITIES <= 50)
  return {
    color: "#006767"};
  if (feature.properties.FATALITIES <= 100)
 return {
    color: "#004D4D"};
  if (feature.properties.FATALITIES <= 600)
  return {
    color: "#003434"};
  else
  return {
    color: "#CEFFFF"};
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
document.getElementById("previous-button").className = "button-previous";
document.getElementById("next-button").className = "button-next-rest";
$("#info").text("Fatalities");
$("#info2").text("");
$("#info3").text(units);
$("#close").hide();
$("#legend").hide();
$("#link").hide();
$.ajax(data2).done(function(data) {
map.removeLayer(markers);
var parsedData = JSON.parse(data);
function style(feature) {
    return {
        fillColor: '#6E5550',
        weight: 1.5,
        opacity: 1,
        color: '#4D3B38',
        fillOpacity: 0.7
    };
}
markers = L.geoJson(parsedData, {
  style: style
}).addTo(map);
});
$("#next-button").off();
$("#next-button").on("click", function(){
  slide4(dataset);
});
$("#previous-button").off();
$("#previous-button").on("click", function(){
  slide2(dataset);
  map.removeLayer(markers);
});
};

var slide4 = function(dataset) {
  document.getElementById("previous-button").className = "button-previous";
  document.getElementById("next-button").className = "button-next-rest";
  $("#info").text("Clustering");
  $("#info2").text("");
  $("#info3").text(clusters);
  $("#close").show();
  $("#legend").hide();
  $("#link").hide();
  $("#next-button").hide();
  $.ajax(dataset).done(function(data) {
    map.removeLayer(markers);
    var parsedData = JSON.parse(data);
    markers = L.markerClusterGroup();
    /*points = L.geoJson(parsedData, {
      pointToLayer: function(feature, latLng) {
         return L.marker(latLng)
        .bindPopup(feature.properties.Name);
      }
    });*/
    points = L.geoJson(parsedData, {
      style: function(feature) {
        return {
          color: "#708A92"};
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
    $("#reslults").hide();
    this.map.setView(new L.LatLng(9.0765, 8.5432), 6);
  };
  $("#close").click(function() {
    closeResults();
  });
  $("#previous-button").off();
  $("#previous-button").on("click", function(){
    slide3(dataset);
    $("#next-button").show();
  });
};

$(document).ready(function() {
  slide1(dataset);
});
