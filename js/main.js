/* =====================
Leaflet Configuration
===================== */

var map = L.map('map', {
  center: [37.7739, -122.4312],
  zoom: 12
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

var dataset = 'https://raw.githubusercontent.com/bridgetrkane/Affordable-housing/b47e3c83e1f85d16cbe61cdcc71910c5f6386869/MOHCD_Affordable_Housing_Portfolio.geojson';
var markers;
var markers = [];

var introText = '"Affordable Housing" in San Francisco has different meanings for various groups of people. This Affordable Housing Resources page provides a range of housing programs that each serve a particular income level from extremely low to middle-income.';
var introText2 = 'These slides help to give an overview of Affordable Housing programs in San Francisco, including: names, addresses, unit numbers, sponsors, district supervisors, and neighborhoods.';
var units = 'This purpose of this project is to help people explore various components of  housing profile in greater detail. To the right is a map showing points for each development: the darker the color, the more units available. To get more information about a location, click on that point on the map.';
var density = 'The previous slide shows affordable housing by total number of units. By looking at the total number of projects per neighborhood, we find highest concentrations of affordable housing available in the Mission, South of Market, and Tenderloin.';
var districts = 'The San Francisco Board of Supervisors is the legislative body within the government of the City and County of San Francisco. There are 11 members of the Board of Supervisors, each representing a geographic district as shown to the right. Click & zoom around to explore districts--contact your supervisor with any additional questions via the link below.';
var clusters = 'Explore clusters of affordable housing throughout the city. Click below to reset the map!';

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
$("#info").text("Unit Density");
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
  if (feature.properties.TotalUnits <= 1)
  return {
    color: "#00B3B3"};
  if (feature.properties.TotalUnits <= 25)
  return {
    color: "#009A9A"};
  if (feature.properties.TotalUnits <= 50)
  return {
    color: "#008080"};
  if (feature.properties.TotalUnits <= 100)
  return {
    color: "#006767"};
  if (feature.properties.TotalUnits <= 200)
 return {
    color: "#004D4D"};
  if (feature.properties.TotalUnits <= 341)
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
layer.bindPopup('<b>' + feature.properties.Name +
'</b><br>' + feature.properties.Address + '<br>' + feature.properties.TotalUnits + ' Units'+ '<br>' + feature.properties.Sponsor + '<br>' + feature.properties.Neighborhood);
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

var slide3 = function(dataset) {
document.getElementById("previous-button").className = "button-previous";
  document.getElementById("next-button").className = "button-next-rest";
  $("#info").text("High Density Neighborhoods");
  $("#info2").text("");
  $("#info3").text(density);
  $("#close").hide();
  $("#legend").hide();
  $("#link").hide();
$.ajax(dataset).done(function(data) {
    map.removeLayer(markers);
    var parsedData = JSON.parse(data);
    markers = L.geoJson(parsedData, {
      style: function(feature) {
        if (feature.properties.Neighborhood == "Tenderloin")
        return {
          color: "#774337"};
        if (feature.properties.Neighborhood == "South of Market")
        return {
          color: "#774337"};
        if (feature.properties.Neighborhood == "Mission")
        return {
          color: "#774337"};
        else
        return {
          color: "#BF8273"};
        },
     pointToLayer: function(feature, latlng) {
       return new L.CircleMarker(latlng, {radius: 7, fillOpacity: 0.75});
     },
     onEachFeature: function (feature, layer) {
       layer.bindPopup('<b>' + feature.properties.Name +
       '</b><br>' + feature.properties.Neighborhood);
     }
    });
    markers.addTo(map);
  });
  $("#next-button").off();
  $("#next-button").on("click", function(){
    slide4(dataset);
  });
  $("#previous-button").off();
  $("#previous-button").on("click", function(){
    slide2(dataset);
  });
};

var slide4 = function(dataset) {
  document.getElementById("previous-button").className = "button-previous";
  document.getElementById("next-button").className = "button-next-rest";
  $("#info").text("Districts");
  $("#info2").text("");
  $("#info3").text(districts);
  $("#close").hide();
  $("#legend").show();
  $("#link").show();
  $.ajax(dataset).done(function(data) {
    map.removeLayer(markers);
    var parsedData = JSON.parse(data);
    markers = L.geoJson(parsedData, {
      style: function(feature) {
        if (feature.properties.SupervisorDistrict == 1)
        return {
          color: "#708A92"};
        if (feature.properties.SupervisorDistrict == 2)
        return {
          color: "#604D42"};
        if (feature.properties.SupervisorDistrict == 3)
        return {
          color: "#939691"};
        if (feature.properties.SupervisorDistrict == 4)
        return {
          color: "#898C7D"};
        if (feature.properties.SupervisorDistrict == 5)
        return {
          color: "#9C5940"};
        if (feature.properties.SupervisorDistrict == 6)
        return {
          color: "#505046"};
        if (feature.properties.SupervisorDistrict == 7)
        return {
          color: "#97877A"};
        if (feature.properties.SupervisorDistrict == 8)
        return {
          color: "#354651"};
        if (feature.properties.SupervisorDistrict == 9)
        return {
          color: "#774337"};
        if (feature.properties.SupervisorDistrict == 10)
        return {
          color: "#918A70"};
        if (feature.properties.SupervisorDistrict == 11)
        return {
          color: "#7A503B"};
        else
        return {
          color: "#E3E1CD"};
        },
  pointToLayer: function(feature, latlng) {
    return new L.CircleMarker(latlng, {radius: 7, fillOpacity: 0.75});
  },
  onEachFeature: function (feature, layer) {
    layer.bindPopup('<b>' + feature.properties.Name +
    '</b><br>' + 'District '+ feature.properties.SupervisorDistrict);
 }
 });
  markers.addTo(map);
 });
  $("#next-button").off();
  $("#next-button").on("click", function(){
    slide5(dataset);
  });
  $("#previous-button").off();
  $("#previous-button").on("click", function(){
    slide3(dataset);
  });
};

var slide5 = function(dataset) {
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
          .bindPopup(feature.properties.Name);
        }
      });
      markers.addTo(map);
  markers.addLayer(points);
  map.addLayer(markers);
  });
  var closeResults = function() {
    $("#intro").show();
    $("#reslults").hide();
    this.map.setView(new L.LatLng(37.7739, -122.4312), 12);
  };
  $("#close").click(function() {
    closeResults();
  });
  $("#previous-button").off();
  $("#previous-button").on("click", function(){
    slide4(dataset);
    $("#next-button").show();
  });
};

$(document).ready(function() {
  slide1(dataset);
});
