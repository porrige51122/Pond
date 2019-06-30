import colours from '../colours';
import Rock from './rock';
import Cattail from './plants/cattail';
import LongGrass from './plants/longGrass';
import Tree from './plants/tree';
import LobeliaCardinalis from './plants/lobeliaCardinalis';
import IrisEnsataVariegata  from './plants/irisEnsataVariegata';

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

    // Draw grassCount number of grass on pond bank
    let grassCount = 1000;
    this.aroundPond(grassCount, new LongGrass(this.canvasB, ctxB, this.size));
    // Draw rockCount number of rocks around Pond
    let rockCount = 100;
    this.edgeOfPond(rockCount, new Rock(this.canvasB, ctxB, this.size));
    // 25% chance to draw stepping stones
    // TODO: Draw Stepping stones
    // Draw cattailCount number of cattails around pond
    let cattailCount = 30;
    this.edgeOfPond(cattailCount, new Cattail(this.canvasB, ctxB, this.size));
    // 75% chance of tree around pond
    if (Math.random() < 0.75) {
      this.aroundPond(1, new Tree(this.canvasB, ctxB, this.size));
    }
    // Draw Flowers
    this.aroundPond(1, new IrisEnsataVariegata(this.canvasB, ctxB, this.size));
  }


  edgeOfPond(count, entity) {
    let surrounded = true;
    let angle = 0;

    while (surrounded) {
      let x = this.size * Math.cos(angle) + this.pos[0];
      let y = this.size * Math.sin(angle) + this.pos[1];
      let pos = [x, y];
      let dis = Math.sqrt(Math.pow(x - this.pos[2], 2) + Math.pow(y - this.pos[3], 2));
      if (dis > this.size) {
        entity.setPos(pos);
        entity.render();
      }

      x += this.pos[2] - this.pos[0];
      y += this.pos[3] - this.pos[1];
      pos = [x, y];
      dis = Math.sqrt(Math.pow(x - this.pos[0], 2) + Math.pow(y - this.pos[1], 2));
      if (dis > this.size) {
        entity.setPos(pos);
        entity.render();
      }
      if (angle > count * 25)
        surrounded = false;
      else
        angle += Math.random() * 50;
    }
  }

  aroundPond(count, entity) {
    for (let i = 0; i < count; i++) {
      let pondEdge = false;
      let pos;
      while (!pondEdge) {
        pos = [Math.random() * entity.canvas.width, Math.random() * entity.canvas.height];
        if (this.isColliding(pos) != null) {
          pondEdge = true;
        }
      }
      entity.setPos(pos);
      entity.render();
    }
  }

  withinPond(count, entity) {
    // TODO: Code to put all entities within the pond
  }

  renderPond(canvas, ctx) {
    ctx.fillStyle = this.pondColour;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // Draws loaded template
  renderLand(canvas, ctx) {
    ctx.drawImage(this.canvasB, 0, 0);
  }

  isColliding(pos) {
    // Calculate if the object will collide with the wall
    let dxa = pos[0] - this.pos[0];
    let dya = pos[1] - this.pos[1];
    let dxb = pos[0] - this.pos[2];
    let dyb = pos[1] - this.pos[3];
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
