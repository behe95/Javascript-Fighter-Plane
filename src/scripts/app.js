const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext("2d");
import Background from "./Background.js"
import Plane from "./Plane.js"
import Bird from './Bird.js'


canvas.width = 500;
canvas.height = 250;

//key object initialisation
let key = {
  x:0,
  y:0
}
//boolean value to detect if the player fired or not
let isFired = false;
//keydown event listener
window.addEventListener('keydown', function(e) {
  switch (e.keyCode) {
    case 37:
      key.x = -2
      break;
    case 38:
      key.y = -2
      break;
    case 39:
      key.x = 2
      break;
    case 40:
      key.y = 2
      break;
    case 32:
      isFired = true;
      break;
  }

});
//keyup event listener
window.addEventListener('keyup', function(e) {
  switch (e.keyCode) {
    case 37:
    case 39:
      key.x = 0;
      break;
    case 38:
    case 40:
      key.y = 0;
      break;
    case 32:
      isFired = false;
      break;
  }
});

//variable initialisation
let background = new Background(ctx);
let plane = new Plane(ctx);
let birds = [];
let timeCounter = 0;
let totalScore = 0;

//animate function to animate the game on the page
function animate() {
  const animation = requestAnimationFrame(animate);
  background.update();
  plane.update(key.x,key.y,isFired);
  renderBirds(birds,timeCounter);
  showScore(totalScore);
  let planeCollide = detectCollision(plane,birds);
  timeCounter++;

  if (planeCollide) {
    cancelAnimationFrame(animation);
    showGameOver(totalScore);
  }
}
animate();

//show score on the gameplay display
function showScore(totalScore) {
  ctx.font = "25px Arial";
  ctx.fillText(`Score: ${totalScore}`,canvas.width-125,25);
}

//display game over
function showGameOver(totalScore) {
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.font = "50px Arial";
  ctx.strokeStyle = "white"
  ctx.strokeText("Game Over",canvas.width/4, canvas.height/2-50);
  ctx.textAlign = "center";
  ctx.fillStyle = "white";
  ctx.fillText(`Total Score: ${totalScore}`,canvas.width/2,50+canvas.height/2);
  ctx.font = "25px Arial";
  ctx.fillText("Reload The Page To Play Again",canvas.width/2,100+canvas.height/2);
}

//function to detect collision
function detectCollision(x,y) {
  let bullets = x.getBulletsInfo();
  let birds = y;
  let plane = x;
  let gameOver = false;
  //collision for bullets and birds
  birds.forEach((bird, index) => {
    let birdX = bird.x;
    let birdY = bird.y;
    for (var i = 0; i < bullets.length; i++) {
      let bulletX = bullets[i].x + bullets[i].width;
      let bulletY = bullets[i].y + bullets[i].height/2;
      let bulletInbetweenBirdsHeight = bulletY>birdY && bulletY< birdY+bird.height;
      if (bulletX>birdX && bulletX<birdX+bird.width && bulletInbetweenBirdsHeight) {
        birds.splice(index,1);
        totalScore++;
      }
    }
  });

  // collision for birds and plane
  birds.forEach((bird) => {
    let birdX = bird.x;
    let birdY = bird.y;
    let planeX = plane.x+3*plane.width/4;
    let planeY = plane.y;

    let planeInBetweenBirdsHeight = planeY > birdY-3*bird.height/4 &&
                                    planeY < birdY+ 3*bird.height/4;

    if (planeX>birdX && planeX<birdX+bird.width && planeInBetweenBirdsHeight) {
      gameOver = true;
    }
  });

  if (gameOver) {
    return gameOver;
  }
}

//function to render birds on the game play screen
function renderBirds(birds,timeCounter) {
  if (timeCounter%25===0) {
    birds.push(new Bird(ctx))
  }
  birds.forEach((bird,index) => {
    bird.update();
    if (bird.x+bird.width<0) {
      birds.splice(index,1);
    }
  })
}
