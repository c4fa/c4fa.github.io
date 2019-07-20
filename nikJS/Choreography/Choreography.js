//--Programming & FUN with ART--------------
//----------Choreography-------------------
//There are two toys, which dance on beats of music, a FUNNY and good visualizer
//Nikesh Bajaj
//n[DOT]bajaj[@]qmul[DOT]ac[DOT].uk
//bajaj[DOT]nikkey@gmail[DOT]com
//https://nikeshbaaj.in

var angle = 0;
var speed = 0.05;
var fft, analyzer, rms
var Dn,Dn2, xnois=0; 
var xdd = 10;
var dur;
var MySounds =[];
var TrackN=0
var TotalTracks=7;
var mySound;
var button;

function preload() {
	soundFormats('mp3', 'ogg','wav');
for(var i = 1;i<=TotalTracks;i++){
     filn = "Choreography/Tracks/Track"+i+".mp3";
   MySounds[i-1] = loadSound(filn);

}

}

function setup() {
	createCanvas(windowWidth, windowHeight);
	mySound = MySounds[TrackN]
	mySound.play();
	fft = new p5.FFT();
	analyzer = new p5.Amplitude();


	fft.setInput(mySound);
	analyzer.setInput(mySound);

	Dn = new MAN(200,height-200,[255,255,0,200]);
	Dn2 = new MAN(300,height-200,[255,0,255,200]);

	dur = mySound.duration();
	button = createButton('NEXT TRACK');
  	button.position(80, 28);
  	button.mousePressed(changeTrack)
}

function draw() {
	rms = analyzer.getLevel();
	rms =10*rms;

	background(0);
	fill(150,50)
	plotSinWave1(300*rms,0.001,angle*100,0,width,10,300)
	fill(150,50)
	plotSinWave1(100*rms,0.001,angle*200,0,width,10,100)
	fill(150,50)
	plotSinWave1(100*rms,0.005,angle*200,0,width,5,300)

	var waveform = fft.waveform();
  	noFill();
  	beginShape();
  	stroke(255,0,0); // waveform is red
  	strokeWeight(1);
	for (var i = 0; i< waveform.length; i++){
	    var x = map(i, 0, waveform.length, 0, width);
	    var y = map( waveform[i], -1, 1, 0, height);
	    vertex(x,y);
	}
	endShape();

	var win=128
	for (var i = 0; i< waveform.length; i+=win){
	    var x = map(i, 0, waveform.length, 0, width);
	    var y =0
	    for(var w=0;w<win;w++){
	    	y+= map(waveform[i+w], -1, 1, 0,100)
	    }
	    y=y/win
	    fill(255)
	    rect(x+45,height/2- y,10,30);
	    rect(x,height/2-y,100,10);
	    y = map(y,0,100,0,300) -100
	    ellipse(x+50,height/2-10-y,10,10)
	}
	

	angle+=speed;
	stroke(0); 
    var spectrum = fft.analyze();
   	var win =20
   	var tbeat=0
   	for (ij = 0; ij<spectrum.length; ij+=win) {
	    if(ij%win ==0){
		    var sx=0
		    for (var w=0;w<win;w++){
		    	sx += spectrum[ij+w]
			}
			sx=sx/win
			if(ij==win*10){
				tbeat = sx
			}
	    	fill(0,255,0,200)
	    	ellipse(ij+30,map(sx, 0, 255, height, 0),10,10)
	    }
   }

   var win =20
   var tbeat=0
   for (ij = 0; ij<spectrum.length; ij+=win) {
    if(ij%win ==0){
    	var sx=0
	    for (var w=0;w<win;w++){
	    	sx += spectrum[ij+w]
		}
		sx=sx/win
		if(ij==win*10){
			tbeat = sx
		}
    	fill(0,255,255,100)
    	rect(ij+20,map(sx, 0, 255, height, 0)+15,10,height -map(sx, 0, 255, height, 0))
    }
    	
   }

   	xnois+=0.01;
	noi = 2*noise(xnois) -1;
	noi = 10*noi;

	Dn.disp();
	Dn2.disp();
	var beat = 10;
	if(rms<1){beat=1}

	var xLH = [beat*random(-1,1),beat*random(0,10)]
	var xRH = [beat*random(-1,1),beat*random(0,10)]
	if(random(0,1)>0.5){Dn.dance(xLH,xRH)}
	else{Dn2.dance(xLH,xRH)}

	fill(255)
	stroke(50)
	rect(10,10,width-50,10)
	
	var cdur  = mySound.currentTime()
	var bw = (width-50)*cdur/dur
	stroke(255,0,0,200)
	if(cdur>dur/2){stroke(0,0,255,200)}
	rect(10,10,bw,10)
		

	Dn.x = Dn.x + beat*xdd/10
	Dn2.x = Dn2.x + beat*xdd/10

	xdd=-xdd;

	Dn.x = Dn.x+noi;
	
	if(Dn.x<100){Dn.x=width-110}
	if(Dn.x>width-100){Dn.x=110}
	stroke(0)
	strokeWeight(1)
	noFill()

	if(cdur>dur/2){
		Dn.y = 150 -rms*20
		Dn2.y =150 -tbeat
		stroke(0);
		fill(255,0,0,200)
		ellipse(noise(xnois)*width,noise(xnois +10)*height,20*(1+rms),20*(1+rms))
		fill(0,0,255,200)
		ellipse(noise(xnois+10)*width,noise(xnois +30)*height,20*(1+rms),20*(1+rms))

	}else{
		
		Dn.y = height-200 -rms*20
		Dn2.y = height-200 -tbeat
		stroke(0);
		fill(0,0,255,200)
		ellipse(noise(xnois)*width,noise(xnois +10)*height,20*(1+rms),20*(1+rms))
	}

	if(cdur>=dur){xnois=0}
	if(cdur<10){
	stroke(255)
	fill(255)
	textSize(30)
	text("Watch whole choreography, you will enjoy it", width/3, height/5,600,500)

	}

	if(cdur>17){
		stroke(255)
		fill(255)
		textSize(30)
		if(TrackN==2){
			text("Ohh yess!!! Bollywood-remix!!!!", width/3, height/7,600,500)	
		}
	}

	///text("Randomness is FUN!!!!", width/3, height/7,600,500)	
	
	stroke(255)
	fill(255)
	textSize(15)
	text("Click 'n' or 'N' to change the Track", width/1.2, 30,150,300)
	textSize(20)
	text('Track'+(TrackN+1),10, 30,600,500)

	textSize(10)
	stroke(255,0,0,150)
	fill(255,0,0,150)
	text("The movement of dancing objects(including toys) is dependent of the beat and volume and LOT OF RANDOMNESS!!!, you might find interesting", width-150, height-100,150,500)
	text("(c)nikeshbajaj.in", width-150, height-20,150,500)

	if(mySound.isPlaying()){ }
	else{
		TrackN = TrackN+1;
		if(TrackN >=TotalTracks){
			TrackN =0;
		}
		if(mySound.isPlaying()){
		mySound.stop();
		}
		setup();
		}
	// button = createButton('Next track');
 //  	button.position(19, 19);
  	//button.mousePressed(changeTrack)
}

