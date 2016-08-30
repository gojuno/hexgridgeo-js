(function(global, factory) {
  if (typeof define === 'function' && define["amd"]) {
    define([], factory);
  } else if (typeof require === 'function' && typeof module === "object" && module && module["exports"]) {
    module["exports"] = factory();
  } else {
    (global["gojuno"] = global["gojuno"] || {})["ProjectionNoOp"] = factory();
  }
})(this, function() {
           var Point = require("hexgrid").Point;
           var PointGeo = require("./point_geo.js");

           function ProjectionNoOp() {
           }

           ProjectionNoOp.prototype.geoToPoint = function(geoPoint) {
             return new Point(geoPoint.getLon(), geoPoint.getLat());
           }

           ProjectionNoOp.prototype.pointToGeo = function(point) {
             return new PointGeo(point.getX(), point.getY());
           }

           return new ProjectionNoOp();
         });
