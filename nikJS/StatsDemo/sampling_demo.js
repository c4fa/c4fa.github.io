//Staticsts Demo for Hypothesis testing
//=======================================
//Author: Nikesh Bajaj (nikkeshbajaj@gmail.com)
//Date: 23/10/2022
//http://nikeshbajaj.in/
//shared on ::
//https://nikeshbajaj.github.io/P/Stats
//https://c4fa.github.io/projects.html
//(c)nikeshbajaj
//License:: Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)


let Mues = []
let Sigmas = []
let Scales = []
let P, S1, S2;

//let P1_MEANS =[];
//let P1_MEANS_loc =[];
let x0, y0, r,alphax, ix;

let Px, S1x,S2x;
let Psampl=false;
let G1sampl=false;
let G2sampl=false;
let jitter=5;
let n=5
let overlay=300

function setup() {
  //createCanvas(1024, 800);
  createCanvas(1024+300, 800);
  width=width-overlay;
  //createCanvas(displayWidth, displayHeight);
  stroke(255);
  noLoop();
  //y = height * 0.5;
  for(let i=0;i<3;i++){
    if (i==0){
      SD = createSlider(0.1, 4, 1.1,0.1);
      AM = createSlider(1, 2000,300,30);
    }else{
      SD = createSlider(0.1, 4, 1,0.1);
      AM = createSlider(1, 2000,200,30);
    }
    SD.style('width', '100px');
    if (i>1){
      MEAN = createSlider(-5, 5,-1,0.5);
    }else{
      MEAN = createSlider(-5, 5, i,0.5);}
    MEAN.style('width', '100px');

    AM.style('width', '100px');

    if (i==0){
    SD.position(width/2, 10);
    MEAN.position(width/2,40);
    AM.position(width/2, 70);

  }else if (i==2) {
    SD.position(10, 10);
    MEAN.position(10, 40);
    AM.position(10, 70);
  }else if (i==1) {
    //MEAN.set(-1);
    SD.position(width-100, 10);
    MEAN.position(width-100, 40);
    AM.position(width-100, 70);
  }
  else {
    SD.position(10, 10);
    MEAN.position(10, 40);
    AM.position(10, 70);
  }

    MEAN.input(redraw);
    SD.input(redraw);
    AM.input(redraw);

    Mues.push(MEAN);
    Sigmas.push(SD);
    Scales.push(AM);
  }

  let Bn_x = 30;
   buttonP = createButton('Sample ~ P');
   buttonP.mousePressed(PSampler);
   buttonP.size(150, 40);
   buttonP.position(width+Bn_x, 10);
   buttonP.style("font-family", "Comic Sans MS");
   buttonP.style("font-size", "20px");


   buttonS1 = createButton('Sample ~ G1');
   buttonS1.mousePressed(G1Sampler);
   buttonS1.size(150, 40);
   buttonS1.position(width+Bn_x, 60);
   buttonS1.style("font-family", "Comic Sans MS");
   buttonS1.style("font-size", "20px");


   buttonS2 = createButton('Sample ~ G2');
   buttonS2.mousePressed(G2Sampler);
   buttonS2.size(160, 40);
   buttonS2.position(width+Bn_x, 60*2-10);
   buttonS2.style("font-family", "Comic Sans MS");
   buttonS2.style("font-size", "20px");


   buttonS12 = createButton('Sample ~ (G1,G2)');
   buttonS12.mousePressed(G12Sampler);
   buttonS12.size(180, 40);
   buttonS12.position(width+Bn_x, 60*3-10);
   buttonS12.style("font-family", "Comic Sans MS");
   buttonS12.style("font-size", "20px");

   buttonPS12 = createButton('Sample ~ (P,G1,G2)');
   buttonPS12.mousePressed(PG12Sampler);
   buttonPS12.size(200, 40);
   buttonPS12.position(width+Bn_x, 60*4-20);
   buttonPS12.style("font-family", "Comic Sans MS");
   buttonPS12.style("font-size", "20px");




  Px = new MEANSObj();
  S1x = new MEANSObj();
  S2x = new MEANSObj();
  button1 = createButton('clear');
  button1.mousePressed(clearMeans);
  button1.size(150, 40);
  button1.position(width+Bn_x, 45+60*4);
  button1.style("font-family", "Comic Sans MS");
  button1.style("font-size", "20px");


  checkboxP = createCheckbox(' Population', true);
  checkboxS1 = createCheckbox(' Group 1', true);
  checkboxS2 = createCheckbox(' Group 2', true);

  checkboxP.position(width-170, 150);
  checkboxS1.position(width-170, 180);
  checkboxS2.position(width-170, 210);
  checkboxP.style("font-size", "30px");
  checkboxS1.style("font-size", "30px");
  checkboxS2.style("font-size", "30px");
  //checkboxP.changed(myCheckedEvent);
  const box1 = checkboxP.elt.getElementsByTagName('input')[0];
  box1.style.transform = 'scale(2)';
  const box2 = checkboxS1.elt.getElementsByTagName('input')[0];
  box2.style.transform = 'scale(2)';
  const box3 = checkboxS2.elt.getElementsByTagName('input')[0];
  box3.style.transform = 'scale(2)';

input = createInput('5');
input.position(width+60+Bn_x, 10+60*5.4);
input.size(35, 35);
input.style("font-size", "20px");
//input.value='5';
n = int(input.value());
}

