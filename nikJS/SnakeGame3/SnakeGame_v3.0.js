var S =[];
var S1, S2
var x, y;
var eaten =false
var nFruits;;
var dis=60
var dis2 =60;
var DispInfo =false
var speed = 5
var GameStarted = false
var GameEnded =true;

var b1,b2, b3, b4;
var b5, b6, b7;
var P1opt,P2opt;
var fP1opt,fP2opt;
var tP1opt=0;
var tP2opt=0;

var tempMortal=true;
var tempAutoplayMode =false;
var tempSmartCrazy =true;
var tempTwoPlayers =false;


var Mortal=tempMortal;
var AutoplayMode =tempAutoplayMode;
var SmartCrazy =tempSmartCrazy;
var TwoPlayers =tempTwoPlayers;


var eatS, dieS,BackS;
function preload(){
	eatS = loadSound("SnakeGame3/sounds/Event_Eat.mp3");
	dieS = loadSound("SnakeGame3/sounds/Event_Die.mp3");
	BackS = loadSound("SnakeGame3/sounds/Background.mp3");
	BackS.loop();
}
function setup() {
	//createCanvas(800,600);
	var cnv = createCanvas(800,600);
	var shiftX = (windowWidth-800)/2;
	cnv.position(shiftX,0);
	frameRate(500);
	GameStarted = false
	GameEnded =false;
	nFruits  = 0
	height = height -60;
	width = width - 200;
	x = width/2
	y = height/2
	S =[];

	b1 = new SwitchOF(width+60,50,"Mortal","Immortal");
	b1.ON=tempMortal
	b3 = new SwitchOF(width+60,80,"One","Two Players");
	b3.ON=!tempTwoPlayers;

	b7 = new Button(width+15,200,25, "Apply and Restart");
	b6 = new Button(width+60,240,40,"Start");
	b5 = new SwitchOF(width+78,295,"  Play","Pause")
	b5.ON =false

	Mortal=tempMortal;
	TwoPlayers =tempTwoPlayers;
	fP1opt = tP1opt;

	fP2opt = tP2opt;

	var labels = ['Self','Crazy','Smart'];

	P1opt = new gridOption(width+10,140,true,labels);
	P1opt.Op = fP1opt;
	if(TwoPlayers){
		P2opt = new gridOption(width+120,140,true,labels);
		P2opt.Op =fP2opt;
	}else{
		P2opt = new gridOption(width+120,140,false,labels);
	}

	S1 = new Snake(100,100,1,0,speed,2,20,1)
	S1.mortality =Mortal
	S[0] =S1;
	if(TwoPlayers){
		S2 = new Snake(width -100,height-100,-1,0,speed,2,20,2)
		S2.mortality =Mortal
		S[1] =S2;
	}

	eatS.stop();
	dieS.stop();
	BackS.stop();

}

