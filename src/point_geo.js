(function(global, factory) {
  if (typeof define === 'function' && define["amd"]) {
    define([], factory);
  } else if (typeof require === 'function' && typeof module === "object" && module && module["exports"]) {
    module["exports"] = factory();
  } else {
    (global["gojuno"] = global["gojuno"] || {})["PointGeo"] = factory();
  }
})(this, function() {
           function PointGeo(lon, lat) {
             this.lon = lon;
             this.lat = lat;
           }

           PointGeo.prototype.getLon = function() {
             return this.lon;
           }

           PointGeo.prototype.getLat = function() {
             return this.lat;
           }

           return PointGeo;
         });
