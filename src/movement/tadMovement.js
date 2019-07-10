/*
 * TADMOVEMENT
 * All of the movement patterns for tadpoles are contained here
 */

import Movement from './movement'

class TadMovement extends Movement {
  constructor(entity, canvas, collisions) {
    super(entity, canvas, collisions);
    this.spacing = 20;
  }

  move() {
    // Chance that the tadpole will change their leadership state
    let leaderChance = 0.0000005;

    // Chance that the tadpole will change the leader they are following
    let followChance = 0.00002;


    for (let i = 0; i < this.entities.length; i++) {
      let pos = this.entities[i].pos;
      this.edgeCheck(i, pos);

      if (this.entities[i].leader) { // Leader
        // Random movement
        this.smoothing(i, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2);

        if (Math.random() < leaderChance) {
          this.entities[i].leader = false;

          // Makes all tadpoles following that leader find a new leader
          for (let j = 0; j < this.entities.length; j++) {
            if (this.entities[j].follow == i) {
              this.entities[i].getLeader(this.entities);
            }
          }
        }

      } else if (this.entities[i].follow == null) { // Prevents error
        this.entities[i].getLeader(this.entities);

      } else { // Non Leader
        // Setting variables
        let leaderPos = this.entities[this.entities[i].follow].pos;
        let disX = pos[0] - leaderPos[0];
        let disY = pos[1] - leaderPos[1];
        // Length between current position and leader position
        let length = Math.sqrt(Math.pow(disX, 2) + Math.pow(disY, 2));

        if (length == 0) length = 1; // Preventing dividing by zero
        if (length > this.entities[i].eagerness * this.spacing) {
          this.smoothing(i, -(disX) / (length * 2), -(disY) / (length * 2));
        } else {
          this.smoothing(i, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4);
        }

        if (Math.random() < followChance) {
          this.entities[i].getLeader(this.entities);
        }
        if (Math.random() < leaderChance) {
          this.entities[i].leader = true;
        }

      }
      this.slowing(i, document.getElementById('tadspd').value / 20);
    }
    this.collisions.checkTadpoles(this);
  }
}

export default TadMovement;
