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
  deep_blue: '#2c59a3',
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
    this.size = 10 + Math.random() * 5;
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
    // All have same size 50 - CHANGE TO RANDOM SOON
    this.size = 50;
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
    this.size = 3 + Math.random();
    // Initially still
    this.vel = [0, 0];
    // 2% chance to become leader
    this.leader = Math.random() < 0.02;
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
    value: function move(water) {
      for (var i = 0; i < this.entities.length; i++) {
        var pos = this.entities[i].pos;
        this.edgeCheck(i, pos);
        if (this.entities[i].swimming) {
          var wiggleRate = 8;
          var wiggleSize = 0.5;
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
              var speed = 5;
              this.entities[i].vel = [(Math.random() - 0.5) * speed, (Math.random() - 0.65) * speed];
              water.dropAt(this.entities[i].pos[0], this.entities[i].pos[1]);
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
        this.edgeCheck(i, pos);
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
        this.edgeCheck(i, pos);
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


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * POND: This is the controller of the entire program, this is where
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * the program loop is run, containing: render, tick and resize.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _colours = __webpack_require__(/*! ./colours */ "./src/colours.js");

var _colours2 = _interopRequireDefault(_colours);

var _tadpole = __webpack_require__(/*! ./creature/tadpole */ "./src/creature/tadpole.js");

var _tadpole2 = _interopRequireDefault(_tadpole);

var _fish = __webpack_require__(/*! ./creature/fish */ "./src/creature/fish.js");

var _fish2 = _interopRequireDefault(_fish);

var _water = __webpack_require__(/*! ./water */ "./src/water.js");

var _water2 = _interopRequireDefault(_water);

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

      var hide = document.getElementById('hide');
      var tadSlider = document.getElementById('tadpoles');
      var fishSlider = document.getElementById('fish');
      var lilySlider = document.getElementById('lillies');

      this.hidden = false;
      this.screenRatio = 3 / 4;
      hide.addEventListener('change', function (e) {
        if (e.target.checked) {
          _this.hidden = true;
          _this.screenRatio = 1;
          document.getElementById('menu').classList.add("hide");
        } else {
          _this.hidden = false;
          _this.screenRatio = 3 / 4;
          document.getElementById('menu').classList.remove("hide");
        }
      });

      // If the slider changes, update the size and reinitialize
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

      canvas.addEventListener("mousemove", function () {
        if (Math.random() < 0.2) {
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
      this.movement.push(new _tadMovement2.default(this.tadpoles, canvas), new _fishMovement2.default(this.fish, canvas), new _lilyMovement2.default(this.lillies, canvas));
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
      ctx.fillStyle = this.grd;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

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
    }

    /**
     * This is run every frame loop but only gets past the if statement
     * if the window size has changed
     */

  }, {
    key: 'resize',
    value: function resize() {
      if (canvas.width != window.innerWidth * this.screenRatio << 0 || canvas.height != window.innerHeight) {
        canvas.width = window.innerWidth * this.screenRatio;
        canvas.height = window.innerHeight;
        if (canvas.width > canvas.height) {
          this.grd = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, canvas.width / 4, canvas.width / 2, canvas.height / 2, canvas.width / 2);
        } else {
          this.grd = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, canvas.height / 4, canvas.width / 2, canvas.height / 2, canvas.height / 2);
        }
        this.grd.addColorStop(0, _colours2.default.ocean_blue);
        this.grd.addColorStop(1, _colours2.default.deep_blue);
        this.water.resize();
      }
    }
  }]);

  return Pond;
}();

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var pond = new Pond(canvas, ctx);

/***/ }),

/***/ "./src/water.js":
/*!**********************!*\
  !*** ./src/water.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  This class contains all the water ripple effects to the pond
 */

