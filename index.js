 const canvas = document.getElementById('canvas');
 const ctx = canvas.getContext('2d');

 canvas.width = 600;
 canvas.height = 600;

 // get mouse properties
let mouse = {
  x: null,
  y: null,
  radius: (canvas.height/80) * (canvas.width/80)
}

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
})

class Particle {

  constructor(x, y, directionX, directionY, size, colour){
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.colour = colour;
  }

  draw(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
  }

  update(){

    if(this.x > canvas.width || this.x < 0){
      this.directionX *= -1;
    }

    if(this.y > canvas.height || this.y < 0){
      this.directionY *= -1;
    }

    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt((dx * dx) + (dy * dy));

    if (distance + mouse.radius < this.size){
      if(mouse.x > this.x && this.x < canvas.width - this.size * 10){
        this.x +=10;
      }

      if(mouse.x > this.x && this.x > canvas.width - this.size * 10){
        this.x -=10;
      }

      if (mouse.y < this.y && this.y < canvas.height - this.size * 10){
        this.y += 10;
      }

      if (mouse.y > this.y && this.y > this.size * 10){
        this.y -= 10;
      }
    }

    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}


function connect() {
  for (let a = 0; a < particlesArray.length; a++){
    for(let b = a; b < particlesArray.length; b++){

      let distance =
      ((particlesArray[a].x - particlesArray[b].x) *
      (particlesArray[a].x - particlesArray[b].x)) +
      ((particlesArray[a].y - particlesArray[b].y) *
      (particlesArray[a].y - particlesArray[b].y));

      if (distance < (canvas.width / 7) * (canvas.height / 7)){
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}



function init(){
  particlesArray = [];
  let numberOfParticles = 100;

  for(let i = 0; i <= numberOfParticles; i++){

    let size = (Math.random() * 5) + 1;
    let x = (Math.random() * ((innerWidth - size * 2) - (size*2 )) - size * 2);
    let y = (Math.random() * ((innerHeight - size * 2) - (size*2 )) - size * 2);
    let directionX = (Math.random() * 10) - 5;
    let directionY = (Math.random() * 10) - 5;
    let colour = 'white';

    particle = new Particle(x, y, directionX, directionY, size, colour);
    particlesArray.push(particle);
  }
}

function animate (){
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  particlesArray.forEach((particle) => {
    particle.update();
    connect();
  })
}

init();
animate();





























