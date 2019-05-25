/**
 * This class contains all information for each fish
 */

import colours from '../colours';

class Fish {
  constructor(canvas) {
    // Random Position on canvas
    this.pos = [Math.random() * canvas.width, Math.random() * canvas.height];
    // Random size 10-15
    this.size = 5 + Math.random() * 5;
    // Random velocity [-1, -1] - [1, 1]
    this.vel = [(Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2];
    // Extra Variables
    this.swimming = true;
    this.sin = 0;
    this.angle = 0;
    this.left = true;
  }

  /**
   * TICK - Moves the entity and modifies any frame based values
   */
  tick() {
    // sin is the angle along sin that the fish is swimming along
    if (this.swimming) {
      this.sin++;
      if (this.sin > 1440)
        this.sin = 0;
    }

    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];

    if (this.left) {
      this.angle++;
    } else {
      this.angle--;
    }
    if (this.angle > 15) {
      this.left = false;
    } else if (this.angle < - 15) {
      this.left = true;
    }

  }

  /**
   * RENDER - Draws an orange ball and two smaller balls behind it to simulate
   * a tail
   */
  render(canvas, ctx) {
    let x = this.pos[0];
    let y = this.pos[1];
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    this.drawfish(canvas, ctx, x, y, this.angle);

  }

  drawfish(canvas, ctx, x, y, offset) {
   /**
   * Tail Coordinates
   */
  let t = [x - 5 + offset, y - 50, x + 5 + offset, y - 50];
   /**
   * Head Coordinates
   */
  let h = [x - 15, y, x + 15, y];

  // Draw Head
  ctx.beginPath();
  ctx.moveTo(h[0], h[1]);
  ctx.bezierCurveTo(x - 15, y + 20, x + 15, y + 20,    h[2],  h[3]);
  ctx.bezierCurveTo(x + 15, y +  7, x - 15, y +  7,    h[0],  h[1]);
  ctx.fill();
  // Draw Body
  ctx.beginPath();
  ctx.moveTo(h[0], h[1]);
  ctx.bezierCurveTo(x - 10, y - 25, x - 10, y - 25,   t[0],   t[1]);
  ctx.bezierCurveTo((t[0] + t[2])/2, t[1] - 2, (t[0] + t[2])/2, t[1] - 2,   t[2],   t[3]);
  ctx.bezierCurveTo(x + 10, y - 25, x + 10, y - 25, x + 15,      y);
  ctx.bezierCurveTo(x + 15, y +  7, x - 15, y +  7,    h[0],  h[1]);
  ctx.stroke();
}
}

export default Fish;
