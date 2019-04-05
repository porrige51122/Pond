/**
 * This class contains all information for each fish
 */

import colours from '../colours';

class Fish {
  constructor(canvas) {
    // Random Position on canvas
    this.pos = [Math.random() * canvas.width, Math.random() * canvas.height];
    // Random size 10-15
    this.size = 10 + Math.random() * 5;
    // Random velocity [-1, -1] - [1, 1]
    this.vel = [(Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2];
    // Extra Variables
    this.swimming = true;
    this.sin = 0;
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
  }

  /**
   * RENDER - Draws an orange ball and two smaller balls behind it to simulate
   * a tail
   */
  render(canvas, ctx) {
    // Draw Body
    ctx.beginPath();
    ctx.fillStyle = colours.orange_peel;
    ctx.arc(this.pos[0], this.pos[1], this.size, 0, 2 * Math.PI);
    ctx.fill();
    // Draw Tail
    ctx.beginPath();
    ctx.fillStyle = colours.orange_peel;
    ctx.arc(this.pos[0] - (this.vel[0] * 10), this.pos[1] - (this.vel[1] * 10), this.size / 4 * 3, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = colours.orange_peel;
    ctx.arc(this.pos[0] - (this.vel[0] * 20), this.pos[1] - (this.vel[1] * 20), this.size / 2, 0, 2 * Math.PI);
    ctx.fill();
  }

}

export default Fish;
