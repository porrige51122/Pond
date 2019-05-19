/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/pond.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/background/background.js":
/*!**************************************!*\
  !*** ./src/background/background.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colours = __webpack_require__(/*! ../colours */ "./src/colours.js");

var _colours2 = _interopRequireDefault(_colours);

var _rock = __webpack_require__(/*! ./rock */ "./src/background/rock.js");

var _rock2 = _interopRequireDefault(_rock);

var _cattail = __webpack_require__(/*! ./cattail */ "./src/background/cattail.js");

var _cattail2 = _interopRequireDefault(_cattail);

var _longGrass = __webpack_require__(/*! ./longGrass */ "./src/background/longGrass.js");

var _longGrass2 = _interopRequireDefault(_longGrass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    this.pondColour = _colours2.default.ocean_blue;
    this.landColour = _colours2.default.pea;
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

      var grassCount = 1000;
      this.aroundPond(grassCount, new _longGrass2.default(this.canvasB, ctxB, this.size));
      // Approximate count due to random nature
      var rockCount = 100;
      this.edgeOfPond(rockCount, new _rock2.default(this.canvasB, ctxB, this.size));
      var cattailCount = 30;
      this.edgeOfPond(cattailCount, new _cattail2.default(this.canvasB, ctxB, this.size));
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
          var dis = Math.sqrt(Math.pow(pos[0] - this.pos[2], 2) + Math.pow(pos[1] - this.pos[3], 2));
          var dis2 = Math.sqrt(Math.pow(pos[0] - this.pos[0], 2) + Math.pow(pos[1] - this.pos[1], 2));
          if (dis > this.size && dis2 > this.size) {
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
      ctx.drawImage(this.canvasB, 0, 0);
    }
  }, {
    key: 'isColliding',
    value: function isColliding(entity) {
      // Calculate if the object will collide with the wall
      var dxa = entity.pos[0] - this.pos[0];
      var dya = entity.pos[1] - this.pos[1];
      var dxb = entity.pos[0] - this.pos[2];
      var dyb = entity.pos[1] - this.pos[3];
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

exports.default = Background;

/***/ }),

/***/ "./src/background/cattail.js":
/*!***********************************!*\
  !*** ./src/background/cattail.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colours = __webpack_require__(/*! ../colours */ "./src/colours.js");

var _colours2 = _interopRequireDefault(_colours);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
      var stemColour = _colours2.default.dark_green;
      var headLength = this.size / 15 * length;
      var headThickness = this.size / 20;
      var headColour = _colours2.default.olive;
      var tipLength = this.size / 40 * length;
      var tipThickness = this.size / 120;
      var tipColour = _colours2.default.khaki;
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

exports.default = Cattail;

/***/ }),

/***/ "./src/background/longGrass.js":
/*!*************************************!*\
  !*** ./src/background/longGrass.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colours = __webpack_require__(/*! ../colours */ "./src/colours.js");

var _colours2 = _interopRequireDefault(_colours);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      this.ctx.fillStyle = _colours2.default.forest_green;
      this.ctx.moveTo(0, -h / 2);
      this.ctx.bezierCurveTo(w / 2, -h / 2, w / 2, h / 2, 0, h / 2);
      this.ctx.bezierCurveTo(-w / 2, h / 2, -w / 2, -h / 2, 0, -h / 2);
      this.ctx.fill();
      this.ctx.beginPath();
      this.ctx.strokeStyle = _colours2.default.dark_green;
      this.ctx.moveTo(0, -h / 2);
      this.ctx.bezierCurveTo(w / 2, -h / 2, w / 2, h / 2, 0, h / 2);
      this.ctx.bezierCurveTo(-w / 2, h / 2, -w / 2, -h / 2, 0, -h / 2);
      this.ctx.stroke();
      this.ctx.restore();
    }
  }]);

  return LongGrass;
}();

exports.default = LongGrass;

/***/ }),

/***/ "./src/background/rock.js":
/*!********************************!*\
  !*** ./src/background/rock.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colours = __webpack_require__(/*! ../colours */ "./src/colours.js");

