(function(global, factory) {
  if (typeof define === 'function' && define["amd"]) {
    define([], factory);
  } else if (typeof require === 'function' && typeof module === "object" && module && module["exports"]) {
    module["exports"] = factory();
  } else {
    (global["gojuno"] = global["gojuno"] || {})["ProjectionSM"] = factory();
  }
})(this, function() {
           var Point = require("hexgrid").Point;
           var PointGeo = require("./point_geo.js");

           var EARTH_CIRCUMFERENCE = 40075016.685578488;
           var EARTH_METERS_PER_DEGREE = 111319.49079327358;

           function ProjectionSM() {
           }

           ProjectionSM.prototype.geoToPoint = function(geoPoint) {
             var latR = geoPoint.getLat() * (Math.PI / 180);
             var x = geoPoint.getLon() * EARTH_METERS_PER_DEGREE;
             var y = Math.log(Math.tan(latR) + (1 / Math.cos(latR)));
             y = (y / Math.PI) * (EARTH_CIRCUMFERENCE / 2);
             return new Point(x, y);
           }

           ProjectionSM.prototype.pointToGeo = function(point) {
             var lon = point.getX() / EARTH_METERS_PER_DEGREE;
             var lat = Math.asin(Math.tanh((point.getY() / (EARTH_CIRCUMFERENCE / 2)) * Math.PI));
             lat = lat * (180 / Math.PI);
             return new PointGeo(lon, lat);
           }

           return new ProjectionSM();
         });
