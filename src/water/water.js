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

  }

  /**
   * Renders all ripples on the canvas
   */
  render() {

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
  dropAt(dx, dy) {
    dx <<= 0;
    dy <<= 0;
    this.ripples.push(new Ripple(dx, dy));
  }

  randomDrop() {
    this.dropAt(Math.random() * this.width, Math.random() * this.height);
  }
}

export default Water;