var _colours2 = _interopRequireDefault(_colours);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      this.ctx.fillStyle = _colours2.default.rock_gray;
      this.ctx.moveTo(points[0][0], points[0][1]);
      for (var _a = 2; _a < points.length; _a += 2) {
        this.ctx.lineTo(points[_a][0], points[_a][1]);
      }this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.fillStyle = _colours2.default.gray;
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
      this.ctx.strokeStyle = _colours2.default.dark_gray;
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

exports.default = Rock;

/***/ }),

/***/ "./src/colours.js":
/*!************************!*\
  !*** ./src/colours.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  // Daytime
  ocean_blue: '#80a4dd',
  deep_blue: '#2c59a3',
  yellow: '#FFD000',
  orange_peel: '#FF9D00',
  khaki: '#F0E68C',
  olive: '#808000',
  forest_green: '#228B22',
  dark_green: '#006400',
  pea: '#78AB46',
  light_green: '#90ee90',
  lily_green: '#B4E8AC',
  pink: '#FFC0CB',
  delicate_pink: '#F4DEDB',
  light_pink: '#FFF2F2',
  registration_black: '#000000',
  rasin_black: '#212121',
  dark_gray: '#474747',
  rock_gray: '#606060',
  gray: '#808080'
};

/***/ }),

/***/ "./src/creature/fish.js":
/*!******************************!*\
  !*** ./src/creature/fish.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This class contains all information for each fish
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _colours = __webpack_require__(/*! ../colours */ "./src/colours.js");

var _colours2 = _interopRequireDefault(_colours);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Fish = function () {
  function Fish(canvas) {
    _classCallCheck(this, Fish);

    // Random Position on canvas
    this.pos = [Math.random() * canvas.width, Math.random() * canvas.height];
    // Random size 10-15
    this.size = 5 + Math.random() * 5;
    // Random velocity [-1, -1] - [1, 1]
    this.vel = [(Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2];
    // Extra Variables
    this.swimming = true;
    this.sin = 0;
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
    }

    /**
     * RENDER - Draws an orange ball and two smaller balls behind it to simulate
     * a tail
     */

  }, {
    key: 'render',
    value: function render(canvas, ctx) {
      // Draw Body
      ctx.beginPath();
      ctx.fillStyle = _colours2.default.orange_peel;
      ctx.arc(this.pos[0], this.pos[1], this.size, 0, 2 * Math.PI);
      ctx.fill();
      // Draw Tail
      ctx.beginPath();
      ctx.fillStyle = _colours2.default.orange_peel;
      ctx.arc(this.pos[0] - this.vel[0] * 10, this.pos[1] - this.vel[1] * 10, this.size / 4 * 3, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = _colours2.default.orange_peel;
      ctx.arc(this.pos[0] - this.vel[0] * 20, this.pos[1] - this.vel[1] * 20, this.size / 2, 0, 2 * Math.PI);
      ctx.fill();
    }
  }]);

  return Fish;
}();

exports.default = Fish;

/***/ }),

/***/ "./src/creature/lily.js":
/*!******************************!*\
  !*** ./src/creature/lily.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This class contains all information for each lily
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _colours = __webpack_require__(/*! ../colours */ "./src/colours.js");

var _colours2 = _interopRequireDefault(_colours);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Lily = function () {
  function Lily(canvas) {
    _classCallCheck(this, Lily);

    // Random Position on canvas
    this.pos = [Math.random() * canvas.width, Math.random() * canvas.height];
    // All have same size 30 - CHANGE TO RANDOM SOON
    this.size = 30;
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
        //Draw First Half
        var start = this.startAngle;
        ctx.beginPath();
        ctx.fillStyle = _colours2.default.light_green;
        ctx.arc(this.pos[0], this.pos[1], this.size, start, Math.PI + start);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = _colours2.default.lily_green;
        ctx.arc(this.pos[0], this.pos[1], this.size / 4 * 3, start, Math.PI + start);
        ctx.fill();
        // Draws second half with not full rotation to give the circle the slit
        start += Math.PI / 180 * 170;
        ctx.beginPath();
        ctx.fillStyle = _colours2.default.light_green;
        ctx.arc(this.pos[0], this.pos[1], this.size, start, Math.PI + start);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = _colours2.default.lily_green;
        ctx.arc(this.pos[0], this.pos[1], this.size / 4 * 3, start, Math.PI + start);
        ctx.fill();
      } else {
        // Draws the full circle
        ctx.beginPath();
        ctx.fillStyle = _colours2.default.light_green;
        ctx.arc(this.pos[0], this.pos[1], this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = _colours2.default.lily_green;
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
      this.drawRing(ctx, _colours2.default.pink, this.size / 2, this.size / 4 * 3);
      this.drawRing(ctx, _colours2.default.delicate_pink, this.size / 4, this.size / 2);
      this.drawRing(ctx, _colours2.default.light_pink, this.size / 8, this.size / 3);
      ctx.beginPath();
      ctx.fillStyle = _colours2.default.yellow;
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

exports.default = Lily;

/***/ }),

/***/ "./src/creature/tadpole.js":
/*!*********************************!*\
  !*** ./src/creature/tadpole.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This class contains all information for each tadpole
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _colours = __webpack_require__(/*! ../colours */ "./src/colours.js");