function draw() {

		background(255);
		fill(255)

		strokeWeight(5)
		rect(0,0,width+200,height+50)
		rect(0,0,width-2,height+50)
		rect(0,0,width-2,height-2)
		fill(255)
		strokeWeight(1)
		b1.drawAndUpdate();
		tempMortal = b1.ON;
		b3.drawAndUpdate();
		tempTwoPlayers = !b3.ON;
		P2opt.actv = !b3.ON;
		line(width,100,width+200,100)
		line(width,125,width+200,125)
		line(width,200,width+200,200)
		line(width,225,width+200,225)
		line(width,325,width+200,325)
		fill(0,0,255)
		text('Player1',width+10,120)
		P1opt.draw();
		tP1opt = P1opt.Op;
		if(TwoPlayers){fill(255,0,0)}
		else{fill(255,0,0,20)}
		text('Player2',width+120,120)

		P2opt.draw();
		tP2opt = P2opt.Op;
		fill(0);
		//text(fP1opt +"|"+ tP1opt,100,50)
		//text(fP2opt +"|"+ tP2opt,200,50)

		b5.drawAndUpdate();
		GameStarted = b5.ON;
		b6.draw();
		if(b6.isCliked()){
			GameStarted =true;
			b5.ON =true;
		}
		b7.draw();
		if(b7.isCliked()){setup()};

		MPressed =false;
		/*
		textSize(15)
		text("Applied Setting", width+10, 330)
		textSize(12)
		text("Mortality : " + Mortal, width+10, 350)
		text("Autoplay : " + AutoplayMode, width+10, 370)
		text("TwoPlayers : " + TwoPlayers, width+10, 390)
		text("SmartPlayer : " + SmartCrazy, width+10, 410)
		fill(255,0)
		rect(width+5, 310,150,110)
		*/

		if(GameStarted && !GameEnded){

			if(TwoPlayers){
				var GAMEOVER =S1.gameOver || S2.gameOver;
			}else{
				var GAMEOVER =S1.gameOver;
			}

			if(!GAMEOVER){
				for(var np=0;np<S.length;np++){
					S[np].moveAndUpdate()
				}
				if(!BackS.isPlaying()){
					BackS.play()
				}


				dis2=0
			}else{
				if(BackS.isPlaying()){
					BackS.stop();
					dieS.play();
				}

				for(var np=0;np<S.length;np++){
					S[np].DrawOnly();
				}

				textSize(30)
				fill(255,0,0)
				text("Game Over....",width/4,height/2)
				text("Your Score : "+ S1.score,width/4,height/1.5)
				text("Press R key to Restart....", width/4,height/1.4)
			}

		}else{

			for(var np=0;np<S.length;np++){
					S[np].DrawOnly();
			}
			if(BackS.isPlaying()){
				BackS.pause();
			}
			textSize(30)
			if(!GameEnded){
				text("Press P key to start....",width/4,height/1.5)
				text("Your Score : "+ S1.score, width/4,height/1.4)
			}else{
				text("Game is Ended",180,height/2)
				text("Limit of immortality 100",150,height/2 +32)
				if(TwoPlayers){
					if(S[0].score>S[1]){
						text("Winner is Player 1", width/4,height/2 + 60)
					}else{
						text("Winner is Player 2", width/4,height/2 + 60)
					}
				}else{
					text("Well Done... Player 1", width/7,height/2 + 60)
				}
					//text("Restart the Game", width/7,height/2 + 90)
			}

		}

		if(fP1opt!=0){
			if(fP1opt==1){
				var Ai = askAgentProb(S[0].x,S[0].y,S[0].ax,S[0].ay,x,y,0.6);
			}else if(fP1opt==2){
				var Ai = askAgentProb(S[0].x,S[0].y,S[0].ax,S[0].ay,x,y,1);
			}
				S[0].ChangeDirection(Ai[0],Ai[1])
		}

		if(TwoPlayers==true && fP2opt!=0){
			if(fP2opt==1){
				var Ai = askAgentProb(S[1].x,S[1].y,S[1].ax,S[1].ay,x,y,0.6);
			}else if(fP2opt==2){
				var Ai = askAgentProb(S[1].x,S[1].y,S[1].ax,S[1].ay,x,y,1);
			}
				S[1].ChangeDirection(Ai[0],Ai[1])
		}

		for(var np=0;np<S.length;np++){
			if(dist(S[np].x, S[np].y,x,y)<S[np].r ){
				var tim = millis()
				while(millis()-tim<500){
				}
				S[np].AddOrgan()
				S[np].score++;
				eaten =true
				dis=0
			}
		}

		if(dis<60){
			textSize(40)
			fill(0,0,255,100)
			text("EATEN ....",width-300,100)
			if(Mortal==false){
				if(S[0].score==50){
				  text("LEAP 1 of immortality",100,height/2)
				  text("   Player 1",100,height/2 +40)
				}else if(TwoPlayers){
					if(S[1].score==50){
						text("LEAP 1 of immortality",100,height/2)
				  		text("   Player 2",100,height/2 + 40)
					}
				}
			}
			dis++
			fill(255)
		}

		if(eaten){
			eatS.play();
			var gotT =false
			while(!gotT){
				var xj = round(random(50,width-100))
			    var yj = round(random(50,height-100))
			    if(dist(xj,yj,x,y)>100){
			    		x = xj;
			    		y = yj;
			    		x = x -x%5
			    		y = y -y%5
			    		eaten =false
			    		gotT =true
				}
			}
		}

		if(GameEnded){GameStarted=false}

		if(!Mortal){
			fill(0)
			if(TwoPlayers){
				if(S[0].score>=100 || S[1].score>=100){
					GameEnded =true;
				}
			}else{
				if(S[0].score>=100){
					GameEnded =true;
				}
			}

		}



		fill(0,255,0,random(255))
		rect(x-10,y-10,20,20)

		fill(0)

		textSize(10)
		text("X : " + S1.x + " ax : " + S1.ax,20,560)
		text("Y : " + S1.y + " ay : " + S1.ay,20,580)
		text("Target Dist : " + round(dist(S1.x, S1.y,x,y)),120,580)
		text("Length : " + S1.l,120,560)

		textSize(22)
		fill(0,0,255)
		if(!TwoPlayers){
			text("Score   : " + S[0].score,260,570)
		}else{
			text("Score  P1: " + S[0].score + " P2 : "+ S[1].score,260,570)
		}
		text("Options",width+50,30);

		//text(key,width+50,500);
		//text(preKeyCode +" / "+keyCode,width+50,550);
		//text(preKeyCode +" / "+keyCode,width+50,550);
		if(TwoPlayers){
			var kkk = ArrowKeys(preKeyCode,keyCode)
			if(kkk[0]+kkk[1]!=0){
				S[1].ChangeDirection(kkk[0],kkk[1])
				preKeyCode =1;
			}
		}

}

