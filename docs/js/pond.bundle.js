/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/background/background.js":
/*!**************************************!*\
  !*** ./src/background/background.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colours = __webpack_require__(/*! ../colours */ "./src/colours.js");

var colours = _interopRequireWildcard(_colours);

var _rock = __webpack_require__(/*! ./rock */ "./src/background/rock.js");

var _rock2 = _interopRequireDefault(_rock);

var _cattail = __webpack_require__(/*! ./plants/cattail */ "./src/background/plants/cattail.js");

var _cattail2 = _interopRequireDefault(_cattail);

var _longGrass = __webpack_require__(/*! ./plants/longGrass */ "./src/background/plants/longGrass.js");

var _longGrass2 = _interopRequireDefault(_longGrass);

var _tree = __webpack_require__(/*! ./plants/tree */ "./src/background/plants/tree.js");

var _tree2 = _interopRequireDefault(_tree);

var _lobeliaCardinalis = __webpack_require__(/*! ./plants/lobeliaCardinalis */ "./src/background/plants/lobeliaCardinalis.js");

var _lobeliaCardinalis2 = _interopRequireDefault(_lobeliaCardinalis);

var _flowerBush = __webpack_require__(/*! ./plants/flowerBush */ "./src/background/plants/flowerBush.js");

var _flowerBush2 = _interopRequireDefault(_flowerBush);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * BACKGROUND:
 * This class creates the bank of the pond and checks to see if fish are
 * colliding with it
 */
