import colours from '../../colours';
import LongGrass from './longGrass';

class IrisEnsataVariegata {
  constructor(canvas, ctx, size) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.size = size/180;
  }

  setPos(pos) {
    this.pos = pos;
  }

  render() {
    let x = this.pos[0];
    let y = this.pos[1];
    for (let i = 0; i <= 2 * Math.PI; i+=(2/3) * Math.PI) {
      this.ctx.save();
      this.ctx.translate(x, y);
      this.ctx.rotate(i);

      this.ctx.beginPath();
      this.ctx.fillStyle = colours.purple;
      this.drawPetal(0, -this.size/2);
      this.ctx.fill();
      this.ctx.beginPath();
      this.ctx.strokeStyle = colours.indigo;
      this.drawPetal(0, -this.size/2);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.fillStyle = colours.yellow;
      this.drawInnerPetal(0, -this.size/2);
      this.ctx.fill();

      this.ctx.restore();
    }
  }

  drawPetal(x, y) {
    let s = this.size;
    this.ctx.moveTo(x, y);
    this.ctx.bezierCurveTo(x - (2*s), y - (1*s), x - (2*s), y - (1*s), x - (3*s), y - (5*s));
    this.ctx.bezierCurveTo(x - (2*s), y - (6*s), x - (2*s), y - (6*s), x        , y - (5*s));
    this.ctx.bezierCurveTo(x + (2*s), y - (6*s), x + (2*s), y - (6*s), x + (3*s), y - (5*s));
    this.ctx.bezierCurveTo(x + (2*s), y - (1*s), x + (2*s), y - (1*s), x        , y        );
  }

  drawInnerPetal(x, y) {
    let s = this.size;
    this.ctx.moveTo(x        , y        );
    this.ctx.lineTo(x - (s/2), y - (s/2));
    this.ctx.lineTo(x        , y - (3*s));
    this.ctx.lineTo(x + (s/2), y - (s/2));
    this.ctx.lineTo(x        , y        );
  }
}

export default IrisEnsataVariegata;
