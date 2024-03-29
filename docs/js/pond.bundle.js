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
  function Background(canvas, ctx) {
    _classCallCheck(this, Background);

    if (canvas.width < canvas.height) {
      this.pos = [canvas.width / 2, canvas.height / 8 * 3, canvas.width / 2, canvas.height / 8 * 5];
      this.size = canvas.width / 2;
    } else {
      this.pos = [canvas.width / 8 * 3, canvas.height / 2, canvas.width / 8 * 5, canvas.height / 2];
      this.size = canvas.height / 2;
    }
    this.pondColour = colours.ocean_blue;
    this.landColour = colours.pea;
    this.createLand(canvas, ctx);
  }

  _createClass(Background, [{
    key: 'createLand',
    value: function createLand(canvas, ctx) {
      // Create a mask and cuts 2 circles out of it then draws it to the canvas
      this.canvasB = document.createElement('canvas');
      this.canvasB.width = canvas.width;
      this.canvasB.height = canvas.height;
      var ctxB = this.canvasB.getContext('2d');
      ctxB.save();
      ctxB.fillStyle = this.landColour;
      ctxB.fillRect(0, 0, canvas.width, canvas.height);
      ctxB.globalCompositeOperation = 'xor';
      ctxB.arc(this.pos[0], this.pos[1], this.size, 0, Math.PI * 2);
      ctxB.arc(this.pos[2], this.pos[3], this.size, 0, Math.PI * 2);
      ctxB.fill();
      ctxB.restore();

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
var ocean_blue = exports.ocean_blue = '#94D0FF',
    deep_blue = exports.deep_blue = 'rgba(135,149,232,0.7)',
    pond_shadow = exports.pond_shadow = 'rgba(11, 45, 99, 0.7)',
    yellow = exports.yellow = '#fdf3b8',
    orange_peel = exports.orange_peel = '#FCC08F',
    bark = exports.bark = '#917e7e',
    khaki = exports.khaki = '#F0E68C',
    olive = exports.olive = '#808000',
    forest_green = exports.forest_green = '#68BA71',
    dark_green = exports.dark_green = '#388941',
    pea = exports.pea = '#60A568',
    yellow_green = exports.yellow_green = '#acff78',
    light_green = exports.light_green = '#90ee90',
    lily_green = exports.lily_green = '#B4E8AC',
    pink = exports.pink = '#FF6AD5',
    leaf_brown = exports.leaf_brown = '#ecb4bf',
    delicate_pink = exports.delicate_pink = '#FF9BE2',
    light_pink = exports.light_pink = '#FFBCEC',
    purple = exports.purple = '#9370DB',
    indigo = exports.indigo = '#4B0082',
    registration_black = exports.registration_black = '#000000',
    rasin_black = exports.rasin_black = '#212121',
    dark_gray = exports.dark_gray = '#474747',
    rock_gray = exports.rock_gray = '#606060',
    gray = exports.gray = '#808080';

/***/ }),

/***/ "./src/creature/fish.js":
/*!******************************!*\
  !*** ./src/creature/fish.js ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This class contains all information for each fish
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _colours = __webpack_require__(/*! ../colours */ "./src/colours.js");

var colours = _interopRequireWildcard(_colours);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Fish = function () {
  function Fish(canvas, ctx, size) {
    _classCallCheck(this, Fish);

    // Random Position on canvas
    this.pos = [Math.random() * canvas.width, Math.random() * canvas.height];
    // Random size this.size-this.size * (3/2)
    this.size = size / 40 * (document.getElementById('fishsize').value / 10);
    // Random velocity [-1, -1] - [1, 1]
    this.vel = [(Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2];
    // Colour
    switch (Math.floor(Math.random() * 4)) {
      // Beni-goi (are entirely red/orange)
      case 0:
        this.colourA = colours.orange_peel;
        this.colourB = colours.yellow;
        break;
      // ki-goi (are entirely yellow/gold)
      case 1:
        this.colourA = colours.yellow;
        this.colourB = colours.orange_peel;
        break;
      // Tancho (White with a red mark on the head but no red on body)
      case 2:
        this.colourA = ctx.createRadialGradient(0, 0, this.size / 4, 0, 0, this.size * 4);
        this.colourA.addColorStop(0, "red");
        this.colourA.addColorStop(0.25, "white");
        this.colourA.addColorStop(1, "white");
        this.colourB = colours.yellow;
        break;
      // Karasugoi (are entirely black/dark gray)
      case 3:
        this.colourA = colours.dark_gray;
        this.colourB = "white";
        break;
      default:
        this.colourA = colours.registration_black;
        this.colourB = colours.registration_black;
    }
    // Extra Variables
    this.swimming = true;
    this.sin = 0;
    this.angle = 0;
    this.angles = [0, 0, 0, 0, 0, 0];
    this.left = true;
  }

  /**
   * TICK - Moves the entity and modifies any frame based values
   */


  _createClass(Fish, [{
    key: 'tick',
    value: function tick() {
      // sin is the angle along sin that the fish is swimming along
      if (this.swimming) {
        this.sin++;
        if (this.sin > 1440) this.sin = 0;
      }
      this.pos[0] += this.vel[0];
      this.pos[1] += this.vel[1];

      this.angle = Math.atan2(this.vel[1], this.vel[0]);
    }

    /**
     * RENDER - Draws a head, a body, a tail and some fins
     */

  }, {
    key: 'render',
    value: function render(canvas, ctx) {
      this.angles.push(this.angle);
      this.angles.shift();

      ctx.save();
      ctx.translate(this.pos[0], this.pos[1]);
      ctx.rotate(this.angle - Math.PI / 2);
      ctx.lineWidth = 1;
      this.drawfish(canvas, ctx, 0, 0, this.angles, true);
      ctx.restore();

      ctx.save();
      ctx.translate(this.pos[0] - 10, this.pos[1] - 10);
      ctx.rotate(this.angle - Math.PI / 2);
      ctx.lineWidth = 1;
      this.drawfish(canvas, ctx, 0, 0, this.angles, false);
      ctx.restore();
    }
  }, {
    key: 'drawfish',
    value: function drawfish(canvas, ctx, x, y, offsetArr, shadow) {
      var offset = (offsetArr[0] - offsetArr[1]) * 100;
      if (offset > 10) {
        offset = 10;
      } else if (offset < -10) {
        offset = -10;
      }
      // Body Coordinates
      var t = [x - this.size / 2 + offset, y - this.size * 5, x + this.size / 2 + offset, y - this.size * 5];
      // Head Coordinates
      var h = [x - this.size * (3 / 2), y, x + this.size * (3 / 2), y];
      // Tail Coordinates
      var f = [t[0] + offset - this.size / 2, t[1] - this.size, t[2] + offset + this.size / 2, t[3] - this.size];
      // Fin Coordinates
      var a = [h[0] - this.size - offset, h[1] - this.size, h[2] + this.size + offset, h[3] - this.size];

      if (shadow) ctx.fillStyle = colours.deep_blue;else ctx.fillStyle = this.colourA;

      ctx.beginPath();
      this.fishShape(canvas, ctx, x, y, h, t, f, a);
      ctx.fill();

      if (!shadow) {
        ctx.strokeStyle = this.colourB;
        ctx.beginPath();
        this.fishShape(canvas, ctx, x, y, h, t, f, a);
        ctx.stroke();
      }
    }
  }, {
    key: 'fishShape',
    value: function fishShape(canvas, ctx, x, y, h, t, f, a) {
      // Head
      ctx.moveTo(h[0], h[1]);
      ctx.bezierCurveTo(x - this.size * (3 / 2), y + this.size * 2, x + this.size * (3 / 2), y + this.size * 2, h[2], h[3]);
      // L fin
      ctx.bezierCurveTo(a[2], h[3] - this.size / 2, a[2], h[3] - this.size / 2, a[2], a[3]);
      ctx.bezierCurveTo(h[2] - this.size * (1 / 10), h[3] - this.size * (3 / 2), h[2] - this.size * (1 / 5), h[3] - this.size * (3 / 2), h[2], h[3] - this.size * (4 / 5));
      ctx.lineTo(h[2], h[3]);
      // L body
      ctx.bezierCurveTo(x + this.size, y - this.size * (5 / 2), x + this.size, y - this.size * (5 / 2), t[2], t[3]);
      // Tail
      ctx.lineTo(f[2], f[3]);
      ctx.lineTo(f[0], f[1]);
      ctx.lineTo(t[0], t[1]);
      // R body
      ctx.bezierCurveTo(x - this.size, y - this.size * (5 / 2), x - this.size, y - this.size * (5 / 2), h[0], h[1]);
      // R fin
      ctx.bezierCurveTo(a[0], h[1] - this.size / 2, a[0], h[1] - this.size / 2, a[0], a[1]);
      ctx.bezierCurveTo(h[0] + this.size * (1 / 10), h[1] - this.size * (3 / 2), h[0] + this.size * (1 / 5), h[1] - this.size * (3 / 2), h[0], h[1] - this.size * (4 / 5));
      ctx.lineTo(h[0], h[1]);
    }
  }]);

  return Fish;
}();

exports["default"] = Fish;

/***/ }),