var Background = function () {
  function Background(app) {
    _classCallCheck(this, Background);

    this.app = app;
    this.pondColour = colours.ocean_blue;
    this.landColour = colours.pea;

    var pointRange = 20; // 10 low poly -> 500 close to square
    var buffer = window.innerWidth / 32;
    var randomPoints = [];
    for (var i = 0; i < pointRange; i++) {
      var x = Math.floor(Math.random() * (window.innerWidth - 2 * buffer)) + buffer;
      var y = Math.floor(Math.random() * (window.innerHeight - 2 * buffer)) + buffer;
      randomPoints.push({ x: x, y: y });
    }
    this.edgeOfPondPoints = this.convexHull(randomPoints);
    this.createLand();
  }

  _createClass(Background, [{
    key: 'convexHull',
    value: function convexHull(points) {
      points.sort(function (a, b) {
        return a.x != b.x ? a.x - b.x : a.y - b.y;
      });

      var n = points.length;
      var hull = [];

      for (var i = 0; i < 2 * n; i++) {
        var j = i < n ? i : 2 * n - 1 - i;
        while (hull.length >= 2 && this.removeMiddle(hull[hull.length - 2], hull[hull.length - 1], points[j])) {
          hull.pop();
        }hull.push(points[j]);
      }

      hull.pop();
      return hull;
    }
  }, {
    key: 'removeMiddle',
    value: function removeMiddle(a, b, c) {
      var cross = (a.x - b.x) * (c.y - b.y) - (a.y - b.y) * (c.x - b.x);
      var dot = (a.x - b.x) * (c.x - b.x) + (a.y - b.y) * (c.y - b.y);
      return cross < 0 || cross == 0 && dot <= 0;
    }
  }, {
    key: 'createLand',
    value: function createLand() {
      // Create a polygon of the pond object
      this.pond = new PIXI.Graphics();
      this.pond.beginFill(this.pondColour);
      var points = [];
      for (var i in this.edgeOfPondPoints) {
        points.push(this.edgeOfPondPoints[i].x);
        points.push(this.edgeOfPondPoints[i].y);
      }
      this.pond.drawPolygon(points);
      this.app.stage.addChild(this.pond);
    }
  }, {
    key: 'createLandDEPRECATED',
    value: function createLandDEPRECATED(canvas, ctx) {
      // Draw grassCount number of grass on pond bank
      var grassCount = this.size * 5;
      this.aroundPond(grassCount, new _longGrass2.default(this.canvasB, ctxB, this.size));
      // Draw rockCount number of rocks around Pond
      var rockCount = 100;
      this.edgeOfPond(rockCount, new _rock2.default(this.canvasB, ctxB, this.size));
      // 25% chance to draw stepping stones
      // TODO: Draw Stepping stones

      // Draw Flowers
      this.aroundPond(Math.ceil(Math.random() * this.size / 80), new _flowerBush2.default(this.canvasB, ctxB, this.size));

      // Draw cattailCount number of cattails around pond
      var cattailCount = 30;
      this.edgeOfPond(cattailCount, new _cattail2.default(this.canvasB, ctxB, this.size));
      // 75% chance of tree around pond
      if (Math.random() < 0.75) {
        this.aroundPond(1, new _tree2.default(this.canvasB, ctxB, this.size));
      }
    }
  }, {
    key: 'edgeOfPond',
    value: function edgeOfPond(count, entity) {
      var surrounded = true;
      var angle = 0;

      while (surrounded) {
        var x = this.size * Math.cos(angle) + this.pos[0];
        var y = this.size * Math.sin(angle) + this.pos[1];
        var pos = [x, y];
        var dis = Math.sqrt(Math.pow(x - this.pos[2], 2) + Math.pow(y - this.pos[3], 2));
        if (dis > this.size) {
          entity.setPos(pos);
          entity.render();
        }

        x += this.pos[2] - this.pos[0];
        y += this.pos[3] - this.pos[1];
        pos = [x, y];
        dis = Math.sqrt(Math.pow(x - this.pos[0], 2) + Math.pow(y - this.pos[1], 2));
        if (dis > this.size) {
          entity.setPos(pos);
          entity.render();
        }
        if (angle > count * 25) surrounded = false;else angle += Math.random() * 50;
      }
    }
  }, {
    key: 'aroundPond',
    value: function aroundPond(count, entity) {
      for (var i = 0; i < count; i++) {
        var pondEdge = false;
        var pos = void 0;
        while (!pondEdge) {
          pos = [Math.random() * entity.canvas.width, Math.random() * entity.canvas.height];
          if (this.isColliding(pos) != null) {
            pondEdge = true;
          }
        }
        entity.setPos(pos);
        entity.render();
      }
    }
  }, {
    key: 'withinPond',
    value: function withinPond(count, entity) {
      // TODO: Code to put all entities within the pond
    }
  }, {
    key: 'renderPond',
    value: function renderPond(canvas, ctx) {
      ctx.fillStyle = this.pondColour;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Draws loaded template

  }, {
    key: 'renderLand',
    value: function renderLand(canvas, ctx) {
      if (this.canvasB.width > 0 && this.canvasB.height > 0) {
        ctx.drawImage(this.canvasB, 0, 0);
      }
    }
  }, {
    key: 'isColliding',
    value: function isColliding(pos) {
      // Calculate if the object will collide with the wall
      var dxa = pos[0] - this.pos[0];
      var dya = pos[1] - this.pos[1];
      var dxb = pos[0] - this.pos[2];
      var dyb = pos[1] - this.pos[3];
      var lenA = Math.sqrt(Math.pow(dxa, 2) + Math.pow(dya, 2));
      var lenB = Math.sqrt(Math.pow(dxb, 2) + Math.pow(dyb, 2));
      if (lenA < this.size || lenB < this.size) {
        return null;
      }
      // return collision info here
      if (lenB > lenA) {
        return [this.pos[0], this.pos[1]];
      } else {
        return [this.pos[2], this.pos[3]];
      }
    }
  }]);

  return Background;
}();

exports["default"] = Background;

/***/ }),

/***/ "./src/background/plants/cattail.js":
/*!******************************************!*\
  !*** ./src/background/plants/cattail.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colours = __webpack_require__(/*! ../../colours */ "./src/colours.js");

var colours = _interopRequireWildcard(_colours);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * CATTAIL class
 * Draws a cattail of a random angle at a position on the canvas
 */
