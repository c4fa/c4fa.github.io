//ROC Demo for Machine Learning
//=======================================
//Author: Nikesh Bajaj (nikkeshbajaj@gmail.com)
//Date: 23/10/2022
//http://nikeshbajaj.in/
//shared on ::
//https://nikeshbajaj.github.io/P/Stats
//https://c4fa.github.io/projects.html
//(c)nikeshbajaj
//License:: Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)


// let Mues = []
// let Sigmas = []
// let Scales = []
let  S1, S2;

//let P1_MEANS =[];
//let P1_MEANS_loc =[];
let x0, y0, r,alphax, ix;
//
let Px, S1x,S2x;
let Psampl=false;
let G1sampl=false;
let G2sampl=false;
let jitter=0;
let n=5
let overlay=300


let NN=200;
let sd_rang=5;
let N1 = 100
let N2 = 100
let PlotSampls = false;
let THRESHOLD = 0;
let Resample=true;
// var x= 250;//sets x
// var angle = 90//sets angle
// var slidert;

let cx, cy;

let A1,A2, C1, C2, ACC;
let ROC_values_x =[];
let ROC_values_y =[];

let ROC_curves = [];
let D_aboveT_blue = true;
let showNormPx=true;
let showProbRatio=false;

function setup() {

  var cnv = createCanvas(1000, 700);
  cx = (windowWidth - width) / 2;
  cy = 10
  cnv.style('display', 'block');
  cnv.position(cx, cy);
  // background(100, 100, 100, 200);

  text([cx,windowWidth,width],cx,height/2)


  background(255, 255, 255, 200);

  SD1 = createSlider(0.6,10,3,0.1);
  SD2 = createSlider(0.6,10,3,0.1);
  M1 = createSlider(-5, 5,-1,0.1);
  M2 = createSlider(-5, 5,1,0.1);
  SD1.style('width', '20%');
  SD2.style('width', '20%');
  M1.style('width', '20%');
  M2.style('width', '20%');
  //


  //Tv = createSlider(-5, 5,0,0.01);
  //Tv.style('width', '1000px');

  N1_input = createInput('100');
  N1_input.size(35, 35);
  N1_input.style("font-size", "20px");

  N2_input = createInput('100');
  N2_input.size(35, 35);
  N2_input.style("font-size", "20px");



  buttonS = createButton('Sample');
  buttonS.mousePressed(Sampler);
  buttonS.size(150, 40);

  buttonS.style("font-family", "Comic Sans MS");
  buttonS.style("font-size", "20px");

  buttonROCSave = createButton('Save ROC');
  buttonROCSave.mousePressed(SaveROC);
  buttonROCSave.size(150, 40);
  buttonROCSave.style("font-family", "Comic Sans MS");
  buttonROCSave.style("font-size", "20px");

  buttonROCClear = createButton('Clear ROCs');
  buttonROCClear.mousePressed(clearROCs);
  buttonROCClear.size(150, 40);
  buttonROCClear.style("font-family", "Comic Sans MS");
  buttonROCClear.style("font-size", "20px");

  buttonFlipD = createButton('Flip Decision');
  buttonFlipD.mousePressed(flipDecision);
  buttonFlipD.size(150, 40);
  buttonFlipD.style("font-family", "Comic Sans MS");
  buttonFlipD.style("font-size", "20px");

  buttonNormPX = createButton('Show/Hide norm P(x)');
  buttonNormPX.mousePressed(NormPX);
  buttonNormPX.size(150, 40);
  buttonNormPX.style("font-family", "Comic Sans MS");
  buttonNormPX.style("font-size", "10px");

  buttonProbRatio = createButton('Show/Hide P(x1)/P(x2)');
  buttonProbRatio.mousePressed(ProbRatio);
  buttonProbRatio.size(150, 40);
  buttonProbRatio.style("font-family", "Comic Sans MS");
  buttonProbRatio.style("font-size", "10px");






  SD1.input(REDRAWFun);
  SD2.input(REDRAWFun);
  M1.input(REDRAWFun);
  M2.input(REDRAWFun);
  N1_input.input(REDRAWFun);
  N2_input.input(REDRAWFun);
  //Tv.input(RedrawSamplr);


  SD1.position(cx, cy);
  M1.position(cx, cy+30);
  SD2.position(cx +width- windowWidth*0.2, cy);
  M2.position(cx +width- windowWidth*0.2, cy+30);


  N1_input.position(cx+70, cy+55);
  N2_input.position(cx+width-70, cy+55);

  buttonS.position(cx+width-150, height/2);
  buttonROCSave.position(cx+width-150, height/2+50);
  buttonROCClear.position(cx+width-150, height/2+100);
  buttonFlipD.position(cx+width-150, height/2+150);
  buttonNormPX.position(cx+width-150, height/2+200);
  buttonProbRatio.position(cx+width-150, height/2+250);
  //Tv.position(cx, height/2-50);

  Th = createSlider(0,1,0,0.001);
  //Th.style('height', '100%');
  //Th.style('width', '300px');
  Th.style('width', '1000px');
  Th.position(cx,height/2-50);
  //Th.style('width', '450px');
  //Th.style('transform: rotate(270deg);');
  Th.input(RedrawSamplr);
  //Th.position(cx, height/2);


  //Th.style('color', 'red');
  noLoop();



}

