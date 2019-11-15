/*
 * TADMOVEMENT
 * All of the movement patterns for tadpoles are contained here
 */

import Movement from './movement'

class TadMovement {
  constructor(entity, canvas, collisions) {
    this.canvas = canvas;
    this.boids = entity;
    this.collisions = collisions;
  }

  move() {
    this.boids.forEach((boid) => {
      boid.flock(this.boids);
      boid.borders();
    });
  }
}

export default TadMovement;
