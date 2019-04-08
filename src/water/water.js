/**
 *  This class is a manager for all ripples on the canvas
 */

import Ripple from './ripple';

class Water {
  constructor(canvas, ctx) {
    // For ease of access
    this.canvas = canvas;
    this.ctx = ctx;

    this.ripples = [];

  }

  tick() {
    this.ripples.forEach((r) => r.tick());
    for (let i = 0; i < this.ripples.length; i++) {
      if (this.ripples[i].w < 0) {
        this.ripples.splice(i, 1);
        i--;
      }
    }
  }

  /**
   * Renders all ripples on the canvas
   */
  render() {
    this.ripples.forEach((r) => r.render(this.canvas, this.ctx));
  }

  /**
   * Resize method recalibrates all the settings such as width and height
   * and size of arrays
   */
  resize() {

  }

  /**
   * Simulates a drop starting at the given coordinates
   */
  dropAt(dx, dy, vx = 0, vy = 0) {
    dx <<= 0;
    dy <<= 0;
    this.ripples.push(new Ripple(dx, dy, vx, vy));
  }

  randomDrop() {
    this.dropAt(Math.random() * this.width, Math.random() * this.height);
  }
}

export default Water;
