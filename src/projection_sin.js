(function(global, factory) {
  if (typeof define === 'function' && define["amd"]) {
    define([], factory);
  } else if (typeof require === 'function' && typeof module === "object" && module && module["exports"]) {
    module["exports"] = factory();
  } else {
    (global["gojuno"] = global["gojuno"] || {})["ProjectionSin"] = factory();
  }
})(this, function() {
           var Point = require("hexgrid").Point;
           var PointGeo = require("./point_geo.js");

           var EARTH_CIRCUMFERENCE = 40075016.685578488;

           function ProjectionSin() {
           }

           ProjectionSin.prototype.geoToPoint = function(geoPoint) {
             var λ = (geoPoint.getLon() + 180) * (Math.PI / 180);
             var φ = geoPoint.getLat() * (Math.PI / 180);
             var x = (λ * Math.cos(φ)) * ((EARTH_CIRCUMFERENCE / 2) / Math.PI);
             var y = φ * ((EARTH_CIRCUMFERENCE / 2) / Math.PI);
             return new Point(x, y);
           }

           ProjectionSin.prototype.pointToGeo = function(point) {
             var φ = point.getY() / ((EARTH_CIRCUMFERENCE / 2) / Math.PI);
             var λ = point.getX() / (Math.cos(φ) * ((EARTH_CIRCUMFERENCE / 2) / Math.PI));
             var lon = (λ / (Math.PI / 180)) - 180;
             var lat = φ / (Math.PI / 180);
             return new PointGeo(lon, lat);
           }

           return new ProjectionSin();
         });
