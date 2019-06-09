import colours from '../colours';

class Tree {
  constructor(canvas, ctx, size) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.size = size;
  }

  setPos(pos) {
    this.pos = pos;
  }

  render() {
    let w = this.size/10;
    console.log(w);
    this.drawTree(this.pos[0], this.pos[1], w);

  }

  drawTree(x, y, w) {
    for (let i = 0; i < 2; i++) {
      let dx = Math.random() * 100 - 50;
      let dy = Math.random() * 100 - 50;
      this.drawBranch(x, y, dx, dy, w);
      if (w > 5) {
        this.drawTree(x + dx, y + dy, w/1.5);
      }
    }

  }

  drawBranch(x, y, dx, dy, w) {
    this.ctx.beginPath();
    this.ctx.lineWidth = w;
    this.ctx.lineCap = "round";
    this.ctx.strokeStyle = colours.bark;
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + dx, y + dy);
    this.ctx.stroke();
  }

}

export default Tree;