/***/ "./src/creature/lily.js":
/*!******************************!*\
  !*** ./src/creature/lily.js ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This class contains all information for each lily
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _colours = __webpack_require__(/*! ../colours */ "./src/colours.js");

var colours = _interopRequireWildcard(_colours);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Lily = function () {
  function Lily(canvas, size) {
    _classCallCheck(this, Lily);

    // Random Position on canvas
    this.pos = [Math.random() * canvas.width, Math.random() * canvas.height];
    // All have same size 30 - CHANGE TO RANDOM SOON
    this.size = size / 10;
    // Random velocity [-0.5, -0.5] - [0.5, 0.5]
    this.vel = [Math.random() - 0.5, Math.random() - 0.5];
    // Chooses a random point to put the split of the lily pad
    this.startAngle = Math.PI * 2 * Math.random();
    // 50% if rotates clockwise or anticlockwise
    this.clockwise = Math.random() < 0.5;
    // 25% chance to have a water lily on top
    this.isFlower = Math.random() < 0.25;
  }

  /**
   * TICK - Moves the entity and rotates the pad
   */


  _createClass(Lily, [{
    key: 'tick',
    value: function tick() {
      if (this.clockwise) this.startAngle += 0.001;else this.startAngle -= 0.001;
      this.pos[0] += this.vel[0];
      this.pos[1] += this.vel[1];
    }

    /**
     * RENDER - Draws the pad with a segment if it has a lily and if it doesn't
     * it draws a full pad with a flower on it
     * Lily = full size dark circle & 3/4 light circle within
     */

  }, {
    key: 'render',
    value: function render(canvas, ctx) {
      if (!this.isFlower) {
        var start = this.startAngle;
        // Shadow
        ctx.beginPath();
        ctx.fillStyle = colours.deep_blue;
        ctx.arc(this.pos[0] + 20, this.pos[1] + 20, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw First Half
        ctx.beginPath();
        ctx.fillStyle = colours.light_green;
        ctx.arc(this.pos[0], this.pos[1], this.size, start, Math.PI + start);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = colours.lily_green;
        ctx.arc(this.pos[0], this.pos[1], this.size / 4 * 3, start, Math.PI + start);
        ctx.fill();
        // Draws second half with not full rotation to give the circle the slit
        start += Math.PI / 180 * 170;
        ctx.beginPath();
        ctx.fillStyle = colours.light_green;
        ctx.arc(this.pos[0], this.pos[1], this.size, start, Math.PI + start);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = colours.lily_green;
        ctx.arc(this.pos[0], this.pos[1], this.size / 4 * 3, start, Math.PI + start);
        ctx.fill();
      } else {
        // Shadow
        ctx.beginPath();
        ctx.fillStyle = colours.deep_blue;
        ctx.arc(this.pos[0] + 20, this.pos[1] + 20, this.size, 0, Math.PI * 2);
        ctx.fill();
        // Draws the full circle
        ctx.beginPath();
        ctx.fillStyle = colours.light_green;
        ctx.arc(this.pos[0], this.pos[1], this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = colours.lily_green;
        ctx.arc(this.pos[0], this.pos[1], this.size / 4 * 3, 0, Math.PI * 2);
        ctx.fill();
        this.drawFlower(ctx);
      }
    }

    // Draws 3 rings with reducing size and lighter colours

  }, {
    key: 'drawFlower',
    value: function drawFlower(ctx) {
      var firstRing = this.size / 4;
      this.drawRing(ctx, colours.pink, this.size / 2, this.size / 4 * 3);
      this.drawRing(ctx, colours.delicate_pink, this.size / 4, this.size / 2);
      this.drawRing(ctx, colours.light_pink, this.size / 8, this.size / 3);
      ctx.beginPath();
      ctx.fillStyle = colours.yellow;
      ctx.arc(this.pos[0], this.pos[1], this.size / 8, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draws 8 petals each at 45 degrees to each other

  }, {
    key: 'drawRing',
    value: function drawRing(ctx, fillStyle, w, h) {
      for (var i = 0; i <= Math.PI * 2; i += Math.PI / 4) {
        ctx.save();
        ctx.translate(this.pos[0], this.pos[1]);
        ctx.rotate(i);
        this.drawPetal(ctx, fillStyle, 0, h / 2, w, h);
        ctx.restore();
      }
    }

    // Draws an elipse with center xy and width w and height h

  }, {
    key: 'drawPetal',
    value: function drawPetal(ctx, fillStyle, x, y, w, h) {
      ctx.beginPath();
      ctx.fillStyle = fillStyle;
      ctx.moveTo(x, y - h / 2);
      ctx.bezierCurveTo(x + w / 2, y - h / 2, x + w / 2, y + h / 2, x, y + h / 2);
      ctx.bezierCurveTo(x - w / 2, y + h / 2, x - w / 2, y - h / 2, x, y - h / 2);
      ctx.fill();
    }
  }]);

  return Lily;
}();

exports["default"] = Lily;

/***/ }),

/***/ "./src/creature/tadpole.js":
/*!*********************************!*\
  !*** ./src/creature/tadpole.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This class contains all information for each tadpole
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _colours = __webpack_require__(/*! ../colours */ "./src/colours.js");

var colours = _interopRequireWildcard(_colours);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tadpole = function () {
  function Tadpole(canvas, size) {
    _classCallCheck(this, Tadpole);

    // Random Position on canvas
    this.pos = [Math.random() * canvas.width, Math.random() * canvas.height];
    // Size
    this.size = size / 200 * (document.getElementById('tadsize').value / 2);
    // Initially still
    this.vel = [Math.random() * 2 - 1, Math.random() * 2 - 1];
    this.acceleration = [0, 0];
    this.r = 3.0;
    // Maximum speed per tadpole
    this.maxspeed = 0.7;
    // Maximum steering force
    this.maxforce = 0.05;

    this.separationSize = 15;
  }

  /**
   * APPLYFORCE - adds force to acceleration;
   */


  _createClass(Tadpole, [{
    key: 'applyForce',
    value: function applyForce(force) {
      this.acceleration = this.add(this.acceleration, force);
    }

    /**
     * FLOCK - Gets new acceleration based on 3 rules
     */

  }, {
    key: 'flock',
    value: function flock(tadpoles) {
      var sep = this.separate(tadpoles, this.separationSize);
      var ali = this.align(tadpoles);
      var coh = this.cohesion(tadpoles);
      // Adjust weight of each force
      var sepWeight = 0.25;
      var aliWeight = 0.01;
      var cohWeight = 0.2;
      sep = this.mul(sep, sepWeight);
      ali = this.mul(ali, aliWeight);
      coh = this.mul(coh, cohWeight);

      this.applyForce(sep);
      this.applyForce(ali);
      this.applyForce(coh);
    }

    /**
     * TICK - Moves the entity
     */

  }, {
    key: 'tick',
    value: function tick() {
      this.vel = this.add(this.vel, this.acceleration);
      this.vel = this.limit(this.vel, this.maxspeed);

      this.pos = this.add(this.pos, this.vel);
      this.acceleration = [0, 0];
    }

    /**
     * RENDER - Draws an black ball and two smaller grey balls behind it to
     *  simulate a tail
     */

  }, {
    key: 'render',
    value: function render(canvas, ctx) {
      // Draw Body
      ctx.beginPath();
      ctx.fillStyle = colours.registration_black;
      ctx.arc(this.pos[0], this.pos[1], this.size, 0, 2 * Math.PI);
      ctx.fill();
      // Draw Tail
      ctx.beginPath();
      ctx.fillStyle = colours.rasin_black;
      ctx.arc(this.pos[0] - this.vel[0] * 5, this.pos[1] - this.vel[1] * 5, this.size / 4 * 3, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(this.pos[0] - this.vel[0] * 10, this.pos[1] - this.vel[1] * 10, this.size / 2, 0, 2 * Math.PI);
      ctx.fill();
    }
  }, {
    key: 'limit',
    value: function limit(v, max) {
      var mSq = this.magSq(v);
      if (mSq > max * max) {
        v = this.div(v, Math.sqrt(mSq));
        v = this.mul(v, max);
      }
      return v;
    }
  }, {
    key: 'dist',
    value: function dist(a, b) {
      var c = this.add(a, [-b[0], -b[1]]);
      return this.mag(c);
    }
  }, {
    key: 'mag',
    value: function mag(a) {
      a = this.magSq(a);
      return Math.sqrt(a);
    }
  }, {
    key: 'magSq',
    value: function magSq(a) {
      return a[0] * a[0] + a[1] * a[1];
    }
  }, {
    key: 'add',
    value: function add(a, b) {
      return [a[0] + b[0], a[1] + b[1]];
    }
  }, {
    key: 'sub',
    value: function sub(a, b) {
      return [a[0] - b[0], a[1] - b[1]];
    }
  }, {
    key: 'mul',
    value: function mul(a, x) {
      return [a[0] * x, a[1] * x];
    }
  }, {
    key: 'div',
    value: function div(a, x) {
      return [a[0] / x, a[1] / x];
    }
  }, {
    key: 'normalize',
    value: function normalize(a) {
      var len = this.mag(a);
      if (len !== 0) {
        a = this.mul(a, 1 / len);
      }
      return a;
    }
  }, {
    key: 'seek',
    value: function seek(target) {
      var desired = this.sub(target, this.pos);

      desired = this.normalize(desired);
      desired = this.mul(desired, this.maxspeed);

      var steer = this.sub(desired, this.vel);
      steer = this.limit(steer, this.maxforce);
      return steer;
    }
  }, {
    key: 'separate',
    value: function separate(tadpoles, separationSize) {
      var desiredseparation = separationSize;
      var steer = [0, 0];
      var count = 0;

      for (var i = 0; i < tadpoles.length; i++) {
        var d = this.dist(this.pos, tadpoles[i].pos);
        if (d > 0 && d < desiredseparation) {
          var diff = this.sub(this.pos, tadpoles[i].pos);
          diff = this.normalize(diff);
          diff = this.div(diff, d);
          steer = this.add(steer, diff);
          count++;
        }
      }

      if (count > 0) {
        steer = this.div(steer, count);
      }

      if (this.mag(steer) > 0) {
        steer = this.normalize(steer);
        steer = this.mul(steer, this.maxspeed);
        steer = this.sub(steer, this.vel);
        steer = this.limit(steer, this.maxforce);
      }
      return steer;
    }

    /**
     * Checks to see if tadpoles are in sense distance
     * If so, add their velocity to a value
     * Divide value by number of other tadpoles
     * Normalize, multiply by max speed
     * subtract current velocity,
     * limit velocity then return.
     */

  }, {
    key: 'align',
    value: function align(tadpoles) {
      var neighbordist = 50;
      var sum = [0, 0];
      var count = 0;
      for (var i = 0; i < tadpoles.length; i++) {
        var d = this.dist(this.pos, tadpoles[i].pos);
        if (d > 0 && d < neighbordist) {
          sum = this.add(sum, tadpoles[i].vel);
          count++;
        }
      }
      if (count > 0) {
        this.mul(sum, 1 / count);
        sum = this.normalize(sum);
        sum = this.mul(sum, this.maxspeed);
        var steer = this.sub(sum, this.vel);
        sum = this.limit(steer, this.maxforce);
        return steer;
      } else {
        return [0, 0];
      }
    }
  }, {
    key: 'cohesion',
    value: function cohesion(tadpoles) {
      var neighbordist = 50;
      var sum = [0, 0];
      var count = 0;
      for (var i = 0; i < tadpoles.length; i++) {
        var d = this.dist(this.pos, tadpoles[i].pos);
        if (d > 0 && d < neighbordist) {
          sum = this.add(sum, tadpoles[i].pos);
          count++;
        }
      }
      if (count > 0) {
        sum = this.div(sum, count);
        return this.seek(sum);
      } else {
        return [0, 0];
      }
    }
  }, {
    key: 'flee',
    value: function flee(other) {
      var desiredseparation = 100;
      var steer = this.separate(other, desiredseparation);
      this.applyForce(steer);
    }
  }, {
    key: 'borders',
    value: function borders() {
      if (this.pos[0] < -this.r) this.pos[0] = window.innerWidth + this.r;
      if (this.pos[1] < -this.r) this.pos[1] = window.innerHeight + this.r;
      if (this.pos[0] > window.innerWidth + this.r) this.pos[0] = -this.r;
      if (this.pos[1] > window.innerHeight + this.r) this.pos[1] = -this.r;
    }
  }]);

  return Tadpole;
}();

exports["default"] = Tadpole;

/***/ }),

