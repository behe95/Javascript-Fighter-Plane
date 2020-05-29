class Bird {
  constructor(ctx) {
    this.ctx = ctx;
    this.width = 50;
    this.height = 50;
    //postion
    this.x = canvas.width;
    this.y = Math.round(Math.random()*canvas.height);
    if (this.y+this.height>canvas.height) {
      this.y = canvas.height - this.height;
    }
    //acceleration
    this.dx = 4;
    this.bird1 = new Image();
    this.bird2 = new Image();
    this.bird3 = new Image();
    this.bird4 = new Image();
    this.bird1.src = "./img/bird1.png";
    this.bird2.src = "./img/bird2.png";
    this.bird3.src = "./img/bird3.png";
    this.bird4.src = "./img/bird4.png";
    this.flying = 1;
  }

  //drawing bird object with four images to move its wings
  draw(){
    if (this.flying < 10) {
      this.ctx.drawImage(this.bird1,this.x,this.y,this.width,this.height)
      this.flying++;
    }else if (this.flying < 20) {
      this.ctx.drawImage(this.bird2,this.x,this.y,this.width,this.height)
      this.flying++;
    }else if (this.flying < 30) {
      this.ctx.drawImage(this.bird3,this.x,this.y,this.width,this.height)
      this.flying++;
    }else{
      this.ctx.drawImage(this.bird4,this.x,this.y,this.width,this.height)
      this.flying++;
      if (this.flying>40) {
        this.flying = 1;
      }
    }
  }

  update(){
    this.draw();
    this.x -= this.dx;
  }
}

export default Bird;
