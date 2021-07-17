var database;
var back_img;

var gameState = 0;
var playerCount = 0;
var allPlayers;

var player, form,game;
var player1,player2;
var players;

var enemies;
var enemyGroup;
var enemy1_img, enemy2_img, enemy3_img, enemy4_img;

var player_img;

var bullets, bulletGroup, bulletImg;

function preload(){
  back_img = loadImage("new/background.jpg");

  player1_img = loadImage("new/Player2.png");
  player2_img = loadImage("new/Player1.gif");

  bulletImg = loadImage("new/Bullet.png");

  enemy1_img = loadImage("new/eleins1.png");
  enemy2_img = loadImage("new/zombie1.gif");
  enemy3_img = loadImage("new/eleins2.png");
  enemy4_img = loadImage("new/zombie2.gif");

  enemyGroup = new Group();
  bulletGroup = new Group();
}

function setup() {
  createCanvas(1000, 600);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  background(back_img);
  
   if (playerCount === 2) {
     game.update(1);
   }
   if (gameState === 1) {
     clear(); 
     game.play();
   }
   if (gameState === 2) {
     game.end();
   }
   
}