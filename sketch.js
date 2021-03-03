var PLAY = 1;
var END = 0;
var gameState = PLAY;
  
  var monkey , monkey_running;
  var banana ,bananaImage, obstacle, obstacleImage;
  var food,foodGroup,obstacle,obstacleGroup;
  var score;
  var background,backgroundImage;
  
  var score = 0;

  function preload(){

  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  backgroundImage = loadImage ("backgroundi.jpg");
  }
  function setup() {
  createCanvas(600, 300);
    
  background = createSprite(300,150,700,20);
  background.addImage(backgroundImage);

  monkey = createSprite(50,260,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.1;
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  
  invisibleground = createSprite(300,290,700,20);
  invisibleground.visible=false;
  obstacleGroup = new Group();
  bananaGroup = new Group();
  }
  function draw() {
  
  if(gameState === PLAY){
  background.velocityX = -3;
  if (background.x < +100){
  background.x = background.width/2;
  }
  if(keyDown("space")&& monkey.y >= 220) {
  monkey.velocityY = -15;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(invisibleground);
  if(bananaGroup.isTouching(monkey)){
  bananaGroup.destroyEach();
  score=score+2;
  monkey.scale += 0.04;
  }
//   if(obstacleGroup.isTouching(monkey)){
//   monkey.scale=0.1;
//   }


  spawnFood();
  spawnobstacle();

  if(obstacleGroup.isTouching(monkey)){
      gameState = END;
  }
  }

else if (gameState === END) {
      background.velocityX = 0;
      monkey.visible=false;
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      textSize(30);
      text("Game Over!",300,150);
}

  drawSprites();
  fill ("green")
   textSize(20);
   text("score: "+score,500,50);

//   switch(score){
//   case  4 :monkey.scale=0.12;
//         break;
//   case  6 :monkey.scale=0.14;
//         break;
//   case  8 :monkey.scale=0.16;
//         break;
//   case  10 :monkey.scale=0.18;
//         break;
//   default: break;
//   }
//    var survibleTime=0; 
//   stroke("black");
//   textSize(20);
//   fill("black");
//   survibleTime = Math.ceil(frameCount/frameRate());
//   text("survible Time: "+survibleTime,200,50);
  }
  function spawnFood(){
  if (frameCount % 10 === 0) {
  var banana = createSprite(600,120,40,10);
  banana.y = Math.round(random(100,200));
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.velocityX = -5;
  //assign lifetime to the variable
  banana.lifetime = 200;
  bananaGroup.add(banana);
  }}

function spawnobstacle(){
  if (frameCount % 5 === 0) {
   var obstacle = createSprite(600,270,40,10);
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -5;
    obstacle.setCollider("circle",0,0,250);
    //assign lifetime to the variable
    obstacle.lifetime = 200;
    //add each cloud to the group
    obstacleGroup.add(obstacle);
    }}
/*

    
    var trex, trex_running, trex_collided;
    var ground, invisibleGround, groundImage;
    
    var cloudsGroup, cloudImage;
    var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
    
    var score;
    
    var gameOverImg,restartImg
    var jumpSound , checkPointSound, dieSound
    
    
    function preload(){
      trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
      trex_collided = loadAnimation("trex_collided.png");
      
      groundImage = loadImage("ground2.png");
      
      cloudImage = loadImage("cloud.png");
      
      obstacle1 = loadImage("obstacle1.png");
      obstacle2 = loadImage("obstacle2.png");
      obstacle3 = loadImage("obstacle3.png");
      obstacle4 = loadImage("obstacle4.png");
      obstacle5 = loadImage("obstacle5.png");
      obstacle6 = loadImage("obstacle6.png");
      
       restartImg = loadImage("restart.png")
      gameOverImg = loadImage("gameOver.png")
      
      jumpSound = loadSound("jump.mp3")
      dieSound = loadSound("die.mp3")
      checkPointSound = loadSound("checkPoint.mp3")
    }
    
    function setup() {
      createCanvas(600, 500);
      
      trex = createSprite(50,380,20,50);
      trex.addAnimation("running", trex_running);
      trex.addAnimation("collided" ,trex_collided);
      trex.scale = 0.5;
      
      ground = createSprite(200,380,400,20);
      ground.addImage("ground",groundImage);
      ground.x = ground.width /2;
      
       gameOver = createSprite(300,100);
      gameOver.addImage(gameOverImg);
      
      restart = createSprite(300,140);
      restart.addImage(restartImg);
      
      gameOver.scale = 0.5;
      restart.scale = 0.5;
      
      invisibleGround = createSprite(200,390,400,10);
      invisibleGround.visible = false;
      
      //create Obstacle and Cloud Groups
      obstaclesGroup = createGroup();
      cloudsGroup = createGroup();
      
      console.log("Hello" + 5);
      
      trex.setCollider("circle",0,0,40);
      trex.debug = true
      
      score = 0;
      
    }
    
    function draw() {
      
      background(180);
      //displaying score
      text("Score: "+ score, 500,50);
      
      console.log("this is ",gameState)
      
      
      if(gameState === PLAY){
        gameOver.visible = false
        restart.visible = false
        //move the ground
        ground.velocityX = -4;
        //scoring
        score = score + Math.round(getFrameRate()/60);
        
        if (ground.x < 0){
          ground.x = ground.width/2;
        }
        
        //jump when the space key is pressed
        if(keyDown("space")&& trex.y >= 362) {
            trex.velocityY = -12;
        }
        
        //add gravity
        trex.velocityY = trex.velocityY + 0.8
      
        //spawn the clouds
        spawnClouds();
      
        //spawn obstacles on the ground
        spawnObstacles();
        

      }
       else if (gameState === END) {
         console.log("hey")
          gameOver.visible = true;
          restart.visible = true;
         
          ground.velocityX = 0;
          trex.velocityY = 0
         
          //change the trex animation
          trex.changeAnimation("collided", trex_collided);
         
         obstaclesGroup.setVelocityXEach(0);
         cloudsGroup.setVelocityXEach(0);
         
              obstaclesGroup.setLifetimeEach(-1);
         cloudsGroup.setLifetimeEach(-1);
       }
      
     
      //stop trex from falling down
      trex.collide(invisibleGround);
      
      
      
      drawSprites();
    }
    
    function spawnObstacles(){
     if (frameCount % 60 === 0){
       var obstacle = createSprite(400,365,10,40);
       obstacle.velocityX = -6;
       
        //generate random obstacles
        var rand = Math.round(random(1,6));
        switch(rand) {
          case 1: obstacle.addImage(obstacle1);
                  break;
          case 2: obstacle.addImage(obstacle2);
                  break;
          case 3: obstacle.addImage(obstacle3);
                  break;
          case 4: obstacle.addImage(obstacle4);
                  break;
          case 5: obstacle.addImage(obstacle5);
                  break;
          case 6: obstacle.addImage(obstacle6);
                  break;
          default: break;
        }
       
        //assign scale and lifetime to the obstacle           
        obstacle.scale = 0.5;
        obstacle.lifetime = 500;
       
       //add each obstacle to the group
        obstaclesGroup.add(obstacle);
     }
    }
    
    function spawnClouds() {
      //write code here to spawn the clouds
      if (frameCount % 60 === 0) {
        var cloud = createSprite(600,300,40,10);
        cloud.addImage(cloudImage)
        cloud.y = Math.round(random(280,320))
        cloud.scale = 0.4;
        cloud.velocityX = -3;
        
        //assign lifetime to the variable
        cloud.lifetime = 134;
        
        //adjust the depth
        cloud.depth = trex.depth
        trex.depth = trex.depth + 1;
        
        //add each cloud to the group
        cloudsGroup.add(cloud);
        }
    }
    
    */