/***/ "./src/menu.js":
/*!*********************!*\
  !*** ./src/menu.js ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _colours = __webpack_require__(/*! ./colours */ "./src/colours.js");

var colours = _interopRequireWildcard(_colours);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Menu = function Menu(pond) {
  _classCallCheck(this, Menu);

  var hide = document.getElementById('hidecheck');
  var refresh = document.getElementById('refresh');

  this.hidden = false;
  this.screenRatio = 3 / 4;
  hide.addEventListener('change', function (e) {
    var x = document.getElementById('selections');
    if (e.target.checked) {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  });

  // Initialise the variables
  pond.tadpoleSize = document.getElementById('tadpoles').value;
  pond.fishSize = document.getElementById('fish').value;
  pond.lilySize = document.getElementById('lillies').value;

  refresh.addEventListener('mouseup', function (e) {
    pond.tadpoleSize = document.getElementById('tadpoles').value;
    pond.fishSize = document.getElementById('fish').value;
    pond.lilySize = document.getElementById('lillies').value;
    pond.init();
  });

  // Change Tabs
  var tab1butt = document.getElementById('tab1butt');
  var tab1 = document.getElementById('tab1');
  var pag1 = document.getElementById('p1');
  var tab2butt = document.getElementById('tab2butt');
  var tab2 = document.getElementById('tab2');
  var pag2 = document.getElementById('p2');
  var tab3butt = document.getElementById('tab3butt');
  var tab3 = document.getElementById('tab3');
  var pag3 = document.getElementById('p3');

  tab1butt.addEventListener('mouseup', function (e) {
    tab1.style.display = "block";
    tab2.style.display = "none";
    tab3.style.display = "none";
    pag1.classList.add('is-active');
    pag2.classList.remove('is-active');
    pag3.classList.remove('is-active');
  });

  tab2butt.addEventListener('mouseup', function (e) {
    tab1.style.display = "none";
    tab2.style.display = "block";
    tab3.style.display = "none";
    pag1.classList.remove('is-active');
    pag2.classList.add('is-active');
    pag3.classList.remove('is-active');
  });

  tab3butt.addEventListener('mouseup', function (e) {
    tab1.style.display = "none";
    tab2.style.display = "none";
    tab3.style.display = "block";
    pag1.classList.remove('is-active');
    pag2.classList.remove('is-active');
    pag3.classList.add('is-active');
  });

  var colour = document.getElementsByName('colour');

  for (var i = 0; i < colour.length; i++) {
    colour[i].addEventListener('click', function (e) {
      if (e.target.value == 'summer') {
        colours.ocean_blue = '#94D0FF', colours.deep_blue = 'rgba(135,149,232,0.7)', colours.pond_shadow = 'rgba(11, 45, 99, 0.7)', colours.yellow = '#fdf3b8', colours.orange_peel = '#FCC08F', colours.bark = '#917e7e', colours.khaki = '#F0E68C', colours.olive = '#808000', colours.forest_green = '#68BA71', colours.dark_green = '#388941', colours.pea = '#60A568', colours.yellow_green = '#acff78', colours.light_green = '#90ee90', colours.lily_green = '#B4E8AC', colours.pink = '#FF6AD5', colours.leaf_brown = '#ecb4bf', colours.delicate_pink = '#FF9BE2', colours.light_pink = '#FFBCEC', colours.purple = '#9370DB', colours.indigo = '#4B0082', colours.registration_black = '#000000', colours.rasin_black = '#212121', colours.dark_gray = '#474747', colours.rock_gray = '#606060', colours.gray = '#808080';
      } else if (e.target.value == 'autumn') {
        colours.ocean_blue = '#489191';
        colours.deep_blue = 'rgba(58,117,117,0.7)';
        colours.yellow = '#FFC201';
        colours.orange_peel = '#FF9962';
        colours.bark = '#552250F';
        colours.khaki = '#F0E68C';
        colours.olive = '#808000';
        colours.forest_green = '#A85832';
        colours.dark_green = '#66331F';
        colours.pea = '#663636';
        colours.yellow_green = '#FCB5B5';
        colours.light_green = '#90ee90';
        colours.lily_green = '#B4E8AC';
        colours.pink = '#FCB5B5';
        colours.leaf_brown = '#BC8274';
        colours.delicate_pink = '#FCDDF2';
        colours.light_pink = '#FAF6F6';
        colours.purple = '#9370DB';
        colours.indigo = '#4B0082';
        colours.registration_black = '#000000';
        colours.rasin_black = '#212121';
        colours.dark_gray = '#72583D';
        colours.rock_gray = '#7F6244';
        colours.gray = '#BD9267';
      } else {
        console.log("Error: radio button has no value");
      }
    });
  }
};

exports["default"] = Menu;

/***/ }),