var Water = function () {
  function Water(canvas, ctx) {
    _classCallCheck(this, Water);

    // For ease of access
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = canvas.width;
    this.height = canvas.height;
    this.halfWidth = this.width >> 1;
    this.halfHeight = this.height >> 1;

    this.oldIdx = this.width;
    this.newIdx = this.width * (this.height + 3);
    this.rippleRad = 5;

    // Size of each array (space for 2 images)
    this.size = this.width * (this.height + 2) * 2;
    this.rippleMap = [];
    this.lastMap = [];

    for (var i = 0; i < this.size; i++) {
      this.lastMap[i] = 0;
      this.rippleMap[i] = 0;
    }

    this.mapIdx;

    // Texture = pond, ripple = new filtered layer
    this.ripple;
    this.texture;
  }

  /**
   * Takes in the original canvas then adds effects and draws it back
   * to the canvas
   */


  _createClass(Water, [{
    key: "render",
    value: function render() {
      // Gets the images
      this.texture = this.ctx.getImageData(0, 0, this.width, this.height);
      this.ripple = this.ctx.getImageData(0, 0, this.width, this.height);

      var i = void 0;
      var a = void 0,
          b = void 0;
      var data = void 0,
          oldData = void 0;
      var newPixel = void 0,
          curPixel = void 0;

      i = this.oldIdx;
      this.oldIdx = this.newIdx;
      this.newIdx = i;

      i = 0;
      this.mapIdx = this.oldIdx;

      for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
          data = this.rippleMap[this.mapIdx - this.width] + this.rippleMap[this.mapIdx + this.width] + this.rippleMap[this.mapIdx - 1] + this.rippleMap[this.mapIdx + 1] >> 1;

          data -= this.rippleMap[this.newIdx + i];

          data -= data >> 6;

          this.rippleMap[this.newIdx + i] = data;

          data = 1024 - data;

          oldData = this.lastMap[i];
          this.lastMap[i] = data;

          if (oldData != data) {
            a = ((x - this.halfWidth) * data / 1024 << 0) + this.halfWidth;
            b = ((y - this.halfHeight) * data / 1024 << 0) + this.halfHeight;

            if (a >= this.width) a = this.width - 1;
            if (a < 0) a = 0;
            if (b >= this.height) b = this.height - 1;
            if (b < 0) b = 0;

            newPixel = (a + b * this.width) * 4;
            curPixel = i * 4;
            this.ripple.data[curPixel] = this.texture.data[newPixel];
            this.ripple.data[curPixel + 1] = this.texture.data[newPixel + 1];
            this.ripple.data[curPixel + 2] = this.texture.data[newPixel + 2];
          }
          this.mapIdx++;
          i++;
        }
      }

      this.ctx.putImageData(this.ripple, 0, 0);
    }

    /**
     * Resize method recalibrates all the settings such as width and height
     * and size of arrays
     */

  }, {
    key: "resize",
    value: function resize() {
      this.width = this.canvas.width;
      this.height = this.canvas.height;

      this.oldIdx = this.width;
      this.newIdx = this.width * (this.height + 3);
      this.rippleRad = 2;

      this.size = this.width * (this.height + 2) * 2;

      for (var i = 0; i < this.size; i++) {
        this.lastMap[i] = 0;
        this.rippleMap[i] = 0;
      }

      this.mapIdx;
    }

    /**
     * Simulates a drop starting at the given coordinates
     */

  }, {
    key: "dropAt",
    value: function dropAt(dx, dy) {
      dx <<= 0;
      dy <<= 0;

      for (var j = dy - this.rippleRad; j < dy + this.rippleRad; j++) {
        for (var k = dx - this.rippleRad; k < dx + this.rippleRad; k++) {
          this.rippleMap[this.oldIdx + j * this.width + k] += 512;
        }
      }
    }
  }, {
    key: "randomDrop",
    value: function randomDrop() {
      this.dropAt(Math.random() * this.width, Math.random() * this.height);
    }
  }]);

  return Water;
}();

exports.default = Water;

/***/ })

/******/ });
//# sourceMappingURL=pond.bundle.js.map