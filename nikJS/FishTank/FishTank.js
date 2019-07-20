var Fishes =[]
var angle  =0


var BackS;
function preload(){
	BackS = loadSound("FishTank/sounds/Background.mp3");
	BackS.loop();
}



function setup() {
createCanvas(windowWidth, windowHeight);
//noStroke();
var nF = 100
for(var i=0;i<nF;i++){ 
	var x = round(random(100, width-10))
	var y = round(random(100, height-10))
	var d = 10*round(random(3,7))
	var s = round(random(1,6))
	Fishes[i] = new Fish(x,y,s,d)

}


//fish1 = new Fish(200,200,4,100)

//fish2 = new Fish(400,200,6,50)

}

function draw() {
	background(0,0,250);
	noFill();
    if(!BackS.isPlaying()){BackS.play();}
    for(var i=0;i<width;i+=30){
    	//var p = 10*sin(angle+i)
    	//ellipse(i+10,p + (height-100),10,10)
    	for(var j = 30;j<height;j+=100){	
    		var p = 10*sin(angle+i+j)
    		ellipse(i+10,p + j,10,10)
    		angle+=0.0001
    	}
    	//ellipse(100 +p,i,10,10)

    	//angle+=0.001
    }
     
    for(var i=0;i<Fishes.length;i++){
    	Fishes[i].move()

   	    if(random(100)>99){
   	    	Fishes[i].ax = -Fishes[i].ax
	    }
    	if(random(100)>99){
    		Fishes[i].ay = -Fishes[i].ay
    	}
    }

	fill(0,255,0)
    for(var i=height/1.5;i<height;i+=15){
    	
    	for(var j = 30;j<width;j+=100){	
			
			var p1 = 10*sin(angle+i+j)
    		
    		ellipse(j+100 +p1, i,7,7)
    	}
    }
    



}


function Fish(x,y,speed,size){

	this.x = x
	this.y = x
	this.speed = speed
	this.size = size
	this.ax = 1
	this.ay = 1


	this.move = function(){
		this.x +=speed*this.ax
		this.y +=speed*this.ay
		this.BeIn()
		this.Drawfish(this.x,this.y,this.size)
		
	}

	this.Drawfish = function(x,y,d){
		if(this.ax>0){
		fill(0)
		triangle(x-d/4,y,x-d/1.5,y-d/4,x-d/1.5,y+d/4)
		fill(255)
		ellipse(x,y,d,d/2)
		fill(0)
		ellipse(x+d/3,y-d/10,d/10,d/10)
		arc(x+d/3,y+d/12,d/4,d/10,0,PI)

		}else{
		fill(0)
		triangle(x+d/4,y,x+d/1.5,y-d/4,x+d/1.5,y+d/4)
		fill(255)
		ellipse(x,y,d,d/2)
		fill(0)
		ellipse(x-d/3,y-d/10,d/10,d/10)
		arc(x-d/3,y+d/12,d/4,d/10,0,PI)
		}
	}

	this.BeIn = function(){
		if(this.x < 0+this.size || this.x > width-this.size){this.ax = -this.ax;}
		if(this.y < 0+this.size || this.y > height-this.size){this.ay = -this.ay;}
	}











}