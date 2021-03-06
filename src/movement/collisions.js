class Collisions {
  constructor(tadpoles, fish, lillies, background) {
    this.tadpoles = tadpoles;
    this.fish = fish;
    this.lillies = lillies;
    this.background = background;
  }

  checkTadpoles(movement) {
    for (let i = 0; i < this.tadpoles.length; i++) {
      let pondEdge = this.background.isColliding(this.tadpoles[i].pos);
      if (pondEdge != null) {
        let pos = this.tadpoles[i].pos;
        let dx = pondEdge[0] - pos[0];
        let dy = pondEdge[1] - pos[1];
        this.tadpoles[i].applyForce([dx, dy]);
      }
    }
  }

  checkFish(movement) {
    for (let i = 0; i < this.fish.length; i++) {
      let pondEdge = this.background.isColliding(this.fish[i].pos);
      if (pondEdge != null) {
        let pos = this.fish[i].pos;
        let dx = pondEdge[0] - pos[0];
        let dy = pondEdge[1] - pos[1];
        movement.smoothing(i, dx, dy);
      }
    }
  }

  checkLillies(movement) {
    for (let i = 0; i < this.lillies.length; i++) {
      let pondEdge = this.background.isColliding(this.lillies[i].pos);
      if (pondEdge != null) {
        let pos = this.lillies[i].pos;
        let dx = pondEdge[0] - pos[0];
        let dy = pondEdge[1] - pos[1];
        movement.smoothing(i, dx, dy);
      }
      for (let j = 0; j < this.lillies.length; j++) {
        if (i == j) continue;
        if (this.isColliding(this.lillies[i], this.lillies[j])) {

        }
      }
    }
  }

  isColliding(a, b) {
    return false;
  }
}

export default Collisions;
