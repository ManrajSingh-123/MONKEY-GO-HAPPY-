
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score=0;
var PLAY=1;
var END=0;
var gameState= PLAY;

var GameOver= "NICE TRY, BUT FRODO IS ASKING MORE BREE!!!"
var survivalTime=0;

function preload(){
    
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
    createCanvas(600,400);
   ground=createSprite(400,350,900,10);
  ground.velocityX=-5;
  ground.x=ground.width/2;
  
  console.log(ground.x);
  
 //creating monkey
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  //creating banana & obstacle group
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  invisibleGround = createSprite(400,360,900,10);
  invisibleGround.visible = false;

  
monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false;
  
  
}


function draw() {
  if(survivalTime%20>10) {
    background("#008080");
  }
  else{
     background("skyblue");
  }

  
  if(keyDown("space") && monkey.y>200) {
    monkey.velocityY=-10;
     
     }
  
  //gravity
  monkey.velocityY=monkey.velocityY+0.8;
  
  //reseting ground
  
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  spawnObstacle();
  food();
  
  if(gameState===PLAY) {
    GameOver.visible=false;
    
    if(bananaGroup.isTouching(monkey)){
        survivalTime=survivalTime+2;
      bananaGroup.destroyEach();
    
      
    }
    
    if(obstacleGroup.isTouching(monkey)) {
       gameState=END; 
      obstacleGroup.destroyEach();
     
       }
      
  }
  
  if(gameState===END) {
    GameOver.visible=true;
    ground.velocityX=0;
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    
     if(keyDown("space") || keyDown(13)){
        reset();
        }
  
  
   stroke("black");
    textSize(20);
    fill("black");
    textFont("Comic Sans MS");
    text("Gameover: " + GameOver,10,200);

    
  }

  
  stroke("black");
  textSize(20);
  fill("black");
  
  text("Survival Time: " + survivalTime,200,50);

  monkey.collide(invisibleGround);
  
  drawSprites();

 
}


function reset(){
   gameState=PLAY;
  GameOver.visible=false;
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  survivalTime=0;
  monkey.changeAnimation("moving",monkey_running);
  
}

function food() {
  if(World.frameCount%80==0) {
    
    
  banana = createSprite(300,130,20,20);
  banana.addImage(bananaImage); 
  banana.scale=0.1;
  banana.y = Math.round(random(120,200));
  banana.velocityX=-5;
  banana.lifetime=150;
    
    bananaGroup.add(banana);
  }
}


function spawnObstacle() {
  
   if(World.frameCount%60==0){
    obstacle = createSprite(400,330,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityX=-5;
    obstacle.lifetime=150;
    obstacleGroup.add(obstacle);

  }
}



