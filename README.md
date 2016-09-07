#HexGrid GEO
##Basics
GEO wrapper for [HexGrid](https://github.com/gojuno/hexgrid-js).
##ES5
```js 
var hg = require('hexgrid-geo'),
    HexGridGeo = hg.HexGridGeo
    PointGeo = hg.PointGeo,
    ProjectionSM = hg.ProjectionSM,
    Orientation = hg.Orientation;

var grid = new HexGridGeo(Orientation.FLAT, 500, ProjectionSM),
    hex = grid.hexAt(new PointGeo(-73.5, 40.3)),
    code = grid.hexToCode(hex),
    restoredHex = grid.hexFromCode(code),
    neighbors = grid.hexNeighbors(hex, 2),
    region = grid.createRegion([new PointGeo(-73.0, 40.0), new PointGeo(-74.0, 40.0), new PointGeo(-74.0, 41.0), new PointGeo(-73.0, 41.0)]),
    hexesInRegion = region.getHexes();
```

##ES2016
```js
import { HexGridGeo, PointGeo, ProjectionSM, Orientation } from 'hexgrid-geo'
    
let grid = new HexGridGeo(Orientation.FLAT, 500, ProjectionSM),
    hex = grid.hexAt(new PointGeo(-73.5, 40.3)),
    code = grid.hexToCode(hex),
    restoredHex = grid.hexFromCode(code),
    neighbors = grid.hexNeighbors(hex, 2),
    region = grid.createRegion([new PointGeo(-73.0, 40.0), new PointGeo(-74.0, 40.0), new PointGeo(-74.0, 41.0), new PointGeo(-73.0, 41.0)]),
    hexesInRegion = region.getHexes();

```