function draw() {
  // background(127);
  //background(255);
  background(200);
  //background(0,0,255);
   dwargrid(50,50,150,2);
   dwargrid(25,25,200,0.3);
  // text('TEST',width-30,cy+100)

   fill(0);

   textSize(20);
   text('σ', 330, 15); //Sigmas
   text('μ', 330, 45);

   text('σ', width/2+150, 15); //Sigmas
   text('μ', width/2+150, 45);

   textSize(30);
   text('N1=',10, cy+80);
   text('N2 =',width-150, cy+80);



   N1 = int(N1_input.value());
   N2 = int(N2_input.value());

   let scalN1 = 1;
   let scalN2 = 1;

   if (N1>N2){
     scalN1 = 1;
     scalN2 = float(N2/N1);
     if (scalN2<0.3){scalN2=0.3}
   }
   if (N2>N1){
     scalN2 = 1;
     scalN1 = float(N1/N2);
     if (scalN1<0.3){scalN1=0.3}
   }


   // if (Resample){
   // S1 = new NormSampler(mu=M1.value(),sigma=SD1.value()/sd_rang,scaley= 100*SD1.value()*scalN1, N=1000,sd_rang=sd_rang,colorx=[0,255,0]);
   // S2 = new NormSampler(mu=M2.value(),sigma=SD2.value()/sd_rang,scaley= 100*SD2.value()*scalN2, N=1000,sd_rang=sd_rang,colorx=[0,0,255]);
   // }

   if (Resample){
   S1 = new NormSampler(mu=M1.value(),sigma=SD1.value()/sd_rang,scaley= 200*scalN1, N=1000,sd_rang=sd_rang,colorx=[0,255,0]);
   S2 = new NormSampler(mu=M2.value(),sigma=SD2.value()/sd_rang,scaley= 200*scalN2, N=1000,sd_rang=sd_rang,colorx=[0,0,255]);
   }

   S1.plotCurve(height/2-100);

   if (PlotSampls){
   S1.getSamples(n=N1);
   S1.plotSamples_X(Ylevel=height/2-100,r=[20,20],alphax=100);

   S2.getSamples(n=N2);
   S2.plotSamples_X(Ylevel=height/2-100,r=[20,20],alphax=100);
  }
  S2.plotCurve(height/2-100);

  textSize(20);
  stroke(0,0,0,1);
  //text(str(M1.value()), 340, cy+35);
  stroke(0,0,0,255);
  strokeWeight(5);
  THRESHOLD = Th.value();
  //line(S1.mapXtoI(THRESHOLD), 0,S1.mapXtoI(THRESHOLD), height/2);
  line(0,height/2-THRESHOLD*150-100,width,height/2-THRESHOLD*150-100);


  // if (D_aboveT_blue){
  // C1 = Compute(S1.Sx, THRESHOLD)
  // A1 = S1.Sx.length - C1
  // A2 = Compute(S2.Sx, THRESHOLD)
  // C2 = S2.Sx.length - A2
  // }else{
  //   A1 = Compute(S1.Sx, THRESHOLD)
  //   C1 = S1.Sx.length - A1
  //   C2 = Compute(S2.Sx, THRESHOLD)
  //   A2 = S2.Sx.length - C2
  // }

  if (D_aboveT_blue){

  A1 = Compute_WithProbT_S1(S1.Sx, THRESHOLD);
  C1 = S1.Sx.length - A1
  C2 = Compute_WithProbT_S1(S2.Sx, THRESHOLD);
  A2 = S2.Sx.length - C2;
}else{
  C1 = Compute_WithProbT_S2(S1.Sx, THRESHOLD);
  A1 = S1.Sx.length - C1
  A2 = Compute_WithProbT_S2(S2.Sx, THRESHOLD);
  C2 = S2.Sx.length - A2;

}
  //text([S1.Sx[0],A1,C1],0,height-3)

  ACC = round((A1 + A2)/(S1.Sx.length + S2.Sx.length),2);

  A1 = float(round(A1/S1.Sx.length, 2))
  A2 = float(round(A2/S2.Sx.length, 2))
  C1 = float(round(C1/S1.Sx.length, 2))
  C2 = float(round(C2/S2.Sx.length, 2))

  PlotROC(A1, A2);

  stroke(1);
  strokeWeight(1);
  //text([S1.Y[0]/S1.scaley,S2.Y[0]/S2.scaley],100,height-100);

  let PS1_S2 = [];
  let PS2_S1 = [];
  let PxS1 = [];
  let PxS2 = [];
  // let mx1=0;
  // let mx2=0;
  for (i=0;i<S1.Y.length;i++){
    let px1 = (S1.Y[i]/S1.scaley);
    let px2 = (S2.Y[i]/S2.scaley);
    let px1n = px1/(px1+px2);
    let px2n = px2/(px1+px2)
    PxS1.push(150*px1n);
    PxS2.push(150*px2n);

    PS1_S2.push(10*log(px1n/px2n));
    PS2_S1.push(10*log(px2n/px1n));
    // if (px1/px2 > mx1){
    //    mx1 = px1/px2;
    // }
    //
    // if (px2/px1 > mx2){
    //    mx2 = px2/px1;
    // }

  }

  // for (i=0;i<PS1_S2.length;i++){
  //   // PS1_S2[i] = 200*(PS1_S2[i]/mx1);
  //   // PS2_S1[i] = 200*(PS2_S1[i]/mx2);
  //   //PS1_S2[i] = 10*log(PS1_S2[i])/log(10);
  //   //PS2_S1[i] = 10*log(PS2_S1[i])/log(10);
  // }


  //text([PS1_S2[0], PS2_S1[0]],100,height-50);
  //setLineDash([100, 10]);

  // let showNormPx=false;
  // let showProbRatio=false;

  if (showNormPx){
    PlotLine(S1.IX,PxS1,0, height/2-100,[0,255,0],100,2);
    PlotLine(S2.IX,PxS2,0, height/2-100,[0,0,255],100,2);
  }

  if (showProbRatio){
    PlotLine(S1.IX,PS1_S2,0, height/2-100,[0,255,0],100,2);
    PlotLine(S1.IX,PS2_S1,0, height/2-100,[0,0,255],100,2);
  }


//   textSize(15);
//   fill(0);
//   stroke(0,0,0,20);
//   strokeWeight(1);
//   //text('@nikeshbajaj',50,height/2-10)
push();
textSize(15);
fill(0);
stroke(0);
strokeWeight(1);
textStyle(ITALIC);
text('(c) nikeshbajaj.in',width-120,height-10);
textStyle(NORMAL);
pop();
//
//
}

