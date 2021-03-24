var trex,ground,clouds,obstacle,trex_running,trex_collided,ground_image,cloud_image,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,invisibleGround,cloud,cloud_image,gameOver,gameOver_image,restart,restart_image,obstacleGroup,cloudGroup;
localStorage["highest score"]=0
var distance=0
var PLAY=0;
var END=1;
var gameState=0;
var score=0;
var time=60
function preload()
{
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided=loadAnimation("trex_collided.png");
  ground_image=loadImage("ground2.png");
  cloud_image=loadImage("cloud.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  restart_image=loadImage("restart.png");
  gameOver_image=loadImage("gameOver.png");
}
function setup() {
  createCanvas(600, 200);
  trex=createSprite(50,150,20,30);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collided",trex_collided);
  ground=createSprite(300,180,600,20);
  ground.addImage(ground_image);
  invisibleGround=createSprite(300,190,600,20);
  obstacleGroup=createGroup();
  cloudGroup=createGroup();
  //restart=createSprite(300,100,20,20);
 // restart.addImage(restart_image)
 // restart.scale=0.5;
 restart=createSprite(camera.position.x,100,20,20);
 restart.addImage(restart_image)
 restart.scale=0.5;
 restart.visible=false
  trex.scale=0.5;
  invisibleGround.visible=false;
}

function draw() {
  background(180);
  drawSprites();
  //text("distance: "+distance,camera.position.x,100)
  restart.x=camera.position.x
  camera.position.x=trex.x
  textSize(20)
  stroke("black")
  text("SURVIVE FOR : "+time+"seconds",camera.position.x,100)
  text("score: "+score,550,20);
  if (gameState===PLAY)
    {
      if(frameCount%30===0){
        time=time-1
      }
      if(time<=0){
        gameState=END
      }
      if(keyDown ("space")&&trex.y>150)
    {
      trex.velocityY=-10;
    }
    if(keyDown(RIGHT_ARROW)){
      trex.x=trex.x+10
      distance=distance+10
    }
      if(distance!=0&&distance%600===0){
        //ground.width=ground.width+600
        ground.x=ground.x+600
       // invisibleGround.width=invisibleGround.width+600
        invisibleGround.x=invisibleGround.x+600
      }
      //ground.velocityX=-(4+3*score/100);
      spawnClouds();
      spawnObstacles();
      score=score + Math.round(getFrameRate()/60);
      
    }
  
  trex.velocityY=trex.velocityY+0.5;
  trex.collide(ground);
  invisibleGround.x=ground.x
  
  /*if(ground.x<0)
    {
      ground.x=ground.width/2;
    }*/
  if(obstacleGroup.isTouching(trex))
    {
      gameState=END;
      
    }
  if(gameState===END)
    {
     restart.visible=true
     
    //gameOver.visible=true;
      ground.velocityX=0;
      trex.velocityY=0;
      obstacleGroup.setVelocityXEach(0);
      cloudGroup.setVelocityXEach(0);
      obstacleGroup.setLifetimeEach(-1);
      cloudGroup.setLifetimeEach(-1);
      trex.changeAnimation("collided",trex_collided);
      
    }
  if(mousePressedOver(restart))
    {
      
      reset();
    }
}
function spawnClouds()
{
  if(World.frameCount%80===0)
    {
     cloud = createSprite(600,50,20,20);
      var rand = random(60,120);
      cloud.y=rand;
     cloud.scale=0.5;
     cloud.velocityX=-4;
     cloud.lifetime=150;
     cloud.addImage(cloud_image);
      cloud.depth=trex.depth;
      trex.depth=trex.depth+1;
      cloudGroup.add(cloud);
    }
}
function spawnObstacles()
{
  if(World.frameCount%80===0)
    {
      obstacle = createSprite(trex.x+500,165,20,20);
      var r = Math.round(random(1,6));
      switch(r){
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
      
      obstacle.scale=0.5;
      //obstacle.velocityX=-(4+3*score/100);
      obstacle.lifetime=600;
      obstacle.depth=trex.depth;
      obstacle.depth=obstacle.depth+1;
      obstacleGroup.add(obstacle);
    }
}
function reset()
{
  gameState=PLAY;
  trex.changeAnimation("running",trex_running);
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  restart.visible=false
  
  distance=0
  ground.x=300
  trex.x=50
  //gameOver.destroy()
  if(localStorage["highest score"]<score)
    {
      localStorage["highest score"]=score;
      console.log(localStorage["highest score"])
}
}
