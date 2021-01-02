var PLAY = 1;
var END = 0;
var gameState = PLAY;

var car
var ground
var score=0;
var backgroundImg

var gameOver, gameOverImg;
var restart, restartImg

localStorage["HighestScore"] = 0;

function preload(){

    backgroundImg=loadImage("Race track.jpg")

  gameOverImg = loadImage("GameOver.png");
  restartImg = loadImage("resetjpg");

  carImg=loadImage("car.png")
  cone=loadImage("cone.jpg")

    
 }

function setup() {
  createCanvas(1600, 800);
  
  car = createSprite(100,800,40,40);
  car.addImage(carImg);
  car.scale = 0.5
 
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(800,860,10000,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
}

function draw() {

  background(38,38,38);
  image(backgroundImg, 400, 0, 3200, 1200)

  text("Score: "+ score, 1520,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
  
    if(keyDown("space") && car.y >= 159) {
      car.velocityY = -12;
    }
    car.velocityY = car.velocityY + 0.8
    car.velocityX = 6;
 
    camera.position.x = car.position.x
    camera.position.y = car.position.y
  
  
    car.collide(invisibleGround);
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(car)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
   
    ground.velocityX = 0;
    car.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}


function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(3000,830,50,20);
    obstacle.addImage(cone);
    obstacle.velocityX = -15
    obstacle.scale = 0.08;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}