function PointGeo(lon, lat) {
  this.lon = lon;
  this.lat = lat;
}

PointGeo.prototype.getLon = function () {
  return this.lon;
}

PointGeo.prototype.getLat = function () {
  return this.lat;
}

module.exports = PointGeo;
