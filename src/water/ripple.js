/**
 *  This class contains all the ripple effects to the pond
 */
import colours from '../colours';

class Ripple {
  constructor(dx, dy) {
    this.dx = dx
    this.dy = dy
    this.size = 0;
    this.w = 10;
  }

  tick() {
    this.size += 0.5;
    this.w -= 0.05;
  }

  /**
   * Takes in the original canvas then draws the ripple
   */
  render(canvas, ctx) {
    ctx.beginPath();
    ctx.lineWidth = this.w;
    ctx.strokeStyle = colours.deep_blue;
    ctx.moveTo(this.dx, this.dy + this.size);
    ctx.bezierCurveTo(this.dx + this.size * 1.25, this.dy + this.size,
                      this.dx + this.size * 1.25, this.dy - this.size,
                      this.dx, this.dy - this.size);
    ctx.bezierCurveTo(this.dx - this.size * 1.25, this.dy - this.size,
                      this.dx - this.size * 1.25, this.dy + this.size,
                      this.dx, this.dy + this.size);
    ctx.stroke();
  }
}

export default Ripple;
