import * as colours from  '../../colours';

/**
 * CATTAIL class
 * Draws a cattail of a random angle at a position on the canvas
 */
class Cattail {
  constructor(canvas, ctx, size) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.size = size / 2 + size / 2 * Math.random();
  }

  setPos(pos) {
    this.pos = pos;
  }

  render() {
    let length = Math.random();
    let stemLength = this.size / 8 * length;
    let stemThickness = this.size / 64;
    let stemColour = colours.dark_green;
    let headLength = this.size / 15 * length;
    let headThickness = this.size / 20;
    let headColour = colours.olive;
    let tipLength = this.size / 40 * length;
    let tipThickness = this.size / 120;
    let tipColour = colours.khaki;
    let rotation = Math.random() * 2 * Math.PI;

    this.ctx.save();
    this.ctx.translate(this.pos[0], this.pos[1]);
    this.ctx.rotate(rotation);
    this.drawLine(0, stemLength, stemThickness, stemColour);
    this.drawLine(stemLength + stemThickness, headLength, headThickness, headColour);
    this.drawLine(stemLength + stemThickness + headLength, tipLength, tipThickness, tipColour);
    this.ctx.restore();
  }

  drawLine(start, length, thickness, colour) {
    this.ctx.beginPath();
    this.ctx.lineCap = "round";
    this.ctx.strokeStyle = colour;
    this.ctx.lineWidth = thickness;
    this.ctx.moveTo(0, start);
    this.ctx.lineTo(0, length + start);
    this.ctx.stroke();
  }

}

export default Cattail;
