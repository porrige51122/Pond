import colours from '../../colours';
import LongGrass from './longGrass';
import IrisEnsataVariegata  from './irisEnsataVariegata';

class FlowerBush {
  constructor(canvas, ctx, size) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.size = size;
  }

  setPos(pos) {
    this.pos = pos;
  }
  // ctx.save pushes current state onto stack therefore
  // multiple saves can be used to minimize code
  render() {
    let s = this.size/15;
    let flower = new IrisEnsataVariegata(this.canvas, this.ctx, this.size);
    let x = this.pos[0];
    let y = this.pos[1];

    this.drawBush(x, y)

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
    this.ctx.translate(-s, - (2 * s));
    this.ctx.save();
    this.ctx.rotate(Math.random() * 2 * Math.PI);
    flower.render();
    this.ctx.restore();
    this.ctx.translate((2 * s), 0);
    this.ctx.rotate(Math.random() * 2 * Math.PI);
    flower.render();

    this.ctx.restore();

  }

  drawBush(x, y) {
    let w = this.size/20;
    let h = w * 6;
    this.ctx.save();
    this.ctx.translate(x, y);

    for (let i = 0; i < Math.PI; i += Math.PI/10) {
      this.ctx.save();
      this.ctx.rotate(i);
      this.ctx.beginPath();
      this.ctx.fillStyle = colours.forest_green;
      this.ctx.moveTo(0, - h / 2);
      this.ctx.bezierCurveTo(w / 2, - h / 2, w / 2, h / 2, 0, h / 2);
      this.ctx.bezierCurveTo(- w / 2, h / 2, - w / 2, - h / 2, 0, - h / 2);
      this.ctx.fill();
      this.ctx.beginPath();
      this.ctx.strokeStyle = colours.yellow_green;
      this.ctx.moveTo(0, - h / 2);
      this.ctx.bezierCurveTo(w / 2, - h / 2, w / 2, h / 2, 0, h / 2);
      this.ctx.bezierCurveTo(- w / 2, h / 2, - w / 2, - h / 2, 0, - h / 2);
      this.ctx.stroke();
      this.ctx.restore();
    }
    this.ctx.restore();
  }
}

export default FlowerBush;
