/**
 *  This class contains all the water ripple effects to the pond
 */

class Water {
  constructor(canvas, ctx) {
    // For ease of access
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = canvas.width;
    this.height = canvas.height;
    this.halfWidth = this.width >> 1;
    this.halfHeight = this.height >> 1;

    this.oldIdx = this.width;
    this.newIdx = this.width * (this.height + 3);
    this.rippleRad = 5;

    // Size of each array (space for 2 images)
    this.size = this.width * (this.height + 2) * 2;
    this.rippleMap = [];
    this.lastMap = [];

    for (let i = 0; i < this.size; i++) {
      this.lastMap[i] = 0;
      this.rippleMap[i] = 0;
    }

    this.mapIdx;

    // Texture = pond, ripple = new filtered layer
    this.ripple;
    this.texture;
  }

  /**
   * Takes in the original canvas then adds effects and draws it back
   * to the canvas
   */
  render() {
    // Gets the images
    this.texture = this.ctx.getImageData(0, 0, this.width, this.height);
    this.ripple = this.ctx.getImageData(0, 0, this.width, this.height);

    let i;
    let a, b;
    let data, oldData;
    let newPixel, curPixel;

    i = this.oldIdx;
    this.oldIdx = this.newIdx;
    this.newIdx = i;

    i = 0;
    this.mapIdx = this.oldIdx;

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        data = (
          this.rippleMap[this.mapIdx - this.width] +
          this.rippleMap[this.mapIdx + this.width] +
          this.rippleMap[this.mapIdx - 1] +
          this.rippleMap[this.mapIdx + 1]) >> 1;

        data -= this.rippleMap[this.newIdx + i];

        data -= data >> 6;

        this.rippleMap[this.newIdx + i] = data;

        data = 1024 - data;

        oldData = this.lastMap[i];
        this.lastMap[i] = data;

        if (oldData != data) {
          a = (((x - this.halfWidth) * data / 1024) << 0) + this.halfWidth;
          b = (((y - this.halfHeight) * data / 1024) << 0) + this.halfHeight;

          if (a >= this.width) a = this.width - 1;
          if (a < 0) a = 0;
          if (b >= this.height) b = this.height - 1;
          if (b < 0) b = 0;


          newPixel = (a + (b * this.width)) * 4;
          curPixel = i * 4;
          this.ripple.data[curPixel] = this.texture.data[newPixel];
          this.ripple.data[curPixel + 1] = this.texture.data[newPixel + 1];
          this.ripple.data[curPixel + 2] = this.texture.data[newPixel + 2];
        }
        this.mapIdx++;
        i++;
      }
    }

    this.ctx.putImageData(this.ripple, 0, 0);
  }

  /**
   * Resize method recalibrates all the settings such as width and height
   * and size of arrays
   */
  resize() {
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.oldIdx = this.width;
    this.newIdx = this.width * (this.height + 3);
    this.rippleRad = 2;

    this.size = this.width * (this.height + 2) * 2;

    for (let i = 0; i < this.size; i++) {
      this.lastMap[i] = 0;
      this.rippleMap[i] = 0;
    }

    this.mapIdx;
  }

  /**
   * Simulates a drop starting at the given coordinates
   */
  dropAt(dx, dy) {
    dx <<= 0;
    dy <<= 0;

    for (let j = dy - this.rippleRad; j < dy + this.rippleRad; j++) {
      for (let k = dx - this.rippleRad; k < dx + this.rippleRad; k++) {
        this.rippleMap[this.oldIdx + (j * this.width) + k] += 512;
      }
    }
  }

  randomDrop() {
    this.dropAt(Math.random() * this.width, Math.random() * this.height);
  }
}

export default Water;