var _colours2 = _interopRequireDefault(_colours);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tadpole = function () {
  function Tadpole(canvas) {
    _classCallCheck(this, Tadpole);

    // Random Position on canvas
    this.pos = [Math.random() * canvas.width, Math.random() * canvas.height];
    // Random size 3-4
    this.size = 1 + Math.random();
    // Initially still
    this.vel = [0, 0];
    // 1.5% chance to become leader
    this.leader = Math.random() < 0.015;
    // follow noone until assigned
    this.follow = null;
    // eagerness = how close to the leader the tadpole will follow
    this.eagerness = Math.random();
  }

  /**
   * TICK - Moves the entity
   */


  _createClass(Tadpole, [{
    key: 'tick',
    value: function tick() {
      this.pos[0] += this.vel[0];
      this.pos[1] += this.vel[1];
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
      ctx.fillStyle = _colours2.default.registration_black;
      ctx.arc(this.pos[0], this.pos[1], this.size, 0, 2 * Math.PI);
      ctx.fill();
      // Draw Tail
      ctx.beginPath();
      ctx.fillStyle = _colours2.default.rasin_black;
      ctx.arc(this.pos[0] - this.vel[0] * 5, this.pos[1] - this.vel[1] * 5, this.size / 4 * 3, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = _colours2.default.rasin_black;
      ctx.arc(this.pos[0] - this.vel[0] * 10, this.pos[1] - this.vel[1] * 10, this.size / 2, 0, 2 * Math.PI);
      ctx.fill();
    }

    /**
     * GETLEADER - creates an array of leader tadpoles and radomly chooses
     * which one it will follow
     */

  }, {
    key: 'getLeader',
    value: function getLeader(tadpoles) {
      var leaders = [];
      for (var i = 0; i < tadpoles.length; i++) {
        if (this.leader) {
          break;
        }
        if (tadpoles[i].leader) leaders.push(i);
      }
      this.follow = leaders[Math.floor(Math.random() * leaders.length)];
    }
  }]);

  return Tadpole;
}();

exports.default = Tadpole;

/***/ }),

/***/ "./src/movement/collisions.js":
/*!************************************!*\
  !*** ./src/movement/collisions.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

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
        var pondEdge = this.background.isColliding(this.tadpoles[i]);
        if (pondEdge != null) {
          var pos = this.tadpoles[i].pos;
          var dx = pondEdge[0] - pos[0];
          var dy = pondEdge[1] - pos[1];
          var len = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
          movement.smoothing(i, dx / len, dy / len);
        }
      }
    }
  }, {
    key: "checkFish",
    value: function checkFish(movement) {
      for (var i = 0; i < this.fish.length; i++) {
        var pondEdge = this.background.isColliding(this.fish[i]);
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
        var pondEdge = this.background.isColliding(this.lillies[i]);
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

exports.default = Collisions;

/***/ }),

/***/ "./src/movement/fishMovement.js":
/*!**************************************!*\
  !*** ./src/movement/fishMovement.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

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
      var speed = 1;

      for (var i = 0; i < this.entities.length; i++) {
        var pos = this.entities[i].pos;
        this.edgeCheck(i, pos);
        if (this.entities[i].swimming) {
          this.entities[i].vel[1] = wiggleSize * Math.sin(2 * Math.PI * (this.entities[i].sin / wiggleRate * Math.PI / 180));
          if (Math.random() < 0.005) {
            this.entities[i].swimming = false;
            this.entities[i].vel = [0, 0];
          }
          this.slowing(i, 2);
        } else {
          this.reduce(i);
          if (this.entities[i].vel[0] < 0.01 && this.entities[i].vel[1] < 0.01) {
            if (Math.random() < 0.5) {
              this.entities[i].swimming = true;
              this.entities[i].vel = [(Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2];
            } else {
              // Setting a random direction and speed while not being in the
              // range -1 to 1 as it is too slow
              var velx = (Math.random() > 0.5 ? 1 : -1) * (speed * Math.random() + 1);
              var vely = (Math.random() > 0.8 ? 1 : -1) * (speed * Math.random() + 1);
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

exports.default = FishMovement;

/***/ }),

