
class Bird{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 51;

        this.angle = 0;
        this.velocity = 0;
        this.gravity = 0.6;
        this.upThrust = -15;

        this.yThreshold = 10;
        this.xThreshold = 15;

        this.sheetWidth = 237;
        this.sheetHeight = 51;
        this.cols = 4;
        this.birdImg = new Image();
        this.birdImg.src = "images/bird.png";
    
        this.currentFrame = 0;
        this.srcX;
        this.srcY;

        setInterval(()=>{
            this.currentFrame = ++this.currentFrame % this.cols;
        },150);
    }
    
    updateFrame(){
        
        this.srcX = this.currentFrame * this.width;
        this.srcY = 0;
    }

    moveUp(){
        this.velocity += this.upThrust;
    }

    moveDown() {
        this.velocity += this.gravity;
        this.y += this.velocity;
    }

    create(ctx){
        this.updateFrame();
        ctx.drawImage(this.birdImg, this.srcX , this.srcY , this.width , this.height , this.x , this.y , this.width , this.height);
    }
    
}