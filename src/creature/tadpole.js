import colours from '../colours';

class Tadpole {
  constructor(pos) {
    this.pos = pos;
    this.size = 3 + Math.random();
    this.vel = [0,0];
    let leaderChance = 0.015
    this.leader = Math.random() < leaderChance;
    this.follow = null;
    this.eagerness = Math.random()
    this.changeDir = false;
  }

  tick() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }

  render(canvas, ctx) {
    // Draw Body
    ctx.beginPath();
    // if (this.leader)
      // ctx.fillStyle = colours.yellow;
    // else
      ctx.fillStyle = colours.registration_black;
    ctx.arc(this.pos[0], this.pos[1], this.size, 0, 2 * Math.PI);
    ctx.fill();
    // Draw Tail
    ctx.beginPath();
    ctx.fillStyle = colours.rasin_black;
    ctx.arc(this.pos[0] - (this.vel[0] * 5), this.pos[1]- (this.vel[1] * 5), this.size/4 * 3, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = colours.rasin_black;
    ctx.arc(this.pos[0] - (this.vel[0] * 10), this.pos[1]- (this.vel[1] * 10), this.size/2, 0, 2 * Math.PI);
    ctx.fill();
  }

  getLeader(tadpoles) {
    let leaders = [];
    for (let i = 0; i < tadpoles.length; i++) {
      if (this.leader) {break;}
      if (tadpoles[i].leader)
        leaders.push(i);
    }
    this.follow = leaders[Math.floor(Math.random() * leaders.length)];
  }
}

export default Tadpole;
