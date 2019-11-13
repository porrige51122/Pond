/**
 * This class contains all information for each tadpole
 */

import * as colours from '../colours';

class Tadpole {
  constructor(canvas, size) {
    // Random Position on canvas
    this.pos = [Math.random() * canvas.width, Math.random() * canvas.height];
    // Size
    this.size = size / 200 * (document.getElementById('tadsize').value / 2);
    // Initially still
    this.vel = [Math.random(-1, 1), Math.random(-1, 1)];
    this.acceleration = [0, 0];
    this.r = 3.0;
    // Maximum speed per tadpole
    this.maxspeed = 3;
    // Maximum steering force
    this.maxforce = 0.05
  }

  /**
   * APPLYFORCE - adds force to acceleration;
   */
  applyForce(force) {
    this.acceleration[0] += force[0];
    this.acceleration[1] += force[1];
  }

  /**
   * FLOCK - Gets new acceleration based on 3 rules
   */
  flock(tadpoles) {
    let sep = this.separate(tadpoles);
    let ali = this.align(tadpoles);
    let coh = this.cohesion(tadpoles);
    // Adjust weight of each force
    let sepWeight = 1.5;
    let aliWeight = 1.0;
    let cohWeight = 1.0;
    sep[0] *= sepWeight;
    sep[1] *= sepWeight;
    ali[0] *= aliWeight;
    ali[1] *= aliWeight;
    coh[0] *= cohWeight;
    coh[1] *= cohWeight;
    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
  }

  /**
   * TICK - Moves the entity
   */
  tick() {
    this.vel[0] += this.acceleration[0];
    this.vel[1] += this.acceleration[1];
    this.velocity = this.limit(this.velocity, this.maxspeed)

    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.acceleration = [0, 0]
  }

  /**
   * RENDER - Draws an black ball and two smaller grey balls behind it to
   *  simulate a tail
   */
  render(canvas, ctx) {
    // Draw Body
    ctx.beginPath();
    ctx.fillStyle = colours.registration_black;
    ctx.arc(this.pos[0], this.pos[1], this.size, 0, 2 * Math.PI);
    ctx.fill();
    // Draw Tail
    ctx.beginPath();
    ctx.fillStyle = colours.rasin_black;
    ctx.arc(this.pos[0] - (this.vel[0] * 5), this.pos[1] - (this.vel[1] * 5), this.size / 4 * 3, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.pos[0] - (this.vel[0] * 10), this.pos[1] - (this.vel[1] * 10), this.size / 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  limit(v, max) {
    const mSq = v[0] * v[0] + v[1] * v[1];
    if (mSq > max * max) {
      v[0] /= Math.sqrt(msq) * max;
      v[1] /= Math.sqrt(msq) * max;
    }
    return v;
  }

  separate() {

  }

  /**
   * Checks to see if tadpoles are in sense distance
   * If so, add their velocity to a value
   * Divide value by number of other tadpoles
   * Normalize, multiply by max speed
   * subtract current velocity,
   * limit velocity then return.
   */
  align() {

  }

  cohesion() {

  }
}

export default Tadpole;
