var ballon,database;
var ballonImage;
var bgm;
var position;

function preload(){
  ballonImage = loadImage("Hot Air Ballon-02.png");
  bmg = loadImage("Hot Air Ballon-01.png");
}

function setup() {
  database = firebase.database();

  createCanvas(500,500);
  ballon = createSprite(400, 200, 50, 50);
  ballon.scale = 0.2;
  ballon.addImage(ballonImage);

  var ballonPosition = database.ref('ballon/height');
  ballonPosition.on("value",readHeight,showError);
}

function draw() {
  background(0,200,255);
  
  if(keyDown(LEFT_ARROW)){
    ballon.x = ballon.x - 10;
  }
  if(keyDown(RIGHT_ARROW)){
    ballon.x = ballon.x + 10;
  }
  if(keyDown(UP_ARROW)){
    ballon.y = ballon.y - 10;
  }
  if(keyDown(DOWN_ARROW)){
    ballon.y = ballon.y + 10;
  }

  drawSprites();
}

function writeHeight(x,y){
  database.ref('ballon/position').set({
    'x' : height.x + x,
    'y' : height.y + y
  })
}

function readHeight(data){
  height = data.val();
  ballon.x = height.x;
  ballon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}