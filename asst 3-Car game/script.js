const CANVAS_WIDTH = 750;
const CANVAS_HEIGHT = window.innerHeight;


class Game{
    constructor(){
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.animation ;

        this.laneWidth = 150;
        this.carWidth = 75;
        this.carHeight = 141;
        this.score = 0;
        this.scoreStatus = false;
        this.highScore;
        this.enemyCars = [];
        this.numEnemyCars = this.constructor.randomNum(100,400);
        this.speed = 5;
        this.images = [];
        this.laneSpeed = this.speed;
        this.index;
        this.temp;
        this.start = true;
        this.gameover = false;
        this.highScore = localStorage.getItem('carHighscore') || 0;
        this.interval;

        this.tempSpeed;
        this.carspeed = 700;

        this.image = document.querySelectorAll('.enemy');
        this.coverImage = document.querySelector('.cover');
        
        
        this.user = new Car( (this.laneWidth/2 + 2 * this.laneWidth - this.carWidth/2) , CANVAS_HEIGHT - this.carHeight , this.carWidth , this.carHeight , true, this.images );

    }
    init(){
        document.body.appendChild(this.canvas);
        this.canvas.height = CANVAS_HEIGHT ;
        this.canvas.width = CANVAS_WIDTH;

        Array.from(this.image).forEach(item=> this.images.push(item));

        this.coverImage.style.width = CANVAS_WIDTH + "px";
        this.coverImage.style.height = CANVAS_HEIGHT + "px";
    }

    startScreen(){
        this.ctx.fillStyle = "black";

        this.ctx.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
        this.ctx.fillStyle = "#99D1E8";
        this.ctx.font = "60px Arial" ;
        this.ctx.fillText(`CAR GAME`,CANVAS_WIDTH/2-170, CANVAS_HEIGHT/2-100);
        

        this.ctx.fillStyle = "#99D1E8";
        this.ctx.font = "25px Arial" ;
        this.ctx.fillText(`Press A and D to move left or right`,CANVAS_WIDTH/2-200, CANVAS_HEIGHT/2);

        this.ctx.fillStyle = "white";
        this.ctx.font = "23px Arial" ;
        this.ctx.fillText(`PRESS SPACEBAR TO  BEGIN`,CANVAS_WIDTH/2-170, CANVAS_HEIGHT/2+100);
        let that = this;

        document.onkeypress = function (e){
            if (e.keyCode == 32){

                that.start = false;
            }
        }
    }

    gameScreen(){

        this.road();
        this.enemyCarsMotion();
        this.player();
        this.keyPressHandler();
        this.scoreCount();
        this.updateScore();
        this.drawLane();
        this.highScoreUpdate();
        this.isCollision();
        
    }


    gameOverScreen(){
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    
        this.ctx.fillStyle = "#99D1E8";
        this.ctx.font = "60px Arial" ;
        this.ctx.fillText(`HIGHSCORE`,CANVAS_WIDTH/2-170,CANVAS_HEIGHT/2-100);
        
        this.ctx.fillStyle = "white";
        this.ctx.font = "40px Arial" ;
        this.ctx.fillText(`${localStorage.getItem('carHighscore')}`,CANVAS_WIDTH/2-10,CANVAS_HEIGHT/2);
    
        this.ctx.fillStyle = "white";
        this.ctx.font = "23px Arial" ;
        this.ctx.fillText(`PRESS SPACEBAR TO RESTART`,CANVAS_WIDTH/2-170,CANVAS_HEIGHT/2+100);
        let that = this;
        document.onkeypress = function (e){
            if (e.keyCode == 32){
                that.start = true;
                that.gameover = false;
                that.score = 0;
                that.scoreStatus = false;
                that.enemyCars = [];
                that.carspeed = 700;
                that.speed = 5;
                
                that.user = new Car( (that.laneWidth/2 + 2 * that.laneWidth - that.carWidth/2) , CANVAS_HEIGHT - that.carHeight , that.carWidth , that.carHeight , true, that.images );
                // that.user.position = 2;
                that.run();
                
            }
        }
    }


