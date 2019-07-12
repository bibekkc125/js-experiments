class Car{

    constructor(x, y, w, h, gamer,images){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.gamer = gamer;
        this.images = images;
        this.position = 2;
        this.color =`rgb(${Game.randomNum(100,255)},${Game.randomNum(100,255)},${Game.randomNum(100,255)})`;
        this.car =  Game.randomNum(0,this.images.length);
        this.userCar = document.querySelector('.user');
    }

    generate(ctx){
        if (!this.gamer){
            // console.log(this.car);
            ctx.drawImage(this.images[this.car],this.x,this.y);
        }
        else{
           ctx.drawImage(this.userCar,this.x,this.y);
        }
    }

    moveLeft(laneWidth){
        this.position -= 1;
        this.x = this.x - laneWidth;
    }

    moveRight(laneWidth){
        this.position += 1;
        this.x = this.x + laneWidth;
    }

}