var test = require("tape"),
  Orientation = require("hexgrid-abstract/orientation"),
  Point = require("hexgrid-abstract/point"),
  HexGridGeo = require("./src/hexgrid_geo"),
  PointGeo = require("./src/point_geo"),
  ProjectionNoOp = require("./src/projection_noop"),
  ProjectionAEP = require("./src/projection_aep"),
  ProjectionSin = require("./src/projection_sin"),
  ProjectionSM = require("./src/projection_sm");

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

test('projectionNoOp', function(t) {
  var geoPoint = new PointGeo(-73.0, 40.0);
  var point = ProjectionNoOp.geoToPoint(geoPoint);
  validatePoint(t, new Point(-73.0, 40.0), point, 0.00001);
  var recodedGeoPoint = ProjectionNoOp.pointToGeo(point);
  validatePointGeo(t, geoPoint, recodedGeoPoint, 0.00001);

  t.end();
});

test('projectionAEP', function(t) {
  var geoPoint = new PointGeo(-73.0, 40.0);
  var point = ProjectionAEP.geoToPoint(geoPoint);
  validatePoint(t, new Point(-0.83453, -0.25514), point, 0.00001);
  var recodedGeoPoint = ProjectionAEP.pointToGeo(point);
  validatePointGeo(t, geoPoint, recodedGeoPoint, 0.00001);

  t.end();
});

test('projectionSin', function(t) {
  var geoPoint = new PointGeo(-73.0, 40.0);
  var point = ProjectionSin.geoToPoint(geoPoint);
  validatePoint(t, new Point(9124497.47463, 4452779.63173), point, 0.00001);
  var recodedGeoPoint = ProjectionSin.pointToGeo(point);
  validatePointGeo(t, geoPoint, recodedGeoPoint, 0.00001);

  t.end();
});

test('projectionSM', function(t) {
  var geoPoint = new PointGeo(-73.0, 40.0);
  var point = ProjectionSM.geoToPoint(geoPoint);
  validatePoint(t, new Point(-8126322.82791, 4865942.27950), point, 0.00001);
  var recodedGeoPoint = ProjectionSM.pointToGeo(point);
  validatePointGeo(t, geoPoint, recodedGeoPoint, 0.00001);

  t.end();
});

test('simple', function(t) {
  var grid = new HexGridGeo(Orientation.FLAT, 500, ProjectionSM);
  var corners = grid.hexCorners(grid.hexAt(new PointGeo(-73.0, 40.0)));
  var expectedCorners = [
    new PointGeo(-72.99485, 39.99877), new PointGeo(-72.99710, 40.00175),
    new PointGeo(-73.00159, 40.00175), new PointGeo(-73.00384, 39.99877),
    new PointGeo(-73.00159, 39.99579), new PointGeo(-72.99710, 39.99579)];
  t.equals(corners.length, expectedCorners.length);
  for (var i = 0; i < corners.length; i++) {
    validatePointGeo(t, expectedCorners[i], corners[i], 0.00001);
  }

  t.end();
});
