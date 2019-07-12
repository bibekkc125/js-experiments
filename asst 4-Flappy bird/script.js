const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 711;

class Game{

    constructor(){
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext("2d");
        this.animation;
        this.pipes = [];
        this.flappy = new Bird(CANVAS_WIDTH/2-150, CANVAS_HEIGHT/2);
        this.score = 0;
        this.highScore = localStorage.getItem("Highscore") || 0;
        this.start =true;
        this.gameover = false;

        this.flappyImage = new Image();
        this.flappyImage.src = "images/flappybird.png";

        this.getReady = new Image();
        this.getReady.src = "images/getready.png";

        this.play = new Image();
        this.play.src = "images/play.png";

        this.background_image = new Image();
        this.background_image.src = 'images/background.png';

        this.ground_image = new Image();
        this.ground_image.src = 'images/ground.png';

        this.gameOverImage = new Image();
        this.gameOverImage.src ="images/gameover.png";

        this.restart = new Image();
        this.restart.src = "images/restart.png";

        this.mouseX;
        this.mouseY;

        this.pipeGenerator;
        
    }

    init(){
        // this.gameover = false;
        document.body.appendChild(this.canvas);
        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT; 
        
        document.onkeydown = (e)=>{
            if (this.start == false && this.gameover ==false){
                if(e.keyCode == 32){
                    this.flappy.moveUp();
                }
            }
        };
        
    }

    generatePipes(){
        this.pipeGenerator = setInterval(()=>{
            if (this.start == false && this.gameover == false){
            this.pipes.push(new Pipe(CANVAS_WIDTH,0));
            }
        },1600);   
    }


    run(){
        this.init();
        this.generatePipes();
        this.draw();
    }


    startScreen(){
        this.background();
        this.ground();
        this.drawBird();
        
        this.ctx.drawImage(this.flappyImage, 50,50);
        this.ctx.drawImage(this.getReady,100,170);
        this.ctx.drawImage(this.play, 145,250);
        
        this.canvas.onclick = (event)=>{
            this.mouseX = event.pageX - this.canvas.offsetLeft;
            this.mouseY =  event.pageY - this.canvas.offsetTop;
            if (this.mouseX >= 145 && this.mouseX <= 258 && this.mouseY>=250 && this.mouseY <= 313){
                this.start = false;
            }
        };
    }

    gameScreen(){
            this.background();   
            this.ground();   
            this.drawPipes();
            this.drawBird(); 
            this.jumpBird();
            this.scoreUpdate();
            this.removePipes();
            this.checkCollision();
            
    }

    gameOverScreen(){
        this.highScoreUpdate();
        this.ctx.drawImage(this.gameOverImage, 70,130);
        this.ctx.drawImage(this.restart, 140,350);

        this.canvas.onclick = (event)=>{
            this.mouseX = event.pageX - this.canvas.offsetLeft;
            this.mouseY =  event.pageY - this.canvas.offsetTop;
            if (this.mouseX >= 140 && this.mouseX <= 253 && this.mouseY>=350 && this.mouseY <= 413){

                this.start = true;
                this.gameover = false;
                this.score = 0;
                this.pipes = [];
                clearInterval(this.pipeGenerator);
                this.flappy = new Bird(CANVAS_WIDTH/2-150, CANVAS_HEIGHT/2);
                this.generatePipes();
                this.draw();
            }
        };

    }

    background(){
        this.ctx.drawImage(this.background_image,0,0);
    }

    ground(){
        this.ctx.drawImage(this.ground_image,0,CANVAS_HEIGHT-100);
    }

    static randomInt(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return min+((max-min)*Math.random());
    }

    scoreUpdate(){
        this.pipes.forEach(item=>{
            if (item.x+item.width <= 0){
            this.score = this.score + 1;
            }
        });
        this.ctx.fillStyle ="white";
        this.ctx.font = "60px Arial";
        this.ctx.fillText(`${this.score}`, CANVAS_WIDTH/2 -18 , CANVAS_HEIGHT/2 - 250);
    }


    highScoreUpdate(){
        if (this.score >= this.highScore){
            this.highScore = this.score;
            localStorage.setItem("Highscore", this.highScore);
        }
        this.ctx.fillStyle ="white";
        this.ctx.font = "40px Arial";
        this.ctx.fillText(`HIGHSCORE`, 70 , 250);
        this.ctx.font = "60px Arial";
        this.ctx.fillText(`${localStorage.getItem('Highscore')}`,  170, 320);
    }
    
    drawPipes(){ 
        this.pipes.forEach(item=>{
            item.create(this.ctx);
            item.moveLeft();
        })
    }

    removePipes(){
        this.pipes.forEach(item=>{
            if (item.x+item.width <= 0){
            this.pipes.splice(0,1);
            }
        })
    }

    drawBird(){
            this.flappy.create(this.ctx);
    }

    jumpBird(){
        this.flappy.moveDown();
    }

    checkCollision(){
        if (this.flappy.y <= -10 || this.flappy.y + this.flappy.height >= CANVAS_HEIGHT - 80){
            window.cancelAnimationFrame(this.animation);
            this.gameover = true;
           }
        this.pipes.forEach((item)=>{
            if ( this.flappy.x + (this.flappy.width- this.flappy.xThreshold) >  item.x  && (this.flappy.x -this.flappy.xThreshold) < item.x + item.width){
                if (this.flappy.y + this.flappy.yThreshold < item.height || this.flappy.y + (this.flappy.height - this.flappy.yThreshold ) > item.height + item.gap ){
                    item.x = item.x;
                    // this.flappy.moveDown();
                    window.cancelAnimationFrame(this.animation);
                        this.gameover = true;
                }   
            }   
        });    
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

}
let initgame = new Game();
initgame.run();

// let nesw =new Game();
// nesw.run();