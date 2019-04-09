/**
 * This class contains all information for each lily
 */
import colours from '../colours';

class Lily {
  constructor(canvas) {
    // Random Position on canvas
    this.pos = [Math.random() * canvas.width, Math.random() * canvas.height];
    // All have same size 30 - CHANGE TO RANDOM SOON
    this.size = 30;
    // Random velocity [-0.5, -0.5] - [0.5, 0.5]
    this.vel = [Math.random() - 0.5, Math.random() - 0.5];
    // Chooses a random point to put the split of the lily pad
    this.startAngle = Math.PI * 2 * Math.random();
    // 50% if rotates clockwise or anticlockwise
    this.clockwise = Math.random() < 0.5;
    // 25% chance to have a water lily on top
    this.isFlower = Math.random() < 0.25;
  }

  /**
   * TICK - Moves the entity and rotates the pad
   */
  tick() {
    if (this.clockwise)
      this.startAngle += 0.001;
    else
      this.startAngle -= 0.001;
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }

  /**
   * RENDER - Draws the pad with a segment if it has a lily and if it doesn't
   * it draws a full pad with a flower on it
   * Lily = full size dark circle & 3/4 light circle within
   */
  render(canvas, ctx) {
    if (!this.isFlower) {
      //Draw First Half
      let start = this.startAngle;
      ctx.beginPath();
      ctx.fillStyle = colours.light_green;
      ctx.arc(this.pos[0], this.pos[1], this.size, start, Math.PI + start);
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = colours.lily_green;
      ctx.arc(this.pos[0], this.pos[1], this.size / 4 * 3, start, Math.PI + start);
      ctx.fill();
      // Draws second half with not full rotation to give the circle the slit
      start += (Math.PI / 180) * 170;
      ctx.beginPath();
      ctx.fillStyle = colours.light_green;
      ctx.arc(this.pos[0], this.pos[1], this.size, start, Math.PI + start);
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = colours.lily_green;
      ctx.arc(this.pos[0], this.pos[1], this.size / 4 * 3, start, Math.PI + start);
      ctx.fill();
    } else {
      // Draws the full circle
      ctx.beginPath();
      ctx.fillStyle = colours.light_green;
      ctx.arc(this.pos[0], this.pos[1], this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = colours.lily_green;
      ctx.arc(this.pos[0], this.pos[1], this.size / 4 * 3, 0, Math.PI * 2);
      ctx.fill();
      this.drawFlower(ctx);
    }
  }

  // Draws 3 rings with reducing size and lighter colours
  drawFlower(ctx) {
    let firstRing = this.size / 4;
    this.drawRing(ctx, colours.pink, this.size / 2, this.size / 4 * 3);
    this.drawRing(ctx, colours.delicate_pink, this.size / 4, this.size / 2);
    this.drawRing(ctx, colours.light_pink, this.size / 8, this.size / 3);
    ctx.beginPath();
    ctx.fillStyle = colours.yellow;
    ctx.arc(this.pos[0], this.pos[1], this.size / 8, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draws 8 petals each at 45 degrees to each other
  drawRing(ctx, fillStyle, w, h) {
    for (let i = 0; i <= Math.PI * 2; i+= Math.PI/4) {
      ctx.save();
      ctx.translate(this.pos[0], this.pos[1]);
      ctx.rotate(i);
      this.drawPetal(ctx, fillStyle, 0, h / 2, w, h);
      ctx.restore();
    }
  }

  // Draws an elipse with center xy and width w and height h
  drawPetal(ctx, fillStyle, x, y, w, h) {
    ctx.beginPath();
    ctx.fillStyle = fillStyle;
    ctx.moveTo(x, y - h / 2);
    ctx.bezierCurveTo(x + w / 2, y - h / 2, x + w / 2, y + h / 2, x, y + h / 2);
    ctx.bezierCurveTo(x - w / 2, y + h / 2, x - w / 2, y - h / 2, x, y - h / 2);
    ctx.fill();
  }

}

export default Lily;
