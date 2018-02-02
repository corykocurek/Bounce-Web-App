// JavaScript Document

var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var c = canvas.getContext('2d');


var mouse = { x: undefined, y: undefined }

//Available Color Pool
var colorArray = [
'#292C44',
'#FF5349',
'#d8d8d8',
'#18CDCA',
'#4F80E1'
];

//Randomize Color
function getColor(){
	var color = colorArray[Math.floor(Math.random() * colorArray.length)];

	return color
}


//Mouse Location
window.addEventListener('mousemove', function(event){
	
	mouse.x = event.x;
	mouse.y = event.y;
		
})

//Mouse Pressed
var mDown = false;

window.addEventListener('mousedown', function(){
	mDown = true;
	});
	
window.addEventListener('mouseup', function(){
	mDown = false;
	});	


//Responsive Window
window.addEventListener('resize', function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

//Load Objects
init()
	
});


//Circle Objects
function Circle(x, y, dx, dy, radius, color, speed) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.color = color;
	this.minRadius = radius;
	this.maxRadius = radius*5;
	this.speed = speed;
	
	
	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius ,0 , Math.PI * 2, false);
		//c.strokeStyle = "black";
		c.fillStyle = this.color;
		c.fill();
		//c.stroke();
		
	}
	
	this.update = function() {
			
			if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
				this.dx = -this.dx;
			}

			if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
				this.dy = -this.dy;
			}

			this.x += this.dx;
			this.y += this.dy;

//Interaction

if (mouse.x - this.x <30 && mouse.x -this.x >-30 && mouse.y - this.y <30 && mouse.y -this.y >-30 && this.radius <= this.maxRadius){
	
		this.radius +=3;
								
			}
	else if (this.radius >= this.minRadius){
		
		this.radius -=2;
		
	}
	
	if (this.radius >= this.maxRadius){
		this.radius = this.maxRadius;	
	}
	


if (mDown == true){
if (this.x > mouse.x){
		this.dx = -Math.abs(this.dx);	
			}
			else{
		this.dx = Math.abs(this.dx);	
			}

if (this.y > mouse.y){
		this.dy = -Math.abs(this.dy);	
			}		
			else{
		this.dy = Math.abs(this.dy);	
			}	

}
	this.draw();
			
			
		}
		
	}
	
	
	
//Initial Objects
var circleArray = [];
for(var i = 0; i <1000; i++){
var radius = Math.random()*15+2;
var speed = 3;	
var x = Math.random() * (innerWidth - radius*2) + radius;
var dx = (Math.random()  * (speed/2));
var y = Math.random() * (innerHeight - radius*2) + radius;
var dy = (Math.random()  * (speed/2));
var color = getColor();	
circleArray.push(new Circle(x, y, dx, dy, radius, color, speed));	
	
}


//Responsive Objects
function init(){
	
circleArray = [];

for(var i = 0; i <1000; i++){
var radius = Math.random()*15+2;
var speed = 3;	
var x = Math.random() * (innerWidth - radius*2) + radius;
var dx = (Math.random()  * (speed/2));
var y = Math.random() * (innerHeight - radius*2) + radius;
var dy = (Math.random()  * (speed/2));
var color = getColor();	
circleArray.push(new Circle(x, y, dx, dy, radius, color, speed));	
	
}
	
	
	
	
}


//Animation
function animate(){
requestAnimationFrame(animate);	
//c.fillStyle = 'rgba(0, 0, 0, 0.05)';
//c.fillRect(0,0,canvas.width,canvas.height);
c.clearRect(0,0, innerWidth,innerHeight);


for (var i = 0; i < circleArray.length; i++){
	circleArray[i].update();
	}


}

animate();