// NormPX, ProbRatio

function NormPX(){
  if (showNormPx){
    showNormPx=false;
  }else{
    showNormPx=true;
  }
  RedrawSamplr();
}

function ProbRatio(){
  if (showProbRatio){
    showProbRatio=false;
  }else{
    showProbRatio=true;
  }
  RedrawSamplr();

}

function PlotROC(A1, A2){
  push();
  let ssx = 100;
  let ssy = height/2
  translate(ssx, ssy);


  fill(255,255,255,100);
  strokeWeight(2);
  rect(0, 0, 300, 300);


  push();
  let angle1 = radians(270);
  translate(-10, 150);
  rotate(angle1)
  // Draw the letter to the screen
  //fill(0);
  textSize(28)
  stroke(0,255,0);
  fill('green');
  text("A", 0, 0);
  text('o', 20, 5);
  pop();

  stroke(0,0,255);
  fill('blue');
  text("A", 150, 320);
  text("o", 150+20, 320+5);
  fill(0);
  stroke(0);
  text("1-", 150-20, 320);

  let xii = 1-A2;
  let yii = A1;

  xjj = map(xii, 0, 1, 0, 300) + 0;
  yjj = map(yii, 0, 1, 0,300);

  yjj = 0+300 - yjj

  fill(255,0,0);
  stroke(255,255,255);
  ellipse(xjj,yjj, 20, 20);

  ROC_values_x.push(xjj);
  ROC_values_y.push(-yjj);
  setLineDash([10, 10]);
  PlotLine([0,100,200,300],[100, 200,300,400],0,ssy+50,[0,0,0],alpha=255,strokW=3);
  setLineDash([0, 0]);
  PlotLine(ROC_values_x,ROC_values_y,0, 0,[200,100,100]);
  pop();
  //text([ROC_values_x.length],xjj,yjj);

  // for(let i=0; i < ROC_curves.length; i++){
  //
  //   PlotLine(ROC_curves[i][0],ROC_curves[i][1],0, 0,[0,255-i*5,10+i*10],150,2);
  // }


}