/***/ "./src/movement/collisions.js":
/*!************************************!*\
  !*** ./src/movement/collisions.js ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Collisions = function () {
  function Collisions(tadpoles, fish, lillies, background) {
    _classCallCheck(this, Collisions);

    this.tadpoles = tadpoles;
    this.fish = fish;
    this.lillies = lillies;
    this.background = background;
  }

  _createClass(Collisions, [{
    key: "checkTadpoles",
    value: function checkTadpoles(movement) {
      for (var i = 0; i < this.tadpoles.length; i++) {
        var pondEdge = this.background.isColliding(this.tadpoles[i].pos);
        if (pondEdge != null) {
          var pos = this.tadpoles[i].pos;
          var dx = pondEdge[0] - pos[0];
          var dy = pondEdge[1] - pos[1];
          this.tadpoles[i].applyForce([dx, dy]);
        }
      }
    }
  }, {
    key: "checkFish",
    value: function checkFish(movement) {
      for (var i = 0; i < this.fish.length; i++) {
        var pondEdge = this.background.isColliding(this.fish[i].pos);
        if (pondEdge != null) {
          var pos = this.fish[i].pos;
          var dx = pondEdge[0] - pos[0];
          var dy = pondEdge[1] - pos[1];
          movement.smoothing(i, dx, dy);
        }
      }
    }
  }, {
    key: "checkLillies",
    value: function checkLillies(movement) {
      for (var i = 0; i < this.lillies.length; i++) {
        var pondEdge = this.background.isColliding(this.lillies[i].pos);
        if (pondEdge != null) {
          var pos = this.lillies[i].pos;
          var dx = pondEdge[0] - pos[0];
          var dy = pondEdge[1] - pos[1];
          movement.smoothing(i, dx, dy);
        }
        for (var j = 0; j < this.lillies.length; j++) {
          if (i == j) continue;
          if (this.isColliding(this.lillies[i], this.lillies[j])) {}
        }
      }
    }
  }, {
    key: "isColliding",
    value: function isColliding(a, b) {
      return false;
    }
  }]);

  return Collisions;
}();

exports["default"] = Collisions;

/***/ }),

