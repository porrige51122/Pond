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
    // TODO: Draw Bush
    
    let flower = new IrisEnsataVariegata(this.canvas, this.ctx, this.size);
    let x = this.pos[0];
    let y = this.pos[1];
    flower.setPos([0, 0]);
    this.ctx.save();
    this.ctx.translate(x, y + 15);
    this.ctx.save();
    this.ctx.rotate(Math.random() * 2 * Math.PI);
    flower.render();
    this.ctx.restore();
    this.ctx.translate(-15, - 30);
    this.ctx.save();
    this.ctx.rotate(Math.random() * 2 * Math.PI);
    flower.render();
    this.ctx.restore();
    this.ctx.translate(30, 0);
    this.ctx.rotate(Math.random() * 2 * Math.PI);
    flower.render();
    this.ctx.restore();

  }
}

export default FlowerBush;
