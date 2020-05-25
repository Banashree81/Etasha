var snailAnim, beeAnim, fishAnim;
var birthdayImg, targetImg;
var adu, etasha, aduImg, etashaImg;
var HBDSound, laughSound;
var score=0;

var gameState = "start";

var targetGroup, aduGroup;

function preload(){
  
  birthdayImg = loadImage("images/HBD_new.jpg");
  targetImg = loadImage("images/target_red_10.png");
  
  aduImg = loadImage("images/Adu.jpg");
  etashaImg = loadImage("images/Etasha.jpg");
  
  obstacle1 = loadAnimation( "images/fish_1.png", "images/fish_2.png");
  obstacle2 = loadAnimation( "images/snail_0.png", "images/snail_1.png");
  obstacle3 = loadAnimation( "images/bee_1.png", "images/bee_2.png");
  
  //load the sounds
  HBDSound = loadSound('HBD.mp3');
  laughSound = loadSound("laugh.mp3");
  
}


function setup() {
  createCanvas(500, 500);
  
  targetGroup = new Group();
  aduGroup = new Group();
  
}

function draw() {
  background(0);
  
if(gameState === "start"){
    generateBG();
    text("Press SPACEBAR to start", 220, 450);
  }
  if(keyDown("space") && gameState === "start"){
    targetGroup.destroyEach();
    gameState = "play";
  }
  
  if(gameState === "play"){
      generateAdu();
      generateObstacles();
      textSize(14);
      text("Score 10 for a surprise !", 100, 350);

      for(var j =0; j <=aduGroup.maxDepth(); j++ ){
        if( mousePressedOver(aduGroup.get(j))){
            score = score +1;           
            laughSound.play();
            aduGroup.get(j).destroy();
        }
      }
    
      if(score === 10){
        gameState = "over";
        laughSound.stop();
        HBDSound.play();
      }
    
    }
    
    if(gameState === "over"){
      var bg = createSprite(250,250,400,400);
      bg.addImage(birthdayImg);
           
      etasha = createSprite(280,470,10,10);
      etasha.addImage(etashaImg);
      etasha.scale = 0.15;
    }
    
  
  
  drawSprites();
  
  if(gameState === "play" ){
    textSize(40);
    stroke("blue");
    text("Score :"+score, 200,50);
  }
}

function generateBG(){
  for(var i =45; i < 500; i= i+70){
    for (var k =50; k < 400; k= k+100){
      var target = createSprite(i, k, 10,10);
      target.addImage(targetImg);
      targetGroup.add(target);
    }
  }
 
}


function generateAdu(){
  
  if(World.frameCount%60 === 0){
    adu = createSprite( Math.round(random(10,490)),Math.round(random(10,390)),10,10);   
    adu.addImage(aduImg);
    adu.scale = 0.1;
    adu.lifetime = 25;
    aduGroup.add(adu);
  }
}
function generateObstacles(){
  if(World.frameCount % 10 === 0){
    var obstacle = createSprite(random(10,495), random(10,495),10,10);
    obstacle.velocityX = random(-7, 7);
    obstacle.velocityY = random(-7,7);
         
   	var randNo = Math.round(random(1,3));
    switch(randNo) {
      case 1: obstacle.addAnimation("fish", obstacle1);
              break;
      case 2: obstacle.addAnimation("snail", obstacle2);
              break;
      case 3: obstacle.addAnimation("bee", obstacle3);
              break;
      default: break;
    }
   
   obstacle.lifetime = 75;
  }
}
