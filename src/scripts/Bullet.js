//class for bullet objects
class Bullet {
  constructor(ctx,x,y) {
    this.ctx = ctx;
    this.width = 35;
    this.height = 30;
    this.x = x+this.width;
    this.y = y+this.height;
    this.dx = 5;
    this.bullet = new Image();
    this.bullet.src = "./img/bullet.png";
  }
  draw(){
    this.ctx.drawImage(this.bullet,this.x,this.y,this.width,this.height)
  }
  update(){
    this.draw();
    this.x += this.dx;
  }

}

export default Bullet;