function DrawGrid(r){
	stroke(100,100)
	for(var i=0;i<width;i+=r){line(i,0,i,height)}
	for(var j=0;j<height;j+=r){line(0,j,width,j)}
}

function keyTyped(){
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

	if(key=='n' || key=='N'){

		S1.AddOrgan()
	}

	if(key=='p' || key=='P'){
		//GameStarted = !GameStarted
		b5.ON =!b5.ON;
	}

	if(key=='r' || key=='R'){
		setup()
	}

	if(TwoPlayers){
		if(key=='j' || key =='J'){
			var ai = -1;
			var aj = 0;
			S[1].ChangeDirection(ai,aj)
		}
		if(key=='i' || key =='I'){
			var ai = 0;
			var aj = -1;
			S[1].ChangeDirection(ai,aj)
		}
		if(key=='l' || key =='L'){
			var ai = 1;
			var aj = 0;
			S[1].ChangeDirection(ai,aj)
		}
		if(key=='k' || key =='K'){
			var ai = 0;
			var aj = 1;
			S[1].ChangeDirection(ai,aj)
		}
	}
	preKeyCode =keyCode;
}

var preKeyCode =9;


function ArrowKeys(k0,k1){
	if(k0==0 && k1==37){
		return [-1,0]
	}else if(k0==0 && k1==38){
		return [0,-1]
	}else if(k0==0 && k1==39){
		return [1,0]
	}else if(k0==0 && k1==40){
		return [0,1]
	}else{
		return [0,0]
	}
}


