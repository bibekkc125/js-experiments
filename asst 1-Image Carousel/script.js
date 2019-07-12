const CANVAS_WIDTH  = 600;
const CANVAS_HEIGHT = 400;

//Carousel
class Carousel{
    constructor(delay,hold){

        this.current = 0;
        this.index = 0;
        this.change = 1;
        this.delay = delay;
        this.hold = hold;
        this.target = 0;
        this.speed = 0;
        this.temp;
        this.timer = 0;
        this.slide = 0;
        this.listItem = [];

        this.images = Array.from(document.querySelectorAll('.carousel-image-wrapper>img'));

        this.maxWidth = this.images.length * CANVAS_WIDTH;

        this.carouselContainer = document.querySelector('.carousel-container');
        this.carouselWrapper = document.querySelector('.carousel-image-wrapper');

        this.buttonDiv = document.createElement('div');
        this.leftButton = document.createElement('span');
        this.leftButtonImg = document.createElement('img');

        this.rightButton = document.createElement('span');
        this.rightButtonImg = document.createElement('img');

        this.toggle = document.createElement('ul');
    }

    init(){

        this.carouselContainer.style.width = CANVAS_WIDTH + 'px';
        this.carouselContainer.style.height = CANVAS_HEIGHT + 'px';
        this.carouselContainer.style.overflow = "hidden";
        
        this.images.forEach(item=>{
            item.style.width = CANVAS_WIDTH + 'px';
            item.style.height = CANVAS_HEIGHT + 'px';
            item.style.float = 'left';
        })

        this.carouselWrapper.style.width = this.maxWidth + 'px';
        this.carouselWrapper.style.height = CANVAS_HEIGHT + 'px';

        this.buttonDiv.style.width = CANVAS_WIDTH + 'px';
        this.buttonDiv.style.height = CANVAS_HEIGHT + 'px';

        this.leftButtonImg.style.width = 40 + 'px';
        this.leftButtonImg.style.height = 40 + 'px';
        this.leftButtonImg.src = 'images/left.png';
    
        this.rightButtonImg.style.width = 40 + 'px';
        this.rightButtonImg.style.height = 40 + 'px';
        this.rightButtonImg.src = 'images/right.png';

        this.rightButton.onclick = ()=>{this.next()};
        this.leftButton.onclick = ()=>{this.previous()};


        for(let i = 0; i< this.images.length; i++){

            this.listItem[i] = document.createElement('li'); 
            this.toggle.appendChild(this.listItem[i]);
            this.listItem[i].onclick = ()=>{this.moveTo(i)};
        }
    }


    buttonToggles(){
        this.buttonDiv.className = 'button-div';
        this.carouselContainer.appendChild(this.buttonDiv);

        this.leftButton.className = 'leftButton';
        this.buttonDiv.appendChild(this.leftButton);
        this.leftButton.appendChild(this.leftButtonImg);
        
        this.rightButton.className ='rightButton';        
        this.buttonDiv.appendChild(this.rightButton);
        this.rightButton.appendChild(this.rightButtonImg);

        this.toggle.className = 'toggles';        
        this.buttonDiv.appendChild(this.toggle);       

    }

    calcIndex(){
        this.index = this.index + this.change;
        if(this.index >= this.images.length){
            this.index=0;
        }
        else if(this.index < 0){
            this.index = this.images.length-1;
        }
    }

    calcCurrentTarget(){
        this.current = this.target;
        this.target = - this.index * CANVAS_WIDTH;
    }

    calcSpeed(){
        this.speed = (this.target - this.current) / this.delay;
    }

    transition(){
        this.temp = this.current;
        let that = this;

        (function draw(){

            let animation = window.requestAnimationFrame(draw);
            that.images.forEach((item,index)=>{
                if (that.index == index){
                    that.listItem[index].style.opacity = 1;
                }
            });
            if(that.temp != that.target){
                that.temp = that.temp + that.speed;
                that.carouselWrapper.style.marginLeft = that.temp + 'px';
            }
            else{
                window.cancelAnimationFrame(animation);
            }

            
        })();
    }

    moveTo(n){
        this.change = (n - this.index);
        this.calcIndex();
        this.calcCurrentTarget();
        this.calcSpeed();
        this.transition();
        if (this.slide){
            clearInterval(this.slide);
            this.slideshow();
        }

        this.images.forEach((item,index)=>{
            this.listItem[index].style.opacity = 0.3;
        }); 
        
        this.change = 1;
    }

    previous(){
        this.change = -1;
        this.calcIndex();
        this.calcCurrentTarget();
        this.calcSpeed();
        this.transition();
        this.change = 1;
        if (this.slide){
            clearInterval(this.slide);
            this.slideshow();
        }
        this.images.forEach((item,index)=>{
            this.listItem[index].style.opacity = 0.3;
        }); 
    }

    next(){
        this.calcIndex();
        this.calcCurrentTarget();
        this.calcSpeed();
        this.transition();
        if (this.slide){
            clearInterval(this.slide);
            this.slideshow();
        }
        this.images.forEach((item,index)=>{
            this.listItem[index].style.opacity = 0.3;
        }); 

    }

    slideshow(){
        this.slide = setInterval(()=>{
            this.animate();
            this.images.forEach((item,index)=>{
                this.listItem[index].style.opacity = 0.3;
            });
        },this.hold);
    }

    animate(){
        this.calcIndex();
        this.calcCurrentTarget();
        this.calcSpeed();
        this.transition();
    }
    run(){
        this.init();
        this.buttonToggles();
        this.slideshow();
        this.animate();
    }
}
let one = new Carousel(50, 3000);
one.run();
// let two = new Carousel(20, 1000);
// two.run();