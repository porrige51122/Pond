import colours from './colours';

class Fish {
  constructor(pos) {
    this.pos = pos;
    this.size = 10 + Math.random() * 5;
    this.vel = [(Math.random() - 0.5) * 2,(Math.random() - 0.5) * 2];
    this.twitching = 0;
    this.swimming = true;
    this.sin = 0;
  }

  tick() {
    this.sin++;
    if (this.sin > 1440)
      this.sin = 0;
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }

  render(canvas, ctx) {
    // Draw Body
    ctx.beginPath();
    ctx.fillStyle = colours.orange_peel;
    ctx.arc(this.pos[0], this.pos[1], this.size, 0, 2 * Math.PI);
    ctx.fill();
    // Draw Tail
    ctx.beginPath();
    ctx.fillStyle = colours.orange_peel;
    ctx.arc(this.pos[0] - (this.vel[0] * 10), this.pos[1]- (this.vel[1] * 10), this.size/4 * 3, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = colours.orange_peel;
    ctx.arc(this.pos[0] - (this.vel[0] * 20), this.pos[1]- (this.vel[1] * 20), this.size/2, 0, 2 * Math.PI);
    ctx.fill();
  }

}

export default Fish;
