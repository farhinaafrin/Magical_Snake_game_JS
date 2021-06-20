const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 900;
let gameFrame1 = 0;
let gameFrame2 = 0;
let gameFrame3 = 0;
const portion1 = [];
const portion2 = [];
const portion3 = [];
const portion4 = [];
let xVelocity = 0;
let yVelocity = 0;
let inputsXVelocity = 0;
let inputsYVelocity = 0;
const tileCount = 30;
const snakeArray = [];
let headX = 10;
let headY = 10;
const wi = 30;
let tailLength = 2;
let gameOver = false;
let Score = 0;
let color = "rgb(0, 128, 128)";
let speed = 12;
let tileSize = canvas.width / tileCount - 5;

///score
function score() {
  ctx.fillStyle = "rgb(0, 128, 128)";
  ctx.font = "30px sans-serif";
  ctx.fillText("Score:" + Score, 30, 50);
  if (gameOver) {
    ctx.fillStyle = "rgb(0, 128, 128)";
    ctx.font = "60px sans-serif";
    ctx.fillText("Game Over !!", 280, canvas.height / 2);
  } else if (Score == 10) {
    ctx.fillStyle = "rgb(0, 128, 128)";
    ctx.font = "60px sans-serif";
    ctx.fillText("You Win!!", 280, canvas.height / 2);
    gameOver = true;
  }
}

//portions

