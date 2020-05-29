//class to create the background
class Background {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 0;
    //acceleration
    this.dx = 1;
    this.backgroundImg1 = new Image();
    this.backgroundImg2 = new Image();
    this.backgroundImg1.src = "./img/background.png";
    this.backgroundImg2.src = "./img/background.png";
  }
  //draw background
  draw(){
    this.ctx.drawImage(this.backgroundImg1,canvas.width-this.x,0,canvas.width,canvas.height);
    this.ctx.drawImage(this.backgroundImg1,0-this.x,0,canvas.width,canvas.height);
  }
  //update background
  update(){
    this.draw();
    if (canvas.width-this.x<0) {
      this.x = 0;
    }
    this.x += this.dx;
  }
}

export default Background;