function draw() {
  background(127);
  dwargrid(50,50);
  textSize(10);
  fill(0);
  stroke(0,0,0,20);
  strokeWeight(1);
  //text('@nikeshbajaj',50,height/2-10)
  text("NikB",width+overlay-50,20)
  strokeWeight(0);
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(0);
  text('N=',width+60, 60*6)
  n = int(input.value());
  //text(int(n),width-50, 60*7)

  for (let i=0;i<Mues.length;i++){
      if (i==1){
        text('μ', Mues[i].x -20, Mues[i].y+10); //Sigmas
        text('σ', Sigmas[i].x -20, Sigmas[i].y+10);
        text('s', Scales[i].x -20, Scales[i].y+10);
      }else{
        text('μ', Mues[i].x + 20 + Mues[i].width, Mues[i].y+10);
        text('σ', Sigmas[i].x + 20 + Sigmas[i].width, Sigmas[i].y+10);
        text('s', Scales[i].x + 20 + Scales[i].width, Scales[i].y+10);
      }
  }


  let v
  if (checkboxP.checked()){
    P = new NormSampler(mu=Mues[0].value(),sigma=Sigmas[0].value(),scaley= Scales[0].value(),
                       N=100,sd_rang=5,colorx=[0,0,0]);
    //P.getSamples(n=5);
    P.plotCurve(height/2)
    //P.plotSamples(Ylevel=height/2)

    if (Psampl){
      P.getSamples(n=n);
      P.plotSamples(Ylevel=height/2);
      P.plotSamples_X(Ylevel=height/2+40,r=[20,20],alphax=100);
      //P.plotSamples_Y(Ylevel=height/2 + height/4, Xlevel=width+50,r=[10,10],alphax=180)
    }
    if (P.Sx.length>0){
      //v = (5+Px.getLength()/4)
      Px.add(P.mapXtoI(P.sample_mean),random(-jitter, jitter),P.get1ProbOf(P.sample_mean));
    }
  }

  if (checkboxS1.checked()){
    S1 = new NormSampler(mu=Mues[2].value(),sigma=Sigmas[2].value(),scaley= Scales[2].value(),
                       N=100,sd_rang=5,colorx=[0,255,0]);
    //S1.getSamples(n=5);
    S1.plotCurve(height/2);
    //S1.plotSamples(Ylevel=height/2);

    if (G1sampl){
      S1.getSamples(n=n);
      S1.plotSamples(Ylevel=height/2);
      S1.plotSamples_X(Ylevel=height/2+40,r=[20,20],alphax=100)
    }

    if (S1.Sx.length>0){
      //v = (5+S1x.getLength()/4)
      S1x.add(S1.mapXtoI(S1.sample_mean),random(-jitter, jitter),S1.get1ProbOf(S1.sample_mean));

    }
  }


  if (checkboxS2.checked()){
  S2 = new NormSampler(mu=Mues[1].value(),sigma=Sigmas[1].value(),scaley= Scales[1].value(),
                     N=100,sd_rang=5,colorx=[0,0,255]);
  //S2.getSamples(n=5);
  S2.plotCurve(height/2)
  //S2.plotSamples(Ylevel=height/2)
  if (G2sampl){
    S2.getSamples(n=n);
    S2.plotSamples(Ylevel=height/2);
    S2.plotSamples_X(Ylevel=height/2+40,r=[20,20],alphax=100)
  }
  if (S2.Sx.length>0){
    v = (5+S2x.getLength()/4)
    S2x.add(S2.mapXtoI(S2.sample_mean),random(-jitter, jitter),S2.get1ProbOf(S2.sample_mean));
    }
  }

  PlotPoints(Px.x,Px.y,x0=0,y0=height/2+100,r=[2,20],colorx=P.color,100,Marker='rect');
  PlotPoints(S1x.x,S1x.y,x0=0,y0=height/2+150,r=[2,20],colorx=S1.color,100,Marker='rect');
  PlotPoints(S2x.x,S2x.y,x0=0,y0=height/2+200,r=[2,20],colorx=S2.color,100,Marker='rect');

  strokeWeight(0);
  stroke(0);
  textAlign(CENTER, CENTER);
  if (Px.x.length>0) {
    fill(P.color[0],P.color[1],P.color[2]);
    //noFill();
    text('P ',50, height/2+100);
  }
  if (S1x.x.length>0){
    fill(S1.color[0],S1.color[1],S1.color[2]);
    text('G1',50, height/2+150);
  }
  if (S2x.x.length>0){
    fill(S2.color[0],S2.color[1],S2.color[2]);
    text('G2',50, height/2+200);
  }

  P.plotSamples_Y(Ylevel=height-100,Xlevel=width+90,r=[20,20],alphax=60)
  S1.plotSamples_Y(Ylevel=height-100,Xlevel=width+140,r=[20,20],alphax=60)
  S2.plotSamples_Y(Ylevel=height-100,Xlevel=width+190,r=[20,20],alphax=60)
  strokeWeight(0);
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(0);
  push();
  let angle1 = radians(270);
  //translate(100, 180);
  rotate(angle1);
  // Draw the letter to the screen
  text("values", -width/2, (width+20));
  //line(0, 0, 150, 0);
  //line(-(width+200), -height, -width+200,  -height/2);
  textSize(45);
  text("Statistics", -width/5, (width+270));
  pop();
  strokeWeight(2);
  line(width+38, height/2, width+38,  height);
  line(width+20, height-100, width+220,  height-100);

  textSize(15);
  fill(0);
  stroke(0,0,0,20);
  strokeWeight(1);
  //text('@nikeshbajaj',50,height/2-10)
  text('@nikeshbajaj',50,height-90)

}

