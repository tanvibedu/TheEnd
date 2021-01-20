var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var girls, girl1, boy2, girl3, girl4;
var girl1Image, boy2Image, girl3Image, girl4Image;
var trackImage;

function preload () {
girl1Image = loadImage("../images/1.jpg");
boy2Image = loadImage("../images/2.jpg");
girl3Image = loadImage("../images/3.jpg");
girl4Image = loadImage("../images/4.png");

trackImage = loadImage("../images/track.jpg");


}

function setup(){
  
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    gameState.end();
  }

}