var Cattail = function () {
  function Cattail(canvas, ctx, size) {
    _classCallCheck(this, Cattail);

    this.canvas = canvas;
    this.ctx = ctx;
    this.size = size / 2 + size / 2 * Math.random();
  }

  _createClass(Cattail, [{
    key: "setPos",
    value: function setPos(pos) {
      this.pos = pos;
    }
  }, {
    key: "render",
    value: function render() {
      var length = Math.random();
      var stemLength = this.size / 8 * length;
      var stemThickness = this.size / 64;
      var stemColour = colours.dark_green;
      var headLength = this.size / 15 * length;
      var headThickness = this.size / 20;
      var headColour = colours.olive;
      var tipLength = this.size / 40 * length;
      var tipThickness = this.size / 120;
      var tipColour = colours.khaki;
      var rotation = Math.random() * 2 * Math.PI;

      this.ctx.save();
      this.ctx.translate(this.pos[0], this.pos[1]);
      this.ctx.rotate(rotation);
      this.drawLine(0, stemLength, stemThickness, stemColour);
      this.drawLine(stemLength + stemThickness, headLength, headThickness, headColour);
      this.drawLine(stemLength + stemThickness + headLength, tipLength, tipThickness, tipColour);
      this.ctx.restore();
    }
  }, {
    key: "drawLine",
    value: function drawLine(start, length, thickness, colour) {
      this.ctx.beginPath();
      this.ctx.lineCap = "round";
      this.ctx.strokeStyle = colour;
      this.ctx.lineWidth = thickness;
      this.ctx.moveTo(0, start);
      this.ctx.lineTo(0, length + start);
      this.ctx.stroke();
    }
  }]);

  return Cattail;
}();

exports["default"] = Cattail;

/***/ }),

/***/ "./src/background/plants/flowerBush.js":
/*!*********************************************!*\
  !*** ./src/background/plants/flowerBush.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colours = __webpack_require__(/*! ../../colours */ "./src/colours.js");

var colours = _interopRequireWildcard(_colours);

var _longGrass = __webpack_require__(/*! ./longGrass */ "./src/background/plants/longGrass.js");

var _longGrass2 = _interopRequireDefault(_longGrass);

var _irisEnsataVariegata = __webpack_require__(/*! ./irisEnsataVariegata */ "./src/background/plants/irisEnsataVariegata.js");

var _irisEnsataVariegata2 = _interopRequireDefault(_irisEnsataVariegata);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FlowerBush = function () {
  function FlowerBush(canvas, ctx, size) {
    _classCallCheck(this, FlowerBush);

    this.canvas = canvas;
    this.ctx = ctx;
    this.size = size;
  }

  _createClass(FlowerBush, [{
    key: 'setPos',
    value: function setPos(pos) {
      this.pos = pos;
    }
    // ctx.save pushes current state onto stack therefore
    // multiple saves can be used to minimize code

  }, {
    key: 'render',
    value: function render() {
      var s = this.size / 15;
      var flower = new _irisEnsataVariegata2.default(this.canvas, this.ctx, this.size);
      var x = this.pos[0];
      var y = this.pos[1];

      this.drawBush(x, y);

      flower.setPos([0, 0]);
      this.ctx.save();

      this.ctx.translate(x, y);
      this.ctx.save();
      this.ctx.rotate(Math.random() * 2 * Math.PI);
      flower.render();
      this.ctx.restore();
      this.ctx.translate(0, s * 1.2);
      this.ctx.save();
      this.ctx.rotate(Math.random() * 2 * Math.PI);
      flower.render();
      this.ctx.restore();
      this.ctx.translate(-s, -(2 * s));
      this.ctx.save();
      this.ctx.rotate(Math.random() * 2 * Math.PI);
      flower.render();
      this.ctx.restore();
      this.ctx.translate(2 * s, 0);
      this.ctx.rotate(Math.random() * 2 * Math.PI);
      flower.render();

      this.ctx.restore();
    }
  }, {
    key: 'drawBush',
    value: function drawBush(x, y) {
      var w = this.size / 20;
      var h = w * 6;
      this.ctx.save();
      this.ctx.translate(x, y);

      for (var i = 0; i < Math.PI; i += Math.PI / 10) {
        this.ctx.save();
        this.ctx.rotate(i);
        this.ctx.beginPath();
        this.ctx.fillStyle = colours.forest_green;
        this.ctx.moveTo(0, -h / 2);
        this.ctx.bezierCurveTo(w / 2, -h / 2, w / 2, h / 2, 0, h / 2);
        this.ctx.bezierCurveTo(-w / 2, h / 2, -w / 2, -h / 2, 0, -h / 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.strokeStyle = colours.yellow_green;
        this.ctx.moveTo(0, -h / 2);
        this.ctx.bezierCurveTo(w / 2, -h / 2, w / 2, h / 2, 0, h / 2);
        this.ctx.bezierCurveTo(-w / 2, h / 2, -w / 2, -h / 2, 0, -h / 2);
        this.ctx.stroke();
        this.ctx.restore();
      }
      this.ctx.restore();
    }
  }]);

  return FlowerBush;
}();

exports["default"] = FlowerBush;

/***/ }),

