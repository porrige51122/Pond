import colours from './colours';
import Tadpole from './creature/tadpole';
import Fish from './creature/fish';
import Lily from './creature/lily';
import TadMovement from './movement/tadMovement';
import FishMovement from './movement/fishMovement';
import LilyMovement from './movement/lilyMovement';


class Pond {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;


    // canvas elements
    this.eventListeners();

    this.resize();
    this.init();
    this.loop();
  }

  eventListeners() {
    const hide = document.getElementById('hide');
    const tadSlider = document.getElementById('tadpoles');
    const fishSlider = document.getElementById('fish');
    const lilySlider = document.getElementById('lillies');

    this.hidden = false;
    hide.addEventListener('change', e => {
      if (e.target.checked) {
        this.hidden = true;
        document.getElementById('menu').classList.add("hide");
      } else {
        this.hidden = false;
        document.getElementById('menu').classList.remove("hide");
      }
    });

    this.tadpoleSize = tadSlider.value;
    tadSlider.addEventListener('mouseup', e => {
      this.tadpoleSize= tadSlider.value;
      this.init()
    });

    this.fishSize = fishSlider.value;
    fishSlider.addEventListener('mouseup', e => {
      this.fishSize= fishSlider.value;
      this.init()
    });

    this.lilySize = lilySlider.value;
    lilySlider.addEventListener('mouseup', e => {
      this.lilySize= lilySlider.value;
      this.init()
    });
  }

  init() {
    this.tadpoles = [];
    this.fish = [];
    this.lillies = [];

    for (let i = 0; i < this.tadpoleSize; i++)
      this.tadpoles.push(new Tadpole([Math.random()*canvas.width,Math.random()*canvas.height]));
    this.tadpoles[0].leader = true;
    this.tadpoles.forEach((tad) => tad.getLeader(this.tadpoles));

    for (let i = 0; i < this.fishSize; i++)
      this.fish.push(new Fish([Math.random()*canvas.width,Math.random()*canvas.height]));

    for (let i = 0; i < this.lilySize; i++)
      this.lillies.push(new Lily([Math.random()*canvas.width,Math.random()*canvas.height]));

    this.tadMovement = new TadMovement(this.tadpoles, canvas);
    this.fishMovement = new FishMovement(this.fish, canvas);
    this.lilyMovement = new LilyMovement(this.lillies, canvas);
  }

  loop() {
    window.requestAnimationFrame(() => {
      this.resize()
      this.tick();
      this.render();
      this.loop();
    });
  }

  tick() {
    this.tadMovement.move();
    this.fishMovement.move();
    this.lilyMovement.move();

    this.tadpoles.forEach((t) => t.tick());
    this.fish.forEach((f) => f.tick());
    this.lillies.forEach((l) => l.tick());
  }

  render() {
    ctx.fillStyle = this.grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.tadpoles.forEach((t) => t.render(canvas, ctx));
    this.fish.forEach((f) => f.render(canvas, ctx));
    this.lillies.forEach((l) => l.render(canvas, ctx));

  }

  resize() {
    let boundary = 25;
    let ratio = 3/4;
    if (this.hidden) {
      ratio = 9/10;
    }
    if (canvas.width != (window.innerWidth * ratio) - boundary || canvas.height != window.innerHeight - boundary) {
      canvas.width = (window.innerWidth * ratio) - boundary;
      canvas.height = window.innerHeight - boundary;
      if (canvas.width > canvas.height)
        this.grd = ctx.createRadialGradient(canvas.width/2, canvas.height/2, canvas.width/4, canvas.width/2, canvas.height/2, canvas.width/2);
      else
        this.grd = ctx.createRadialGradient(canvas.width/2, canvas.height/2, canvas.height/4, canvas.width/2, canvas.height/2, canvas.height/2);
      this.grd.addColorStop(0, colours.ocean_blue);
      this.grd.addColorStop(1, colours.deep_blue);
    }
  }

}
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let pond = new Pond(canvas, ctx);