function plotSinWave1(A,frq,ph,time1,time2,samp,yax){
	for (var i=time1;i<time2;i+=samp){
		var t = i
		var y = yax + A*sin(2*PI*frq*t + radians(ph))
		ellipse(i,y,5,5)
	} 
}

function keyTyped(){
	if(key=='n' || key=='N'){
		TrackN = TrackN+1;
		if(TrackN >=TotalTracks){
			TrackN =0;
		}
		if(mySound.isPlaying()){
		mySound.stop();
		}
		mySound.stop();
		setup();
	}
}

function changeTrack(){
	TrackN = TrackN+1;
	if(TrackN >=TotalTracks){
		TrackN =0;
	}
	if(mySound.isPlaying()){
	mySound.stop();
	}
	mySound.stop();
	setup();
}




function MAN(x,y,color){
	this.x =x
	this.y =y
	this.c=color;
	this.LH =[this.x-50,this.y-50]
	this.RH =[this.x+50,this.y-50]
	this.xLH =[0,0]
	this.xRH =[0,0]

	this.LL =[this.x-30,this.y+150]
	this.RL =[this.x+30,this.y+150]
	this.xLL =[0,0]
	this.xRL =[0,0]

	this.update =function(){
		this.LH =[this.x-50,this.y-50]
		this.RH =[this.x+50,this.y-50]
		this.LL =[this.x-30,this.y+150]
		this.RL =[this.x+30,this.y+150]
	}


	this.disp =function(){

		fill(255)
		stroke(255)
		strokeWeight(10)
		line(this.x,this.y+60,this.LH[0]+this.xLH[0],this.LH[1]+this.xLH[1])
		line(this.x,this.y+60,this.RH[0]+this.xRH[0],this.RH[1]+this.xRH[1])

		line(this.x,this.y+60,this.LL[0]+this.xLL[0],this.LL[1]+this.xLL[1])
		line(this.x,this.y+60,this.RL[0]+this.xRL[0],this.RL[1]+this.xRL[1])

		stroke(0)
		ellipse(this.x,this.y+60,50,100)
		fill(this.c[0],this.c[1],this.c[2],this.c[3])
		ellipse(this.x,this.y,30,30)
		this.update()

	}
	this.dance =function(xLH,xRH){
		this.xLH =[xLH[0],xLH[1]]
		this.xRH =[xRH[0],xRH[1]]
		//this.y = this.y + random(-2,2)
		
		this.xLL =[xLH[0],0]
		this.xRL =[xRH[0],0]
	}

}
