var database;
var ball;
var pos1;
var pos;
function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "blue";
    database=firebase.database();
    pos1 = database.ref('ball/position');
    pos1.on("value",readposition,errormessage);
}

function draw(){
    background("black");
    if(pos1!==undefined)
    {
        if(keyDown(LEFT_ARROW)){
            writeposition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writeposition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            writeposition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            writeposition(0,+1);
        }
         
    drawSprites();
    }
  
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}
function readposition(data)
{
    pos = data.val();
    console.log(pos);
    ball.x=pos.x;
    ball.y=pos.y;
}
function writeposition(x,y){
     database.ref('ball/position').set({x:ball.x+x,y:ball.y+y});

}
function errormessage(){
    console.log("could not read values");
}