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
  // Blues
  ocean_blue: '#80a4dd',
  rich_black: '#090F23',

  // Purples
  middle_red_purple: '#160926',

  // Yellows
  yellow: '#FFD000',

  // Oranges
  orange_peel: '#FF9D00',

  // Greens
  light_green: '#90ee90',
  lily_green: '#B4E8AC',

  // Pinks
  pink: '#FFC0CB',
  delicate_pink: '#F4DEDB',
  light_pink: '#FFF2F2',
  virgin_pink: '#FFF7F7',

  // Grays
  registration_black: '#000000',
  rasin_black: '#212121',
  davys_grey: '#595959'
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colours = __webpack_require__(/*! ../colours */ "./src/colours.js");

var _colours2 = _interopRequireDefault(_colours);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Fish = function () {
  function Fish(pos) {
    _classCallCheck(this, Fish);

    this.pos = pos;
    this.size = 10 + Math.random() * 5;
    this.vel = [(Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2];
    this.twitching = 0;
    this.swimming = true;
    this.sin = 0;
  }

  _createClass(Fish, [{
    key: 'tick',
    value: function tick() {
      this.sin++;
      if (this.sin > 1440) this.sin = 0;
      this.pos[0] += this.vel[0];
      this.pos[1] += this.vel[1];
    }
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colours = __webpack_require__(/*! ../colours */ "./src/colours.js");

var _colours2 = _interopRequireDefault(_colours);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var lily = function () {
  function lily(pos) {
    _classCallCheck(this, lily);

    this.pos = pos;
    this.size = 50;
    this.vel = [Math.random() - 0.5, Math.random() - 0.5];
    this.startAngle = Math.PI * 2 * Math.random();
    this.clockwise = Math.random() < 0.5;
    this.isFlower = Math.random() < 0.25;
  }

  _createClass(lily, [{
    key: 'tick',
    value: function tick() {
      if (this.clockwise) this.startAngle += 0.001;else this.startAngle -= 0.001;
      this.pos[0] += this.vel[0];
      this.pos[1] += this.vel[1];
    }
  }, {
    key: 'render',
    value: function render(canvas, ctx) {
      if (!this.isFlower) {
        var start = this.startAngle;
        ctx.beginPath();
        ctx.fillStyle = _colours2.default.light_green;
        ctx.arc(this.pos[0], this.pos[1], this.size, start, Math.PI + start);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = _colours2.default.lily_green;
        ctx.arc(this.pos[0], this.pos[1], this.size / 4 * 3, start, Math.PI + start);
        ctx.fill();

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
  }, {
    key: 'drawFlower',
    value: function drawFlower(ctx) {
      var firstRing = this.size / 4;
      this.drawRing(ctx, _colours2.default.pink, this.size / 2, this.size / 4 * 3);
      this.drawRing(ctx, _colours2.default.delicate_pink, this.size / 4, this.size / 2);
      this.drawRing(ctx, _colours2.default.light_pink, this.size / 8, this.size / 4);
      ctx.beginPath();
      ctx.fillStyle = _colours2.default.yellow;
      ctx.arc(this.pos[0], this.pos[1], this.size / 8, 0, Math.PI * 2);
      ctx.fill();
    }
  }, {
    key: 'drawRing',
    value: function drawRing(ctx, fillStyle, w, h) {
      this.drawGroup(ctx, fillStyle, this.pos[0], this.pos[1], w, h);
      ctx.save();
      ctx.translate(this.pos[0], this.pos[1]);
      ctx.rotate(Math.PI / 4);
      this.drawGroup(ctx, fillStyle, 0, 0, w, h);
      ctx.restore();
    }
  }, {
    key: 'drawGroup',
    value: function drawGroup(ctx, fillStyle, x, y, w, h) {
      this.drawPair(ctx, fillStyle, x, y, w, h);
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.PI / 2);
      this.drawPair(ctx, fillStyle, 0, 0, w, h);
      ctx.restore();
    }
  }, {
    key: 'drawPair',
    value: function drawPair(ctx, fillStyle, x, y, w, h) {
      this.drawPetal(ctx, fillStyle, x, y + h / 2, w, h);
      this.drawPetal(ctx, fillStyle, x, y - h / 2, w, h);
    }
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

  return lily;
}();

exports.default = lily;

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colours = __webpack_require__(/*! ../colours */ "./src/colours.js");

var _colours2 = _interopRequireDefault(_colours);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tadpole = function () {
  function Tadpole(pos) {
    _classCallCheck(this, Tadpole);

    this.pos = pos;
    this.size = 3 + Math.random();
    this.vel = [0, 0];
    var leaderChance = 0.015;
    this.leader = Math.random() < leaderChance;
    this.follow = null;
    this.eagerness = Math.random();
    this.changeDir = false;
  }

  _createClass(Tadpole, [{
    key: 'tick',
    value: function tick() {
      this.pos[0] += this.vel[0];
      this.pos[1] += this.vel[1];
    }
  }, {
    key: 'render',
    value: function render(canvas, ctx) {
      // Draw Body
      ctx.beginPath();
      // if (this.leader)
      // ctx.fillStyle = colours.yellow;
      // else
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

  function FishMovement(entity, canvas) {
    _classCallCheck(this, FishMovement);

    var _this = _possibleConstructorReturn(this, (FishMovement.__proto__ || Object.getPrototypeOf(FishMovement)).call(this, entity, canvas));

    _this.spacing = 20;
    return _this;
  }

  _createClass(FishMovement, [{
    key: 'move',
    value: function move() {
      for (var i = 0; i < this.entities.length; i++) {
        var pos = this.entities[i].pos;
        if (this.entities[i].swimming) {
          if (pos[0] < 0 + this.spacing) {
            this.smoothing(i, 1, 0);
          } else if (pos[1] < 0 + this.spacing) {
            this.smoothing(i, 0, 1);
          } else if (pos[0] > this.canvas.width - this.spacing * 2) {
            this.smoothing(i, -1, 0);
          } else if (pos[1] > this.canvas.height - this.spacing * 2) {
            this.smoothing(i, 0, -1);
          }

          var wiggleRate = 8;
          var wiggleSize = 0.5;
          this.entities[i].vel[1] = wiggleSize * Math.sin(2 * Math.PI * (this.entities[i].sin / wiggleRate * Math.PI / 180));
          if (Math.random() < 0.005) {
            this.entities[i].swimming = false;
            this.entities[i].vel = [0, 0];
          }
          this.slowing(i, 2);
        } else {
          if (pos[0] < 0 + this.spacing) {
            this.smoothing(i, 1, 0);
          } else if (pos[1] < 0 + this.spacing) {
            this.smoothing(i, 0, 5);
          } else if (pos[0] > this.canvas.width - this.spacing * 2) {
            this.smoothing(i, -1, 0);
          } else if (pos[1] > this.canvas.height - this.spacing * 2) {
            this.smoothing(i, 0, -5);
          }
          this.reduce(i);
          if (this.entities[i].vel[0] < 0.01 && this.entities[i].vel[1] < 0.01) {
            if (Math.random() < 0.5) {
              this.entities[i].swimming = true;
              this.entities[i].vel = [(Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2];
            } else {
              var speed = 5;
              this.entities[i].vel = [(Math.random() - 0.5) * speed, (Math.random() - 0.5) * speed];
            }
          }
        }
      }
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

  function LilyMovement(entity, canvas) {
    _classCallCheck(this, LilyMovement);

    var _this = _possibleConstructorReturn(this, (LilyMovement.__proto__ || Object.getPrototypeOf(LilyMovement)).call(this, entity, canvas));

    _this.spacing = 20;
    return _this;
  }

  _createClass(LilyMovement, [{
    key: 'move',
    value: function move() {
      for (var i = 0; i < this.entities.length; i++) {
        var pos = this.entities[i].pos;
        if (pos[0] < 0 + this.spacing) {
          this.smoothing(i, 1, 0);
        } else if (pos[1] < 0 + this.spacing) {
          this.smoothing(i, 0, 5);
        } else if (pos[0] > this.canvas.width - this.spacing * 2) {
          this.smoothing(i, -1, 0);
        } else if (pos[1] > this.canvas.height - this.spacing * 2) {
          this.smoothing(i, 0, -5);
        }
        this.slowing(i, 0.1);
      }
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

var Movement = function () {
  function Movement(entity, canvas) {
    _classCallCheck(this, Movement);

    this.canvas = canvas;
    this.entities = entity;
  }

  _createClass(Movement, [{
    key: "move",
    value: function move() {}
  }, {
    key: "smoothing",
    value: function smoothing(index, velx, vely) {
      var smoothing = 0.005;
      var prevVel = this.entities[index].vel;
      this.entities[index].vel = [prevVel[0] + velx * smoothing, prevVel[1] + vely * smoothing];
    }
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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TadMovement = function (_Movement) {
  _inherits(TadMovement, _Movement);

  function TadMovement(entity, canvas) {
    _classCallCheck(this, TadMovement);

    var _this = _possibleConstructorReturn(this, (TadMovement.__proto__ || Object.getPrototypeOf(TadMovement)).call(this, entity, canvas));

    _this.spacing = 20;
    return _this;
  }

  _createClass(TadMovement, [{
    key: 'move',
    value: function move() {
      for (var i = 0; i < this.entities.length; i++) {
        var pos = this.entities[i].pos;
        // If near the edge, move away
        if (pos[0] < 0 + this.spacing) {
          this.smoothing(i, 1, 0);
        } else if (pos[1] < 0 + this.spacing) {
          this.smoothing(i, 0, 1);
        } else if (pos[0] > this.canvas.width - this.spacing * 2) {
          this.smoothing(i, -1, 0);
        } else if (pos[1] > this.canvas.height - this.spacing * 2) {
          this.smoothing(i, 0, -1);
        }
        // Leader = random Movement
        // Non Leader = follow designated leader
        if (this.entities[i].leader) {
          this.smoothing(i, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2);
          if (Math.random() < 0.0000005) {
            this.entities[i].leader = false;
          }
        } else if (this.entities[i].follow == null) {
          this.entities[i].getLeader(this.entities);
        } else {
          var leaderPos = this.entities[this.entities[i].follow].pos;
          var length = Math.sqrt(Math.abs(Math.pow(pos[0] - leaderPos[0], 2) - Math.pow(pos[1] - leaderPos[1], 2)));
          if (length == 0) {
            length = 1;
          }
          if (length > this.entities[i].eagerness * this.spacing) this.smoothing(i, (leaderPos[0] - pos[0]) / (length * 2), (leaderPos[1] - pos[1]) / (length * 2));else this.smoothing(i, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4);

          if (Math.random() < 0.00002) {
            this.entities[i].getLeader(this.entities);
          }
          if (Math.random() < 0.0000005) {
            this.entities[i].leader = true;
          }
        }
        this.slowing(i, 1);
      }
    }
  }]);

  return TadMovement;
}(_movement2.default);

exports.default = TadMovement;

/***/ }),

/***/ "./src/pond.js":
/*!*********************!*\
  !*** ./src/pond.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colours = __webpack_require__(/*! ./colours */ "./src/colours.js");

var _colours2 = _interopRequireDefault(_colours);

var _tadpole = __webpack_require__(/*! ./creature/tadpole */ "./src/creature/tadpole.js");

var _tadpole2 = _interopRequireDefault(_tadpole);

var _fish = __webpack_require__(/*! ./creature/fish */ "./src/creature/fish.js");

var _fish2 = _interopRequireDefault(_fish);

var _lily = __webpack_require__(/*! ./creature/lily */ "./src/creature/lily.js");

var _lily2 = _interopRequireDefault(_lily);

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

    // canvas elements
    this.eventListeners();

    this.resize();
    this.init();
    this.loop();
  }

  _createClass(Pond, [{
    key: 'eventListeners',
    value: function eventListeners() {
      var _this = this;

      var hide = document.getElementById('hide');
      var tadSlider = document.getElementById('tadpoles');
      var fishSlider = document.getElementById('fish');
      var lilySlider = document.getElementById('lillies');

      this.hidden = false;
      hide.addEventListener('change', function (e) {
        if (e.target.checked) {
          _this.hidden = true;
          document.getElementById('menu').classList.add("hide");
        } else {
          _this.hidden = false;
          document.getElementById('menu').classList.remove("hide");
        }
      });

      this.tadpoleSize = tadSlider.value;
      tadSlider.addEventListener('mouseup', function (e) {
        _this.tadpoleSize = tadSlider.value;
        _this.init();
      });

      this.fishSize = fishSlider.value;
      fishSlider.addEventListener('mouseup', function (e) {
        _this.fishSize = fishSlider.value;
        _this.init();
      });

      this.lilySize = lilySlider.value;
      lilySlider.addEventListener('mouseup', function (e) {
        _this.lilySize = lilySlider.value;
        _this.init();
      });
    }
  }, {
    key: 'init',
    value: function init() {
      var _this2 = this;

      this.tadpoles = [];
      this.fish = [];
      this.lillies = [];

      for (var i = 0; i < this.tadpoleSize; i++) {
        this.tadpoles.push(new _tadpole2.default([Math.random() * canvas.width, Math.random() * canvas.height]));
      }this.tadpoles[0].leader = true;
      this.tadpoles.forEach(function (tad) {
        return tad.getLeader(_this2.tadpoles);
      });

      for (var _i = 0; _i < this.fishSize; _i++) {
        this.fish.push(new _fish2.default([Math.random() * canvas.width, Math.random() * canvas.height]));
      }for (var _i2 = 0; _i2 < this.lilySize; _i2++) {
        this.lillies.push(new _lily2.default([Math.random() * canvas.width, Math.random() * canvas.height]));
      }this.tadMovement = new _tadMovement2.default(this.tadpoles, canvas);
      this.fishMovement = new _fishMovement2.default(this.fish, canvas);
      this.lilyMovement = new _lilyMovement2.default(this.lillies, canvas);
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
  }, {
    key: 'tick',
    value: function tick() {
      this.tadMovement.move();
      this.fishMovement.move();
      this.lilyMovement.move();

      this.tadpoles.forEach(function (t) {
        return t.tick();
      });
      this.fish.forEach(function (f) {
        return f.tick();
      });
      this.lillies.forEach(function (l) {
        return l.tick();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      ctx.fillStyle = _colours2.default.ocean_blue;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      this.tadpoles.forEach(function (t) {
        return t.render(canvas, ctx);
      });
      this.fish.forEach(function (f) {
        return f.render(canvas, ctx);
      });
      this.lillies.forEach(function (l) {
        return l.render(canvas, ctx);
      });
    }
  }, {
    key: 'resize',
    value: function resize() {
      var boundary = 25;
      var ratio = 3 / 4;
      if (this.hidden) {
        ratio = 9 / 10;
      }
      if (canvas.width != window.innerWidth * ratio - boundary || canvas.height != window.innerHeight - boundary) {
        canvas.width = window.innerWidth * ratio - boundary;
        canvas.height = window.innerHeight - boundary;
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