/***/ "./src/background/plants/irisEnsataVariegata.js":
/*!******************************************************!*\
  !*** ./src/background/plants/irisEnsataVariegata.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colours = __webpack_require__(/*! ../../colours */ "./src/colours.js");

var colours = _interopRequireWildcard(_colours);

var _longGrass = __webpack_require__(/*! ./longGrass */ "./src/background/plants/longGrass.js");

var _longGrass2 = _interopRequireDefault(_longGrass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IrisEnsataVariegata = function () {
  function IrisEnsataVariegata(canvas, ctx, size) {
    _classCallCheck(this, IrisEnsataVariegata);

    this.canvas = canvas;
    this.ctx = ctx;
    this.size = size / 180;
  }

  _createClass(IrisEnsataVariegata, [{
    key: 'setPos',
    value: function setPos(pos) {
      this.pos = pos;
    }
  }, {
    key: 'render',
    value: function render() {
      var x = this.pos[0];
      var y = this.pos[1];
      for (var i = 0; i <= 2 * Math.PI; i += 2 / 3 * Math.PI) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(i);

        this.ctx.beginPath();
        this.ctx.fillStyle = colours.purple;
        this.drawPetal(0, -this.size / 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.strokeStyle = colours.indigo;
        this.drawPetal(0, -this.size / 2);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.fillStyle = colours.yellow;
        this.drawInnerPetal(0, -this.size / 2);
        this.ctx.fill();

        this.ctx.restore();
      }
    }
  }, {
    key: 'drawPetal',
    value: function drawPetal(x, y) {
      var s = this.size;
      this.ctx.moveTo(x, y);
      this.ctx.bezierCurveTo(x - 2 * s, y - 1 * s, x - 2 * s, y - 1 * s, x - 3 * s, y - 5 * s);
      this.ctx.bezierCurveTo(x - 2 * s, y - 6 * s, x - 2 * s, y - 6 * s, x, y - 5 * s);
      this.ctx.bezierCurveTo(x + 2 * s, y - 6 * s, x + 2 * s, y - 6 * s, x + 3 * s, y - 5 * s);
      this.ctx.bezierCurveTo(x + 2 * s, y - 1 * s, x + 2 * s, y - 1 * s, x, y);
    }
  }, {
    key: 'drawInnerPetal',
    value: function drawInnerPetal(x, y) {
      var s = this.size;
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x - s / 2, y - s / 2);
      this.ctx.lineTo(x, y - 3 * s);
      this.ctx.lineTo(x + s / 2, y - s / 2);
      this.ctx.lineTo(x, y);
    }
  }]);

  return IrisEnsataVariegata;
}();

exports["default"] = IrisEnsataVariegata;

/***/ }),

/***/ "./src/background/plants/lobeliaCardinalis.js":
/*!****************************************************!*\
  !*** ./src/background/plants/lobeliaCardinalis.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colours = __webpack_require__(/*! ../../colours */ "./src/colours.js");