function flipDecision(){
  if (D_aboveT_blue){
    D_aboveT_blue=false;
  }else{
    D_aboveT_blue=true;
  }
  RedrawSamplr();
}

function PlotROC1(A1, A2){
  fill(255,255,255,100);
  strokeWeight(2);
  rect(100, height/2, 300, 300);


  push();
  let angle1 = radians(270);
  translate(80, height/2+150);
  rotate(angle1)
  // Draw the letter to the screen
  fill(0);
  textSize(28)
  stroke(0,255,0);
  fill('green');
  text("A", 0, 0);
  text('o', 20, 5);
  pop();

  stroke(0,0,255);
  fill('blue');
  text("A", 235, height/2+320);
  text("o", 235+20, height/2+320+5);
  fill(0);
  stroke(0);
  text("1-", 215, height/2+320);

  let xii = 1-A2;
  let yii = A1;

  xjj = map(xii, 0, 1, 0, 300) + 100;
  yjj = map(yii, 0, 1, 0,300);

  yjj = height/2+300 - yjj

  fill(255,0,0);
  stroke(255,255,255);
  ellipse(xjj,yjj, 20, 20);

  ROC_values_x.push(xjj);
  ROC_values_y.push(-yjj);

  PlotLine([100,200,300,400],[height/2+100, height/2+200,height/2+300,height/2+400],0,height+height/2+50,[0,0,0],alpha=255,strokW=3);
  PlotLine(ROC_values_x,ROC_values_y,0, 0,[200,100,100]);

  //text([ROC_values_x.length],xjj,yjj);

  // for(let i=0; i < ROC_curves.length; i++){
  //
  //   PlotLine(ROC_curves[i][0],ROC_curves[i][1],0, 0,[0,255-i*5,10+i*10],150,2);
  // }


}

function SaveROC(){
  let K = ROC_curves.length;
  ROC_curves[K] =[];
  ROC_curves[K][0]=ROC_values_x;
  ROC_curves[K][1]=ROC_values_y;

  //text([ROC_curves.length, ROC_curves[0].length, ROC_curves[1].length ], 530, height/2+320);

  push();
  let ssx = 100;
  let ssy = height/2
  translate(ssx, ssy);
  for(let i=0; i < ROC_curves.length-1; i++){
    PlotLine(ROC_curves[i][0],ROC_curves[i][1],0, 0,[0,255,255-i*10],150,4);
  }
  pop();

}

function clearROCs(){
  ROC_curves = [];
  ROC_values_x =[];
  ROC_values_y =[];

}

