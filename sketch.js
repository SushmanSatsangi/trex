var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudImg;
var obstacle, obstacle1Img, obstacle2Img, obstacle3Img, obstacle4Img, obstacle5Img, obstacle6Img;
var rand;
var score;
var cloudsGroup, obstaclesGroup;
var gameState, PLAY, END;
var game_over,game_overImg,restart,restartImg;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
  
  cloudImg = loadImage("cloud.png");
  
  obstacle1Img = loadImage("obstacle1.png");
  obstacle2Img = loadImage("obstacle2.png");
  obstacle3Img = loadImage("obstacle3.png");
  obstacle4Img = loadImage("obstacle4.png");
  obstacle5Img = loadImage("obstacle5.png");
  obstacle6Img = loadImage("obstacle6.png");
  
  trex_collided = loadAnimation("trex_collided.png");
  
  game_overImg = loadImage("gameOver.png");
  
  restartImg = loadImage("restart.png");
  
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided); 
  trex.scale = 0.5;
  trex.setCollider("circle",0,0,40);
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  score = 0;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  PLAY = 1;
  END = 0;
  
  gameState = PLAY;
  
  game_over = createSprite(300, 100 );
    game_over.addImage(game_overImg);
    game_over.scale = 0.5;
    
    restart = createSprite(300, 140);
    restart.addImage(restartImg);
    restart.scale = 0.5;
  
  game_over.visible = false;
  restart.visible = false;
}

function draw() {
  background(0);

  if(gameState === PLAY) {
    spawnClouds();
  
  spawnObstacles();
    
  ground.velocityX = -2;
    
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  if(obstaclesGroup.isTouching(trex)) {
    gameState = END;
  }
  
  score = score+Math.round(getFrameRate()/60);
  }
  
  else if(gameState === END) {
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0); 
    trex.changeAnimation("collided", trex_collided);
    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    trex.velocityY = 0; 
    game_over.visible = true;
    restart.visible = true;
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  text("Score:" + score, 490, 50);
  
  trex.collide(invisibleGround);
  
  drawSprites();
}

function spawnClouds() {
  if(frameCount % 60 === 0) {
    cloud = createSprite(600, 120, 30, 20);
    cloud.addImage(cloudImg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.lifetime = 200;
    cloud.y = Math.round(random(80,120));
    trex.depth = cloud.depth;
    trex.depth = trex.depth+1;
    
    cloudsGroup.add(cloud);
  }
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    obstacle = createSprite(600, 170, 10,20);
    obstacle.scale = 0.5;
    obstacle.velocityX = -3;
    
    rand = Math.round(random(1,6));
  
    switch(rand) {
      case 1 : obstacle.addImage(obstacle1Img);
      break;
      
      case 2: obstacle.addImage(obstacle2Img);
      break;
      
      case 3: obstacle.addImage(obstacle3Img);
      break;
      
      case 4: obstacle.addImage(obstacle4Img);
      break;
      
      case 5 : obstacle.addImage(obstacle5Img);
      break;
      
      case 6 : obstacle.addImage(obstacle6Img);
      break;
      
      default:break;
      
      
    }
    
    obstacle.lifetime = 200;
    
    obstaclesGroup.add(obstacle);
  }
}

function reset() {
  gameState = PLAY;
  game_over.visible = false;
  restart.visible = false;
  cloudsGroup.destroyEach();
  obstaclesGroup.destroyEach();
  score = 0; 
  trex.changeAnimation("running", trex_running);
}