function Snake(x,y,ax,ay,speed,l,r,playr){
	this.x  = x
	this.y  = y
	this.ax = ax
	this.ay = ay
	this.l  = l
	this.r  = r
	this.s0 =speed
	this.score =0
	this.gameOver=false
	this.mortality=true;
	this.Cells =[];
	this.Playr = playr

	this.Cells[this.l-1] = new Organ(this.x,this.y,this.ax,this.ay,this.r,this.s0,0,0)

	for (var i=this.l-2;i>=0;i--){
		this.x += this.r*this.ax
		this.y += this.r*this.ay
		this.Cells[i] = new Organ(this.x,this.y,this.ax,this.ay,this.r,this.s0,1,this.Cells[i+1])
	}


	this.move = function(){
		for(var i=0;i<this.Cells.length;i++){
			if(i == this.Cells.length-1 && i!=0){fill(0,0,0,100)}
			this.Cells[i].move()
			fill(255)
		}
	}

	this.Update = function(){
		this.x = this.Cells[0].x
		this.y = this.Cells[0].y
		this.ax = this.Cells[0].ax
		this.ay = this.Cells[0].ay
		this.l = this.Cells.length;

		for(var i=0;i<this.Cells.length;i++){
			this.Cells[i].UpdateOrgan()
		}
	}

	this.moveAndUpdate = function(){
		this.x = this.Cells[0].x
		this.y = this.Cells[0].y
		this.ax = this.Cells[0].ax
		this.ay = this.Cells[0].ay
		this.l = this.Cells.length;

		for(var i=0;i<this.Cells.length;i++){
			if(i==0){
				if(this.Playr==1){fill(0,0,255)}
				else{fill(255,0,0)}
			}
			if(i == this.Cells.length-1 && i!=0){fill(0)}

			this.Cells[i].UpdateOrgan()

			this.Cells[i].move()

			fill(255)
		}
		if(this.Playr==1){fill(0,0,255)}
		else{fill(255,0,0)}
		this.Cells[0].draw()

		if(this.mortality){
			this.CheckClash()
		}
		this.showTarget();
		this.beInBox();
	}

	this.DrawOnly = function(){
		for(var i=0;i<this.Cells.length;i++){
			if(i==0){
				if(this.Playr==1){fill(0,0,255)}
				else{fill(255,0,0)}
			}else if(i==this.Cells.length-1 && i!=0){fill(0);}
			else{fill(255);}
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
		//ellipse(100,100,100,100)
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
		//background(255)
		ellipse(this.x,this.y,this.r,this.r)
		//rect(this.x-this.r/2,this.y-this.r/2,this.r,this.r)
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

function RandomMove(){
	var axr = [0,1, -1,0]
	var ayr = [1,0, 0,-1]
	var ri = round(random(0,3))
	var A = [axr[ri],ayr[ri]]
	return A
}


function askAgent(x,y,ax,ay,xt,yt){
	var axi = ax
	var ayi = ay
	var di = dist(x,y,xt,yt)
	var dj = dist(x+speed*ax,y+speed*ay,xt,yt)
	if(dj>di){
		if(x!=xt){
			ayi = 0
			if(x<xt){
				axi = 1
				return [axi, ayi]
			}else{
				axi = -1
				return [axi, ayi]
			}
		}
		//}else{

		if(y!=yt){
			axi =0
			if(y<yt){
				ayi = 1
				return [axi, ayi]
			}else{
				ayi = -1
				return [axi, ayi]
			}
		}
	}else{
		return[axi, ayi]
	}
}



function askAgent0(x,y,ax,ay,xt,yt){
	var axi = ax
	var ayi = ay
	if(x!=xt){
			//ayi = 0
			if(x<xt){
				axi = 1
				return [axi, ayi]
			}else{
				axi = -1
				return [axi, ayi]
			}
	}else{
	if(y!=yt){
			//axi =0
			if(y<yt){
				ayi = 1
				return [axi, ayi]
			}else{
				ayi = -1
				return [axi, ayi]
			}
	}
	}
}

function askAgentP(x,y,ax,ay,xt,yt,p){
	var axi = ax
	var ayi = ay
	if(random()<p){
		var di = dist(x,y,xt,yt)
		var dj = dist(x+speed*ax,y+speed*ay,xt,yt)
		if(dj>di){
			if(x!=xt){
				ayi = 0
				if(x<xt){
					axi = 1
					return [axi, ayi]
				}else{
					axi = -1
					return [axi, ayi]
				}
			}
			else if(y!=yt){
				axi =0
				if(y<yt){
					ayi = 1
					return [axi, ayi]
				}else{
					ayi = -1
					return [axi, ayi]
				}
			}
		}
		else{
			return[axi, ayi]
		}
	}
		else{
			return[axi, ayi]
		}
}

function askAgentProb(x,y,ax,ay,xt,yt,p){
	var axi = ax
	var ayi = ay
	if(random(0,1)<p){
		var A = askAgent(x,y,ax,ay,xt,yt)
		return[A[0], A[1]]
	}else if(random(0,1)>0.95){
		var A = RandomMove()
		return[A[0], A[1]]
	}else{
		return[axi, ayi]
	}
}


function askAgentCrazySmart(x,y,ax,ay,xt,yt,p){
	var axi = ax
	var ayi = ay
	if(random(0,1)<p){
		var A = askAgent(x,y,ax,ay,xt,yt)
		return[A[0], A[1]]
	}else{
		var A = RandomMove()
		return[A[0], A[1]]
	}
}





function SwitchOF(x,y,label1, label2){
	this.x =x;
	this.y =y;
	this.d =15;
	this.ON=false;
	this.label1 = label1;//"Mortal"
	this.label2 = label2;//"Immortal"

	this.drawAndUpdate =function(){
		this.draw();
		this.updateState();
	}

	this.draw =function(){
		fill(255);
		rect(this.x,this.y,this.d*3,this.d)
		if(this.ON){fill(0,255,0);
			rect(this.x,this.y,this.d,this.d);
		}
		else{fill(255,0,0);
		rect(this.x +this.d*2,this.y,this.d,this.d);
		}
		textSize(this.d)
		fill(0,255,0)
		text(this.label1,this.x-50,this.y+2,this.x+10,this.y+10);
		fill(255,0,0)
		text(this.label2,this.x+50,this.y+2,this.x+10,this.y+10);
		fill(255);
	}
	this.updateState =function(){
		//text(MPressed, width+50,200);
		if(mouseX<this.x + this.d*3 && mouseX > this.x && mouseY<this.y + this.d && mouseY > this.y){
			if(MPressed){
				this.ON =!this.ON;
				MPressed =false;
			return true;
			}
		//MPressed =false;
		return false;
		}
	//MPressed =false;
	return false;
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
		//this.updateState();
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

function gridOption(x,y,actv,labels){
	this.x =x;
	this.y =y;
	this.actv =actv;
	this.labels = labels
	this.nO = labels.length;
	this.Op = 0;
	//this.l = this.labels[0].length*4/10;

	this.drawAndUpdate =function(){
		this.draw();
		//this.updateState();
	}

	this.draw =function(){
		var trns =255
		if(!this.actv){trns=20}
		for(var i=0;i<this.nO;i++){
			fill(0,trns)
			text(this.labels[i],this.x,this.y+i*20 +5);
			fill(255,trns)
			if(i==this.Op){fill(0,255,0,trns);}
			ellipse(this.x + 60,this.y +i*20,10,10);
		}
		if(this.actv){
			this.updateState();
		}
	}

	this.updateState =function(){
		if(mouseX<this.x + 70 && mouseX > this.x){

			for(var i=0;i<this.nO;i++){

				if(mouseY<this.y+i*20 +10 && mouseY > this.y +i*20 -10){
					if(MPressed){
						MPressed =false;
						this.Op=i;
					}
				}

			}

		}
	}

}