function Compute(x, T){
  let n_b = 0;
  let n_a = 0;
  for(let i=0; i < x.length; i++){
    if (x[i]>T){
      n_a = n_a+1;
    }
  }
  return n_a;
 }

function Compute_WithProbT_S1(x,T){
  let n_a = 0;
  for(let i=0; i < x.length; i++){
    let px1 = S1.get1ProbOf(x[i]);
    let px2 = S2.get1ProbOf(x[i]);
    let px1n = px1/(px1+px2);
    if (px1n>T){
      n_a = n_a+1;
    }
  }
  return n_a;
 }

function Compute_WithProbT_S2(x,T){
   let n_a = 0;
   for(let i=0; i < x.length; i++){
     let px1 = S1.get1ProbOf(x[i]);
     let px2 = S2.get1ProbOf(x[i]);
     let px2n = px2/(px1+px2);
     if (px2n>T){
       n_a = n_a+1;
     }
   }
   return n_a;
  }

function RedrawSamplr(){
  Resample = false;
  redraw();
  S1.plotSamples_X(Ylevel=height/2-100,r=[20,20],alphax=100);
  S2.plotSamples_X(Ylevel=height/2-100,r=[20,20],alphax=100);
  stroke(0,0,0,255);
  strokeWeight(3);
  THRESHOLD = Th.value();
  //line(S1.mapXtoI(THRESHOLD), 0,S1.mapXtoI(THRESHOLD), height/2);
  //line(0,height/2-THRESHOLD*150-100,width,height/2-THRESHOLD*150-100);
  line(0,height/2-THRESHOLD*150-100,width,height/2-THRESHOLD*150-100);
  textAlign('left')
  textSize(28);
  if (D_aboveT_blue){
  stroke(0,255,0);
  strokeWeight(4);
  fill('limegreen');
  //text('←O', S1.mapXtoI(THRESHOLD)-70,  height/2-15);
  text('⬆', 200,  height/2-THRESHOLD*150-110);
  textAlign('left')
  stroke(0,0,255);
  strokeWeight(4);
  fill('blue');
  //text('O→', S1.mapXtoI(THRESHOLD)+10,  height/2-15);
  text('⬇', 200,  height/2-THRESHOLD*150-80);

}else{
  stroke(0,0,255);
  strokeWeight(4);
  fill('blue');
  //text('←O', S1.mapXtoI(THRESHOLD)-70,  height/2-15);
  text('⬆', 200,  height/2-THRESHOLD*150-110);
  textAlign('left')
  stroke(0,255,0);
  strokeWeight(4);
  fill('limegreen');
  //text('O→', S1.mapXtoI(THRESHOLD)+10,  height/2-15);
  text('⬇', 200,  height/2-THRESHOLD*150-80);

}




  push();
  translate(width/2, height/2+50);
  fill(255);
  //rect(width-310, height/2+165, 300, 100);
  strokeWeight(1);
  rect(0, 0, 300, 200);
  //rect(width-310+150, height/2+165, 150, 100);
  //rect(0, 0+165+50, 300, 50);
  line(0+150,0,0+150,0+200)
  line(0,100,300,100)

  textSize(28);
  textAlign('left')
  //fill(0);
  stroke(0,255,0);
  strokeWeight(1);
  fill('limegreen');
  text(join(['A  = ',str(A1)], ' '), 15,  0+60);
  text(join(['E  = ',str(C1)], ' '), 165,  0+60);
  stroke(0,0,255);
  strokeWeight(1);
  fill('blue');
  text(join(['E  = ',str(C2)], ' '), 15,  160);
  text(join(['A  = ',str(A2)], ' '), 165,  160);

  textSize(18);
  strokeWeight(3);
  text('o', 15+20,  0+160+5);
  text('o', 165+20,  0+160+5);
  stroke(0,255,0);
  fill('limegreen');
  text('o', 15+20,  60+5);
  text('o', 165+20,  60+5);
  stroke(0);
  fill(0);
  strokeWeight(1);
  text(join(['Overall Accuray = ',str(ACC)], ' '),15+40,220);
  pop();
  // fill(0);
  // text(join(['A  = ',str(A1)], ' '), width-300,  height/2+300);
  // fill('limegreen');
  // text(join([' o  = ',str(A1)], ' '), width-300,  height/2+300);

  stroke(0);
  strokeWeight(1);
  fill(0);
  textSize(16);
  text(THRESHOLD,width-50,  height/2-60);




}

