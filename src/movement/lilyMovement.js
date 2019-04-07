import Movement from './movement'

class LilyMovement extends Movement {
  constructor(entity, canvas) {
    super(entity, canvas);
    this.spacing = 20;
  }

  move() {
    for (let i = 0; i < this.entities.length; i++) {
      let pos = this.entities[i].pos;
      this.edgeCheck(i, pos);
      this.slowing(i, 0.1)
    }
  }
}

export default LilyMovement;
