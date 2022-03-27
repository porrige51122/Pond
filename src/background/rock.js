import * as colours from '../colours';

class Rock extends PIXI.Container {
  constructor(app, x, y) {
    super()
    this.app = app;
    this.size = window.innerHeight / 30;
    let points = this.generatePoints(x, y)
    this.rock = new PIXI.Graphics();
    this.rock//.lineStyle(1, colours.dark_gray)
        .beginFill(colours.rock_gray)
        .drawPolygon(this.outerPoints)
    this.rockshade = new PIXI.Graphics();
    this.rockshade//.lineStyle(1, colours.dark_gray)
        .beginFill(colours.gray)
        .drawPolygon(this.innerPoints)
    this.addChild(this.rock, this.rockshade)
  }

  generatePoints(x, y) {
    let pointCountAvg = 8;
    let circPos = [((360 / pointCountAvg) * Math.random() * 2)];
    while (circPos[circPos.length - 1] < 360) {
      let nextPoint = circPos[circPos.length - 1] + (360 / pointCountAvg / 2) + (360 / pointCountAvg / 2) * Math.random() * 2;
      circPos.push(nextPoint);
    }
    circPos.pop();

    this.innerPoints = [];
    this.outerPoints = [];
    for (let a = 0; a < circPos.length; a++) {
      let px = this.size * Math.cos(circPos[a] * (Math.PI / 180)) + x;
      let py = this.size * Math.sin(circPos[a] * (Math.PI / 180)) + y;
      this.outerPoints.push(px, py);
      px = this.size * 5 / 8 * Math.cos(circPos[a] * (Math.PI / 180)) + x;
      py = this.size * 5 / 8 * Math.sin(circPos[a] * (Math.PI / 180)) + y;
      this.innerPoints.push(px, py);
    }
  }

  renderDEPRECATED() {
    this.generatePoints();
    let size = this.size / 20 + this.size / 20 * Math.random();
    let points = [];
    for (let a = 0; a < this.circPos.length; a++) {
      let x = size * Math.cos(this.circPos[a] * (Math.PI / 180)) + this.pos[0];
      let y = size * Math.sin(this.circPos[a] * (Math.PI / 180)) + this.pos[1];
      points.push([x, y]);
      x = size * 5 / 8 * Math.cos(this.circPos[a] * (Math.PI / 180)) + this.pos[0];
      y = size * 5 / 8 * Math.sin(this.circPos[a] * (Math.PI / 180)) + this.pos[1];
      points.push([x, y]);
    }

    this.ctx.beginPath();
    this.ctx.fillStyle = colours.rock_gray;
    this.ctx.moveTo(points[0][0], points[0][1]);
    for (let a = 2; a < points.length; a += 2)
      this.ctx.lineTo(points[a][0], points[a][1]);
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.fillStyle = colours.gray;
    this.ctx.moveTo(points[1][0], points[1][1]);
    for (let a = 1; a < points.length; a += 2)
      this.ctx.lineTo(points[a][0], points[a][1]);
    this.ctx.fill();

    for (let a = 0; a < points.length - 2; a += 2) {
      this.drawLines(points[a], points[a + 1], points[a + 2], points[a + 3]);
    }
    this.drawLines(points[points.length - 2], points[points.length - 1], points[0], points[1]);
  }

  drawLines(a, b, c, d) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = colours.dark_gray;
    this.ctx.moveTo(a[0], a[1]);
    this.ctx.lineTo(b[0], b[1]);
    this.ctx.lineTo(d[0], d[1]);
    this.ctx.lineTo(c[0], c[1]);
    this.ctx.lineTo(a[0], a[1]);
    this.ctx.stroke();
  }

}

export default Rock;
