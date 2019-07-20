// Sine Wave Oscilloscope
// Version V1.0
// @Author _  Nikesh Bajaj
// PhD Scholar : Queen Mary University of London & University of Genova
// http://nikeshbajaj.in
// n.bajaj@qmul.ac.uk
// bajaj.nikkey@g.gmail.com



var x1 =100, y1 =200;
var xw = 600, xh = 300;
//-----Sine Wave ----
var A = 0.5;
var freq = 1, angle = 0, speed = 3, samp = 40;
var t1 = x1;
var t2 = x1+xw;
var y0 =y1+xh/2;
var r =0, g =0, b =0;
var rad = 10;
//-------------------

var AddHarmonic=true;
var AmpP, AmpM;
var FreqP, FreqM;
var SampP, SampM;
var SpeedP, SpeedM;
var Color, Harm, RadP, RadM;
var MPressed =false



function setup() {
	//createCanvas(windowWidth, windowHeight);
	var cnv = createCanvas(800,700);
	var shiftX = (windowWidth-800)/2;
	cnv.position(shiftX,0);
	//fill(0);
	textFont('Arial')
	textSize(15)
	var hx   = 580;
	var DiaB = 40
	var bs = 120;
	var bd = 50

	
	AmpP = new ButtonC(bs,hx,DiaB,'Amp+')
	AmpM = new ButtonC(bs+1*bd,hx,DiaB,'Amp-')
	FreqP  = new ButtonC(bs+2*bd,hx,DiaB,'Freq+')
	FreqM = new ButtonC(bs+3*bd,hx,DiaB,'Freq-')
	SampP  = new ButtonC(bs+4*bd,hx,DiaB,'Samp+')
	SampM  = new ButtonC(bs+5*bd,hx,DiaB,'Samp-')
	SpeedP = new ButtonC(bs+6*bd,hx,DiaB,'Speed+')
	SpeedM = new ButtonC(bs+7*bd,hx,DiaB,'Speed-')
	Harm = new ButtonC(bs+8*bd,hx,DiaB,'Harm')
	Color = new ButtonC(bs+9*bd,hx,DiaB,'Color')
	RadP = new ButtonC(bs+10*bd,hx,DiaB,'Rad+')
	RadM = new ButtonC(bs+11*bd,hx,DiaB,'Rad-')
}

function draw() {
	background(255);

	Dashboard()
	strokeWeight(2)
	
	
	
	
	if(AddHarmonic ==true){
		fill(255*(1-r),255*g,255*b)
		plotSinWave1(0.5*A*(xh/2),2*freq,angle,t1,t2,samp,y0)
		fill(255*r,255*(1-g),255*b)
		plotSinWave1(0.2*A*(xh/2),3*freq,angle,t1,t2,samp,y0)
	}

	fill(255*r,255*g,255*b)
	plotSinWave1(A*(xh/2),freq,angle,t1,t2,samp,y0)


	angle+=speed; 

	AmpP.drawButton()
	AmpM.drawButton()

	FreqP.drawButton()
	FreqM.drawButton()

	SampP.drawButton()
	SampM.drawButton()

	SpeedP.drawButton()
	SpeedM.drawButton()

	Color.drawButton()
	Harm.drawButton()

	RadP.drawButton()
	RadM.drawButton()


	if(AmpP.isClicked()){Amplitude(1)}
	if(AmpM.isClicked()){Amplitude(0)}
	if(FreqP.isClicked()){Frequency(1)}
	if(FreqM.isClicked()){Frequency(0);}
	if(SampP.isClicked()){Sampling(1);}
	if(SampM.isClicked()){Sampling(0);}
	if(SpeedP.isClicked()){SpeedPlay(1)}
	if(SpeedM.isClicked()){SpeedPlay(0)}
	if(Color.isClicked()){xColor();}
	if(Harm.isClicked()){AddHarmonic=!AddHarmonic;}
	if(RadP.isClicked()){Radious(1)}
	if(RadM.isClicked()){Radious(0);}


}

function plotSinWave1(A,frq,ph,time1,time2,samp,yax){
	//fill(0,0,255)
	strokeWeight(1)
	stroke(0)
	var oneS = time2-time1;
	for (var i=time1;i<=time2;i+=oneS/samp){
		var t = (i -time1)/oneS
		var y = yax + A*sin(2*PI*frq*t + radians(ph))
		ellipse(i,y,rad,rad)

	} 
}

