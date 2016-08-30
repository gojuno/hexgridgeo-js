var Test = require("tape");
var hexgrid = require("hexgrid");
var hexgridgeo = require("./");

function validatePoint(t, e, r, precision) {
  if (Math.abs(e.getX() - r.getX()) <= precision && Math.abs(e.getY() - r.getY()) <= precision) {
    t.ok(true);
    return;
  }
  t.fail();
}

function validatePointGeo(t, e, r, precision) {
  if (Math.abs(e.getLon() - r.getLon()) <= precision && Math.abs(e.getLat() - r.getLat()) <= precision) {
    t.ok(true);
    return;
  }
  t.fail();
}

Test('projectionNoOp', function(t) {
  var geoPoint = new hexgridgeo.PointGeo(-73.0, 40.0);
  var point = hexgridgeo.ProjectionNoOp.geoToPoint(geoPoint);
  validatePoint(t, new hexgrid.Point(-73.0, 40.0), point, 0.00001);
  var recodedGeoPoint = hexgridgeo.ProjectionNoOp.pointToGeo(point);
  validatePointGeo(t, geoPoint, recodedGeoPoint, 0.00001);

  t.end();
});

Test('projectionAEP', function(t) {
  var geoPoint = new hexgridgeo.PointGeo(-73.0, 40.0);
  var point = hexgridgeo.ProjectionAEP.geoToPoint(geoPoint);
  validatePoint(t, new hexgrid.Point(-0.83453, -0.25514), point, 0.00001);
  var recodedGeoPoint = hexgridgeo.ProjectionAEP.pointToGeo(point);
  validatePointGeo(t, geoPoint, recodedGeoPoint, 0.00001);

  t.end();
});

Test('projectionSin', function(t) {
  var geoPoint = new hexgridgeo.PointGeo(-73.0, 40.0);
  var point = hexgridgeo.ProjectionSin.geoToPoint(geoPoint);
  validatePoint(t, new hexgrid.Point(9124497.47463, 4452779.63173), point, 0.00001);
  var recodedGeoPoint = hexgridgeo.ProjectionSin.pointToGeo(point);
  validatePointGeo(t, geoPoint, recodedGeoPoint, 0.00001);

  t.end();
});

Test('projectionSM', function(t) {
  var geoPoint = new hexgridgeo.PointGeo(-73.0, 40.0);
  var point = hexgridgeo.ProjectionSM.geoToPoint(geoPoint);
  validatePoint(t, new hexgrid.Point(-8126322.82791, 4865942.27950), point, 0.00001);
  var recodedGeoPoint = hexgridgeo.ProjectionSM.pointToGeo(point);
  validatePointGeo(t, geoPoint, recodedGeoPoint, 0.00001);

  t.end();
});

Test('simple', function(t) {
  var grid = new hexgridgeo.HexGridGeo(hexgridgeo.Orientation.FLAT, 500, hexgridgeo.ProjectionSM);
  var corners = grid.hexCorners(grid.hexAt(new hexgridgeo.PointGeo(-73.0, 40.0)));
  var expectedCorners = [
    new hexgridgeo.PointGeo(-72.99485, 39.99877), new hexgridgeo.PointGeo(-72.99710, 40.00175),
    new hexgridgeo.PointGeo(-73.00159, 40.00175), new hexgridgeo.PointGeo(-73.00384, 39.99877),
    new hexgridgeo.PointGeo(-73.00159, 39.99579), new hexgridgeo.PointGeo(-72.99710, 39.99579)];
  t.equals(corners.length, expectedCorners.length);
  for (var i = 0; i < corners.length; i++) {
    validatePointGeo(t, expectedCorners[i], corners[i], 0.00001);
  }

  t.end();
});
