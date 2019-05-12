import colours from '../colours';

class Rock {
  constructor(canvas, ctx, pos) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.pos = pos;
    this.generatePoints();
  }

  generatePoints() {
    let pointCountAvg = 8;
    this.circPos = [((360/pointCountAvg) * Math.random() * 2)];
    while (this.circPos[this.circPos.length - 1] < 360) {
      let nextPoint = this.circPos[this.circPos.length - 1] + (360/pointCountAvg) * Math.random() * 2;
      this.circPos.push(nextPoint);
    }
    this.circPos.pop();
  }

  render() {
    let size = 20 + Math.random() * 10;
    this.drawPoints(size, colours.rock_gray);
    this.drawPoints(size/2, colours.gray);
  }

  drawPoints(size, colour) {
    let points = [];
    for (let a = 0; a < this.circPos.length; a++) {
      let x = size * Math.cos(this.circPos[a] * (Math.PI/180)) + this.pos[0];
      let y = size * Math.sin(this.circPos[a] * (Math.PI/180)) + this.pos[1];
      points.push([x,y]);
    }
    this.ctx.beginPath();
    this.ctx.fillStyle = colour;
    this.ctx.moveTo(points[0][0], points[0][1]);
    for (let b = 0; b < points.length; b++) {
      this.ctx.lineTo(points[b][0], points[b][1]);
    }
    this.ctx.fill();
  }
}

export default Rock;
