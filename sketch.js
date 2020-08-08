var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var gameover,restart,gameoverimg,restartimg;


var trex,trexrunning,trexcolide;
var ground,invisibleground,groundImage;
var cloudgroup,cloudimage;
var obstaclesgroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var count = 0;
function preload (){
  
trexrunning = loadAnimation("trex1.png","trex3.png","trex4.png");
trexcolide = loadImage("trex_collided.png");
groundImage = loadImage("ground2.png");

cloudimage=loadImage("cloud.png");
obstacle1=loadImage("obstacle1.png");
obstacle2=loadImage("obstacle2.png");
obstacle3=loadImage("obstacle3.png");
obstacle4=loadImage("obstacle4.png");
obstacle5 = loadImage("obstacle5.png");
obstacle6 = loadImage("obstacle6.png");

gameoverimg = loadImage("gameOver.png");
restartimg = loadImage("restart.png");

}

function setup() {
createCanvas(600,200);
  
trex = createSprite(50,180,20,50);  
trex.addAnimation("running",trexrunning);
trex.scale = 0.5;
trex.addAnimation("colide",trexcolide);

ground = createSprite( 200,180,400,20);
ground.addImage("ground",groundImage); 

invisibleground = createSprite(200,185,400,5);
invisibleground.visible = false;

cloudgroup = new Group();
obstaclesgroup = new Group();

var gameover = createSprite(200,300);
    var restart = createSprite(200,340);
    
    gameover.addImage("gameOver",gameoverimg);
    gameover.scale = 0.5;
    restart.addImage("restart",restartimg);
    restart.scale = 0.5;
    gameover.visible = false;
    restart.visible = false;

}

function draw() {
  background(220);
  text("Score: "+ count, 500, 50);

if(gamestate === PLAY){
  count = count + Math.round(getFrameRate()/60);
  if(keyDown("space")){
    trex.velocityY=-10;
  }

  trex.velocityY = trex.velocityY + 0.8;

  ground.velocityX = -5;

  if(ground.x<0){
    ground.x = ground.width/2;
  }

  spawnclouds();
  spawnObstacles();

  if(obstaclesgroup.isTouching(trex)){
    //playSound("die.mp3");
     gameState = END;
  }
}

else if(gamestate === END) {
  //set velcity of each game object to 0
  ground.velocityX = 0;
  trex.velocityY = 0;
  obstaclesgroup.setVelocityXEach(0);
  cloudsgroup.setVelocityXEach(0);
  
  gameover.visible = true;
  restart.visible = true;
  
  //change the trex animation
  trex.changeAnimation("colide",trexcolide);
  
  //set lifetime of the game objects so that they are never destroyed
  obstaclesgroup.setLifetimeEach(-1);
  cloudsgroup.setLifetimeEach(-1);
  
 
  
}
 if (mousePressedOver(restart)) {
 reset();   
  }



  
  

  trex.collide(invisibleground);

  

  drawSprites();
}

function reset(){ 
  gamestate = PLAY;
  obstaclesgroup.destroyEach();
  cloudsgroup.destroyEach();
  gameover.visible = false;
  restart.visible = false;
  count = 0;
  }

function spawnclouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage("cloud",cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 600/3;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudgroup.add(cloud);
  }
  
}
    

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -(6);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
    case 1:obstacle.addImage(obstacle1);
            break;
    case 2:obstacle.addImage(obstacle2);
            break;
    case 3:obstacle.addImage(obstacle3);
            break;
    case 4:obstacle.addImage(obstacle4);
            break;
    case 5:obstacle.addImage(obstacle5);
            break;
    case 6:obstacle.addImage(obstacle6);
            break;
    default:break;
      
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 600/6;
    //add each obstacle to the group
    obstaclesgroup.add(obstacle);
  }
}
