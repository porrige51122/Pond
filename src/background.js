import colours from './colours';

class Background {
  constructor(canvas) {
    if (canvas.width < canvas.height) {
      this.pos = [canvas.width/2, (canvas.height/8) * 3,
                  canvas.width/2, (canvas.height/8) * 5];
      this.size = canvas.width/2;
    } else {
      this.pos = [(canvas.width/8) * 3, canvas.height/2,
                  (canvas.width/8) * 5, canvas.height/2];
      this.size = canvas.height/2;
    }
    this.pondColour = colours.ocean_blue;
    this.landColour = colours.pea;

  }

  renderPond(canvas, ctx) {
    ctx.fillStyle = this.pondColour;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  renderLand(canvas, ctx) {
    // Create a mask and cuts 2 circles out of it then draws it to the canvas
    let maskCanvas = document.createElement('canvas');
    maskCanvas.width = canvas.width;
    maskCanvas.height = canvas.height;
    let maskCtx = maskCanvas.getContext('2d');
    maskCtx.fillStyle = this.landColour;
    maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
    maskCtx.globalCompositeOperation = 'xor';
    maskCtx.arc(this.pos[0], this.pos[1], this.size, 0, Math.PI * 2);
    maskCtx.arc(this.pos[2], this.pos[3], this.size, 0, Math.PI * 2);
    maskCtx.fill();

    ctx.drawImage(maskCanvas, 0, 0);
  }
}

export default Background;
