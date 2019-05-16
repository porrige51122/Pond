import colours from '../colours';

class LongGrass {
  constructor(canvas, ctx, pos, size) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.pos = pos;
    this.size = size;
  }

  render() {
    let w = this.size/40;
    let h = w * 6;
    let rotation = Math.random() * Math.PI;
    this.ctx.save();
    this.ctx.translate(this.pos[0], this.pos[1]);
    this.ctx.rotate(rotation);
    this.ctx.beginPath();
    this.ctx.fillStyle = colours.forest_green;
    this.ctx.moveTo(0, - h / 2);
    this.ctx.bezierCurveTo(w / 2, - h / 2, w / 2, h / 2, 0, h / 2);
    this.ctx.bezierCurveTo(- w / 2, h / 2, - w / 2, - h / 2, 0, - h / 2);
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.strokeStyle = colours.dark_green;
    this.ctx.moveTo(0, - h / 2);
    this.ctx.bezierCurveTo(w / 2, - h / 2, w / 2, h / 2, 0, h / 2);
    this.ctx.bezierCurveTo(- w / 2, h / 2, - w / 2, - h / 2, 0, - h / 2);
    this.ctx.stroke();
    this.ctx.restore();
  }

}

export default LongGrass;
