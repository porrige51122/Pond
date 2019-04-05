class Movement {
  constructor(entity, canvas) {
    this.canvas = canvas;
    this.entities = entity;
  }

  move() {

  }

  smoothing(index, velx, vely) {
    let smoothing = 0.005;
    let prevVel = this.entities[index].vel;
    this.entities[index].vel = [prevVel[0] + velx * smoothing,
                                  prevVel[1] + vely * smoothing];
  }

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
