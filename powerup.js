class Powerup {
  constructor(x, y, speed) {
    this.pos = createVector(x, y)
    this.hastighet = speed;
    this.w = 10;
    this.h = 20;
  }

  settHastighet(hastighet) {
    this.hastighet = hastighet;
  }

  show() {
    fill(0, 255, 0);
    rect(this.pos.x, this.pos.y, this.w, this.h);
  }

  update() {
    this.pos.y -= this.hastighet;
  }
}
