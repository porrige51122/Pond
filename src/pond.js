/**
 * POND: This is the controller of the entire program, this is where
 * the program loop is run, containing: render, tick and resize.
 */
 import * as colours from './colours';
import Background from './background/background';
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


class Pond {
  constructor() {
    this.canvas = new PIXI.Application({
      resizeTo: window,
      backgroundColor: colours.pea
    });
    document.body.appendChild(this.canvas.view);

    this.init();

    let elapsed = 0.0;
    this.canvas.ticker.add((delta) => {
      elapsed += delta
    })
    // this.water = new Water(canvas, ctx);
    //
    // this.eventListeners();
  }

  /**
   * HTML canvas elements are initiated here and event listeners
   * are created
   */
  eventListeners() {
    this.menu = new Menu(this);
    let mousemovecount = 0;
    canvas.addEventListener("mousemove", () => {
      mousemovecount++;
      if (mousemovecount % 4 == 0) {
        this.water.dropAt(event.clientX, event.clientY);
      }
    });
  }

  /**
   * All entities are added to their arrays and ther corresponding
   * Movements are initiated
   */
  init() {
    this.background = new Background(this.canvas);
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
  tick() {
    this.movement.forEach((m) => m.move(this.water));
    this.tadpoles.forEach((t) => t.tick());
    this.fish.forEach((f) => f.tick());
    this.water.tick();
    this.lillies.forEach((l) => l.tick());
  }

  /**
   * All render functions are run for all entities
   */
  render() {
    // Clear screen
    this.background.renderPond(canvas, ctx);

    // Draw to canvas in order of layers
    this.tadpoles.forEach((t) => t.render(canvas, ctx));
    this.fish.forEach((f) => f.render(canvas, ctx));
    this.water.render();
    this.lillies.forEach((l) => l.render(canvas, ctx));

    // Draw the land on the canvas
    this.background.renderLand(canvas, ctx);
  }

}

require('./mystyles.scss');
let pond = new Pond();
