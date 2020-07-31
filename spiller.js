class Spiller {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.hastighet = 2;
    this.w = 50;
    this.h = 50;
  }

  getCenter() {
    return createVector(this.pos.x + this.w/2, this.pos.y + this.h/2);
  }

  settHastighet(hastighet) {
    this.hastighet = hastighet;
  }

  show() {
    fill(255, 140, 0);
//    rect(this.pos.x, this.pos.y, 50, 50)
image(bomerangImage, this.pos.x, this.pos.y);
  }

isHit() {
  let hit = false;

  for (let index = alienBullets.length-1; index >= 0; index--) {
    if (this.getCenter().dist(alienBullets[index].pos) < 25) {
      hit = true;
      alienBullets.splice(index, 1);
    }
  }

  return hit;
}

  update() {
    if (this.hastighet > 0 && this.pos.x > 350) {
      this.hastighet = 0
    }
    if (this.hastighet < 0 && this.pos.x < 0) {
      this.hastighet = 0
    }
    this.pos.x += this.hastighet;
  }
}