function PSampler(){
  //P.getSamples(n=5);
  //P.plotSamples(Ylevel=height/2)
  Psampl=true;
  redraw();
  Psampl=false;
}

function G1Sampler(){
  //S1.getSamples(n=5);
  //S1.plotSamples(Ylevel=height/2)
  G1sampl=true;
  redraw();
  G1sampl=false;
}

function G2Sampler(){
  //S2.getSamples(n=5);
  //S2.plotSamples(Ylevel=height/2)
  G2sampl=true;
  redraw();
  G2sampl=false;
}

function G12Sampler(){
  G1sampl=true;
  G2sampl=true;
  redraw();
  G1sampl=false;
  G2sampl=false;
}

function PG12Sampler(){
  Psampl=true;
  G1sampl=true;
  G2sampl=true;
  redraw();
  G1sampl=false;
  G2sampl=false;
  Psampl=false;
}

function clearMeans(){
  Px.clear();
  S1x.clear();
  S2x.clear();
  redraw();
}


class MEANSObj{
  constructor(){
  this.x =[];
  this.y =[];
  this.px =[];
}
  add(x,y,px){
    this.x.push(x);
    this.y.push(y);
    this.px.push(px);

  }
  getLength(){
    return this.x.length;
  }
  clear(){
    this.x =[];
    this.y =[];
    this.px =[];
  }

}