var colours = _interopRequireWildcard(_colours);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LobeliaCardinalis = function () {
  function LobeliaCardinalis(canvas, ctx, size) {
    _classCallCheck(this, LobeliaCardinalis);

    this.canvas = canvas;
    this.ctx = ctx;
    this.size = size;
  }

  _createClass(LobeliaCardinalis, [{
    key: 'setPos',
    value: function setPos(pos) {
      this.pos = pos;
    }
  }, {
    key: 'render',
    value: function render() {}
  }]);

  return LobeliaCardinalis;
}();

exports["default"] = LobeliaCardinalis;

/***/ }),

/***/ "./src/background/plants/longGrass.js":
/*!********************************************!*\
  !*** ./src/background/plants/longGrass.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colours = __webpack_require__(/*! ../../colours */ "./src/colours.js");

var colours = _interopRequireWildcard(_colours);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LongGrass = function () {
  function LongGrass(canvas, ctx, size) {
    _classCallCheck(this, LongGrass);

    this.canvas = canvas;
    this.ctx = ctx;
    this.size = size;
  }

  _createClass(LongGrass, [{
    key: 'setPos',
    value: function setPos(pos) {
      this.pos = pos;
    }
  }, {
    key: 'render',
    value: function render() {
      var w = this.size / 40;
      var h = w * 6;
      var rotation = Math.random() * Math.PI;
      this.ctx.save();
      this.ctx.translate(this.pos[0], this.pos[1]);
      this.ctx.rotate(rotation);
      this.ctx.beginPath();
      this.ctx.fillStyle = colours.forest_green;
      this.ctx.moveTo(0, -h / 2);
      this.ctx.bezierCurveTo(w / 2, -h / 2, w / 2, h / 2, 0, h / 2);
      this.ctx.bezierCurveTo(-w / 2, h / 2, -w / 2, -h / 2, 0, -h / 2);
      this.ctx.fill();
      this.ctx.beginPath();
      this.ctx.strokeStyle = colours.dark_green;
      this.ctx.moveTo(0, -h / 2);
      this.ctx.bezierCurveTo(w / 2, -h / 2, w / 2, h / 2, 0, h / 2);
      this.ctx.bezierCurveTo(-w / 2, h / 2, -w / 2, -h / 2, 0, -h / 2);
      this.ctx.stroke();
      this.ctx.restore();
    }
  }]);

  return LongGrass;
}();

exports["default"] = LongGrass;

/***/ }),

/***/ "./src/background/plants/tree.js":
/*!***************************************!*\
  !*** ./src/background/plants/tree.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colours = __webpack_require__(/*! ../../colours */ "./src/colours.js");

