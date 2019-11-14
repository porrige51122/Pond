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
    this.vel = [Math.random() * 2 - 1, Math.random() * 2 - 1];
    this.acceleration = [0, 0];
    this.r = 3.0;
    // Maximum speed per tadpole
    this.maxspeed = 0.5;
    // Maximum steering force
    this.maxforce = 0.05;
  }

  /**
   * APPLYFORCE - adds force to acceleration;
   */
  applyForce(force) {
    this.acceleration = this.add(this.acceleration, force);
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
    let aliWeight = 0.01;
    let cohWeight = 1.0;
    sep = this.mul(sep, sepWeight);
    ali = this.mul(ali, aliWeight);
    coh = this.mul(coh, cohWeight);

    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
  }

  /**
   * TICK - Moves the entity
   */
  tick() {
    this.vel = this.add(this.vel, this.acceleration)
    this.vel = this.limit(this.vel, this.maxspeed)

    this.pos = this.add(this.pos, this.vel);
    this.acceleration = [0, 0];
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
    const mSq = this.magSq(v);
    if (mSq > max * max) {
      v = this.div(v, Math.sqrt(mSq));
      v = this.mul(v, max);
    }
    return v;
  }

  dist(a, b) {
    let c = this.add(a, [-b[0], -b[1]]);
    return this.mag(c);

  }

  mag(a) {
    a = this.magSq(a);
    return Math.sqrt(a);
  }

  magSq(a) {
    return a[0] * a[0] + a[1] * a[1];
  }

  add(a, b) {
    return [a[0] + b[0], a[1] + b[1]];
  }

  sub(a, b) {
    return [a[0] - b[0], a[1] - b[1]];
  }

  mul(a, x) {
    return [a[0] * x, a[1] * x];
  }

  div(a, x) {
    return [a[0] / x, a[1] / x];
  }

  normalize(a) {
    const len = this.mag(a);
    if (len !== 0) {
      a = this.mul(a, 1/len);
    }
    return a;
  }

  separate() {
    return [0, 0];
  }

  /**
   * Checks to see if tadpoles are in sense distance
   * If so, add their velocity to a value
   * Divide value by number of other tadpoles
   * Normalize, multiply by max speed
   * subtract current velocity,
   * limit velocity then return.
   */
  align(tadpoles) {
    let neighbordist = 50;
    let sum = [0,0];
    let count = 0;
    for (let i = 0; i < tadpoles.length; i++) {
      let d = this.dist(this.pos, tadpoles[i].pos);
      if ((d > 0) && (d < neighbordist)) {
        sum = this.add(sum, tadpoles[i].vel);
        count++;
      }
    }
    if (count > 0) {
      this.mul(sum, 1/count);
      sum = this.normalize(sum);
      sum = this.mul(sum, this.maxspeed);
      let steer = this.sub(sum, this.vel);
      sum = this.limit(steer, this.maxforce);
      return steer;
    } else {
      return [0, 0];
    }
  }

  cohesion() {
    return [0, 0];
  }

  borders() {
    if (this.pos[0] < -this.r)
      this.pos[0] = window.innerWidth + this.r;
    if (this.pos[1] < -this.r)
      this.pos[1] = window.innerHeight + this.r;
    if (this.pos[0] > window.innerWidth + this.r)
      this.pos[0] = -this.r;
    if (this.pos[1] > window.innerHeight + this.r)
      this.pos[1] = -this.r;
  }
}

export default Tadpole;
