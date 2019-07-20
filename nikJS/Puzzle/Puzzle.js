var s =700;
var typed = '';
var typed1 = '';
var count = 0;  
var room;
var OpenDoor =false;
var textbox =1

var state=0;
var readState =false;
var ActionId  =0
var passAction=0


//var Ins = "To choose the items from right most list, write exactly same in action box then type 'read' or 'Read' to read that item "
var Inst1 = "To choose the items from right most list, write exactly same in action box and hit enter then type 'read' or 'Read' to read that item. ";
var Inst0 = "Collect first letter from each and make a word which has english sense, and enter in passwordBox."
var Inst2 = "You have to deduce password of door which is of 6 letters. ";
var Inst3 = "Read first character of word written on each Item. If there are multiple words, just read first. "

var Ins = Inst2 + Inst3 + Inst1 + Inst0;

var scen1 = "You are locked in a room, only way to open the door is enter the password.";
var scen2 = "You have to find the passward, which is hidden in messi room"
var scen = scen1+scen2;




function preload(){
	room = loadImage("Puzzle/images/room0.jpg");
	door0 = loadImage("Puzzle/images/lockDoor00.jpg");
	door1 = loadImage("Puzzle/images/openDoor00.jpg");
	
	book00 = loadImage("Puzzle/images/book0.0.jpeg");
	book01 = loadImage("Puzzle/images/book0.1.jpeg");
	
	book10 = loadImage("Puzzle/images/book1.0.jpeg");
	book11 = loadImage("Puzzle/images/book1.1.jpeg");
	
	cup0 = loadImage("Puzzle/images/cup0.jpg");
	cup1 = loadImage("Puzzle/images/cup1.jpg");
	
	drawer0 = loadImage("Puzzle/images/drawer0.jpg");
	drawer1 = loadImage("Puzzle/images/drawer1.jpg");
	
	medal0 = loadImage("Puzzle/images/medal0.jpg");
	medal1 = loadImage("Puzzle/images/medal1.jpg");

	pillow0 = loadImage("Puzzle/images/pillow0.jpg");
	pillow1 = loadImage("Puzzle/images/pillow1.jpg");
}


function setup() {
	createCanvas(1110, 655);
	//imageMode(CENTER);
	textFont("Helvetica");
	textSize(22);
}

