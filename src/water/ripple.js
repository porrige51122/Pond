/**
 *  This class contains all the ripple effects to the pond
 */

class Ripple {
  constructor(dx, dy) {
    this.dx = dx
    this.dy = dy
    this.currentFrame = 0;
  }

  tick() {
    this.currentFrame++;
  }

  /**
   * Takes in the original canvas then draws the ripple
   */
  render() {

  }
}

export default Ripple;
