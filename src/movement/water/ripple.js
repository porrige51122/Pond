/**
 *  This class contains all the ripple effects to the pond
 */
import colours from '../../colours';

class Ripple {
  constructor(dx, dy, vx = 0, vy = 0) {
    this.dx = dx
    this.dy = dy
    this.vx = vx * 10;
    this.vy = vy * 10;
    this.size = 0;
    this.w = 10;
    // larger value == larger ripple size;
    let maxSize = 0.05;
    let minSize = 0.1;
    this.maxSize = maxSize + Math.random() * (minSize - maxSize);
  }

  tick() {
    this.size += 0.4;
    this.w -= this.maxSize;
  }

  /**
   * Takes in the original canvas then draws the ripple
   */
  render(canvas, ctx) {
    let x = this.dx;
    let y = this.dy;
    let s = this.size;
    ctx.beginPath();
    ctx.lineWidth = this.w;
    ctx.strokeStyle = colours.deep_blue;
    ctx.moveTo(x, y + s);
    ctx.bezierCurveTo(x + s * 1.25, y + s,
                      x + s * 1.25, y - s,
                      x, y - s);
    ctx.bezierCurveTo(x - s * 1.25,y - s,
                      x - s * 1.25, y + s,
                      x, y + s);
    ctx.stroke();

    if (s > 10) {
      s -= 10;
      x += this.vx;
      y += this.vy;
    }
    ctx.beginPath();
    ctx.lineWidth = this.w/2;
    ctx.strokeStyle = colours.deep_blue;
    ctx.moveTo(x, y + s);
    ctx.bezierCurveTo(x + s * 1.25, y + s,
                      x + s * 1.25, y - s,
                      x, y - s);
    ctx.bezierCurveTo(x - s * 1.25,y - s,
                      x - s * 1.25, y + s,
                      x, y + s);
    ctx.stroke();
  }
}

export default Ripple;
