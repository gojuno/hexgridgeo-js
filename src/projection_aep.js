(function(global, factory) {
  if (typeof define === 'function' && define["amd"]) {
    define([], factory);
  } else if (typeof require === 'function' && typeof module === "object" && module && module["exports"]) {
    module["exports"] = factory();
  } else {
    (global["gojuno"] = global["gojuno"] || {})["ProjectionAEP"] = factory();
  }
})(this, function() {
           var Point = require("hexgrid").Point;
           var PointGeo = require("./point_geo.js");

           function ProjectionAEP() {
           }

           ProjectionAEP.prototype.geoToPoint = function(geoPoint) {
             var θ = geoPoint.getLon() * (Math.PI / 180);
             var ρ = Math.PI / 2 - (geoPoint.getLat() * (Math.PI / 180));
             var x = ρ * Math.sin(θ);
             var y = -ρ * Math.cos(θ);
             return new Point(x, y);
           }

           ProjectionAEP.prototype.pointToGeo = function(point) {
             var θ = Math.atan2(point.getX(), -point.getY());
             var ρ = point.getX() / Math.sin(θ);
             var lat = (Math.PI / 2 - ρ) / (Math.PI / 180);
             var lon = θ / (Math.PI / 180);
             return new PointGeo(lon, lat);
           }

           return new ProjectionAEP();
         });
