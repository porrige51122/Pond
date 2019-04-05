import Movement from './movement'

class TadMovement extends Movement {
  constructor(entity, canvas) {
    super(entity, canvas);
    this.spacing = 20;
  }

  move() {
    for (let i = 0; i < this.entities.length; i++) {
      let pos = this.entities[i].pos;
      // If near the edge, move away
      if (pos[0] < 0 + this.spacing) {
        this.smoothing(i, 1, 0);
      } else if (pos[1] < 0 + this.spacing) {
        this.smoothing(i, 0, 1);
      } else if (pos[0] > this.canvas.width - (this.spacing * 2)) {
        this.smoothing(i, -1, 0);
      } else if (pos[1] > this.canvas.height - (this.spacing * 2)) {
        this.smoothing(i, 0, -1);
      }
      // Leader = random Movement
      // Non Leader = follow designated leader
      if (this.entities[i].leader) {
        this.smoothing(i, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2);
        if (Math.random() < 0.0000005) {
          this.entities[i].leader = false;
        }
      } else if (this.entities[i].follow == null) {
        this.entities[i].getLeader(this.entities);
      } else {
        let leaderPos = this.entities[this.entities[i].follow].pos;
        let length = Math.sqrt(Math.abs(Math.pow(pos[0] - leaderPos[0], 2) - Math.pow(pos[1] - leaderPos[1], 2)));
        if (length == 0) {
          length = 1;
        }
        if (length > this.entities[i].eagerness * this.spacing)
          this.smoothing(i, (leaderPos[0] - pos[0]) / (length * 2), (leaderPos[1] - pos[1]) / (length * 2));
        else
          this.smoothing(i, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4);

        if (Math.random() < 0.00002) {
          this.entities[i].getLeader(this.entities);
        }
        if (Math.random() < 0.0000005) {
          this.entities[i].leader = true;
        }
      }
      this.slowing(i, 1);
    }
  }
}

export default TadMovement;
