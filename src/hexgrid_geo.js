var hexgrid = require("hexgrid-abstract"),
  Morton64 = require("morton64");

function HexGridGeo(orientation, size, projection) {
  this.hexGrid = new hexgrid.HexGrid(orientation, new hexgrid.Point(0, 0), new hexgrid.Point(size, size), new Morton64(2, 32));
  this.projection = projection;
}

HexGridGeo.prototype.hexToCode = function (hex) {
  return this.hexGrid.hexToCode(hex);
}

HexGridGeo.prototype.hexFromCode = function (code) {
  return this.hexGrid.hexFromCode(code);
}

HexGridGeo.prototype.hexAt = function (geoPoint) {
  return this.hexGrid.hexAt(this.projection.geoToPoint(geoPoint));
}

HexGridGeo.prototype.hexCenter = function (hex) {
  return this.projection.pointToGeo(this.hexGrid.hexCenter(hex));
}

HexGridGeo.prototype.hexCorners = function (hex) {
  var points = this.hexGrid.hexCorners(hex);
  var geoPoints = [];
  for (var i = 0; i < points.length; i++) {
    geoPoints.push(this.projection.pointToGeo(points[i]));
  }
  return geoPoints;
}

HexGridGeo.prototype.hexNeighbors = function (hex, layers) {
  return this.hexGrid.hexNeighbors(hex, layers);
}

HexGridGeo.prototype.createRegion = function (geometry) {
  var points = [];
  for (var i = 0; i < geometry.length; i++) {
    points.push(this.projection.geoToPoint(geometry[i]));
  }
  return this.hexGrid.createRegion(points);
}

module.exports = HexGridGeo;
