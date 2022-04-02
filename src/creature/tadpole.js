/**
 * This class contains all information for each tadpole
 */

import * as colours from '../colours';

class Tadpole extends PIXI.Container {
  constructor(app, x, y) {
    super()
    this.app = app;
    // Random Position on canvas
    this.position.set(x, y)
    // Size
    this.size = window.innerHeight / 300;
    // Initially still
    this.maxspeed = 1 / 8
    this.vel = new PIXI.Point(
      Math.random() * this.maxspeed - this.maxspeed/2,
      Math.random() * this.maxspeed - this.maxspeed/2)
    this.acceleration = new PIXI.Point(0, 0);
    this.r = 3.0;
    // Maximum speed per tadpole
    this.maxspeed = 0.7;
    // Maximum steering force
    this.maxforce = 0.05;

    this.separationSize = 15
    this.drawTad()
  }

  /**
   * APPLYFORCE - adds force to acceleration;
   */
  applyForce(force) {
    this.acceleration = this.acceleration.add(force);
  }

  /**
   * FLOCK - Gets new acceleration based on 3 rules
   */
  flock(tadpoles) {
    let sep = this.separate(tadpoles, this.separationSize);
    let ali = this.align(tadpoles);
    let coh = this.cohesion(tadpoles);
    // Adjust weight of each force
    let sepWeight = 0.25;
    let aliWeight = 0.01;
    let cohWeight = 0.2;
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
    let temp = this.vel.add(this.acceleration)
    this.vel.set(temp.x, temp.y)
    temp = this.position.add(this.vel)
    this.position.set(temp.x, temp.y)
    this.acceleration.set(0, 0);
  }

  /**
   * RENDER - Draws an black ball and two smaller grey balls behind it to
   *  simulate a tail
   */
  drawTad(canvas, ctx) {
    this.removeChild(this.body)
    // Draw Body
    this.body = new PIXI.Graphics();
    this.body.beginFill(colours.registration_black)
        .arc(0, 0, this.size, 0, 2 * Math.PI);
    // Add to Scene
    this.addChild(this.body);
  }

  seek(target) {
    let desired = this.sub(target, this.pos);

    desired = this.normalize(desired);
    desired = this.mul(desired, this.maxspeed);

    let steer = this.sub(desired, this.vel);
    steer = this.limit(steer, this.maxforce);
    return steer;
  }

  separate(tadpoles, separationSize) {
    let desiredseparation = separationSize;
    let steer = [0, 0];
    let count = 0;

    for (let i = 0; i < tadpoles.length; i++) {
      let d = this.dist(this.pos, tadpoles[i].pos);
      if ((d > 0) && (d < desiredseparation)) {
        let diff = this.sub(this.pos, tadpoles[i].pos);
        diff = this.normalize(diff);
        diff = this.div(diff, d);
        steer = this.add(steer, diff);
        count++;
      }
    }

    if (count > 0) {
      steer = this.div(steer, count);
    }

    if (this.mag(steer) > 0) {
      steer = this.normalize(steer);
      steer = this.mul(steer, this.maxspeed);
      steer = this.sub(steer, this.vel);
      steer = this.limit(steer, this.maxforce);
    }
    return steer;
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

  cohesion(tadpoles) {
    let neighbordist = 50;
    let sum = [0, 0];
    let count = 0;
    for (let i = 0; i < tadpoles.length; i++) {
      let d = this.dist(this.pos, tadpoles[i].pos);
      if ((d > 0) && (d < neighbordist)) {
        sum = this.add(sum, tadpoles[i].pos);
        count++
      }
    }
    if (count > 0) {
      sum = this.div(sum, count);
      return this.seek(sum);
    } else {
      return [0, 0]
    }
  }

  flee(other) {
    let desiredseparation = 100;
    let steer = this.separate(other, desiredseparation);
    this.applyForce(steer);
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
