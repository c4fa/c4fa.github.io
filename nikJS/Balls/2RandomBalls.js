var x0 =100;
var y0 =100;

var x1 =100;
var y1 =100;

var r =40; 
var xx = 1;
var yy = 1;

var xx1 = -1;
var yy1 = -1;

var p = 99
//var speed = 4;
function setup() {
createCanvas(windowWidth, windowHeight);
stroke(0);

}

function draw() {
	background(255);
	//fill(255,0,0);
	noFill();
	stroke(3);
	rect(0,0,width-1,height-1);
	noStroke();
	//var u  = random();
    //fill(random(255))
    //ellipse(int(abs(random(width))),int(abs(random(height))),40*u,40*u);
    //ellipse(50,50,10,10);

    x0 = newPointX(x0,2)
    y0 = newPointY(y0,2)
    fill(255,0,0);
    stroke(0);
    ellipse(x0,y0,r,r);
    //fill(0)
    //ellipse(x0+5,y0-5,r/4,r/4);

    //if(random(100)>99){xx = -xx}
    //if(random(100)>99){yy = -yy}
    
    x1 = newPointX1(x1,2)
    y1 = newPointY1(y1,2)
    fill(0,255,0);
    ellipse(x1,y1,r,r);
    
    

    /*
    if(random(10)>9.9){xx = -xx}
    x  = x + xx*random(4);
	if(random(10)>9.9){yy = -yy}
    y  = y + yy*random(4);
	if(x<0+r || x>width-r){xx = -xx;}
	if(y<0+r || y>height-r){yy = -yy;}
	*/
}

function newPointX(x,speed){
	if(random(100)>p){xx = -xx}
    //x  = x + xx*random(speed);
	x  = x + xx*speed;
	if(x<0+r || x>width-r){xx = -xx;}
	return x
}

function newPointY(y,speed){
	if(random(100)>p){yy = -yy}
    //y  = y + yy*random(speed);
	y  = y + yy*speed;
	if(y<0+r || y>height-r){yy = -yy;}
	return y
}

function newPointX1(x,speed){
	if(random(100)>p){xx1 = -xx1}
    //x  = x + xx*random(speed);
	x  = x + xx1*speed;
	if(x<0+r || x>width-r){xx1 = -xx1;}
	return x
}

function newPointY1(y,speed){
	if(random(100)>p){yy1 = -yy1}
    //y  = y + yy*random(speed);
	y  = y + yy1*speed;
	if(y<0+r || y>height-r){yy1 = -yy1;}
	return y
}
/*
class ball(x,y,r){
	var x0 = x;
	var y0 = y;
	var ra = r;
	var xx = 1;
	var yy = 1;
	var s = 4;

public drawballX(){
	fill(255,0,0);
    ellipse(x0,y0,r,r);	
}

public updateXY(){
	if(random(100)>99.9){xx = -xx}
	x0  = x0 + xx*s;
	if(x0<0+ra || x0>width-ra){xx = -xx;}
	
	if(random(100)>99.9){yy = -yy}
	y0  = y0 + yy*s;
	if(y0<0+r || y0>height-ra){yy = -yy;}
	}


}


*/