/***/ "./src/movement/fishMovement.js":
/*!**************************************!*\
  !*** ./src/movement/fishMovement.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _movement = __webpack_require__(/*! ./movement */ "./src/movement/movement.js");

var _movement2 = _interopRequireDefault(_movement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FishMovement = function (_Movement) {
  _inherits(FishMovement, _Movement);

  function FishMovement(entity, canvas, collisions) {
    _classCallCheck(this, FishMovement);

    var _this = _possibleConstructorReturn(this, (FishMovement.__proto__ || Object.getPrototypeOf(FishMovement)).call(this, entity, canvas, collisions));

    _this.spacing = 20;
    return _this;
  }

  _createClass(FishMovement, [{
    key: 'move',
    value: function move(water) {
      var wiggleRate = 8;
      var wiggleSize = 0.5;
      var speed = document.getElementById('fishspd').value / 5;

      for (var i = 0; i < this.entities.length; i++) {
        var pos = this.entities[i].pos;
        this.edgeCheck(i, pos);
        if (this.entities[i].swimming) {
          this.entities[i].vel[1] = wiggleSize * Math.sin(2 * Math.PI * (this.entities[i].sin / wiggleRate * Math.PI / 180));
          if (Math.random() < 0.002) {
            this.entities[i].swimming = false;
            this.entities[i].vel = [0, 0];
          }
          this.slowing(i, speed);
        } else {
          this.reduce(i);
          if (this.entities[i].vel[0] < 0.01 && this.entities[i].vel[1] < 0.01) {
            if (Math.random() < 0.5) {
              this.entities[i].swimming = true;
              this.entities[i].vel = [(Math.random() - 0.5) * speed, (Math.random() - 0.5) * speed];
            } else {
              // Setting a random direction and speed while not being in the
              // range -1 to 1 as it is too slow
              var velx = (Math.random() > 0.8 ? 1 : -1) * (speed * Math.random() + 1.5);
              var vely = (Math.random() > 0.8 ? 1 : -1) * (speed * Math.random() + 1.5);
              this.entities[i].vel = [velx, vely];

              // Adding a water drop
              water.dropAt(pos[0], pos[1], this.entities[i].vel[0], this.entities[i].vel[1]);
            }
          }
        }
      }

      this.collisions.checkFish(this);
    }
  }, {
    key: 'reduce',
    value: function reduce(fish) {
      var redFactor = 0.99;
      var velX = this.entities[fish].vel[0] * redFactor;
      var velY = this.entities[fish].vel[1] * redFactor;
      this.entities[fish].vel = [velX, velY];
    }
  }]);

  return FishMovement;
}(_movement2.default);

exports["default"] = FishMovement;

/***/ }),

