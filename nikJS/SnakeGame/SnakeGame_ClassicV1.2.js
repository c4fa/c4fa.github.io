// Classic Snake Game
// Version V1.2 _Online
// Author _  Nikesh Bajaj
// PhD Scholar : Queen Mary University of London & University of Genova
// http://nikeshbajaj.in
// n.bajaj@qmul.ac.uk
// bajaj.nikkey@g.gmail.com

var S1;
var x, y;
var eaten =false
var nFruits;
var dis=60;
var dis2 =60;
var DispInfo =false
var speed = 4
var GameStarted = false;
var b1, b2;

var eatS, dieS,BackS;
function preload(){
	// eatS = loadSound("https://raw.githubusercontent.com/Nikeshbajaj/ClassicSnakeGame/master/Event4.wav");
	// dieS = loadSound("https://raw.githubusercontent.com/Nikeshbajaj/ClassicSnakeGame/master/Event_Die.mp3");
	// BackS = loadSound("https://raw.githubusercontent.com/Nikeshbajaj/ClassicSnakeGame/master/Background1.wav");
	eatS = loadSound("SnakeGame/sounds/Event_Eat.mp3");
	dieS = loadSound("SnakeGame/sounds/Event_Die.mp3");
	BackS = loadSound("SnakeGame/sounds/Background.mp3");
	BackS.loop();
}

function setup() {
	//translate(300, 0);
	var cnv = createCanvas(600,600);
	var shiftX = (windowWidth-600)/2;
	cnv.position(shiftX,0);
	//translate(shiftX, 0);
	S1 = new Snake(100,100,1,0,speed,2,20)
	x = width/2
	y = height/2
	frameRate(100);
	GameStarted = false
	nFruits  = 0
	height = 540;
	b1 = new Button(width-100,height+10,30,"ReStart")
	b2 = new Button(width-230,height+10,30,"PlayPause")
}

function draw() {
		background(255);
		
		fill(255)
		strokeWeight(5)
		rect(0,0,width-2,height+50)
		rect(0,0,width-2,height-2)
		//fill(255)
		strokeWeight(1)
		b1.draw();
		if(b1.isCliked()){setup();}
		b2.draw();
		if(b2.isCliked()){GameStarted = !GameStarted;}
		MPressed =false;
		if(GameStarted){
		if(!S1.gameOver){	
			S1.moveAndUpdate()
			S1.showTarget()
			S1.beInBox()
			if(!BackS.isPlaying()){
				BackS.play()
			}
			dis2=0
		}else{
			if(BackS.isPlaying()){
				BackS.stop();
				dieS.play();
			}
			S1.DrawOnly()
			textSize(30)
			fill(255,0,0)	
			text("Game Over....",width/4,height/2)
			text("Your Score : "+ S1.score,width/4,height/1.5)
			text("Press R key to Restart....", width/4,height/1.4)
		}

		}else{
			if(BackS.isPlaying()){
				BackS.pause();
			}
			S1.DrawOnly()
			textSize(30)
			text("Press P key to start....",width/4,height/1.5)
			text("Your Score : "+ S1.score, width/4,height/1.4)

		}
	

		if(dist(S1.x, S1.y,x,y)<S1.r ){
			eaten =true
			var tim = millis()
			eatS.play();
			while(millis()-tim<500){
			}
			S1.AddOrgan()
			S1.score++;
			dis=0
		}


		if(dis<60){
			textSize(40)
			fill(0,0,255,100)
			text("EATEN ....",width-300,100)
			fill(255)
			dis++
		}

		if(eaten){
			var gotT =false;
			while(!gotT){
				var xj = round(random(50,width-100))
			    var yj = round(random(50,height-100))
			    if(dist(xj,yj,x,y)>100){
			    	x =xj;
			    	y =yj;
				    x = x -x%5;
				    y = y -y%5;
				    eaten =false;
				    gotT=true;
				}
			}
		}


		fill(255,0,0,random(255))
		rect(x-10,y-10,20,20)

		fill(0)
		
		textSize(10)
		text("X : " + S1.x + " ax : " + S1.ax,20,560)
		text("Y : " + S1.y + " ay : " + S1.ay,20,580)
		text("|Left: a | Down : s|", 100,560)
		text("|Right : d |  Up : w|",100, 580)

		textSize(22)
		fill(0,255,255,10)
		rect(195,height,150,47);
		fill(0,0,255)
		text("  Score : " + S1.score,200,570)
		textSize(10)
		fill(0,0,255,100)
		text("(c) nikeshbajaj.in",width-100,15)
		fill(255)
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    var ai = 0;
	var aj = -1;
	S1.ChangeDirection(ai,aj);

  } else if (keyCode == DOWN_ARROW) {
    var ai = 0;
	var aj = 1;
	S1.ChangeDirection(ai,aj);
  }else if (keyCode == LEFT_ARROW) {
    var ai = -1;
	var aj = 0;
	S1.ChangeDirection(ai,aj);
  }else if (keyCode == RIGHT_ARROW) {
    var ai = 1;
	var aj = 0;
	S1.ChangeDirection(ai,aj);
  }
  
}


