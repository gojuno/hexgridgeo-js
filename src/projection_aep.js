var Point = require("hexgrid-abstract").Point,
  PointGeo = require("./point_geo.js");

function ProjectionAEP() {
}

ProjectionAEP.prototype.geoToPoint = function (geoPoint) {
  var θ = geoPoint.getLon() * (Math.PI / 180);
  var ρ = Math.PI / 2 - (geoPoint.getLat() * (Math.PI / 180));
  var x = ρ * Math.sin(θ);
  var y = -ρ * Math.cos(θ);
  return new Point(x, y);
}

ProjectionAEP.prototype.pointToGeo = function (point) {
  var θ = Math.atan2(point.getX(), -point.getY());
  var ρ = point.getX() / Math.sin(θ);
  var lat = (Math.PI / 2 - ρ) / (Math.PI / 180);
  var lon = θ / (Math.PI / 180);
  return new PointGeo(lon, lat);
}

module.exports = new ProjectionAEP();
