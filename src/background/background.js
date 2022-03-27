import * as colours from '../colours';
import Rock from './rock';
import Cattail from './plants/cattail';
import LongGrass from './plants/longGrass';
import Tree from './plants/tree';
import LobeliaCardinalis from './plants/lobeliaCardinalis';
import FlowerBush from './plants/flowerBush';

/**
 * BACKGROUND:
 * This class creates the bank of the pond and checks to see if fish are
 * colliding with it
 */
class Background {
  constructor(app) {
    this.app = app
    this.pondColour = colours.ocean_blue;
    this.landColour = colours.pea;

    let pointRange = 20; // 10 low poly -> 500 close to square
    let buffer = window.innerWidth/32
    let randomPoints = [];
    for (let i = 0; i < pointRange; i++) {
      let x = Math.floor(Math.random() * (window.innerWidth - (2 * buffer))) + buffer
      let y = Math.floor(Math.random() * (window.innerHeight - (2 * buffer))) + buffer
      randomPoints.push({x:x, y:y});
    }
    this.edgeOfPondPoints = this.convexHull(randomPoints)
    this.createLand();
  }

  convexHull(points) {
    points.sort(function (a, b) {
      return a.x != b.x ? a.x - b.x : a.y - b.y;
    });

    var n = points.length;
    var hull = [];

    for (var i = 0; i < 2 * n; i++) {
      var j = i < n ? i : 2 * n - 1 - i;
      while (hull.length >= 2 && this.removeMiddle(hull[hull.length - 2], hull[hull.length - 1], points[j]))
        hull.pop();
      hull.push(points[j]);
    }

    hull.pop();
    return hull;
  }

  removeMiddle(a, b, c) {
    var cross = (a.x - b.x) * (c.y - b.y) - (a.y - b.y) * (c.x - b.x);
    var dot = (a.x - b.x) * (c.x - b.x) + (a.y - b.y) * (c.y - b.y);
    return cross < 0 || cross == 0 && dot <= 0;
  }

  createLand() {
    // Create a polygon of the pond object
    let points = []
    for (let i in this.edgeOfPondPoints) {
      points.push(this.edgeOfPondPoints[i].x)
      points.push(this.edgeOfPondPoints[i].y)
    }
    this.pond = new PIXI.Graphics();
    this.pond.beginFill(this.pondColour)
    this.pondShape = new PIXI.Polygon(points)
    this.pond.drawPolygon(this.pondShape)
    this.app.stage.addChild(this.pond)

    // Draw Grass
    let grassCount = 1000;
    this.grass = []
    for (let i = 0; i < grassCount; i++) {
      let x = Math.floor(Math.random() * window.innerWidth)
      let y = Math.floor(Math.random() * window.innerHeight)
      if (this.pondShape.contains(x, y)) {
        i--;
        continue
      }
      let singleBlade = new LongGrass(this.app, x, y)
      this.app.stage.addChild(singleBlade)
      this.grass.push(singleBlade)
    }

    // Draw Rocks
    let rockCount = 50;
    this.rocks = []
    let rockCoords = this.edgeOfPond(rockCount);
    for (let i = 0; i < rockCount; i++) {
      let rock = new Rock(this.app, rockCoords[i][0], rockCoords[i][1])
      this.app.stage.addChild(rock)
    }
  }

  pointOnLine(x1,y1,x2,y2,per) {
    return [x1 + (x2 - x1) * per, y1 + (y2 - y1) * per];
  }

  // createLandDEPRECATED(canvas, ctx) {
  //   // Draw grassCount number of grass on pond bank
  //   let grassCount = this.size * 5;
  //   this.aroundPond(grassCount, new LongGrass(this.canvasB, ctxB, this.size));
  //   // Draw rockCount number of rocks around Pond
  //   let rockCount = 100;
  //   this.edgeOfPond(rockCount, new Rock(this.canvasB, ctxB, this.size));
  //   // 25% chance to draw stepping stones
  //   // TODO: Draw Stepping stones
  //
  //   // Draw Flowers
  //   this.aroundPond(Math.ceil(Math.random() * this.size / 80), new FlowerBush(this.canvasB, ctxB, this.size));
  //
  //   // Draw cattailCount number of cattails around pond
  //   let cattailCount = 30;
  //   this.edgeOfPond(cattailCount, new Cattail(this.canvasB, ctxB, this.size));
  //   // 75% chance of tree around pond
  //   if (Math.random() < 0.75) {
  //     this.aroundPond(1, new Tree(this.canvasB, ctxB, this.size));
  //   }
  // }