function Sampler(){
  //P.getSamples(n=5);
  //P.plotSamples(Ylevel=height/2)
  PlotSampls=true;
  Resample = true;
  redraw();
  PlotSampls=false;
  ROC_values_x = [];
  ROC_values_y = [];

}

function REDRAWFun(){
  Resample = true;
  redraw();
  ROC_values_x = [];
  ROC_values_y = [];
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

    this.getSamples(n=N);
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


    this.sample_sd = sqrt(this.sample_sd/(n-1));

    this.sample_se = this.sample_sd/(sqrt(n));
  }
  plotCurve(Ylevel){
    //PlotXY(x,y,x0=0,y0=height/2,yx=1,color=(0,0,0))
    //PlotXY(this.IX,this.Y,0,Ylevel,Amp,colorx=this.color);
    //PlotXY(x,y,x0=0,y0=height/2,yx=1,colorx=[0,250,0])
    stroke(this.color[0],this.color[1],this.color[2]);
    strokeWeight(2);
    //setLineDash([5, 5]);
    line(this.mapXtoI(this.mu), 0,this.mapXtoI(this.mu), height/2);
    //setLineDash([1, 1]);
    PlotLine(this.IX,this.Y, x0=0, y0=Ylevel,colorx=this.color);
  }

  plotSamples(Ylevel=height/2,r=[10,10],alphax=180){
    PlotPoints(this.Six,this.Sy,x0=0,y0=Ylevel,r=r,colorx=this.color,alphax=alphax);

  }

  plotSamples_X(Ylevel=height/2,r=[10,10],alphax=180){
    let sy = getConstArray(this.Sy.length,0)
    let syi = getConstArray(this.Sy.length,0)
    PlotPoints(this.Six,sy,x0=0,y0=Ylevel,r=r,colorx=this.color,alphax=alphax);
    //PlotPointsV2(this.Six,syi,x0=0,y0=Ylevel,r=r,colorx=this.color,alphax=alphax);
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


function PlotLine(x,y,x0=0,y0=height/2,colorx=[0,250,0],alpha=255,strokW=5){
  stroke(colorx[0],colorx[1],colorx[2],alpha);
  //console.log(colorx);
  //stroke(0,255,0);
  strokeWeight(strokW);
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

function PlotPointsV2(x,y,x0=0,y0=height/2,r=[10,10],colorx=[0,250,0],alphax=180,Marker='ellp'){
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
    strokeWeight(5);
    ellipse(xi,-yi,r[0],r[1]);
    noFill();
    strokeWeight(4);
    ellipse(xi,-yi+20,r[0]/1.1,r[1]*1.3);
    fill(colorx[0],colorx[1],colorx[2],alphax);
    //strokeWeight(5);
    //ellipse(xi,-yi+20,r[0]/1.1,r[1]*1.5);
    let hand = 20
    line(xi, -yi+10, xi+hand, -yi+20-hand)
    line(xi, -yi+10, xi-hand, -yi+20-hand)
    line(xi, -yi+30, xi+hand, -yi+20+hand)
    line(xi, -yi+30, xi-hand, -yi+20+hand)
  }

  }
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function dwargrid(xd,yd,wd,ws){
  stroke(wd);
  strokeWeight(ws);
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
  // stroke(50,0,50);
  // strokeWeight(5);
  // setLineDash([10,10])
  // line(width+10, 0, width+10, height/2);
  // line(width+10, height/2, width+overlay, height/2);
  // setLineDash([1,1])
}


function AKnob(x){// allows grafiti to move
  push()
  translate(x,220)
  rotate(angle)
  ellipse(0,0, 200, 200)
  line(- 3, -100,- 3 , 100)
  line(- 4,7, - 80, 58);
  line(- 4,7,87,48);
  angle = slidert.value();
  pop()
}

// function mousePressed() {
//   redraw();
// }
