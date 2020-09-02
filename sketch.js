var monkey, ground, banana, obstacleGroup, survivalTime, bananaGroup, monkeyImg, bananaImg, bg;

function preload(){
monkeyImg=loadAnimation("Sprites/Monkey1.png","Sprites/Monkey2.png","Sprites/Monkey3.png","Sprites/Monkey4.png","Sprites/Monkey5.png","Sprites/Monkey6.png","Sprites/Monkey7.png","Sprites/Monkey8.png","Sprites/Monkey9.png")
  bananaImg=loadImage("Sprites/banana.png")
  obstacleImg=loadImage("Sprites/stone.png")
  bgImg=loadImage("Sprites/bg.jpg")
}

function setup(){
bg = createSprite(200,200,400,400)
monkey= createSprite(70,300,20,20)
ground = createSprite(200,380,400,2)

bananaGroup = createGroup()
obstacleGroup = createGroup()
survivalTime=0 

monkey.addAnimation("monkeyWalk",monkeyImg)

monkey.scale=0.15
}


function draw() {

  
  background(255);
  
  createEdgeSprites()

  bg.velocityX=-2

  //bg.x=bg.width/10;
 console.log(bg.x)
 if(bg.x == -30){
bg.x=200
 }
  
  monkey.velocityY=monkey.velocityY+0.8;
  
  monkey.collide(ground)

  
  ground.velocityX=-3
  
  //obstacleGroup.collide(monkey);
  
  if (ground.x < 200){
      ground.x = ground.width/2;
  }
  
  if (keyDown("space") && monkey.y>200){
    monkey.velocityY=-12
  }
  if(bananaGroup.isTouching(monkey)){
    monkey.scale=monkey.scale+0.05
  }
  if(obstacleGroup.isTouching(monkey)){
    monkey.scale=monkey.scale-0.1
    obstacleGroup.destroyEach()
  }
  bg.addImage(bgImg)
  
  
  if (World.frameCount%80===0){
    banana = createSprite(500,random(200,300),20,20)
    banana.velocityX=-6
    //banana.setAnimation("Banana")
    banana.scale=0.05
    bananaGroup.add(banana)
    banana.addImage(bananaImg)
    banana.lifetime=Math.round(500/3);
  }
  if (World.frameCount%300==0){
  obstacle = createSprite(500,360,20,20)
  obstacle.velocityX=-6
  
  obstacle.scale=0.12
  obstacleGroup.add(obstacle)
  obstacle.addImage(obstacleImg)
  obstacle.lifetime=Math.round(500/3);
  obstacle.collide(ground)
  }
  //survivalTime=survivalTime+Math.round(World.frameRate/65);
  if(World.frameCount%15===0){
    survivalTime++
  }
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach()
  }
  
 

  drawSprites() 
  
  text("Survival Time: "+survivalTime,280,50)
  
}
