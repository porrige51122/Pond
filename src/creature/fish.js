/**
 * This class contains all information for each fish
 */

import colours from '../colours';

class Fish {
  constructor(canvas) {
    // Random Position on canvas
    this.pos = [Math.random() * canvas.width, Math.random() * canvas.height];
    // Random size this.size-this.size * (3/2)
    this.size = 4 + Math.random() * 5;
    // Random velocity [-1, -1] - [1, 1]
    this.vel = [(Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2];
    // Extra Variables
    this.swimming = true;
    this.sin = 0;
    this.angle = 0;
    this.angles = [0, 0, 0, 0, 0, 0];
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

    this.angle = Math.atan2(this.vel[1], this.vel[0]);
    console.log(this.angles);
  }

  /**
   * RENDER - Draws a head, a body, a tail and some fins
   */
  render(canvas, ctx) {
    this.angles.push(this.angle);
    this.angles.shift();

    ctx.save();
    ctx.translate(this.pos[0] + 10, this.pos[1] + 10);
    ctx.rotate(this.angle - Math.PI / 2);
    ctx.lineWidth = 1;
    this.drawfish(canvas, ctx, 0, 0, this.angles, true);
    ctx.restore();

    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.angle - Math.PI / 2);
    ctx.lineWidth = 1;
    this.drawfish(canvas, ctx, 0, 0, this.angles, false);
    ctx.restore();

  }

  drawfish(canvas, ctx, x, y, offsetArr, shadow) {
    let offset = (offsetArr[0] - offsetArr[1]) * 100;
    if (offset > 10) {
      offset = 10;
    } else if (offset < -10) {
      offset = -10;
    }
    // Body Coordinates
    let t = [x - this.size / 2 + offset, y - this.size * 5, x + this.size / 2 + offset, y - this.size * 5];
    // Head Coordinates
    let h = [x - this.size * (3 / 2), y, x + this.size * (3 / 2), y];
    // Tail Coordinates
    let f = [t[0] + offset - this.size / 2, t[1] - this.size, t[2] + offset + this.size / 2, t[3] - this.size];
    // Fin Coordinates
    let a = [h[0] - this.size - offset, h[1] - this.size, h[2] + this.size + offset, h[3] - this.size];
    if (shadow) {
      ctx.fillStyle = colours.deep_blue;
      ctx.strokeStyle = colours.deep_blue;
    } else {
      ctx.fillStyle = colours.yellow;
      ctx.strokeStyle = colours.khaki;
    }
    // Draw Head
    ctx.beginPath();
    this.fishHead(canvas, ctx, x, y, h);
    ctx.fill();
    ctx.beginPath();
    this.fishHead(canvas, ctx, x, y, h);
    ctx.stroke();
    // Draw Tail
    ctx.beginPath();
    this.fishTail(canvas, ctx, x, y, h, t, f);
    ctx.fill();
    ctx.beginPath();
    this.fishTail(canvas, ctx, x, y, h, t, f);
    ctx.stroke();
    // Draw Fins
    ctx.beginPath();
    this.fishFins(canvas, ctx, x, y, h, t, a);
    ctx.fill();
    ctx.beginPath();
    this.fishFins(canvas, ctx, x, y, h, t, a);
    ctx.stroke();
    // Draw Body
    if (!shadow) {
      ctx.fillStyle = colours.orange_peel;
    }
    ctx.beginPath();
    this.fishBody(canvas, ctx, x, y, h, t);
    ctx.fill();
    ctx.beginPath();
    this.fishBody(canvas, ctx, x, y, h, t);
    ctx.stroke();

  }

  fishFins(canvas, ctx, x, y, h, t, a) {
    // right fin
    ctx.moveTo(h[0], h[1]);
    ctx.bezierCurveTo(a[0], h[1] - this.size / 2, a[0], h[1] - this.size / 2, a[0], a[1]);
    ctx.bezierCurveTo(h[0] + this.size * (1 / 10), h[1] - this.size * (3 / 2), h[0] + this.size * (1 / 5), h[1] - this.size * (3 / 2), h[0] + this.size / 2, h[1] - this.size * (4 / 5));
    ctx.lineTo(h[0], h[1]);
    // left fin
    ctx.lineTo(h[2], h[3]);
    ctx.bezierCurveTo(a[2], h[3] - this.size / 2, a[2], h[3] - this.size / 2, a[2], a[3]);
    ctx.bezierCurveTo(h[2] - this.size * (1 / 10), h[3] - this.size * (3 / 2), h[2] - this.size * (1 / 5), h[3] - this.size * (3 / 2), h[2] - this.size / 2, h[3] - this.size * (4 / 5));
    ctx.lineTo(h[2], h[3]);
  }

  fishTail(canvas, ctx, x, y, h, t, f) {
    ctx.moveTo(t[0], t[1]);
    ctx.lineTo(f[0], f[1]);
    ctx.lineTo(f[2], f[3]);
    ctx.lineTo(t[2], t[3]);
  }

  fishHead(canvas, ctx, x, y, h) {
    ctx.moveTo(h[0], h[1]);
    ctx.bezierCurveTo(x - this.size * (3 / 2), y + this.size * 2, x + this.size * (3 / 2), y + this.size * 2, h[2], h[3]);
    ctx.bezierCurveTo(x + this.size * (3 / 2), y + this.size * (7 / 10), x - this.size * (3 / 2), y + this.size * (7 / 10), h[0], h[1]);
  }

  fishBody(canvas, ctx, x, y, h, t) {
    ctx.moveTo(h[0], h[1]);
    ctx.bezierCurveTo(x - this.size, y - this.size * (5 / 2), x - this.size, y - this.size * (5 / 2), t[0], t[1]);
    ctx.bezierCurveTo((t[0] + t[2]) / 2, t[1] - this.size * (2 / 10), (t[0] + t[2]) / 2, t[1] - this.size * (2 / 10), t[2], t[3]);
    ctx.bezierCurveTo(x + this.size, y - this.size * (5 / 2), x + this.size, y - this.size * (5 / 2), x + this.size * (3 / 2), y);
    ctx.bezierCurveTo(x + this.size * (3 / 2), y + this.size * (7 / 10), x - this.size * (3 / 2), y + this.size * (7 / 10), h[0], h[1]);
  }
}

export default Fish;
