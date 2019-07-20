var Balls =[]


function setup() {
//createCanvas(600,600);
var cnv = createCanvas(600,600);
var shiftX = (windowWidth-600)/2;
cnv.position(shiftX,0);
//frameRate(1)
Balls[0] = new Ball(100,100,1,1,4,50)
}

function draw() {
	background(255);
	strokeWeight(4)
	rect(0,0,width-1,height-1)
	noFill();
	for(var i=0;i<Balls.length;i++){
		Balls[i].fall()
		Balls[i].drawBall()
	}
	fill(0,0,255)
	stroke(0,0,255);
	textSize(20);	
	text('Click with mouse to create a ball', width/4,height-10)

	// if(mouseIsPressed){
	// 	//ellipse(mouseX,mouseY,100,100)

		
	// 	Balls[Balls.length] = new Ball(mouseX,mouseY,1/3,1,4,10)
	// 	Balls[Balls.length] = new Ball(mouseX,mouseY,-1/3,1,4,10)
	// 	Balls[Balls.length] = new Ball(mouseX,mouseY,1/3,-1,4,10)
	// 	Balls[Balls.length] = new Ball(mouseX,mouseY,-1/3,-1,4,10)

	// 	Balls[Balls.length] = new Ball(mouseX,mouseY,-1/3,-1/2,4,10)
	// 	Balls[Balls.length] = new Ball(mouseX,mouseY,1/2,-1/2,4,10)
	// 	Balls[Balls.length] = new Ball(mouseX,mouseY,-1/3,-1/2,4,10)
	// 	Balls[Balls.length] = new Ball(mouseX,mouseY,1/6,-1/2,4,10)
	// }


}

function mousePressed(){
    Balls[Balls.length] = new Ball(mouseX,mouseY,random(-2,2),random(-2,2),1+random(10),10*(1+random(5)))
}



function Ball(x,y,ax,ay,speed,d){

	this.x = x;
	this.y = y;
	this.ax = ax;
	this.ay = ay;
	this.speed = speed;
	this.d = d;
	this.x0 = 0;
	this.xl = width;
	this.y0 = 0;
	this.yl = height //-100;
	this.g =4

this.drawBall = function(){
	strokeWeight(1)
	//fill(255,0,100,100)
	//fill(random(255),random(255),random(255))
	fill(4*this.d,0,255-4*this.d)
	ellipse(this.x,this.y,this.d,this.d);
}

this.move = function(){
	this.x += this.speed*this.ax
	this.y += this.speed*this.ay
	//Reflection
	var mar = 0//10
	if(this.x + this.d/2 +mar > this.xl || this.x -this.d/2 - mar < this.x0 ){this.ax = -this.ax}
	if(this.y + this.d/2 +mar > this.yl || this.y -this.d/2 - mar < this.y0 ){this.ay = -this.ay}
	}

this.fall = function(){
	
	this.x += this.speed*this.ax
	this.y += this.speed*this.ay
	//if(this.y >=height - this.d/2 ){this.y = height-this.d/2}	
	if(this.ay > 0){ this.ay = this.ay*1.01}
	if(this.ay < 0){ 
		this.ay = this.ay/1.02
		if(this.ay>-0.05){
			this.ay = -this.ay
		}
	}

	if(this.y >=height - this.d/2 ){this.ay = -this.ay/1.0}
	if(this.y < this.d/2 ){this.ay = -this.ay}

	this.ax = this.ax/1.001
	
	if(this.x >=width - this.d/2 ){this.ax = -this.ax/1.01}
	if(this.x <=this.d/2 ){this.ax = -this.ax/1.01}	

	}

}









/*
function keyTyped(){
	if(key=='s' || key=='S'){
		 //setup();
	}
	if(key=='c' || key=='C'){
		//colori++;
		//setColorName(colori)
		//if(colori>8){colori=0}
	}

	if(key=='a' || key=='A'){
		//AddBall()
	}

	if(key=='l' || key=='L'){
		//ClashEnable =!ClashEnable
	}

	if(key=='k' || key=='K'){
		//var i = round(random(0 ,B.length-1))
		//KillIBall(i)
	}
	if(key=='r'){
		//if(d>2){
		//	d-=2;
		//}
	}
	if(key=='R'){
		//d+=2;
	}
}


function mousePressed(){
	//MPressed = true;
}
*/