function keyTyped(){
	if(!eaten){
	if(key=='w' || key=='W'){
		var ai = 0;
		var aj = -1;

	S1.ChangeDirection(ai,aj)
	}

	if(key=='s' || key=='S'){
		var ai = 0;
		var aj = 1;

	S1.ChangeDirection(ai,aj)
	}

	if(key=='a' || key=='A'){
		var ai = -1;
		var aj = 0;

	S1.ChangeDirection(ai,aj)
	}

	if(key=='d' || key=='D'){
		var ai = 1;
		var aj = 0;

	S1.ChangeDirection(ai,aj)
	}
	}
	
	if(key=='p' || key=='P'){
		GameStarted = !GameStarted
	}

	if(key=='r' || key=='R'){
		setup()
	}


}

function Snake(x,y,ax,ay,speed,l,r){
	this.x  = x
	this.y  = y
	this.ax = ax
	this.ay = ay
	this.l  = l
	this.r  = r
	this.s0 =speed
	this.score =0
	this.gameOver=false
	this.Cells =[];

	this.Cells[this.l-1] = new Organ(this.x,this.y,this.ax,this.ay,this.r,this.s0,0,0)

	for (var i=this.l-2;i>=0;i--){
		this.x += this.r*this.ax
		this.y += this.r*this.ay
		this.Cells[i] = new Organ(this.x,this.y,this.ax,this.ay,this.r,this.s0,1,this.Cells[i+1])
	}

	this.moveAndUpdate = function(){
		this.x = this.Cells[0].x
		this.y = this.Cells[0].y
		this.ax = this.Cells[0].ax
		this.ay = this.Cells[0].ay
		this.l = this.Cells.length;

		for(var i=0;i<this.Cells.length;i++){
			if(i==0){fill(0,0,255)}
			if(i == this.Cells.length-1 && i!=0){fill(0,0,0)}
			this.Cells[i].UpdateOrgan()
			this.Cells[i].move()
			fill(255)
		}
		fill(0,0,255)
		this.Cells[0].draw()
		this.CheckClash();
		this.showTarget();
		this.beInBox();
	}

	this.DrawOnly = function(){
		for(var i=0;i<this.Cells.length;i++){
			if(i==0){fill(0,0,255)}else{fill(255)}
			if(i==this.Cells.length-1 && i!=0){fill(0,0,0)}
			this.Cells[i].draw()
			this.Cells[i].showTarget(20,200,30)
		}
	}

	this.showTarget = function(){
		for(var i=0;i<this.Cells.length;i++){
			this.Cells[i].showTarget(20,200,30)
		}
	}

	this.beInBox = function(){
		for(var i=0;i<this.Cells.length;i++){
			this.Cells[i].beInBox()
		}
	}


	this.ChangeDirection = function(axi,ayi){
		if(this.Cells[0].ax + axi == 0 && this.Cells[0].ay + ayi==0){

		}else{
			if(this.Cells[0].ax!=axi ||this.Cells[0].ay!=ayi){
			this.Cells[0].updateAxy(axi,ayi)
			}
		}
	}


	this.ChangeDirection0 = function(axi,ayi){
		if(this.Cells[0].ax!=axi ||this.Cells[0].ay!=ayi){
		this.Cells[0].updateAxy(axi,ayi)
		}
	}


	this.AddOrgan =function(){

	var l = this.Cells.length

	var xn = this.Cells[l-1].x - this.r*this.Cells[l-1].ax
	var yn = this.Cells[l-1].y - this.r*this.Cells[l-1].ay

	this.Cells[l] = new Organ(xn,yn,this.Cells[l-1].ax,this.Cells[l-1].ay,this.r,this.s0,0,0)

	this.Cells[l-1].isFollower =true
	this.Cells[l-1].follower = this.Cells[l]
	}

	this.CheckClash = function(){
		var x0 = this.Cells[0].x
		var y0 = this.Cells[0].y

		for(var i=1;i<this.Cells.length;i++){
			if(dist(x0,y0,this.Cells[i].x,this.Cells[i].y)<this.r/1.5){
				this.gameOver = true
			}
		}	
	}

}

