/**
 * This class contains all information for each fish
 */

import colours from '../colours';

class Fish {
  constructor(canvas, ctx, size) {
    // Random Position on canvas
    this.pos = [Math.random() * canvas.width, Math.random() * canvas.height];
    // Random size this.size-this.size * (3/2)
    this.size = size/40;
    // Random velocity [-1, -1] - [1, 1]
    this.vel = [(Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2];
    // Colour
    switch (Math.floor(Math.random() * 4)) {
      // Beni-goi (are entirely red/orange)
      case 0:
        this.colourA = colours.orange_peel;
        this.colourB = colours.yellow;
        break;
      // ki-goi (are entirely yellow/gold)
      case 1:
        this.colourA = colours.yellow;
        this.colourB = colours.orange_peel;
        break;
      // Tancho (White with a red mark on the head but no red on body)
      case 2:
        this.colourA = ctx.createRadialGradient(0,0,this.size/4,0,0,this.size * 4);
        this.colourA.addColorStop(0, "red");
        this.colourA.addColorStop(0.25, "white");
        this.colourA.addColorStop(1, "white");
        this.colourB = colours.yellow;
        break;
      // Karasugoi (are entirely black/dark gray)
      case 3:
        this.colourA = colours.dark_gray;
        this.colourB = "white";
        break;
      default:
        this.colourA = colours.registration_black;
        this.colourB = colours.registration_black;
    }
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
  }

  /**
   * RENDER - Draws a head, a body, a tail and some fins
   */
  render(canvas, ctx) {
    this.angles.push(this.angle);
    this.angles.shift();

    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.angle - Math.PI / 2);
    ctx.lineWidth = 1;
    this.drawfish(canvas, ctx, 0, 0, this.angles, true);
    ctx.restore();

    ctx.save();
    ctx.translate(this.pos[0] - 10, this.pos[1] - 10);
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

    if (shadow)
      ctx.fillStyle = colours.deep_blue;
    else
      ctx.fillStyle = this.colourA;

    ctx.beginPath();
    this.fishShape(canvas, ctx, x, y, h, t, f, a);
    ctx.fill();

    if (!shadow) {
      ctx.strokeStyle = this.colourB;
      ctx.beginPath();
      this.fishShape(canvas, ctx, x, y, h, t, f, a);
      ctx.stroke();
    }

  }

  fishShape(canvas, ctx, x, y, h, t, f, a) {
    // Head
    ctx.moveTo(h[0], h[1]);
    ctx.bezierCurveTo(x - this.size * (3 / 2), y + this.size * 2, x + this.size * (3 / 2), y + this.size * 2, h[2], h[3]);
    // L fin
    ctx.bezierCurveTo(a[2], h[3] - this.size / 2, a[2], h[3] - this.size / 2, a[2], a[3]);
    ctx.bezierCurveTo(h[2] - this.size * (1 / 10), h[3] - this.size * (3 / 2), h[2] - this.size * (1 / 5), h[3] - this.size * (3 / 2), h[2], h[3] - this.size * (4 / 5));
    ctx.lineTo(h[2], h[3]);
    // L body
    ctx.bezierCurveTo(x + this.size, y - this.size * (5 / 2), x + this.size, y - this.size * (5 / 2), t[2], t[3]);
    // Tail
    ctx.lineTo(f[2], f[3]);
    ctx.lineTo(f[0], f[1]);
    ctx.lineTo(t[0], t[1]);
    // R body
    ctx.bezierCurveTo(x - this.size, y - this.size * (5 / 2), x - this.size, y - this.size * (5 / 2), h[0], h[1]);
    // R fin
    ctx.bezierCurveTo(a[0], h[1] - this.size / 2, a[0], h[1] - this.size / 2, a[0], a[1]);
    ctx.bezierCurveTo(h[0] + this.size * (1 / 10), h[1] - this.size * (3 / 2), h[0] + this.size * (1 / 5), h[1] - this.size * (3 / 2), h[0], h[1] - this.size * (4 / 5));
    ctx.lineTo(h[0], h[1]);
  }

}

export default Fish;
