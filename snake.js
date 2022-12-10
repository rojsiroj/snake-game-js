const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// import img ground
const ground = new Image();
ground.src = "img/ground.png";

// import audio
const nabrak = new Audio();
nabrak.src = "audio/mati.mp3";
const makan = new Audio();
makan.src = "audio/makan.mp3";
const atas = new Audio();
atas.src = "audio/atas.mp3";
const bawah = new Audio();
bawah.src = "audio/bawah.mp3";
const kanan = new Audio();
kanan.src = "audio/kanan.mp3";
const kiri = new Audio();
kiri.src = "audio/kiri.mp3";

// initiate box
let box = 32;

// initiate snake array
let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};

// initiate food object
let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
};

// initiate score
let score = 0;

// inititate draw function
function draw() {
  ctx.drawImage(ground, 0, 0);
}

// set interval
let game = setInterval(draw, 100);
