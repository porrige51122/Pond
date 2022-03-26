/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

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


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * POND: This is the controller of the entire program, this is where
 * the program loop is run, containing: render, tick and resize.
 */
// import Background from './background/background';
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
      resizeTo: window
    });
    document.body.appendChild(this.canvas.view);
    // this.water = new Water(canvas, ctx);
    //
    // this.eventListeners();
    // this.init();
    // this.loop();
  }

  /**
   * HTML canvas elements are initiated here and event listeners
   * are created
   */


  _createClass(Pond, [{
    key: "eventListeners",
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
    key: "init",
    value: function init() {
      this.background = new Background(canvas, ctx);
      this.water.setBackground(this.background);
      var size = this.background.size;

      this.tadpoles = [];
      this.fish = [];
      this.lillies = [];
      this.movement = [];

      // Pushes all tadpoles to their array
      for (var i = 0; i < this.tadpoleSize; i++) {
        this.tadpoles.push(new Tadpole(canvas, size));
      } // Pushes all fish and lillies to their arrays
      for (var _i = 0; _i < this.fishSize; _i++) {
        this.fish.push(new Fish(canvas, ctx, size));
      }for (var _i2 = 0; _i2 < this.lilySize; _i2++) {
        this.lillies.push(new Lily(canvas, size));
      } // Sets movement patterns for all entities
      this.collisions = new Collisions(this.tadpoles, this.fish, this.lillies, this.background);

      this.movement.push(new TadMovement(this.tadpoles, canvas, this.collisions), new FishMovement(this.fish, canvas, this.collisions), new LilyMovement(this.lillies, canvas, this.collisions));
    }
  }, {
    key: "loop",
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
    key: "tick",
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
    key: "render",
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