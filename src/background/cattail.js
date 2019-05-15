import colours from '../colours';

class Cattail {
  constructor(canvas, ctx, pos) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.pos = pos;
  }

  render() {
    let stemLength = 25;
    let stemThickness = 5;
    let stemColour = colours.dark_green;
    let headLength = 15;
    let headThickness = 10;
    let headColour = colours.olive;
    let tipLength = 5;
    let tipThickness = 2;
    let tipColour = colours.khaki;
    let rotation = Math.random() * 2 * Math.PI;
    this.ctx.save();
    this.ctx.translate(this.pos[0], this.pos[1]);
    this.ctx.rotate(rotation);
    this.drawLine(0, stemLength, stemThickness, stemColour);
    this.drawLine(stemLength, headLength, headThickness, headColour);
    this.drawLine(stemLength + headLength, tipLength, tipThickness, tipColour);
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