function draw() {
	background(255);
	fill(255)
	if(textbox==1){
	fill(255,0,0,100)	
	}
	rect(740,395,150,30)
	fill(0)
	textSize(22)
	if(typed==''){
		text('|',750,400,width,30)
	}else{
		text(typed,750,400,width,30)
	}
	
	fill(255)
	if(textbox==2){
	fill(255,0,0,100)	
	}
	rect(740,495,150,30)
	fill(0)	
	if(typed1==''){
		text('|',750,500,width,30)
	}else{
		text(typed1,750,500,width,30)
	}
	
	textSize(15)
	text(Ins,500,400,230,300)
	text('Action Box',750,480,width,30)
	text('Password Box',750,380,width,30)

	if(passAction==1){
		textSize(15)
		fill(255,0,0)
		text("Wrong Passward",750,460)
	}else if(passAction==2){
		textSize(15)
		fill(0,255,0)
		text("Congratulation!!!!",750,460)
	}
	textSize(15)
	fill(0,0,255)
	if(ActionId==-1){
		text("Last action was not recognized",720,560)
		text("Check correct item from right",720,590)
	}else if(ActionId==1){
		text("Item is Selected, read it now",720,560)
	}else if(ActionId==2){
		text("Read the first lectter",740,560)
	}



	if(mouseX>740 && mouseX < 740+150){
		if(mouseY>395 && mouseY<395+30 && mouseP==true){
			textbox=1;
			mouseP =false
		}else if(mouseY>495 && mouseY<495+30 && mouseP==true){
			textbox=2;
			mouseP =false;
		}
	}
	mouseP =false;


	
	s=700
	image(room,0,0,s,s*room.height/room.width);
	s=200
	if(!OpenDoor){
		image(door0,720,0,s,s*door0.height/door0.width);
		fill(255)
		text("Enter",790,120)
		text("Password",770,150)
	}else{
		image(door1,720,-10,s,s*door1.height/door1.width);
	}


	fill(0)
	strokeWeight(10)
	var l1 =950
	line(l1,0,l1,height)
	textSize(22)
	text("Choose Items",960,30)
	textSize(20)
	text("1.Book1",960,70)
	text("2.Book2",960,110)
	text("3.Drawer",960,150)
	text("4.Cup",960,190)
	text("5.Pillow",960,230)
	text("6.Medal",960,270)

	text("Scene",960,330,140,400)
	textSize(15)
	text(scen,960,370,140,400)
	
	
	var l1 =1100
	line(l1,0,l1,height)
	l1 =650
	line(0,l1,width,l1)


	s=230
	var x1 = 5, y1=400
	var x2 = s+x1+5, y2 =y1
	fill(255)
	strokeWeight(2)
	rect(x1,y1,s,s)
	rect(x2,y2,s,s)
	fill(0)
	text("Choose an Item",x1+30,y1+120)
	text("Read It ",x2+60,y2+120)
	fill(0,0,255)
	textSize(30)
	text("Solve the Mystery",680,630)

	if(state==1){
		image(book00,x1,y1,s,s);
		if(readState){image(book01,x2,y2,s,s);}
	}else if(state==2){
		image(book10,x1,y1,s,s);
		if(readState){image(book11,x2,y2,s,s);}
	}else if(state==3){
		image(drawer0,x1,y1,s,s);
		if(readState){image(drawer1,x2,y2,s,s);}
	}else if(state==4){
		image(cup0,x1,y1,s,s);
		if(readState){image(cup1,x2,y2,s,s);}
	}else if(state==5){
		image(pillow0,x1,y1,s,s);
		if(readState){image(pillow1,x2,y2,s,s);}
	}else if(state==6){
		image(medal0,x1,y1,s,s);
		if(readState){image(medal1,x2,y2,s,s);}
	}

	fill(255,0,0,100)
	var xx =1030, yy =590
	var r= 10;
	for(var i=-50; i<50;i+=20){
		for(var j =-50;j<50;j+=20){
			if(random(0,1)<0.1 + passAction/2){
			ellipse( xx+ i,yy+j,r,r)
			}
		}
	}

	

	if(passAction==2){
		push()
		textSize(100)
		fill(0,255,0)
		translate(width/2,height/2)
		rotate(-PI/5)
		text("Congratulation!!!!",-390,-100)
		text("You Solved it",-320,10)	
		pop()
	}

	
	//text("Congratulation!!!!",width/2,height/2)	






}
var mouseP =false
function mousePressed(){
	mouseP =true;
}

function keyTyped(){
	if(keyCode==13){
		if(textbox==2){
			if(typed1=='Book1'){
				state =1;
				typed1 = '';
				readState =false;
				ActionId=1;
			} else if(typed1 =='Book2'){
				state=2;
				typed1 = '';
				readState =false;
				ActionId=1;
			}else if(typed1 =='Drawer'){
				state =3; 
				typed1 = '';
				readState =false
				ActionId=1;
			}else if(typed1 =='Cup'){
				state =4; 
				typed1 = '';
				readState =false
				ActionId=1;
			}else if(typed1 =='Pillow'){
				state =5; 
				typed1 = '';
				readState =false
				ActionId=1;
			}else if(typed1 =='Medal'){
				state =6; 
				typed1 = '';
				readState =false
				ActionId=1;
			}else if(typed1 =='read' || typed1 =='Read'){
				readState =true
				typed1 =''
				ActionId=2;
			}else{ActionId =-1;}
			typed1 =''
		}else if(textbox==1){
			if(typed=='wisdom' || typed=='WISDOM'){
				OpenDoor=true
				passAction =2	
			}else{passAction =1}
			typed ='';
		}
	}
	else{
		if(textbox==1){
		typed +=key;
		}else{
		typed1 +=key;
		}
	}
	if(keyCode==8){
		if(textbox==1){
		typed =''
		}else{
		typed1 ='';
		}
	}

}



