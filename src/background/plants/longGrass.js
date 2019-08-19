import * as colours from '../../colours';

class LongGrass {
  constructor(canvas, ctx, size) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.size = size;
  }

  setPos(pos) {
    this.pos = pos;
  }

  render() {
    let w = this.size / 40;
    let h = w * 6;
    let rotation = Math.random() * Math.PI;
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

}

export default LongGrass;
