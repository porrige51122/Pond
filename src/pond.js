/**
 * POND: This is the controller of the entire program, this is where
 * the program loop is run, containing: render, tick and resize.
 */


import colours from './colours';
import Tadpole from './creature/tadpole';
import Fish from './creature/fish';
import Water from './water/water';
import Lily from './creature/lily';
import TadMovement from './movement/tadMovement';
import FishMovement from './movement/fishMovement';
import LilyMovement from './movement/lilyMovement';


class Pond {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.water = new Water(canvas, ctx);

    this.eventListeners();
    this.resize();
    this.init();
    this.loop();
  }

  /**
   * HTML canvas elements are initiated here and event listeners
   * are created
   */
  eventListeners() {
    const hide = document.getElementById('hide');
    const tadSlider = document.getElementById('tadpoles');
    const fishSlider = document.getElementById('fish');
    const lilySlider = document.getElementById('lillies');

    this.hidden = false;
    this.screenRatio = 3/4;
    hide.addEventListener('change', e => {
      if (e.target.checked) {
        this.hidden = true;
        this.screenRatio = 1;
        document.getElementById('menu').classList.add("hide");
      } else {
        this.hidden = false;
        this.screenRatio = 3/4;
        document.getElementById('menu').classList.remove("hide");
      }
    });

    // If the slider changes, update the size and reinitialize
    this.tadpoleSize = tadSlider.value;
    tadSlider.addEventListener('mouseup', e => {
      this.tadpoleSize = tadSlider.value;
      this.init()
    });
    this.fishSize = fishSlider.value;
    fishSlider.addEventListener('mouseup', e => {
      this.fishSize = fishSlider.value;
      this.init()
    });
    this.lilySize = lilySlider.value;
    lilySlider.addEventListener('mouseup', e => {
      this.lilySize = lilySlider.value;
      this.init()
    });

    canvas.addEventListener("mousemove", () => {
      if (Math.random() < 0.5) {
        this.water.dropAt(event.clientX, event.clientY);
      }
    })
  }

  /**
   * All entities are added to their arrays and ther corresponding
   * Movements are initiated
   */
  init() {
    this.tadpoles = [];
    this.fish = [];
    this.lillies = [];
    this.movement = [];

    // Pushes all tadpoles to their array and sets the first one as
    // leader in case there are no tadpole leaders.
    for (let i = 0; i < this.tadpoleSize; i++)
      this.tadpoles.push(new Tadpole(canvas));
    this.tadpoles.forEach((tad) => tad.getLeader(this.tadpoles));
    this.tadpoles[0].leader = true;

    // Pushes all fish and lillies to their arrays
    for (let i = 0; i < this.fishSize; i++)
      this.fish.push(new Fish(canvas));

    for (let i = 0; i < this.lilySize; i++)
      this.lillies.push(new Lily(canvas));

    // Sets movement patterns for all entities
    this.movement.push(new TadMovement(this.tadpoles, canvas),
                      new FishMovement(this.fish, canvas),
                      new LilyMovement(this.lillies, canvas));
  }

  loop() {
    window.requestAnimationFrame(() => {
      this.resize()
      this.tick();
      this.render();
      this.loop();
    });
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
    ctx.fillStyle = colours.ocean_blue;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw to canvas in order of layers
    this.tadpoles.forEach((t) => t.render(canvas, ctx));
    this.fish.forEach((f) => f.render(canvas, ctx));
    this.water.render();
    this.lillies.forEach((l) => l.render(canvas, ctx));

  }

  /**
   * This is run every frame loop but only gets past the if statement
   * if the window size has changed
   */
  resize() {
    if (canvas.width != (window.innerWidth * this.screenRatio) << 0 || canvas.height != window.innerHeight) {
      canvas.width = (window.innerWidth * this.screenRatio);
      canvas.height = window.innerHeight;
      this.water.resize();
    }
  }

}

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let pond = new Pond(canvas, ctx);
