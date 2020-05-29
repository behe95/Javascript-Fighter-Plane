import Fire from "./Fire.js"
import Bullet from "./Bullet.js"

//class for plane object
class Plane {
  constructor(ctx) {
    this.ctx = ctx;
    this.width = 60;
    this.height = 60;
    this.x = 0;
    this.y = canvas.height/2-this.width/2;
    this.plane1 = new Image();
    this.plane2 = new Image();
    this.plane1.src = "./img/plane1.png";
    this.plane2.src = "./img/plane2.png";
    //variable used to select in between two images
    this.flying = 1;

    this.timeCounter = 0;
    this.bullets = [];
  }
  //drawing plane with two images to make the wheel rotate
  draw(){
    if (this.flying<5) {
      this.ctx.drawImage(this.plane1,this.x,this.y,this.width,this.height);
      this.flying++;
    }else {
      this.ctx.drawImage(this.plane2,this.x,this.y,this.width,this.height);
      this.flying++;
      if (this.flying>10) {
        this.flying = 1;
      }
    }
  }

  update(dx,dy,isFired){
    this.timeCounter++
    this.checkIfPlaneGoesBeyondScreen();
    this.draw()
    this.x += dx;
    this.y +=dy;
    this.bulletFire(isFired);
  }

  bulletFire(isFired){
    if (isFired) {
      let fire = new Fire(this.ctx,this.x,this.y);
      fire.update();
      if (this.timeCounter%20===0) {
        this.bullets.push(new Bullet(this.ctx,this.x,this.y));
      }
    }
    this.bullets.forEach((bullet, index) => {
      bullet.update();
      if (bullet.x>canvas.width) {
        this.bullets.splice(index,1);
      }
    });
  }

  getBulletsInfo(){
    return this.bullets;
  }

  checkIfPlaneGoesBeyondScreen(){
    if (this.y+this.height>canvas.height) {
      this.y = canvas.height-this.height
    }else if (this.y<0) {
      this.y = 0;
    }else if (this.x<0) {
      this.x = 0;
    }else if (this.x+this.width>canvas.width) {
      this.x = canvas.width-this.width;
    }
  }

}

export default Plane;