const portionimage1 = new Image();
portionimage1.src = "./images/potions2.png";
const portionimage2 = new Image();
portionimage2.src = "./images/potions51.png";
const portionimage3 = new Image();
portionimage3.src = "./images/potions7.png";
class Portion {
  constructor(image) {
    this.width = 40;
    this.height = 40;
    this.x = Math.random() * (canvas.width - 150);
    this.y = Math.random() * (canvas.height - 150);
    this.image = image;
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  update() {}
}

function handlePortion() {
  if (gameFrame1 % 100 === 0) {
    portion1.push(new Portion(portionimage1));
  }
  for (let i = 0; i < portion1.length; i++) {
    portion1[i].draw();
  }

  if (gameFrame2 % 300 === 0) {
    portion2.push(new Portion(portionimage2));
  }
  for (let i = 0; i < portion2.length; i++) {
    portion2[i].draw();
    setTimeout(function () {
      portion2.splice(i, 1);
    }, 5000);
  }

  if (gameFrame3 % 200 === 0) {
    portion3.push(new Portion(portionimage3));
  }
  for (let i = 0; i < portion3.length; i++) {
    portion3[i].draw();
    setTimeout(function () {
      portion3.splice(i, 1);
    }, 6000);
  }
}

//player
class snakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
function drawSnake() {
  ctx.fillStyle = color;
  for (let i = 0; i < snakeArray.length; i++) {
    let part = snakeArray[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }

  snakeArray.push(new snakePart(headX, headY));
  while (snakeArray.length > tailLength) {
    snakeArray.shift();
  }
  ctx.fillStyle = "rgb(0, 128, 128)";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}
function changeSnakePosition() {
  headX = headX + xVelocity;
  headY = headY + yVelocity;
}
document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
  if (event.keyCode == 38) {
    if (inputsYVelocity == 1) return;
    inputsYVelocity = -1;
    inputsXVelocity = 0;
  }

  if (event.keyCode == 40) {
    if (inputsYVelocity == -1) return;
    inputsYVelocity = 1;
    inputsXVelocity = 0;
  }

  if (event.keyCode == 37) {
    if (inputsXVelocity == 1) return;
    inputsYVelocity = 0;
    inputsXVelocity = -1;
  }

  if (event.keyCode == 39) {
    if (inputsXVelocity == -1) return;
    inputsYVelocity = 0;
    inputsXVelocity = 1;
  }
}

function getColorCode() {
  var makeColorCode = "0123456789ABCDEF";
  var code = "#";
  for (var count = 0; count < 6; count++) {
    code = code + makeColorCode[Math.floor(Math.random() * 16)];
  }
  color = code;
}
//colltion
function collision() {
  for (let i = 0; i < portion1.length; i++) {
    if (
      (Math.floor(portion1[i].x / wi) === headX &&
        Math.floor(portion1[i].y / wi) === headY) ||
      (Math.floor((portion1[i].x + 40) / wi) === headX &&
        Math.floor((portion1[i].y + 40) / wi) === headY) ||
      (Math.floor((portion1[i].x + 40) / wi) === headX &&
        Math.floor(portion1[i].y / wi) === headY) ||
      (Math.floor(portion1[i].x / wi) === headX &&
        Math.floor((portion1[i].y + 40) / wi) === headY) ||
      (Math.floor((portion1[i].x + 20) / wi) === headX &&
        Math.floor((portion1[i].y + 20) / wi) === headY) ||
      (Math.floor((portion1[i].x + 20) / wi) === headX &&
        Math.floor(portion1[i].y / wi) === headY) ||
      (Math.floor(portion1[i].x / wi) === headX &&
        Math.floor((portion1[i].y + 20) / wi) === headY)
    ) {
      portion1.splice(i, 1);
      Score++;
      tailLength++;
    }
  }
  for (let i = 0; i < portion2.length; i++) {
    if (
      (Math.floor(portion2[i].x / wi) === headX &&
        Math.floor(portion2[i].y / wi) === headY) ||
      (Math.floor((portion2[i].x + 40) / wi) === headX &&
        Math.floor((portion2[i].y + 40) / wi) === headY) ||
      (Math.floor((portion2[i].x + 40) / wi) === headX &&
        Math.floor(portion2[i].y / wi) === headY) ||
      (Math.floor(portion2[i].x / wi) === headX &&
        Math.floor((portion2[i].y + 40) / wi) === headY) ||
      (Math.floor((portion2[i].x + 20) / wi) === headX &&
        Math.floor((portion2[i].y + 20) / wi) === headY) ||
      (Math.floor((portion2[i].x + 20) / wi) === headX &&
        Math.floor(portion2[i].y / wi) === headY) ||
      (Math.floor(portion2[i].x / wi) === headX &&
        Math.floor((portion2[i].y + 20) / wi) === headY)
    ) {
      portion2.splice(i, 1);
      gameOver = true;
    }
  }
  for (let i = 0; i < portion3.length; i++) {
    if (
      (Math.floor(portion3[i].x / wi) === headX &&
        Math.floor(portion3[i].y / wi) === headY) ||
      (Math.floor((portion3[i].x + 40) / wi) === headX &&
        Math.floor((portion3[i].y + 40) / wi) === headY) ||
      (Math.floor((portion3[i].x + 40) / wi) === headX &&
        Math.floor(portion3[i].y / wi) === headY) ||
      (Math.floor(portion3[i].x / wi) === headX &&
        Math.floor((portion3[i].y + 40) / wi) === headY) ||
      (Math.floor((portion3[i].x + 20) / wi) === headX &&
        Math.floor((portion3[i].y + 20) / wi) === headY) ||
      (Math.floor((portion3[i].x + 20) / wi) === headX &&
        Math.floor(portion3[i].y / wi) === headY) ||
      (Math.floor(portion3[i].x / wi) === headX &&
        Math.floor((portion3[i].y + 20) / wi) === headY)
    ) {
      portion3.splice(i, 1);
      Score++;
      speed = speed + 5;
      getColorCode();
    }
  }
}

function over() {
  if (headX < 0 || headX >= 30 || headY < 0 || headY >= 30) {
    gameOver = true;
  }
}
///animation
function animation() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  xVelocity = inputsXVelocity;
  yVelocity = inputsYVelocity;
  drawSnake();
  changeSnakePosition();

  handlePortion();
  collision();
  over();
  score();
  gameFrame1++;
  gameFrame2++;
  gameFrame3++;
  if (!gameOver) setTimeout(animation, 1000 / speed);
}
animation();

window.addEventListener("resize", function () {
  canvasPosition = canvas.getBoundingClientRect();
});