var colours = _interopRequireWildcard(_colours);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tree = function () {
  function Tree(canvas, ctx, size) {
    _classCallCheck(this, Tree);

    this.canvas = canvas;
    this.ctx = ctx;
    this.size = size;
  }

  _createClass(Tree, [{
    key: "setPos",
    value: function setPos(pos) {
      this.pos = pos;
    }
  }, {
    key: "render",
    value: function render() {
      // Change for initial thickness
      var w = this.size / 20;

      this.ctx.save();
      this.ctx.translate(this.pos[0], this.pos[1]);
      for (var i = 0; i < Math.PI * 2; i += Math.PI / 8) {
        this.ctx.rotate(i);
        this.drawTree(0, 0, w);
      }
      // this.drawLeaf(0,0,this.size/200);
      this.ctx.restore();
    }
  }, {
    key: "drawTree",
    value: function drawTree(x, y, w) {
      for (var i = 0; i < 2; i++) {
        // Change the amount for spread of the tree
        var dx = Math.random() * this.size / 7;
        var dy = Math.random() * this.size / 7;
        this.drawBranch(x, y, dx, dy, w);
        // Change for minimum branch thickness
        if (w > this.size / 80) {
          // Change w amount for change in thickness
          this.drawTree(x + dx, y + dy, w / 1.75);
        }
        this.ctx.fillStyle = colours.leaf_brown;
        this.drawSakuraLeaf(x + dx, y + dy, this.size / 200);
      }
    }
  }, {
    key: "drawSakuraLeaf",
    value: function drawSakuraLeaf(x, y, w) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.bezierCurveTo(x - 4 * w, y, x - 4 * w, y, x - 8 * w, y - 2 * w);
      this.ctx.bezierCurveTo(x - 4 * w, y - 2 * w, x - 4 * w, y - 2 * w, x, y);

      this.ctx.bezierCurveTo(x + 4 * w, y, x + 4 * w, y, x + 8 * w, y - 2 * w);
      this.ctx.bezierCurveTo(x + 4 * w, y - 2 * w, x + 4 * w, y - 2 * w, x, y);

      this.ctx.bezierCurveTo(x - 6 * w, y, x - 6 * w, y, x - 12 * w, y + 4 * w);
      this.ctx.bezierCurveTo(x - 6 * w, y + 4 * w, x - 6 * w, y + 4 * w, x, y);

      this.ctx.bezierCurveTo(x + 6 * w, y, x + 6 * w, y, x + 12 * w, y + 4 * w);
      this.ctx.bezierCurveTo(x + 6 * w, y + 4 * w, x + 6 * w, y + 4 * w, x, y);

      this.ctx.bezierCurveTo(x - 3 * w, y + 7 * w, x - 3 * w, y + 7 * w, x - 10 * w, y + 12 * w);
      this.ctx.bezierCurveTo(x - 6 * w, y + 5 * w, x - 8 * w, y + 5 * w, x, y);

      this.ctx.bezierCurveTo(x + 3 * w, y + 7 * w, x + 3 * w, y + 7 * w, x + 10 * w, y + 12 * w);
      this.ctx.bezierCurveTo(x + 6 * w, y + 5 * w, x + 8 * w, y + 5 * w, x, y);

      this.ctx.bezierCurveTo(x - 3 * w, y + 9 * w, x - 3 * w, y + 9 * w, x, y + 18 * w);
      this.ctx.bezierCurveTo(x + 3 * w, y + 9 * w, x + 3 * w, y + 9 * w, x, y);

      this.ctx.fill();
    }
  }, {
    key: "drawBranch",
    value: function drawBranch(x, y, dx, dy, w) {
      this.ctx.beginPath();
      this.ctx.lineWidth = w;
      this.ctx.lineCap = "round";
      this.ctx.strokeStyle = colours.bark;
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x + dx, y + dy);
      this.ctx.stroke();
    }
  }]);

  return Tree;
}();

exports["default"] = Tree;

/***/ }),

/***/ "./src/background/rock.js":
/*!********************************!*\
  !*** ./src/background/rock.js ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colours = __webpack_require__(/*! ../colours */ "./src/colours.js");

