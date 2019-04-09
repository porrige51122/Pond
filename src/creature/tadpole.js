/**
 * This class contains all information for each tadpole
 */

import colours from '../colours';

class Tadpole {
  constructor(canvas) {
    // Random Position on canvas
    this.pos = [Math.random() * canvas.width, Math.random() * canvas.height];
    // Random size 3-4
    this.size = 1 + Math.random();
    // Initially still
    this.vel = [0, 0];
    // 1.5% chance to become leader
    this.leader = Math.random() < 0.015;
    // follow noone until assigned
    this.follow = null;
    // eagerness = how close to the leader the tadpole will follow
    this.eagerness = Math.random();
  }

  /**
   * TICK - Moves the entity
   */
  tick() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }

  /**
   * RENDER - Draws an black ball and two smaller grey balls behind it to
   *  simulate a tail
   */
  render(canvas, ctx) {
    // Draw Body
    ctx.beginPath();
    if (this.leader) {
      ctx.fillStyle = colours.yellow;
    } else {
      ctx.fillStyle = colours.registration_black;
    }
    ctx.arc(this.pos[0], this.pos[1], this.size, 0, 2 * Math.PI);
    ctx.fill();
    // Draw Tail
    ctx.beginPath();
    ctx.fillStyle = colours.rasin_black;
    ctx.arc(this.pos[0] - (this.vel[0] * 5), this.pos[1] - (this.vel[1] * 5), this.size / 4 * 3, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = colours.rasin_black;
    ctx.arc(this.pos[0] - (this.vel[0] * 10), this.pos[1] - (this.vel[1] * 10), this.size / 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  /**
   * GETLEADER - creates an array of leader tadpoles and radomly chooses
   * which one it will follow
   */
  getLeader(tadpoles) {
    let leaders = [];
    for (let i = 0; i < tadpoles.length; i++) {
      if (this.leader) {
        break;
      }
      if (tadpoles[i].leader)
        leaders.push(i);
    }
    this.follow = leaders[Math.floor(Math.random() * leaders.length)];
  }
}

export default Tadpole;
