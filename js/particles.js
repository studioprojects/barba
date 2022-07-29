// grab the canvas from the DOM
const canvas = document.getElementById('canvas__home');
// set the context of the canvas to 2D
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// particles array
let particlesArray;
// mouse object
let mouse = {
    x: null, 
    y: null,
    radius: (canvas.height / 80) * (canvas.width / 80)
};
// particles colour
let particleColor = '#333'
// mouse listener
window.addEventListener ('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

//particle Class
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;        
    }
    // draw each individual particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = particleColor;
        ctx.fill();
    }
    // check particle position, mouse position, move and draw particle
    update() {
        // make sure particle within canvas
        if(this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX; // reverse direction when particle hits canvas edge
        }
        if(this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY; // reverse direction when particle hits canvas edge
        }
        // collison detection - mouse position and particle position (circle collision algorithm)
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy) * 3;

        if(distance < mouse.radius + this.size) { // create a buffer of 10 around the edge of the canvas
            if(mouse.x < this.x && this.x < canvas.width - this.size * 10) { // stop particles from colliding
                this.x += 10;
            }
            if(mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
            }
            if(mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10;
            }
            if(mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
            }
        }
        // move particle
        this.x += this.directionX * 0.1;
        this.y += this.directionY * 0.1;
        // draw particle
        this.draw();
    }
}

// create particle array
function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 4000;
    for(let i =0; i < numberOfParticles; i++) {
        let size = (Math.random() * 3) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = particleColor;

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for(let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

// check if particles are close enough to draw a connecting line
function connect() {
    let opacityValue = 1;
    for(let a = 0; a < particlesArray.length; a++) {
        for(let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
            + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if(distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacityValue = 1 - (distance / 20000);
                ctx.strokeStyle = 'rgba(50, 50, 50,' + opacityValue + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// resize event listener
window.addEventListener('resize', function() {
    canvas.width = innerWidth; // recalculate width
    canvas.height = this.innerHeight; // recalculate height
    mouse.radius = ((canvas.width / 80) * (canvas.height / 80));
    init();
})

// mouse out event listener
window.addEventListener('mouseout', function() {
    mouse.x = undefined;
    mouse.y = undefined;
})

init();
animate();

// console.log('slava russiya');