function Organ(x,y,ax,ay,r,s0,isFollowed,follower){
	this.x =x
	this.y =y
	this.r =r
	this.speed =s0
	this.ax =ax;
	this.ay =ay;
	this.xt =[];
	this.yt =[];
	this.axt=[];
	this.ayt=[];

	if(isFollowed==1){

		this.isFollower = true
		this.follower   = follower
	
	}else{
		
		this.isFollower = false
		this.follower = 0
	}


	this.move=function(){
		this.x += this.speed*this.ax
		this.y += this.speed*this.ay
		this.draw()
	}
	this.draw =function(){
		ellipse(this.x,this.y,this.r,this.r)
	}

	this.isGot2Target = function(){
		//sdfkjsdhfk
		return this.xt.length>0
	}

	this.clearTargets = function(){
		this.xt=[]
		this.yt=[]
		this.axt=[]
		this.ayt=[]
	}

	this.showTarget = function(a,b,c){
		fill(a,b,c,100)
		for(var i=0;i<this.xt.length;i++){
			ellipse(this.xt[i],this.yt[i],this.r,this.r)
		}
		fill(0)
	}

	this.updateAxy = function(axi,ayi){
			this.ax = axi
			this.ay = ayi
			if(this.isFollower){
			this.follower.addTarget(this.x,this.y,this.ax,this.ay)
			}
	}

	this.UpdateOrgan = function(){
		if(this.isGot2Target()){
			 if(dist(this.x,this.y,this.xt[0],this.yt[0])==0){
				this.x = this.xt[0]
				this.y = this.yt[0]

				this.updateAxy(this.axt[0],this.ayt[0])
				
				var xti =[]
				var yti =[]
				var axi =[]
				var ayi =[]

				if(this.xt.length>1){					
					for (var i=1;i<this.xt.length;i++){
						xti[i-1] = this.xt[i]
						yti[i-1] = this.yt[i]
						axi[i-1] = this.axt[i]
						ayi[i-1] = this.ayt[i]
					}
				}

				this.clearTargets();

				if(xti.length>0){
					for (var i=0;i<xti.length;i++){
						this.xt[i] = xti[i]
						this.yt[i] = yti[i]
						this.axt[i] = axi[i]
						this.ayt[i] = ayi[i]
					}
				}
			}
		}
	}

	this.addTarget=function(xt1,yt1,axt1,ayt1){
		var l = this.xt.length
		if(this.xt[l-1]!=xt1 || this.yt[l-1]!= yt1){ 
			this.xt[l] = xt1
			this.yt[l] = yt1
			this.axt[l] = axt1
			this.ayt[l] = ayt1
		}
		else if(this.axt[l-1]!=axt1 || this.ayt[l-1] != ayt1){
			this.axt[l-1] = axt1
			this.ayt[l-1] = ayt1
		}
	}

	this.beInBox=function() {
		var d = 2;
		if(this.x > width - this.r) {this.x = this.r}
		if(this.x - this.r < 0) {this.x = width- this.r}
		if(this.y > height- this.r ) {this.y =this.r}
		if(this.y -this.r< 0) {this.y =height -this.r}
	}

}

var MPressed =false;

function mousePressed(){
	MPressed = true;
}


function Button(x,y,sz,label){
	this.x =x;
	this.y =y;
	this.d =sz;
	this.label1 = label
	this.l = this.label1.length*4/10;

	this.drawAndUpdate =function(){
		this.draw();
		this.updateState();
	}

	this.draw =function(){
		fill(0,0,255,50);
		rect(this.x,this.y,this.d*this.l,this.d);
		fill(0)
		textSize(this.d/1.5)
		//textAlign(CENTER);
		text(this.label1,this.x+this.d/8,this.y+this.d/5,this.x+this.d,this.y+this.d);
	}
	this.isCliked =function(){
		if(mouseX<this.x + this.d*this.l && mouseX > this.x && mouseY<this.y + this.d && mouseY > this.y){
			if(MPressed){
				MPressed =false;
			return true;
			}
		return false;
		}
	return false;
	}
}