import colours from '../colours';
import Rock from './rock';
/**
 * BACKGROUND:
 * This class creates the bank of the pond and checks to see if fish are
 * colliding with it
 */
class Background {
  constructor(canvas, ctx) {
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
    this.createLand(canvas, ctx);

  }

  createLand(canvas, ctx) {
    // Create a mask and cuts 2 circles out of it then draws it to the canvas
    this.canvasB = document.createElement('canvas');
    this.canvasB.width = canvas.width;
    this.canvasB.height = canvas.height;
    let ctxB = this.canvasB.getContext('2d');
    ctxB.save();
    ctxB.fillStyle = this.landColour;
    ctxB.fillRect(0, 0, canvas.width, canvas.height);
    ctxB.globalCompositeOperation = 'xor';
    ctxB.arc(this.pos[0], this.pos[1], this.size, 0, Math.PI * 2);
    ctxB.arc(this.pos[2], this.pos[3], this.size, 0, Math.PI * 2);
    ctxB.fill();
    ctxB.restore();

    let surrounded = true;
    while (surrounded) {
      let pos = [50, 50];
      let rock = new Rock(this.canvasB, ctxB, pos);
      rock.render();
      surrounded = false;
    }
  }

  renderPond(canvas, ctx) {
    ctx.fillStyle = this.pondColour;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  renderLand(canvas, ctx) {
    ctx.drawImage(this.canvasB, 0, 0);
  }

  isColliding(entity) {
    // Calculate if the object will collide with the wall
    let dxa = entity.pos[0] - this.pos[0];
    let dya = entity.pos[1] - this.pos[1];
    let dxb = entity.pos[0] - this.pos[2];
    let dyb = entity.pos[1] - this.pos[3];
    let lenA = Math.sqrt(Math.pow(dxa, 2) + Math.pow(dya, 2));
    let lenB = Math.sqrt(Math.pow(dxb, 2) + Math.pow(dyb, 2));
    if (lenA < this.size || lenB < this.size) {
      return null;
    }
    // return collision info here
    if (lenB > lenA) {
      return [this.pos[0], this.pos[1]];
    } else {
      return [this.pos[2], this.pos[3]];
    }
  }
}

export default Background;
