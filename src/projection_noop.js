var Point = require("hexgrid-abstract").Point,
  PointGeo = require("./point_geo.js");

function ProjectionNoOp() {
}

ProjectionNoOp.prototype.geoToPoint = function (geoPoint) {
  return new Point(geoPoint.getLon(), geoPoint.getLat());
}

ProjectionNoOp.prototype.pointToGeo = function (point) {
  return new PointGeo(point.getX(), point.getY());
}

module.exports = new ProjectionNoOp();