function Dashboard(){
	fill(255)
	strokeWeight(10)
	rect(0,0,width-10,height)
	strokeWeight(10)
	stroke(200,90,100,200)
	rect(x1,y1,xw,xh)
	noStroke()
	fill(0)
	textSize(40);
	fill(0,0,255)
	text("Sine Wave Oscilloscope",180, 80)
	textSize(15);
	//text("Key : "+ key,200,600)
	text('nikeshbajaj.in',width-120,30)
	textSize(25);
	text("Nik'B",width-90,height-30)
	textSize(15);
	fill(0,0,0)
	var textP = 120
	text('Amplitude (Volt) :' + A,100,textP)
	text('Frequency (Hz) :' + freq,100,textP+20)

	text('Sampling(Hz):' + (1+samp),500,textP)
	text('Playing Speed :' + speed,500,textP+20)
	text('Radius :' + rad,500,textP+40)

	text('Time (1 Sec window)',x1+xw/2.3 -40,y1+xh +30)
	text('Amp (V)',x1-40,y1+xh/2,1,100)
	

	//text('Control Parameters\n Amplitude : a/A\n Frequency : f/F\n Sampling : s/S',100,550,300, 300)
	//text('\n Playing Speed t/T\n Color :c\n Add/Remove first Harmonic :h ',400,550,300, 300)

}


function keyTyped(){
	if(key=='a' && A<1){A+=0.05;} 
	else if(key=="A"){A-=0.05;} 
	else if(key=="f"){freq+=0.5;}
	else if(key=="F"){freq-=0.5;} 
	else if(key=="s"){samp+=10;}
	else if(key=="S" && samp>0){samp-=10;} 
	else if(key=="t"){speed+=0.5;}
	else if(key=="T"){speed-=0.5;}
	else if(key=='c'){
		var ri = random()
		if(ri>0.8){r =1-r;}
		else if(ri<0.3){g =1-g;}
		else{b =1-b;}
	}
	else if(key=="r"){rad+=1;}
	else if(key=="R" && rad>0){rad-=1;}
	else if(key=="h"){AddHarmonic=!AddHarmonic;}
}

function Amplitude(b){
	if(b==1 && A<1){A+=0.05;} 
	else if(b==0){A-=0.05;} 
}


function Frequency(b){
	if(b==1){freq+=0.5;}
	else if(b==0){freq-=0.5;} 
}

function xColor(){
	var ri = random()
	if(ri>0.8){r =1-r;}
	else if(ri<0.3){g =1-g;}
	else{b =1-b;}
}

function Sampling(b){
	if(b==1){
	if(samp>=10){
		samp+=10;
	}else if(samp<10){
		samp+=1;
	}

	}
	else if(b==0 && samp>0){
		if(samp>10){
			samp-=10;
		}else if(samp<=10){
			samp-=1;
		}
	} 
}

function SpeedPlay(b){
	if(b==1){speed+=0.5;}
	else if(b==0){speed-=0.5;} 
}

function Radious(b){
	if(b==1){rad+=1;}
	else if(b==0 && rad>0){rad-=1;} 
}

function ButtonC(xi,yi,di,label){
	this.x = xi;
	this.y = yi;
	this.d = di;
	this.label = label

this.drawButton = function(){
	fill(255)
	strokeWeight(3)
	stroke(0)
	ellipse(this.x,this.y-10,this.d,this.d)
	ellipse(this.x,this.y-5,this.d,this.d)
	ellipse(this.x,this.y,this.d,this.d)
	fill(0)
	strokeWeight(0)
	textSize(this.d/4)
	textAlign(CENTER,CENTER)
	text(this.label,this.x,this.y)//,this.d,this.d)
}

this.isClicked = function(){
	//if(mouseX > this.x && mouseX < this.x + this.d && mouseY > this.y && mouseY < this.y + this.d){
	if(dist(mouseX,mouseY,this.x,this.y)<this.d){
			if(MPressed){
					MPressed = false;
					fill(0,0,0)
					ellipse(this.x,this.y-10,this.d,this.d)
					ellipse(this.x,this.y-5,this.d,this.d)
				return true;}
			else {return false;}
	}
	else {return false;}
}
}

function mousePressed(){
	MPressed = true;
}




