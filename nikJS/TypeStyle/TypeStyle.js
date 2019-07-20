function setup() {
 //createCanvas(1024, 768);
 var cnv = createCanvas(1024,768);
 var shiftX = (windowWidth-1024)/2;
 cnv.position(shiftX,0);
 background(255);
 frameRate(1)

}
function draw() {
   background(255)
   var dis = width/8
   colorMode(HSB);

   for(var i =0;i<3;i++){
      var st = round(random(1))
      for (var j =0;j<4;j++){
         //c = color(360*((i+1)*(j +1)/12), 100, 100)
         c = color(360*random(1), 100, 100)
         fill(c)
         stroke(10)
         strokeWeight(3)
         drawLetter( dis+ 2*dis*i,dis+ dis*j,random(30,80),st)
      }
   }
   
}

function drawLetter(x0,y0,w,st){
   if(st==0){
      var N = round(random(7,10))   
   }else{
      var N = round(random(2,10))
   }

   XY = createPoints(x0,y0,w,N)
   var mx =100
   var gap =3
   if(N<6){
      gap=1
   }
   var xc = random(1)
   for(var i =0;i<XY[0].length;i++){
      if(st == 0){
         if(xc<0.3){
            ellipse(XY[0][i],XY[1][i],10,10)
         }else if(xc<0.6){
            rect(XY[0][i],XY[1][i],10,10)
         }else{
            tri(XY[0][i],XY[1][i],5)
         }
      }else{
      if(i%gap==0){
         randCurve(XY[0][i],XY[1][i],XY[0][i+gap],XY[1][i+gap],mx)
      }
      }
   }
}

function createPoints(x0,y0,w,N){
   var x =[];
   var y =[];
   
   x1=x0-w, y1 = y0+w;
   x[0]=x1,y[0]=y1;
   for (var i =1;i<N;i++){
      x[i] =x[i-1]
      y[i] =y[i-1] -(2*w)/N
   }

   for (var i =N;i<2*N-1;i++){
      x[i] =x[i-1] +(2*w)/N
      y[i] =y[i-1] +(2*w)/N
   }
   
   for (var i =2*N-1;i<3*N-2;i++){
      x[i] =x[i-1]
      y[i] =y[i-1] -(2*w)/N
   }
   XY = [x,y]
   return XY
}

function tri(x,y,r){
  triangle(x-r,y+r,x,y-r,x+r,y+r) 
}

function randCurve(x1,y1,x2,y2,mx){
  x3 = x1-random(-mx,mx)
  y3 = y1-random(-mx,mx)
  x4 = x2-random(-mx,mx)
  y4 = y2-random(-mx,mx)
  curve(x3,y3,x1,y1,x2, y2,x4,y4);
  ellipse(x1,y1,10,10)
  ellipse(x2,y2,10,10)
}



















