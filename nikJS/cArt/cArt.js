var imgs =[]
var fonts =[];
var words =[];
var pIm, nW;


function preload() {
  var nImg = 23;
  for(var i = 1;i<=nImg;i++){
    if(i<=6){filn = "cArt/Img/"+i+".gif";}
    else{filn = "cArt/Img/"+i+".jpg";}
    imgs[i-1] = loadImage(filn)
  }
  
  //Fonts
  fonts[0] = loadFont("cArt/fonts/Apocalypse.ttf");
  fonts[1] = loadFont("cArt/fonts/desire.otf");
  fonts[2] = loadFont("cArt/fonts/SpiritRitual.ttf");
  words =["LIFE???", "LOVE", "CAREER", "HAPPY","SUCCESSS", "JOYYY!!!","STUDY","MONEY!!"];  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  pIm =0.3; //Only 30% to display once
  nW = 4;   // 4 worlds out of 8
  
}

function draw() {
  background(255)
  var b1 =round(random(0,1))
  var b2 =round(random(0,1))
  var b3 =round(random(0,1))
  
  //background(random(0,255),random(0,255),random(0,255),random(0,255))
  background(255*b1,255*b2,255*b3,random(0,255))
 
   for(var j =0;j<nW;j++){
    textFont(fonts[round(random(0,fonts.length-1))]);
    textSize(random(1,300));
    var b1 =round(random(0,1))
    var b2 =round(random(0,1))
    var b3 =round(random(0,1))
    
    fill(255*b1,255*b2,255*b3,random(150,250));
    push()
    
    translate(width/2,height/2)
    //rotate(-PI*0.3);
    rotate(PI*random(-0.3,0.3));
    text(words[round(random(0,words.length-1))], random(1,width-100) - width/2, random(1,height-100)-height/2);
    pop()
  }
  
  
 


  stroke(0,random(50,220));
  strokeWeight(random(15,20));
  var s1 = random(100,width-150)
  var s2 = random(100,height-150)
  
  line(100+s1,0,100+s1,height);
  line(100+s1+50,0,100+s1+50,height);

  line(0,100+s2,width, 100+s2);
  line(0,100+s2+50,width, 100+s2+50);


 

 imageMode(CENTER);
 for(var i=0;i<imgs.length;i++){ 
  if(random(0,1)<pIm){
   push();
    rotate(random(-0.3,0.3));
    blendMode(MULTIPLY);
    var ii = round(random(0,imgs.length-1))
    var scal = random(1,6)
    var rat = imgs[ii].width/imgs[ii].height;
    image(imgs[ii], random(1,width-50), random(1,height-50),scal*100*rat,scal*100);
   pop();
  }
 } 

}

function mousePressed() {
  redraw();
}