function getConstArray(L,val){
  let x = [];
  for (let i=0; i<L;i++){
    x.push(val);
  }
  return x;
}

class NormSampler{
  constructor(mu,sigma,scaley=1,N=100,sd_rang=5,colorx=[0,0,0]){
    this.mu = mu;
    this.sigma = sigma;
    this.scaley = scaley;
    this.sd_rang = sd_rang;
    this.N = N;
    this.Y = [];
    this.X = [];
    this.IX = [];
    this.genCurve();
    this.n=5;
    this.Sx = [];
    this.Sy = [];
    this.Six = [];
    this.color = colorx;
    this.sample_means;
    this.sample_sd;
  }
  get1ProbOf(x){
    //let XY =[];
    let px = exp(-0.5*pow(float(x-this.mu)/float(this.sigma),2));
    px *= 1/(this.sigma*sqrt(2*PI));
    //let ix = map(x, 0, this.N, 10, width-10);
    return px
  }
  mapXtoI(x){
    ix = map(x, -this.sd_rang, this.sd_rang, 10, width-10);
    return ix
  }
  genCurve(){
  for (let i = 0; i < this.N; i++) {
    let x = map(i, 0, this.N, -this.sd_rang, this.sd_rang);
    let ix = map(i, 0, this.N, 10, width-10);
    let yx = exp(-0.5*pow(float(x-this.mu)/float(this.sigma),2));
    yx *= 1/(this.sigma*sqrt(2*PI));
    this.Y.push(yx*this.scaley);
    this.X.push(x);
    this.IX.push(ix);
  }
  }
  clip_value(x){
    if (x<-this.sd_rang){
      x = -this.sd_rang;
    }else{ if(x>this.sd_rang){x = this.sd_rang;}
    }
    return x
  }
  getSamples(n=5){
    this.Sx = [];
    this.Sy = [];
    this.Six = [];
    this.sample_mean = 0;
    for (let i = 0; i < n; i++) {
       let xi = randomGaussian(this.mu,this.sigma);
       //console.log(xi)
       xi = this.clip_value(xi);

       this.sample_mean +=xi;
       //console.log(xi)
       let px = this.get1ProbOf(xi);
       let ix = map(xi, -this.sd_rang, this.sd_rang, 10, width-10);
       this.Sx.push(xi);
       this.Sy.push(px*this.scaley);
       this.Six.push(ix);
       //console.log(' ')
     }

    this.sample_mean = this.sample_mean/n;

    this.sample_sd = 0;
    for (let x in this.Sx) { this.sample_sd += pow(this.sample_mean-x,2)}

    this.sample_sd = sqrt(this.sample_sd/n);
  }
  plotCurve(Ylevel){
    //PlotXY(x,y,x0=0,y0=height/2,yx=1,color=(0,0,0))
    //PlotXY(this.IX,this.Y,0,Ylevel,Amp,colorx=this.color);
    //PlotXY(x,y,x0=0,y0=height/2,yx=1,colorx=[0,250,0])
    stroke(this.color[0],this.color[1],this.color[2]);
    strokeWeight(2);
    //setLineDash([5, 5]);
    line(this.mapXtoI(this.mu), 0,this.mapXtoI(this.mu), height);
    //setLineDash([1, 1]);
    PlotLine(this.IX,this.Y, x0=0, y0=Ylevel,colorx=this.color);
  }