/***/ "./src/movement/lilyMovement.js":
/*!**************************************!*\
  !*** ./src/movement/lilyMovement.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _movement = __webpack_require__(/*! ./movement */ "./src/movement/movement.js");

var _movement2 = _interopRequireDefault(_movement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LilyMovement = function (_Movement) {
  _inherits(LilyMovement, _Movement);

  function LilyMovement(entity, canvas, collisions) {
    _classCallCheck(this, LilyMovement);

    var _this = _possibleConstructorReturn(this, (LilyMovement.__proto__ || Object.getPrototypeOf(LilyMovement)).call(this, entity, canvas, collisions));

    _this.spacing = 20;
    return _this;
  }

  _createClass(LilyMovement, [{
    key: 'move',
    value: function move() {
      for (var i = 0; i < this.entities.length; i++) {
        var pos = this.entities[i].pos;
        this.edgeCheck(i, pos);
        this.slowing(i, 0.1);
      }
      this.collisions.checkLillies(this);
    }
  }]);

  return LilyMovement;
}(_movement2.default);

exports["default"] = LilyMovement;

/***/ }),

/***/ "./src/movement/movement.js":
/*!**********************************!*\
  !*** ./src/movement/movement.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * MOVEMENT ABSTRACT CLASS
 * contains all universal movement methods
 */