  getDistance(xA, yA, xB, yB) {
    let xDiff = xA - xB;
    let yDiff = yA - yB;
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
  }

  edgeOfPond(amount) {
    //prep
    let totalDistance = 0;
    let linesPerDistance = []
    for (let i = 0; i < this.edgeOfPondPoints.length; i++) {
      let cur = this.getDistance(
        this.edgeOfPondPoints[i].x,
        this.edgeOfPondPoints[i].y,
        this.edgeOfPondPoints[(i + 1) % this.edgeOfPondPoints.length].x,
        this.edgeOfPondPoints[(i + 1) % this.edgeOfPondPoints.length].y
      );
      linesPerDistance.push(cur)
      totalDistance += cur;
    }
    let outputPoints = [];
    for (let i = 0; i < amount; i++) {
      let pointPos = totalDistance / amount * (i - 0.5 + Math.random())
      let pointLine = 0;
      for (let i = 0; i < linesPerDistance.length; i++) {
        if (linesPerDistance[i] < pointPos) {
          pointPos -= linesPerDistance[i];
          continue;
        }
        pointLine = i;
        break;
      }
      outputPoints.push(this.pointOnLine(
        this.edgeOfPondPoints[pointLine].x,
        this.edgeOfPondPoints[pointLine].y,
        this.edgeOfPondPoints[(pointLine + 1) % this.edgeOfPondPoints.length].x,
        this.edgeOfPondPoints[(pointLine + 1) % this.edgeOfPondPoints.length].y,
        pointPos / linesPerDistance[pointLine]
      ))
    }
    console.log(outputPoints)
    return outputPoints
  }

  // aroundPond(count, entity) {
  //   for (let i = 0; i < count; i++) {
  //     let pondEdge = false;
  //     let pos;
  //     while (!pondEdge) {
  //       pos = [Math.random() * entity.canvas.width, Math.random() * entity.canvas.height];
  //       if (this.isColliding(pos) != null) {
  //         pondEdge = true;
  //       }
  //     }
  //     entity.setPos(pos);
  //     entity.render();
  //   }
  // }
  //
  // withinPond(count, entity) {
  //   // TODO: Code to put all entities within the pond
  // }
  //
  // renderPond(canvas, ctx) {
  //   ctx.fillStyle = this.pondColour;
  //   ctx.fillRect(0, 0, canvas.width, canvas.height);
  // }
  //
  // // Draws loaded template
  // renderLand(canvas, ctx) {
  //   if (this.canvasB.width > 0 && this.canvasB.height > 0) {
  //     ctx.drawImage(this.canvasB, 0, 0);
  //   }
  // }
  //
  // isColliding(pos) {
  //   // Calculate if the object will collide with the wall
  //   let dxa = pos[0] - this.pos[0];
  //   let dya = pos[1] - this.pos[1];
  //   let dxb = pos[0] - this.pos[2];
  //   let dyb = pos[1] - this.pos[3];
  //   let lenA = Math.sqrt(Math.pow(dxa, 2) + Math.pow(dya, 2));
  //   let lenB = Math.sqrt(Math.pow(dxb, 2) + Math.pow(dyb, 2));
  //   if (lenA < this.size || lenB < this.size) {
  //     return null;
  //   }
  //   // return collision info here
  //   if (lenB > lenA) {
  //     return [this.pos[0], this.pos[1]];
  //   } else {
  //     return [this.pos[2], this.pos[3]];
  //   }
  // }
}

export default Background;