    keyPressHandler(){
        let that = this;
        document.onkeydown = function(e){
            if (e.keyCode == 65){
                if (that.start == false && that.gameover ==false){
                    if(that.user.position > 0){
                    that.user.moveLeft(that.laneWidth);    
                    that.player();
                    }
                }
            }
            else if(e.keyCode == 68){
                if (that.start ==false && that.gameover ==false){
                    if(that.user.position<4){
                    that.user.moveRight(that.laneWidth);
                    that.player();
                    }
                }
            }
        
        };
    }

    road(){
        this.ctx.fillStyle ="black";
        this.ctx.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    enemyCarsMotion(){
        for (let i = 0; i<this.enemyCars.length; i++){
            this.enemyCars[i].y = this.enemyCars[i].y + this.speed;
            this.enemyCars[i].generate(this.ctx);
        }
    }

    player(){
        this.user.generate(this.ctx);
    }

    scoreCount(){
        for (let i =0 ; i<this.enemyCars.length; i++){
                if(this.enemyCars[i].y > CANVAS_HEIGHT){
                    this.score = this.score + 1;
                }
        }
        this.removeCars();
    }

    updateScore(){
        this.ctx.fillStyle = "white";
        this.ctx.font = "15px Arial" ;
        this.ctx.fillText(`Score : ${this.score}`,20,30);
        this.ctx.fillText(`High Score: ${this.highScore}`,20,60);
        this.scoreCount();
    }


    drawLane(){
    
        //lane parameters
        this.ctx.strokeStyle ="white";
        this.ctx.setLineDash([40,40]);
        // laneOffset +=laneSpeed;
        this.ctx.beginPath();
        this.ctx.lineDashOffset -= this.laneSpeed;
        this.ctx.lineWidth=4;
        //left lane
        this.ctx.moveTo(150,10);
        this.ctx.lineTo(150,CANVAS_HEIGHT);
        //right lane
        this.ctx.moveTo(300,10);
        this.ctx.lineTo(300,CANVAS_HEIGHT);
        //most right lane
        this.ctx.moveTo(450,10);
        this.ctx.lineTo(450,CANVAS_HEIGHT);
    
        this.ctx.moveTo(600,10);
        this.ctx.lineTo(600,CANVAS_HEIGHT);
        this.ctx.stroke();
        
    }

    highScoreUpdate(){
        if (this.score >= this.highScore){
            this.highScore = this.score;
        }
        localStorage.setItem('carHighscore',this.highScore);
    }
    
    static randomNum(min,max){
        max = Math.floor(max);
        min = Math.ceil(min);
        return min+Math.floor(Math.random() * (max-min));
    }

    isCollision(){
        for (let i =0 ; i<this.enemyCars.length; i++){
            if ((this.user.position == this.enemyCars[i].position) && (this.enemyCars[i].y+this.carHeight >= this.user.y)){
                this.gameover = true;
                window.cancelAnimationFrame(this.animation);   
                clearInterval(this.interval);     
            }
        }
    }

    

    increaseSpeed(){
        for (let i = 1 ; i <= 100 ; i++){
            if (this.score == i*3){
                this.speed = this.speed + 0.5;
                this.laneSpeed = this.speed;
           }
        }        
    }

    removeCars(){
        this.enemyCars.forEach((item)=>{
            if (item.y > CANVAS_HEIGHT){
                this.enemyCars.splice(0,1);
            }
        })  
    }

    generateAtRandomLane(){
        this.index = this.constructor.randomNum(0,5);
        this.temp = new Car( this.laneWidth / 2 + this.index *this.laneWidth - this.carWidth / 2 , -this.carHeight, this.carWidth, this.carHeight,false,this.images);
        this.temp.position = this.index;
        this.enemyCars.push(this.temp);
    }

    updateCarSpeed(){
        this.interval = setInterval(()=>{
            if (this.carspeed < 200){
                this.carspeed = 200;
            }
            else{
                this.carspeed = this.carspeed - this.speed*4;
            }
            clearInterval(this.tempSpeed);
            this.tempSpeed = setInterval( ()=>{
                this.generateAtRandomLane();
                this.increaseSpeed();
                } 
                
                ,this.carspeed);
        },2000);
    }
    draw(){
        this.ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        this.startScreen();
        this.animation = window.requestAnimationFrame(this.draw.bind(this));
        if (this.start == false){
            this.gameScreen();    
        }
        if (this.gameover == true){
            this.gameOverScreen();
        }
    }
    run(){
        this.init();
        this.updateCarSpeed();
        this.draw();
    }
}
let car = new Game();
car.run();
