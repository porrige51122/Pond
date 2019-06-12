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
    // Change for initial thickness
    let w = this.size/20;

    this.ctx.save();
    this.ctx.translate(this.pos[0], this.pos[1]);
    for (let i = 0; i < Math.PI * 2; i += Math.PI/8) {
      this.ctx.rotate(i);
      this.drawTree(0, 0, w);
    }
    // this.drawLeaf(0,0,this.size/200);
    this.ctx.restore();

  }

  drawTree(x, y, w) {
    for (let i = 0; i < 2; i++) {
      // Change the amount for spread of the tree
      let dx = Math.random() * this.size/7;
      let dy = Math.random() * this.size/7;
      this.drawBranch(x, y, dx, dy, w);
      // Change for minimum branch thickness
      if (w > this.size/80) {
        // Change w amount for change in thickness
        this.drawTree(x + dx, y + dy, w/1.75);
      }
      this.ctx.fillStyle = colours.leaf_brown;
      this.drawSakuraLeaf(x + dx, y + dy, this.size/200);
    }

  }

  drawSakuraLeaf(x, y, w) {
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.bezierCurveTo(x - (4 * w), y     , x - (4 * w), y     , x - (8 * w), y - (2 * w));
    this.ctx.bezierCurveTo(x - (4 * w), y - (2 * w), x - (4 * w), y - (2 * w), x     , y     );

    this.ctx.bezierCurveTo(x + (4 * w), y     , x + (4 * w), y     , x + (8 * w), y - (2 * w));
    this.ctx.bezierCurveTo(x + (4 * w), y - (2 * w), x + (4 * w), y - (2 * w), x     , y     );

    this.ctx.bezierCurveTo(x - (6 * w), y     , x - (6 * w), y     , x - (12 * w), y + (4 * w));
    this.ctx.bezierCurveTo(x - (6 * w), y + (4 * w), x - (6 * w), y + (4 * w), x     , y     );

    this.ctx.bezierCurveTo(x + (6 * w), y     , x + (6 * w), y     , x + (12 * w), y + (4 * w));
    this.ctx.bezierCurveTo(x + (6 * w), y + (4 * w), x + (6 * w), y + (4 * w), x     , y     );

    this.ctx.bezierCurveTo(x - (3 * w), y + (7 * w), x - (3 * w), y + (7 * w), x - (10 * w), y + (12 * w));
    this.ctx.bezierCurveTo(x - (6 * w), y + (5 * w), x - (8 * w), y + (5 * w), x     , y     );

    this.ctx.bezierCurveTo(x + (3 * w), y + (7 * w), x + (3 * w), y + (7 * w), x + (10 * w), y + (12 * w));
    this.ctx.bezierCurveTo(x + (6 * w), y + (5 * w), x + (8 * w), y + (5 * w), x     , y     );

    this.ctx.bezierCurveTo(x - (3 * w), y + (9 * w), x - (3 * w), y + (9 * w), x     , y + (18 * w));
    this.ctx.bezierCurveTo(x + (3 * w), y + (9 * w), x + (3 * w), y + (9 * w), x     , y     );

    this.ctx.fill();
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
