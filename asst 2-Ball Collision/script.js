//Create and style canvas
let canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.width = 1200;
canvas.height = 700;
canvas.style.border = '1px solid black';
canvas.style.marginLeft ="150px";
document.body.backgroundColor ="#000000";

//random int
function randomInt(min,max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(min+(Math.random()*(max-min)));
}

//random float for specifying ball direction 
function randomFloat(min,max){
  return min+(Math.random()*(max-min));
}

//random color for balls 
function randomColor(){
  return `rgb(${randomInt(0,256)},${randomInt(0,256)},${randomInt(0,256)})`;
}

//calcuate distance
function dist(a,b,c,d){
  let dx = c-a;
  let dy = d-b;
  return Math.sqrt(dx*dx + dy*dy);
}

var ctx = canvas.getContext('2d');

class ball{
  constructor(x,y,r){
    this.x = x;
    this.y = y;
    this.size = r;
    //velocity
    this.v = randomFloat(-5,5);
    //direction
    this.xd = randomFloat(-0.9,1);
    this.yd = randomFloat(-0.9,1);
    console.log(this.xd*this.v);
    this.color = randomColor();
  }
  move(){
    this.boxcollision();
    this.x += this.xd*this.v;
    this.y +=this.yd*this.v;
    // console.log(this.x);
  }
  boxcollision(){
    if ((this.x-this.size) <=0 || (this.x+this.size) >= canvas.width){
      this.xd = this.xd*(-1);
    }
    if ((this.y-this.size <=0) || (this.y+this.size) >= canvas.height){
      this.yd = this.yd*(-1);
    }
  } 
  checkCollision(arr){
    if (dist((this.x+this.xd*this.v), (this.y+this.yd*this.v), (arr.x+arr.xd*arr.v), (arr.y+arr.yd*arr.v))- (this.size+arr.size)< 0){
      return true;
    }
    else{
      return false;
    }
  }

  strike(ballarray){
    for(let i = 0 ; i < ballarray.length ; i++){
      if(this != ballarray[i]){
        // console.log(this != ballarray[i]);
        if (this.checkCollision(ballarray[i])){
            let tempxd = ballarray[i].xd;
            let tempyd = ballarray[i].yd;
            let tempv = ballarray[i].v;
            ballarray[i].xd = this.xd;
            ballarray[i].yd = this.yd;
            ballarray[i].v = this.v;
            this.xd = tempxd;
            this.yd = tempyd;
            this.v = tempv;
            continue;
        }
      }
    }
  }
  drawCircle(){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,2*Math.PI,true);
    ctx.fill();
  }
}
let ballarray = [];
let cond;

//generates balls on screen
function generate(){
  for (let i=0;i<randomInt(40,300);i++){
    var x = randomInt(50,1150);
    var y = randomInt(50,650);
    var r = randomInt(10,30);
    cond = false;
    if(i!==0){
      do{
        x = randomInt(50,1150);
        y = randomInt(50,650);
        r = randomInt(10,30);
        for(j = 0; j < ballarray.length; j++){
          if (dist(x,y,ballarray[j].x,ballarray[j].y) -(r + ballarray[j].size)< 10){
            cond = true;
            break;
          }
          else{ 
          cond =false;
          }
        }
      }while(cond);
    } 
    ballarray.push(new ball(x,y,r));
  }
}
generate();



function func(){
  window.requestAnimationFrame(func);
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "#fffff0";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ballarray.forEach(item =>{
    // collision();
    // item.move();
    
    item.strike(ballarray);
    item.move();
    
    
    item.drawCircle();
  })
};
func();