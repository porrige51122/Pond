import * as colours from '../../colours';

class LongGrass extends PIXI.Container {
  constructor(app, x, y) {
    super()

    this.grass = new PIXI.Graphics();
    let w = window.innerHeight / 80
    let h = w * 6
    this.position.set(x, y)
    this.angle = (Math.random() * 100) - 50

    this.grass
        .beginFill(colours.forest_green)
        .moveTo(0, -h / 2)
        .bezierCurveTo(w / 4, -h / 2, w / 4, h / 2, 0, h / 2)
        .bezierCurveTo(-w / 4, h / 2, -w / 4, -h / 2, 0, -h / 2)
    this.addChild(this.grass)
  }

}

export default LongGrass;
