// Nikesh Bajaj
//https://nikeshbaaj.in
//For this visualizer, I have used two parameters which are currenlty 
//being changed by sine function, can be read from external file

var angle = 0;
var speed = 0.05;
var xdis;

var angle2 = 0
var scalar2 = 255;

var p1   // Parameter 1
var p2   // Parameter 2

function setup() {
	createCanvas(windowWidth, windowHeight);
	fill(0);
	xdis = width/10
}

function draw() {
	background(0);
	fill(150,50)
	plotSinWave1(300,0.001,angle*100,0,width,10,300)
	fill(150,50)
	plotSinWave1(100,0.001,angle*200,0,width,10,100)
	fill(150,50)
	plotSinWave1(100,0.005,angle*200,0,width,5,300)

	
	angle2 += PI/1.05
	
	
	var h2 = height/1.2

	for(var i=xdis/2;i<width;i+=xdis){
		for(var j=-5;j<5;j++){
			strokeWeight(4)
			stroke(100,10)
			line(i,height,i,0)
		}
		
		var a1 = round(random(0,255))
		var a2 = round(random(0,255))
		var a3 = round(random(0,255))

		p1 = (1+sin(angle2))*scalar2;
		angle2+=PI/10

		fill(p1,50)
		ellipse(i,height/2,xdis,xdis)
		fill(a2,a1)
		ellipse(i,height/2,xdis/2,xdis/2)
		fill(a3,a1)
		ellipse(i,height/2,xdis/4,xdis/4)


		var ha2 = -50*(p1/255)

		fill(200,200)
		ellipse(i,h2+ha2,xdis/4,xdis/4)		

		push()
		scale(1+p1/255)
		fill(200,200)
		ellipse(i/(1+p1/255),(height -h2)/(1+p1/255),xdis/4,xdis/4)				
		pop()


		fill(200,255-p1)
		for(var j =-3;j<3;j++){
			for(var k=-3;k<3;k++){
			   ellipse(i-10*j+10*k,height/2+10*j+10*k - height/3,xdis/20,xdis/20)
			
			}
		}

		strokeWeight(4)
		stroke(100,10)
		fill(255)

		for(var j=-7;j<7;j++){

			p2 =  20*sin(0.2*angle2/(j+0.1))

			stroke(250,100)
			strokeWeight(7)
			line(i+10*j,height,i+10*j,height-height/15 +p2)
			stroke(250,100)
			strokeWeight(1)
			ellipse(i+10*j,height-height/15 + p2 -20,7,7)

		}
		strokeWeight(1)
		stroke(0)
		fill(255)

	}

	angle+=speed; 	
}


function plotSinWave1(A,frq,ph,time1,time2,samp,yax){
	for (var i=time1;i<time2;i+=samp){
		var t = i
		var y = yax + A*sin(2*PI*frq*t + radians(ph))
		ellipse(i,y,5,5)
	} 
}

