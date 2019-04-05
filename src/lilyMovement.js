import Movement from './movement'

class LilyMovement extends Movement {
  constructor(entity, canvas) {
    super(entity, canvas);
    this.spacing = 20;
  }

  move() {
    for (let i = 0; i < this.entities.length; i++) {
      let pos = this.entities[i].pos;
      if (pos[0] < 0 + this.spacing) {
        this.smoothing(i, 1, 0);
      } else if (pos[1] < 0 + this.spacing) {
        this.smoothing(i, 0, 5);
      } else if (pos[0] > this.canvas.width - (this.spacing * 2)) {
        this.smoothing(i, -1, 0);
      } else if (pos[1] > this.canvas.height - (this.spacing * 2)) {
        this.smoothing(i, 0, -5);
      }
      this.slowing(i, 0.1)
    }
  }
}

export default LilyMovement;