var Movement = function () {
  function Movement(entities, canvas, collisions) {
    _classCallCheck(this, Movement);

    this.canvas = canvas;
    this.entities = entities;
    this.collisions = collisions;
  }

  _createClass(Movement, [{
    key: "move",
    value: function move() {}

    /*
     * EDGECHECK - checks to see if entity is off the edge of the canvas
     * If so moves the entity back onto the canvas
     */

  }, {
    key: "edgeCheck",
    value: function edgeCheck(index, pos) {
      if (pos[0] < 0 + this.spacing) {
        this.smoothing(index, 1, 0);
      } else if (pos[1] < 0 + this.spacing) {
        this.smoothing(index, 0, 1);
      } else if (pos[0] > this.canvas.width - this.spacing * 2) {
        this.smoothing(index, -1, 0);
      } else if (pos[1] > this.canvas.height - this.spacing * 2) {
        this.smoothing(index, 0, -1);
      }
    }

    /*
     * SMOOTHING - Changes the velocity slightly to make movement smoother
     */

  }, {
    key: "smoothing",
    value: function smoothing(index, velx, vely) {
      var smoothing = 0.005;
      var prevVel = this.entities[index].vel;
      this.entities[index].vel = [prevVel[0] + velx * smoothing, prevVel[1] + vely * smoothing];
    }

    /*
     * SLOWING - Reduces the velocity to the limit so the entity does not go
     * too fast
     */

  }, {
    key: "slowing",
    value: function slowing(entity, limit) {
      var prevVel = this.entities[entity].vel;
      if (prevVel[0] > limit) prevVel[0] = limit;else if (prevVel[0] < -limit) prevVel[0] = -limit;

      if (prevVel[1] > limit) prevVel[1] = limit;else if (prevVel[1] < -limit) prevVel[1] = -limit;

      this.entities[entity].vel = prevVel;
    }
  }]);

  return Movement;
}();

exports["default"] = Movement;

/***/ }),

/***/ "./src/movement/tadMovement.js":
/*!*************************************!*\
  !*** ./src/movement/tadMovement.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * TADMOVEMENT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * All of the movement patterns for tadpoles are contained here
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _movement = __webpack_require__(/*! ./movement */ "./src/movement/movement.js");

var _movement2 = _interopRequireDefault(_movement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TadMovement = function () {
  function TadMovement(entity, canvas, collisions) {
    _classCallCheck(this, TadMovement);

    this.canvas = canvas;
    this.boids = entity;
    this.collisions = collisions;
  }

  _createClass(TadMovement, [{
    key: 'move',
    value: function move() {
      var _this = this;

      this.boids.forEach(function (boid) {
        boid.flock(_this.boids);
        boid.flee(_this.collisions.fish);
        _this.collisions.checkTadpoles(_this);
      });
    }
  }]);

  return TadMovement;
}();

exports["default"] = TadMovement;

/***/ }),

/***/ "./src/movement/water/ripple.js":
/*!**************************************!*\
  !*** ./src/movement/water/ripple.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  This class contains all the ripple effects to the pond
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _colours = __webpack_require__(/*! ../../colours */ "./src/colours.js");

var colours = _interopRequireWildcard(_colours);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ripple = function () {
  function Ripple(dx, dy) {
    var vx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var vy = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    _classCallCheck(this, Ripple);

    this.dx = dx;
    this.dy = dy;
    this.vx = vx * 10;
    this.vy = vy * 10;
    this.size = 0;
    this.w = 10;
    // larger value == larger ripple size;
    var maxSize = 0.05;
    var minSize = 0.1;
    this.maxSize = maxSize + Math.random() * (minSize - maxSize);
  }

  _createClass(Ripple, [{
    key: 'tick',
    value: function tick() {
      this.size += 0.4;
      this.w -= this.maxSize;
    }

    /**
     * Takes in the original canvas then draws the ripple
     */

  }, {
    key: 'render',
    value: function render(canvas, ctx) {
      var x = this.dx;
      var y = this.dy;
      var s = this.size;

      ctx.beginPath();
      ctx.lineWidth = this.w;
      ctx.strokeStyle = colours.deep_blue;
      ctx.arc(x, y, s, 0, Math.PI * 2);
      ctx.stroke();

      if (s > 10) {
        s -= 10;
        x += this.vx;
        y += this.vy;
      }
      ctx.beginPath();
      ctx.lineWidth = this.w / 2;
      ctx.strokeStyle = colours.deep_blue;
      ctx.arc(x, y, s, 0, Math.PI * 2);
      ctx.stroke();
    }
  }]);

  return Ripple;
}();

exports["default"] = Ripple;

/***/ }),

/***/ "./src/movement/water/water.js":
/*!*************************************!*\
  !*** ./src/movement/water/water.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  This class is a manager for all ripples on the canvas
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _ripple = __webpack_require__(/*! ./ripple */ "./src/movement/water/ripple.js");

