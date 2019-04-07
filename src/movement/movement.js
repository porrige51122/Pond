/*
 * MOVEMENT ABSTRACT CLASS
 * contains all universal movement methods
 */

class Movement {
  constructor(entities, canvas) {
    this.canvas = canvas;
    this.entities = entities;
  }

  move() {}

  /*
   * EDGECHECK - checks to see if entity is off the edge of the canvas
   * If so moves the entity back onto the canvas
   */
  edgeCheck(index, pos) {
    if (pos[0] < 0 + this.spacing) {
      this.smoothing(index, 1, 0);
    } else if (pos[1] < 0 + this.spacing) {
      this.smoothing(index, 0, 1);
    } else if (pos[0] > this.canvas.width - (this.spacing * 2)) {
      this.smoothing(index, -1, 0);
    } else if (pos[1] > this.canvas.height - (this.spacing * 2)) {
      this.smoothing(index, 0, -1);
    }
  }

  /*
   * SMOOTHING - Changes the velocity slightly to make movement smoother
   */
  smoothing(index, velx, vely) {
    let smoothing = 0.05;
    let prevVel = this.entities[index].vel;
    this.entities[index].vel = [prevVel[0] + velx * smoothing,
                                prevVel[1] + vely * smoothing];
  }

  /*
   * SLOWING - Reduces the velocity to the limit so the entity does not go
   * too fast
   */
  slowing(entity, limit) {
    let prevVel = this.entities[entity].vel;
    if (prevVel[0] > limit)
      prevVel[0] = limit;
    else if (prevVel[0] < -limit)
      prevVel[0] = -limit;

    if (prevVel[1] > limit)
      prevVel[1] = limit;
    else if (prevVel[1] < -limit)
      prevVel[1] = -limit;

    this.entities[entity].vel = prevVel;
  }

}

export default Movement;
