let spiller;
let aliens = [];
let alienBullets = [];
let bullets = [];
let gameover = false;
let score = 0;
let level = 1;
let myStorage = window.localStorage;
let lives = 3;
let menu = true;


function getHighscore() {
  return myStorage.getItem("highscore")
}

function setHighscore() {
  if (getHighscore() == null || parseInt(getHighscore()) < score) {
    myStorage.setItem("highscore", "" + score);
  }
}

function preload() {
  alienImage = loadImage(alienPng);
  bomerangImage = loadImage(bomerangPng)
  bakgrunnImage = loadImage(bakgrunnPng)
  gameoverImage = loadImage(gameoverPng)
  menuImage = loadImage(menuPng)
}

function setup() {
  createCanvas(400, 400);
  spiller = new Spiller(175, 300);
  setupAliens();
}

function setupAliens() {
  gameover = false;
  aliens = [];
  alienBullets = [];
  for (let index = 0; index < 7; index++) {
    for (let rad = 0; rad < 4; rad++) {
      aliens.push(new Alien(50 + index * 50, 50 + rad * 30))
    }
  }
}

function drawBullets() {
  for (let index = bullets.length - 1; index >= 0; index--) {
    bullets[index].show();
    bullets[index].update();

    if (bullets[index].pos.y < 0) {
      //bullets.splice(index, 1);
      bullets[index].skalSlettes = true;

    }
  }

  for (let index = alienBullets.length - 1; index >= 0; index--) {
    alienBullets[index].show();
    alienBullets[index].update();

    if (alienBullets[index].pos.y > height) {
      //bullets.splice(index, 1);
      alienBullets[index].skalSlettes = true;

    }
  }
}

function drawAliens() {
  let aliensKolidert = false;
  for (let index = 0; index < aliens.length; index++) {
    if (aliens[index].harKolidert()) {
      aliensKolidert = true;
    }
  }

  for (let index = 0; index < aliens.length; index++) {
    if (aliensKolidert) {
      aliens[index].snu();
    }
    aliens[index].show();
    aliens[index].update();
  }

  for (let index = aliens.length - 1; index >= 0; index--) {
    for (let indexb = bullets.length - 1; indexb >= 0; indexb--) {
      if (aliens[index].getCenter().dist(bullets[indexb].pos) < 18) {
        //    aliens.splice(index, 1);
        //  bullets.splice(indexb, 1);
        score += 75 + (level * 25);
        aliens[index].skalSlettes = true;
        bullets[indexb].skalSlettes = true;
      }
    }
  }
}

function slettFigurer() {
  for (let indexA = aliens.length - 1; indexA >= 0; indexA--) {
    if (aliens[indexA].skalSlettes) {
      aliens.splice(indexA, 1);
    }
  }

  for (let indexB = bullets.length - 1; indexB >= 0; indexB--) {
    if (bullets[indexB].skalSlettes) {
      bullets.splice(indexB, 1);
    }
  }
}



function draw() {

if (menu) {
  image(menuImage, 0, 0)

} else if (gameover) {
    background(gameoverImage)
  } else {

    rectMode(CENTER);
    background(bakgrunnImage);
    fill(255, 140, 0);
    spiller.show();
    spiller.update();
    if (spiller.isHit()) {
      if (lives === 1 ) {
      gameover = true;
      level = 1;
      score = 0;
      lives = 3;
      setTimeout(setupAliens, 5000)
    } else {
    lives --

  }
}
    drawAliens();
    drawBullets();
    textSize(15);
    fill(255);
    text("Score: " + score, 20, 20);
    text("Level: " + level, 20, 50);
    text("Highscore: " + getHighscore(), 20, 80);
    text("HP: " + lives, 20, 110);
    setHighscore();

    slettFigurer();
    for (let index = aliens.length - 1; index >= 0; index--) {
      aliens[index].show();
      aliens[index].update();
      if (aliens[index].pos.y >= 300) {
        gameover = true;
        level = 1;
        score = 0;
        setTimeout(setupAliens, 5000)
      }
    }
  }
  if (aliens.length == 0) {
    level++;
    setupAliens()
  }

}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    spiller.settHastighet(-2);
  }

  if (keyCode === RIGHT_ARROW) {
    spiller.settHastighet(2);
  }

  if (keyCode === UP_ARROW) {
    if (bullets.length <= 4) {
      bullets.push(new Bullet(spiller.pos.x + 25, spiller.pos.y, 10));
    }
  }

  if (key === ' ') {
    if (menu) {
      menu = false
    }
    spiller.settHastighet(0);
  }
}
