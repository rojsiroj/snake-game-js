const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// listen keydown
document.addEventListener("keydown", detectDirection);

// initiate direction
let direction;

// initiate high score
let highScore = localStorage.getItem("highScore") || 0;

// import img
const imgGround = new Image();
imgGround.src = "img/ground.png";
const imgFood = new Image();
imgFood.src = "img/food.png";

// import audio
const audNabrak = new Audio();
audNabrak.src = "audio/mati.mp3";
const audMakan = new Audio();
audMakan.src = "audio/makan.mp3";
const audAtas = new Audio();
audAtas.src = "audio/atas.mp3";
const audBawah = new Audio();
audBawah.src = "audio/bawah.mp3";
const audKanan = new Audio();
audKanan.src = "audio/kanan.mp3";
const audKiri = new Audio();
audKiri.src = "audio/kiri.mp3";

// initiate box
let box = 32; //32 px
const totalColumn = 17;
const marginColumn = 1;
const totalRow = 15;
const marginRow = 3;

// initiate snake array
let snake = [];
snake[0] = {
  x: Math.ceil(totalColumn / 2) * box,
  y: Math.ceil(totalRow / 2) * box,
};

// initiate food object
let food = initiateFood();

// initiate score
let score = 0;

// inititate draw function
function draw() {
  ctx.drawImage(imgGround, 0, 0);

  // draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "green" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    // border
    ctx.strokeStyle = "red";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  //   show food
  ctx.drawImage(imgFood, food.x, food.y);

  //   show score
  ctx.fillStyle = "white";
  ctx.font = "30px Helvetica";
  ctx.fillText(score, 2.2 * box, 1.5 * box);

  //   filter highScore
  if (score > highScore) {
    localStorage.setItem("highScore", score);
  }
  //   show high score
  ctx.fillText(highScore, 5.2 * box, 1.5 * box);

  //   SET SNAKE HEAD BY DIRECTION
  let snakeHeadX = snake[0].x;
  let snakeHeadY = snake[0].y;

  if (direction === "LEFT") snakeHeadX -= box;
  if (direction === "UP") snakeHeadY -= box;
  if (direction === "RIGHT") snakeHeadX += box;
  if (direction === "DOWN") snakeHeadY += box;

  // Snake eat food
  if (snakeHeadX === food.x && snakeHeadY === food.y) {
    audMakan.play();
    score++;
    food = initiateFood();
  } else {
    snake.pop();
  }

  // Set new snake head direction
  let newHead = {
    x: snakeHeadX,
    y: snakeHeadY,
  };

  // Game over
  if (
    snakeHeadX < box ||
    snakeHeadX > totalColumn * box ||
    snakeHeadY < marginRow * box ||
    snakeHeadY > totalColumn * box ||
    eatSelf(newHead, snake)
  ) {
    audNabrak.play();
    clearInterval(game);
  }

  snake.unshift(newHead);
}

// set interval
let game = setInterval(draw, 100);

// methods
function detectDirection(event) {
  if (event.keyCode === 37 && direction !== "RIGHT") {
    audKiri.play();
    direction = "LEFT";
  } else if (event.keyCode === 38 && direction !== "DOWN") {
    audAtas.play();
    direction = "UP";
  } else if (event.keyCode === 39 && direction !== "LEFT") {
    audKanan.play();
    direction = "RIGHT";
  } else if (event.keyCode === 40 && direction !== "UP") {
    audBawah.play();
    direction = "DOWN";
  }
}

function initiateFood() {
  return {
    x: Math.floor(Math.random() * totalColumn + marginColumn) * box,
    y: Math.floor(Math.random() * totalRow + marginRow) * box,
  };
}

function eatSelf(head, body) {
  for (let i = 0; i < body.length; i++) {
    if (head.x === body[i].x && head.y === body[i].y) {
      return true;
    }
  }
  return false;
}
