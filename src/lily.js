import colours from './colours';

class lily {
  constructor(pos) {
    this.pos = pos;
    this.size = 50;
    this.vel = [Math.random() - 0.5,Math.random() - 0.5];
    this.startAngle = Math.PI * 2 * Math.random();
    this.clockwise = Math.random() < 0.5;
    this.isFlower = Math.random() < 0.25;
  }

  tick() {
    if (this.clockwise)
      this.startAngle += 0.001;
    else
      this.startAngle -= 0.001;
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }

  render(canvas, ctx) {
    if (!this.isFlower) {
      let start = this.startAngle;
      ctx.beginPath();
      ctx.fillStyle = colours.light_green;
      ctx.arc(this.pos[0], this.pos[1], this.size, start, Math.PI + start);
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = colours.lily_green;
      ctx.arc(this.pos[0], this.pos[1], this.size/4 * 3, start, Math.PI + start);
      ctx.fill();

      start += (Math.PI/180) * 170;
      ctx.beginPath();
      ctx.fillStyle = colours.light_green;
      ctx.arc(this.pos[0], this.pos[1], this.size, start, Math.PI + start);
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = colours.lily_green;
      ctx.arc(this.pos[0], this.pos[1], this.size/4 * 3, start, Math.PI + start);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.fillStyle = colours.light_green;
      ctx.arc(this.pos[0], this.pos[1], this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = colours.lily_green;
      ctx.arc(this.pos[0], this.pos[1], this.size/4 * 3, 0, Math.PI * 2);
      ctx.fill();
      this.drawFlower(ctx);
    }
  }

  drawFlower(ctx) {
    let firstRing = this.size/4;
    this.drawRing(ctx, colours.pink, this.size/2, this.size/4 * 3);
    this.drawRing(ctx, colours.delicate_pink, this.size/4, this.size/2);
    this.drawRing(ctx, colours.light_pink, this.size/8, this.size/4);
    ctx.beginPath();
    ctx.fillStyle = colours.yellow;
    ctx.arc(this.pos[0], this.pos[1], this.size/8, 0, Math.PI * 2);
    ctx.fill();
  }

  drawRing(ctx, fillStyle, w, h) {
    this.drawGroup(ctx, fillStyle, this.pos[0], this.pos[1], w, h);
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(Math.PI/4);
    this.drawGroup(ctx, fillStyle, 0, 0, w, h);
    ctx.restore();
  }

  drawGroup(ctx, fillStyle, x, y, w, h) {
    this.drawPair(ctx, fillStyle, x, y, w, h);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.PI/2);
    this.drawPair(ctx, fillStyle, 0, 0, w, h);
    ctx.restore();
  }

  drawPair(ctx, fillStyle, x, y, w, h) {
    this.drawPetal(ctx, fillStyle, x, y + h/2, w, h);
    this.drawPetal(ctx, fillStyle, x, y - h/2, w, h);
  }

  drawPetal(ctx, fillStyle, x, y, w, h) {
    ctx.beginPath();
    ctx.fillStyle = fillStyle;
    ctx.moveTo(x, y - h/2);
    ctx.bezierCurveTo(x + w/2, y - h/2, x + w/2, y + h/2, x, y + h/2);
    ctx.bezierCurveTo(x - w/2, y + h/2, x - w/2, y - h/2, x, y - h/2);
    ctx.fill();
  }

}

export default lily;