  plotSamples(Ylevel=height/2,r=[10,10],alphax=180){
    PlotPoints(this.Six,this.Sy,x0=0,y0=Ylevel,r=r,colorx=this.color,alphax=alphax);
  }

  plotSamples_X(Ylevel=height/2,r=[10,10],alphax=180){
    let sy = getConstArray(this.Sy.length,0)
    PlotPoints(this.Six,sy,x0=0,y0=Ylevel,r=r,colorx=this.color,alphax=alphax);
  }
  plotSamples_Y(Ylevel=height/2 + height/4,Xlevel=width+50,r=[10,10],alphax=180){
    let w = Xlevel;
    let sy = getConstArray(this.Sy.length,w)
    let sx = [];
    for (let i=0;i<this.Sx.length;i++){
      //sx = map(x,P.r)
      let ix = map(this.Sx[i], -this.sd_rang, this.sd_rang, 0, 300);
      sx.push(ix);
    }
    PlotPoints(sy,sx,x0=0,y0=Ylevel,r=r,colorx=this.color,alphax=alphax);
    let sx_m = map(this.sample_mean, -this.sd_rang, this.sd_rang, 0, 300);
    PlotPoints([sy[0]],[sx_m],x0=0,y0=Ylevel,r=[r[0]*2,1],colorx=this.color,alphax=250,Marker='rect');


  }
}

function PlotXY(x,y,x0=0,y0=height/2,yx=1,colorx=[0,250,0]){
  stroke(colorx[0],colorx[1],colorx[2]);
  //console.log(colorx);
  //stroke(0,255,0);
  strokeWeight(5);
 // draw lines
  let px = x[0]-x0;
  let py = y[0]*yx-y0;
  for(let i=1; i < y.length; i++){
    let xi = x[i]-x0
    let yi = y[i]*yx-y0
    line(px, -py, xi, -yi);
  	//store the last position
    px = xi;
    py = yi;
  }
}


function PlotLine(x,y,x0=0,y0=height/2,colorx=[0,250,0]){
  stroke(colorx[0],colorx[1],colorx[2]);
  //console.log(colorx);
  //stroke(0,255,0);
  strokeWeight(5);
 // draw lines
  let px = x[0]-x0;
  let py = y[0]-y0;
  for(let i=1; i < y.length; i++){
    let xi = x[i]-x0
    let yi = y[i]-y0
    line(px, -py, xi, -yi);
  	//store the last position
    px = xi;
    py = yi;
  }
}


function PlotPoints(x,y,x0=0,y0=height/2,r=[10,10],colorx=[0,250,0],alphax=180,Marker='ellp'){
  stroke(colorx[0],colorx[1],colorx[2],alphax);
  fill(colorx[0],colorx[1],colorx[2],alphax);
  strokeWeight(5);
  for(let i=0; i < y.length; i++){
    let xi = x[i]-x0
    let yi = y[i]-y0
    if (Marker=='rect'){
    rectMode(CENTER)
    rect(xi,-yi,r[0],r[1]);
  }else{
    ellipse(xi,-yi,r[0],r[1]);
  }

  }
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}
function dwargrid(xd,yd){
  stroke(255);
  strokeWeight(0.5);
  let x1 = 0; x2= width +overlay;
  let y1 = 0; y2= height;
  line(0, height/2, width, height/2);
  line(width/2, 0, width/2, height);
  let xi = width/2; yi = height/2;
  while (yi < height) {line(x1, yi, x2, yi); yi = yi + yd;}
  while (xi < width+overlay) {line(xi, y1, xi, y2);  xi = xi+xd;}
  xi = width/2; yi = height/2;
  while (yi>0) {line(x1, yi, x2, yi); yi = yi - yd;}
  while (xi>0) {line(xi, y1, xi, y2); xi = xi - xd;}
  stroke(50,0,50);
  strokeWeight(5);
  setLineDash([10,10])
  line(width+10, 0, width+10, height/2);
  line(width+10, height/2, width+overlay, height/2);
  setLineDash([1,1])
}

// function mousePressed() {
//   redraw();
// }