var colours = _interopRequireWildcard(_colours);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rock = function () {
  function Rock(canvas, ctx, size) {
    _classCallCheck(this, Rock);

    this.canvas = canvas;
    this.ctx = ctx;
    this.size = size;
  }

  _createClass(Rock, [{
    key: 'setPos',
    value: function setPos(pos) {
      this.pos = pos;
    }
  }, {
    key: 'generatePoints',
    value: function generatePoints() {
      var pointCountAvg = 8;
      this.circPos = [360 / pointCountAvg * Math.random() * 2];
      while (this.circPos[this.circPos.length - 1] < 360) {
        var nextPoint = this.circPos[this.circPos.length - 1] + 360 / pointCountAvg / 2 + 360 / pointCountAvg / 2 * Math.random() * 2;
        this.circPos.push(nextPoint);
      }
      this.circPos.pop();
    }
  }, {
    key: 'render',
    value: function render() {
      this.generatePoints();
      var size = this.size / 20 + this.size / 20 * Math.random();
      var points = [];
      for (var a = 0; a < this.circPos.length; a++) {
        var x = size * Math.cos(this.circPos[a] * (Math.PI / 180)) + this.pos[0];
        var y = size * Math.sin(this.circPos[a] * (Math.PI / 180)) + this.pos[1];
        points.push([x, y]);
        x = size * 5 / 8 * Math.cos(this.circPos[a] * (Math.PI / 180)) + this.pos[0];
        y = size * 5 / 8 * Math.sin(this.circPos[a] * (Math.PI / 180)) + this.pos[1];
        points.push([x, y]);
      }

      this.ctx.beginPath();
      this.ctx.fillStyle = colours.rock_gray;
      this.ctx.moveTo(points[0][0], points[0][1]);
      for (var _a = 2; _a < points.length; _a += 2) {
        this.ctx.lineTo(points[_a][0], points[_a][1]);
      }this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.fillStyle = colours.gray;
      this.ctx.moveTo(points[1][0], points[1][1]);
      for (var _a2 = 1; _a2 < points.length; _a2 += 2) {
        this.ctx.lineTo(points[_a2][0], points[_a2][1]);
      }this.ctx.fill();

      for (var _a3 = 0; _a3 < points.length - 2; _a3 += 2) {
        this.drawLines(points[_a3], points[_a3 + 1], points[_a3 + 2], points[_a3 + 3]);
      }
      this.drawLines(points[points.length - 2], points[points.length - 1], points[0], points[1]);
    }
  }, {
    key: 'drawLines',
    value: function drawLines(a, b, c, d) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = colours.dark_gray;
      this.ctx.moveTo(a[0], a[1]);
      this.ctx.lineTo(b[0], b[1]);
      this.ctx.lineTo(d[0], d[1]);
      this.ctx.lineTo(c[0], c[1]);
      this.ctx.lineTo(a[0], a[1]);
      this.ctx.stroke();
    }
  }]);

  return Rock;
}();

exports["default"] = Rock;

/***/ }),

/***/ "./src/colours.js":
/*!************************!*\
  !*** ./src/colours.js ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var ocean_blue = exports.ocean_blue = '0x94D0FF',
    deep_blue = exports.deep_blue = 'rgba(135,149,232,0.7)',
    pond_shadow = exports.pond_shadow = 'rgba(11, 45, 99, 0.7)',
    yellow = exports.yellow = '0xfdf3b8',
    orange_peel = exports.orange_peel = '0xFCC08F',
    bark = exports.bark = '0x917e7e',
    khaki = exports.khaki = '0xF0E68C',
    olive = exports.olive = '0x808000',
    forest_green = exports.forest_green = '0x68BA71',
    dark_green = exports.dark_green = '0x388941',
    pea = exports.pea = '0x60A568',
    yellow_green = exports.yellow_green = '0xacff78',
    light_green = exports.light_green = '0x90ee90',
    lily_green = exports.lily_green = '0xB4E8AC',
    pink = exports.pink = '0xFF6AD5',
    leaf_brown = exports.leaf_brown = '0xecb4bf',
    delicate_pink = exports.delicate_pink = '0xFF9BE2',
    light_pink = exports.light_pink = '0xFFBCEC',
    purple = exports.purple = '0x9370DB',
    indigo = exports.indigo = '0x4B0082',
    registration_black = exports.registration_black = '0x000000',
    rasin_black = exports.rasin_black = '0x212121',
    dark_gray = exports.dark_gray = '0x474747',
    rock_gray = exports.rock_gray = '0x606060',
    gray = exports.gray = '0x808080';

/***/ }),

/***/ "./src/mystyles.scss":
/*!***************************!*\
  !*** ./src/mystyles.scss ***!
  \***************************/
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*********************!*\
  !*** ./src/pond.js ***!
  \*********************/


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * POND: This is the controller of the entire program, this is where
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * the program loop is run, containing: render, tick and resize.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _colours = __webpack_require__(/*! ./colours */ "./src/colours.js");

var colours = _interopRequireWildcard(_colours);

