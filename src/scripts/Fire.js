//class for changing the plane image while firing
class Fire {
  constructor(ctx,x,y) {
    this.ctx = ctx;
    this.width = 60;
    this.height = 60;
    this.x = x;
    this.y = y;
    this.dx = 1;
    this.shoot1 = new Image();
    this.shoot2 = new Image();
    this.shoot3 = new Image();
    this.shoot4 = new Image();
    this.shoot5 = new Image();
    this.shoot1.src = "./img/shoot1.png";
    this.shoot2.src = "./img/shoot2.png";
    this.shoot3.src = "./img/shoot3.png";
    this.shoot4.src = "./img/shoot4.png";
    this.shoot5.src = "./img/shoot5.png";
    this.flying = 0;
  }

  draw(){
    if (this.flying<2) {
      this.ctx.drawImage(this.shoot1,this.x,this.y,this.width,this.height);
      this.flying++;
    }else if(this.flying < 4){
      this.ctx.drawImage(this.shoot2,this.x,this.y,this.width,this.height);
      this.flying++;
    }else if(this.flying < 6){
      this.ctx.drawImage(this.shoot3,this.x,this.y,this.width,this.height);
      this.flying++;
    }else if(this.flying < 8){
      this.ctx.drawImage(this.shoot4,this.x,this.y,this.width,this.height);
      this.flying++;
    }else{
      this.ctx.drawImage(this.shoot5,this.x,this.y,this.width,this.height);
      this.flying++;
      if (this.flying>10) {
        this.flying = 0;
      }
    }
  }
  update(){
    this.draw();
  }

}


export default Fire;