var _ripple2 = _interopRequireDefault(_ripple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Water = function () {
  function Water(canvas, ctx) {
    _classCallCheck(this, Water);

    // For ease of access
    this.canvas = canvas;
    this.ctx = ctx;

    this.ripples = [];
  }

  _createClass(Water, [{
    key: 'setBackground',
    value: function setBackground(background) {
      this.background = background;
    }
  }, {
    key: 'tick',
    value: function tick() {
      this.ripples.forEach(function (r) {
        return r.tick();
      });
      for (var i = 0; i < this.ripples.length; i++) {
        if (this.ripples[i].w < 0) {
          this.ripples.splice(i, 1);
          i--;
        }
      }
    }

    /**
     * Renders all ripples on the canvas
     */

  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      this.ripples.forEach(function (r) {
        return r.render(_this.canvas, _this.ctx);
      });
    }

    /**
     * Resize method recalibrates all the settings such as width and height
     * and size of arrays
     */

  }, {
    key: 'resize',
    value: function resize() {}

    /**
     * Simulates a drop starting at the given coordinates
     */

  }, {
    key: 'dropAt',
    value: function dropAt(dx, dy) {
      var vx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var vy = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

      dx <<= 0;
      dy <<= 0;
      if (this.background.isColliding([dx, dy]) == null) this.ripples.push(new _ripple2.default(dx, dy, vx, vy));
    }
  }, {
    key: 'randomDrop',
    value: function randomDrop() {
      this.dropAt(Math.random() * this.width, Math.random() * this.height);
    }
  }]);

  return Water;
}();

exports["default"] = Water;

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

var _background = __webpack_require__(/*! ./background/background */ "./src/background/background.js");

var _background2 = _interopRequireDefault(_background);

var _menu = __webpack_require__(/*! ./menu */ "./src/menu.js");

var _menu2 = _interopRequireDefault(_menu);

var _tadpole = __webpack_require__(/*! ./creature/tadpole */ "./src/creature/tadpole.js");

var _tadpole2 = _interopRequireDefault(_tadpole);

var _fish = __webpack_require__(/*! ./creature/fish */ "./src/creature/fish.js");

var _fish2 = _interopRequireDefault(_fish);

var _lily = __webpack_require__(/*! ./creature/lily */ "./src/creature/lily.js");

var _lily2 = _interopRequireDefault(_lily);

var _water = __webpack_require__(/*! ./movement/water/water */ "./src/movement/water/water.js");

var _water2 = _interopRequireDefault(_water);

var _collisions = __webpack_require__(/*! ./movement/collisions */ "./src/movement/collisions.js");

var _collisions2 = _interopRequireDefault(_collisions);

var _tadMovement = __webpack_require__(/*! ./movement/tadMovement */ "./src/movement/tadMovement.js");

var _tadMovement2 = _interopRequireDefault(_tadMovement);

var _fishMovement = __webpack_require__(/*! ./movement/fishMovement */ "./src/movement/fishMovement.js");

var _fishMovement2 = _interopRequireDefault(_fishMovement);

var _lilyMovement = __webpack_require__(/*! ./movement/lilyMovement */ "./src/movement/lilyMovement.js");

var _lilyMovement2 = _interopRequireDefault(_lilyMovement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pond = function () {
  function Pond(canvas, ctx) {
    _classCallCheck(this, Pond);

    this.canvas = canvas;
    this.ctx = ctx;

    this.water = new _water2.default(canvas, ctx);

    this.eventListeners();
    this.resize();
    this.init();
    this.loop();
  }

  /**
   * HTML canvas elements are initiated here and event listeners
   * are created
   */


  _createClass(Pond, [{
    key: 'eventListeners',
    value: function eventListeners() {
      var _this = this;

      this.menu = new _menu2.default(this);
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
      this.background = new _background2.default(canvas, ctx);
      this.water.setBackground(this.background);
      var size = this.background.size;

      this.tadpoles = [];
      this.fish = [];
      this.lillies = [];
      this.movement = [];

      // Pushes all tadpoles to their array
      for (var i = 0; i < this.tadpoleSize; i++) {
        this.tadpoles.push(new _tadpole2.default(canvas, size));
      } // Pushes all fish and lillies to their arrays
      for (var _i = 0; _i < this.fishSize; _i++) {
        this.fish.push(new _fish2.default(canvas, ctx, size));
      }for (var _i2 = 0; _i2 < this.lilySize; _i2++) {
        this.lillies.push(new _lily2.default(canvas, size));
      } // Sets movement patterns for all entities
      this.collisions = new _collisions2.default(this.tadpoles, this.fish, this.lillies, this.background);

      this.movement.push(new _tadMovement2.default(this.tadpoles, canvas, this.collisions), new _fishMovement2.default(this.fish, canvas, this.collisions), new _lilyMovement2.default(this.lillies, canvas, this.collisions));
    }
  }, {
    key: 'loop',
    value: function loop() {
      var _this2 = this;

      window.requestAnimationFrame(function () {
        _this2.resize();
        _this2.tick();
        _this2.render();
        _this2.loop();
      });
    }

    /**
     * All tick functions are run for all the movements and for each
     * entity
     */

  }, {
    key: 'tick',
    value: function tick() {
      var _this3 = this;

      this.movement.forEach(function (m) {
        return m.move(_this3.water);
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

    /**
     * This is run every frame loop but only gets past the if statement
     * if the window size has changed
     */

  }, {
    key: 'resize',
    value: function resize() {
      if (canvas.width != window.innerWidth || canvas.height != window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.water.resize();
        this.tadpoleSize = document.getElementById('tadpoles').value;
        this.fishSize = document.getElementById('fish').value;
        this.lilySize = document.getElementById('lillies').value;
        this.init();
      }
    }
  }]);

  return Pond;
}();

document.getElementById("youtube").src += Math.round(Math.random() * 275);
__webpack_require__(/*! ./mystyles.scss */ "./src/mystyles.scss");
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var pond = new Pond(canvas, ctx);
})();

/******/ })()
;
//# sourceMappingURL=pond.bundle.js.map