var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var life = 5;
var score = 0;
const screenWidth = 1000;
const screenHeight = 500;

class GameCharacter {
  constructor(x, y, width, height, color, speed) {

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speed = speed;
    this.maxSpeed = 4;
  }
  moveVertical() {
    if (this.y > screenHeight - 100 || this.y < 50) {
      this.speed = -this.speed;
    }
    this.y += this.speed;
  }

  moveHorizontal() {
    if (this.x > screenWidth - 100 || this.x < 50) {
      this.speed = -this.speed;
    }
    this.x += this.speed;
  }
}

var enemy = [];
enemy.push(new GameCharacter(200, 200, 30, 30, "yellow", 1));
enemy.push(new GameCharacter(500, 100, 30, 30, "yellow", 2));
enemy.push(new GameCharacter(800, 300, 30, 30, "yellow", 1));
var player = new GameCharacter(50, 225, 30, 30, "white", 0);
var goal = new GameCharacter(950, 200, 50, 100, "black", 0);
var sprites = {};

var loadSprites = function() {
  sprites.player = new Image();
  sprites.player.src = "hero.png";

  sprites.enemy = new Image();
  sprites.enemy.src = "enemy.png";

  sprites.goal = new Image();
  sprites.goal.src = "chest.png";

  sprites.canvas = new Image();
  sprites.canvas.src = "floor.png";
  sprites.life = new Image();
  sprites.life.src = "life.png";
}


document.onkeydown = function(event) {
  let keyPressed = event.keyCode;
  if (keyPressed == 39 && player.speed < player.maxSpeed) {
    player.speed = player.maxSpeed;
  } else if (keyPressed == 37 && player.speed < player.maxSpeed) {
    player.speed = -player.maxSpeed;
  }
}

document.onkeyup = function(event) {
  player.speed = 0;
}

var checkCollisions = function(rect1, rect2) {
  var xOverlap = Math.abs(rect1.x - rect2.x) <= Math.max(rect1.width, rect2.width);
  var yOverlap = Math.abs(rect1.y - rect2.y) <= Math.max(rect1.height, rect2.height);
  return xOverlap && yOverlap;
}

var draw = function() {
  ctx.clearRect(0, 0, screenWidth, screenHeight)
  ctx.drawImage(sprites.canvas, 0, 0);
  ctx.drawImage(sprites.player, player.x, player.y);
  ctx.drawImage(sprites.goal, goal.x, goal.y);
    for (var i = 0; i < enemy.length; i++) {
    ctx.drawImage(sprites.enemy, enemy[i].x, enemy[i].y);
  }

  for (var i = 0; i < life; i++) {
  ctx.drawImage(sprites.life, 40 +(40*i),40,20,20);
}


}


var update = function() {
  enemy.forEach(function(element) {
    if (checkCollisions(player, element)) {
      player.x = 100;
      life--;
      player.maxSpeed = 4;
      if (life <= 0) {
        alert("Gameover - score:" + score)
        score = 0;
        life = 5;
        enemy[0].speed = 1;
        enemy[1].speed = 2;
        enemy[2].speed = 1;
        player.speed = 0;

      }
    }
    element.moveVertical();
  })
  if (checkCollisions(player, goal)) {
    player.x = 100;
    score++;
    player.maxSpeed++;

    enemy.forEach(function(element) {
      if (element.speed > 0) {
        element.speed++;
      } else {
        element.speed--;
      }

    })

  }
  player.moveHorizontal();

}

var step = function() {
  update();
  draw();
  window.requestAnimationFrame(step)
}

loadSprites();
step();
