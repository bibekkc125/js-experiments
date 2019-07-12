class Pipe{
    constructor(x, y){
        this.x = x; 
        this.y = y;
        this.height = Game.randomInt(80,300);
        this.gap = 150;
        this.width = 72;
    }
    
    create(ctx){

        let pipeUp = new Image();
        let pipeDown = new Image();

        pipeUp.src ='images/toppipe.png';
        pipeDown.src ='images/bottompipe.png';

        ctx.drawImage(pipeUp,this.x,this.y,this.width,this.height);
        ctx.drawImage(pipeDown,this.x,this.height+150,this.width,CANVAS_HEIGHT-(this.height+this.gap + 100));
    }
    moveLeft(){
            this.x =this.x - 5;
    }
}