/***/ "./src/movement/lilyMovement.js":
/*!**************************************!*\
  !*** ./src/movement/lilyMovement.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

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

exports.default = LilyMovement;

/***/ }),

/***/ "./src/movement/movement.js":
/*!**********************************!*\
  !*** ./src/movement/movement.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

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

exports.default = Movement;

/***/ }),

/***/ "./src/movement/tadMovement.js":
/*!*************************************!*\
  !*** ./src/movement/tadMovement.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _movement = __webpack_require__(/*! ./movement */ "./src/movement/movement.js");

var _movement2 = _interopRequireDefault(_movement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * TADMOVEMENT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All of the movement patterns for tadpoles are contained here
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var TadMovement = function (_Movement) {
  _inherits(TadMovement, _Movement);

  function TadMovement(entity, canvas, collisions) {
    _classCallCheck(this, TadMovement);

    var _this = _possibleConstructorReturn(this, (TadMovement.__proto__ || Object.getPrototypeOf(TadMovement)).call(this, entity, canvas, collisions));

    _this.spacing = 20;
    return _this;
  }

  _createClass(TadMovement, [{
    key: 'move',
    value: function move() {
      // Chance that the tadpole will change their leadership state
      var leaderChance = 0.0000005;

      // Chance that the tadpole will change the leader they are following
      var followChance = 0.00002;

      for (var i = 0; i < this.entities.length; i++) {
        var pos = this.entities[i].pos;
        this.edgeCheck(i, pos);

        if (this.entities[i].leader) {
          // Leader
          // Random movement
          this.smoothing(i, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2);

          if (Math.random() < leaderChance) {
            this.entities[i].leader = false;

            // Makes all tadpoles following that leader find a new leader
            for (var j = 0; j < this.entities.length; j++) {
              if (this.entities[j].follow == i) {
                this.entities[i].getLeader(this.entities);
              }
            }
          }
        } else if (this.entities[i].follow == null) {
          // Prevents error
          this.entities[i].getLeader(this.entities);
        } else {
          // Non Leader
          // Setting variables
          var leaderPos = this.entities[this.entities[i].follow].pos;
          var disX = pos[0] - leaderPos[0];
          var disY = pos[1] - leaderPos[1];
          // Length between current position and leader position
          var length = Math.sqrt(Math.pow(disX, 2) + Math.pow(disY, 2));

          if (length == 0) length = 1; // Preventing dividing by zero
          if (length > this.entities[i].eagerness * this.spacing) {
            this.smoothing(i, -disX / (length * 2), -disY / (length * 2));
          } else {
            this.smoothing(i, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4);
          }

          if (Math.random() < followChance) {
            this.entities[i].getLeader(this.entities);
          }
          if (Math.random() < leaderChance) {
            this.entities[i].leader = true;
          }
        }
        this.slowing(i, 0.5);
      }
      this.collisions.checkTadpoles(this);
    }
  }]);

  return TadMovement;
}(_movement2.default);

exports.default = TadMovement;

/***/ }),

/***/ "./src/movement/water/ripple.js":
/*!**************************************!*\
  !*** ./src/movement/water/ripple.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  This class contains all the ripple effects to the pond
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _colours = __webpack_require__(/*! ../../colours */ "./src/colours.js");

