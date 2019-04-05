import Movement from './movement'

class FishMovement extends Movement {
  constructor(entity, canvas) {
    super(entity, canvas);
    this.spacing = 20;
  }

  move() {
    for (let i = 0; i < this.entities.length; i++) {
      let pos = this.entities[i].pos;
      if (this.entities[i].swimming) {
        if (pos[0] < 0 + this.spacing) {
          this.smoothing(i, 1, 0);
        } else if (pos[1] < 0 + this.spacing) {
          this.smoothing(i, 0, 1);
        } else if (pos[0] > this.canvas.width - (this.spacing * 2)) {
          this.smoothing(i, -1, 0);
        } else if (pos[1] > this.canvas.height - (this.spacing * 2)) {
          this.smoothing(i, 0, -1);
        }

        let wiggleRate = 8;
        let wiggleSize = 0.5;
        this.entities[i].vel[1] = wiggleSize * Math.sin(2 * Math.PI * (this.entities[i].sin / wiggleRate * Math.PI / 180));
        if (this.entities[i].sin % 180 == 0 && Math.random() < 0.25) {
          console.log('NYAH');
          this.entities[i].swimming = false;
          this.entities[i].vel = [0, 0];
        }
        this.slowing(i, 2);
      } else {
        if (pos[0] < 0 + this.spacing) {
          this.smoothing(i, 1, 0);
        } else if (pos[1] < 0 + this.spacing) {
          this.smoothing(i, 0, 5);
        } else if (pos[0] > this.canvas.width - (this.spacing * 2)) {
          this.smoothing(i, -1, 0);
        } else if (pos[1] > this.canvas.height - (this.spacing * 2)) {
          this.smoothing(i, 0, -5);
        }
        this.reduce(i);
        if (this.entities[i].vel[0] < 0.01 && this.entities[i].vel[1] < 0.01) {
          if (Math.random() < 0.5) {
            this.entities[i].swimming = true;
            this.entities[i].vel = [(Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2];
          } else {
            let speed = 5;
            this.entities[i].vel = [(Math.random() - 0.5) * speed, (Math.random() - 0.5) * speed];
          }
        }
      }
    }
  }

  reduce(fish) {
    let redFactor = 0.99;
    let velX = this.entities[fish].vel[0] * redFactor;
    let velY = this.entities[fish].vel[1] * redFactor;
    this.entities[fish].vel = [velX, velY];
  }
}

export default FishMovement;
