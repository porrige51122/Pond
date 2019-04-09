import Movement from './movement'

class FishMovement extends Movement {
  constructor(entity, canvas, collisions) {
    super(entity, canvas, collisions);
    this.spacing = 20;
  }

  move(water) {
    let wiggleRate = 8;
    let wiggleSize = 0.5;
    let speed = 1;

    for (let i = 0; i < this.entities.length; i++) {
      let pos = this.entities[i].pos;
      this.edgeCheck(i, pos);
      if (this.entities[i].swimming) {
        this.entities[i].vel[1] = wiggleSize * Math.sin(2 * Math.PI * (this.entities[i].sin / wiggleRate * Math.PI / 180));
        if (Math.random() < 0.005) {
          this.entities[i].swimming = false;
          this.entities[i].vel = [0, 0];
        }
        this.slowing(i, 2);
      } else {
        this.reduce(i);
        if (this.entities[i].vel[0] < 0.01 && this.entities[i].vel[1] < 0.01) {
          if (Math.random() < 0.5) {
            this.entities[i].swimming = true;
            this.entities[i].vel = [(Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2];
          } else {
            // Setting a random direction and speed while not being in the
            // range -1 to 1 as it is too slow
            let velx = (Math.random() > 0.5 ? 1 : -1) * (speed * Math.random() + 1);
            let vely = (Math.random() > 0.8 ? 1 : -1) * (speed * Math.random() + 1);
            this.entities[i].vel = [velx, vely];

            // Adding a water drop
            water.dropAt(pos[0], pos[1], this.entities[i].vel[0], this.entities[i].vel[1]);
          }
        }
      }
    }

    this.collisions.checkFish(this);
  }

  reduce(fish) {
    let redFactor = 0.99;
    let velX = this.entities[fish].vel[0] * redFactor;
    let velY = this.entities[fish].vel[1] * redFactor;
    this.entities[fish].vel = [velX, velY];
  }
}

export default FishMovement;