var _colours2 = _interopRequireDefault(_colours);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      ctx.strokeStyle = _colours2.default.deep_blue;
      ctx.moveTo(x, y + s);
      ctx.bezierCurveTo(x + s * 1.25, y + s, x + s * 1.25, y - s, x, y - s);
      ctx.bezierCurveTo(x - s * 1.25, y - s, x - s * 1.25, y + s, x, y + s);
      ctx.stroke();

      if (s > 10) {
        s -= 10;
        x += this.vx;
        y += this.vy;
      }
      ctx.beginPath();
      ctx.lineWidth = this.w / 2;
      ctx.strokeStyle = _colours2.default.deep_blue;
      ctx.moveTo(x, y + s);
      ctx.bezierCurveTo(x + s * 1.25, y + s, x + s * 1.25, y - s, x, y - s);
      ctx.bezierCurveTo(x - s * 1.25, y - s, x - s * 1.25, y + s, x, y + s);
      ctx.stroke();
    }
  }]);

  return Ripple;
}();

exports.default = Ripple;

/***/ }),

/***/ "./src/movement/water/water.js":
/*!*************************************!*\
  !*** ./src/movement/water/water.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

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
      this.ripples.push(new _ripple2.default(dx, dy, vx, vy));
    }
  }, {
    key: 'randomDrop',
    value: function randomDrop() {
      this.dropAt(Math.random() * this.width, Math.random() * this.height);
    }
  }]);

  return Water;
}();

exports.default = Water;

/***/ }),

/***/ "./src/pond.js":
/*!*********************!*\
  !*** ./src/pond.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * POND: This is the controller of the entire program, this is where
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * the program loop is run, containing: render, tick and resize.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _background = __webpack_require__(/*! ./background/background */ "./src/background/background.js");

var _background2 = _interopRequireDefault(_background);

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

      var hide = document.getElementById('hidecheck');
      var refresh = document.getElementById('refresh');

      this.hidden = false;
      this.screenRatio = 3 / 4;
      hide.addEventListener('change', function (e) {
        if (e.target.checked) {
          document.getElementById('menu').classList.add("hide");
        } else {
          document.getElementById('menu').classList.remove("hide");
        }
      });

      // Initialise the variables
      this.tadpoleSize = document.getElementById('tadpoles').value;
      this.fishSize = document.getElementById('fish').value;
      this.lilySize = document.getElementById('lillies').value;

      refresh.addEventListener('mouseup', function (e) {
        _this.tadpoleSize = document.getElementById('tadpoles').value;
        _this.fishSize = document.getElementById('fish').value;
        _this.lilySize = document.getElementById('lillies').value;
        _this.init();
      });

      canvas.addEventListener("mousemove", function () {
        if (Math.random() < 0.5) {
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
      var _this2 = this;

      this.background = new _background2.default(canvas, ctx);

      this.tadpoles = [];
      this.fish = [];
      this.lillies = [];
      this.movement = [];

      // Pushes all tadpoles to their array and sets the first one as
      // leader in case there are no tadpole leaders.
      for (var i = 0; i < this.tadpoleSize; i++) {
        this.tadpoles.push(new _tadpole2.default(canvas));
      }this.tadpoles.forEach(function (tad) {
        return tad.getLeader(_this2.tadpoles);
      });
      this.tadpoles[0].leader = true;

      // Pushes all fish and lillies to their arrays
      for (var _i = 0; _i < this.fishSize; _i++) {
        this.fish.push(new _fish2.default(canvas));
      }for (var _i2 = 0; _i2 < this.lilySize; _i2++) {
        this.lillies.push(new _lily2.default(canvas));
      } // Sets movement patterns for all entities
      this.collisions = new _collisions2.default(this.tadpoles, this.fish, this.lillies, this.background);

      this.movement.push(new _tadMovement2.default(this.tadpoles, canvas, this.collisions), new _fishMovement2.default(this.fish, canvas, this.collisions), new _lilyMovement2.default(this.lillies, canvas, this.collisions));
    }
  }, {
    key: 'loop',
    value: function loop() {
      var _this3 = this;

      window.requestAnimationFrame(function () {
        _this3.resize();
        _this3.tick();
        _this3.render();
        _this3.loop();
      });
    }

    /**
     * All tick functions are run for all the movements and for each
     * entity
     */

  }, {
    key: 'tick',
    value: function tick() {
      var _this4 = this;

      this.movement.forEach(function (m) {
        return m.move(_this4.water);
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
        // this.background.createLand(canvas, ctx);
      }
    }
  }]);

  return Pond;
}();

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var pond = new Pond(canvas, ctx);

/***/ })

/******/ });
//# sourceMappingURL=pond.bundle.js.map