var _background = __webpack_require__(/*! ./background/background */ "./src/background/background.js");

var _background2 = _interopRequireDefault(_background);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import Menu from './menu';
//
// import Tadpole from './creature/tadpole';
// import Fish from './creature/fish';
// import Lily from './creature/lily';
//
// import Water from './movement/water/water';
// import Collisions from './movement/collisions';
// import TadMovement from './movement/tadMovement';
// import FishMovement from './movement/fishMovement';
// import LilyMovement from './movement/lilyMovement';


var Pond = function () {
  function Pond() {
    _classCallCheck(this, Pond);

    this.canvas = new PIXI.Application({
      resizeTo: window,
      backgroundColor: colours.pea
    });
    document.body.appendChild(this.canvas.view);

    this.init();

    var elapsed = 0.0;
    this.canvas.ticker.add(function (delta) {
      elapsed += delta;
    });
    console.log(this.canvas);
    // this.water = new Water(canvas, ctx);
    //
    // this.eventListeners();
  }

  /**
   * HTML canvas elements are initiated here and event listeners
   * are created
   */


  _createClass(Pond, [{
    key: 'eventListeners',
    value: function eventListeners() {
      var _this = this;

      this.menu = new Menu(this);
      var mousemovecount = 0;
      canvas.addEventListener("mousemove", function () {
        mousemovecount++;
        if (mousemovecount % 4 == 0) {
          _this.water.dropAt(event.clientX, event.clientY);
        }
      });
    }

    /**
     * All entities are added to their arrays and ther corresponding
     * Movements are initiated
     */

  }, {
    key: 'init',
    value: function init() {
      this.background = new _background2.default(this.canvas);
      // this.water.setBackground(this.background);
      // let size = this.background.size;
      //
      // this.tadpoles = [];
      // this.fish = [];
      // this.lillies = [];
      // this.movement = [];
      //
      // // Pushes all tadpoles to their array
      // for (let i = 0; i < this.tadpoleSize; i++)
      //   this.tadpoles.push(new Tadpole(canvas, size));
      //
      // // Pushes all fish and lillies to their arrays
      // for (let i = 0; i < this.fishSize; i++)
      //   this.fish.push(new Fish(canvas, ctx, size));
      //
      // for (let i = 0; i < this.lilySize; i++)
      //   this.lillies.push(new Lily(canvas, size));
      //
      // // Sets movement patterns for all entities
      // this.collisions = new Collisions(this.tadpoles, this.fish, this.lillies, this.background);
      //
      // this.movement.push(new TadMovement(this.tadpoles, canvas, this.collisions),
      //   new FishMovement(this.fish, canvas, this.collisions),
      //   new LilyMovement(this.lillies, canvas, this.collisions));
    }

    /**
     * All tick functions are run for all the movements and for each
     * entity
     */

  }, {
    key: 'tick',
    value: function tick() {
      var _this2 = this;

      this.movement.forEach(function (m) {
        return m.move(_this2.water);
      });
      this.tadpoles.forEach(function (t) {
        return t.tick();
      });
      this.fish.forEach(function (f) {
        return f.tick();
      });
      this.water.tick();
      this.lillies.forEach(function (l) {
        return l.tick();
      });
    }

    /**
     * All render functions are run for all entities
     */

  }, {
    key: 'render',
    value: function render() {
      // Clear screen
      this.background.renderPond(canvas, ctx);

      // Draw to canvas in order of layers
      this.tadpoles.forEach(function (t) {
        return t.render(canvas, ctx);
      });
      this.fish.forEach(function (f) {
        return f.render(canvas, ctx);
      });
      this.water.render();
      this.lillies.forEach(function (l) {
        return l.render(canvas, ctx);
      });

      // Draw the land on the canvas
      this.background.renderLand(canvas, ctx);
    }
  }]);

  return Pond;
}();

__webpack_require__(/*! ./mystyles.scss */ "./src/mystyles.scss");
var pond = new Pond();
})();

/******/ })()
;
//# sourceMappingURL=pond.bundle.js.map