var data;
var Yr = ['y2005','y2006','y2007','y2008','y2009','y2010','y2011','y2012','y2013','y2014','y2015']
var CC=[]
//var Pop=[]
var PopY=[]

function preload() {
  data = loadTable('DataViz_WP/data/WorldPopData.csv', 'header')
}

function setup() {
  createCanvas(1024,786); 
  frameRate(2)
  for (var i = 0; i < data.getRowCount(); i++) {
    CC[i] = data.getString(i,'CountryCode');
  }
   //Yr.length
  for (var j = 0; j <Yr.length; j++) {
    var Pop=[];
    for (var i = 0; i < data.getRowCount(); i++) {
      Pop[i] = data.getNum(i,Yr[j]);
    }
    PopY[j] = Pop;
  }

}
var j= 0;

function draw() {
  background(180);
  TitleDis();
  var year =2005 +j;
  fill(0,50)
  textSize(100)  
  text(year,width/2-100,height/2)



  textSize(7)
  for (var i=0;i<PopY[j].length;i++){
    fill(255,0,0,100)
    var d = PopY[j][i]/10000000
    var H = 200
    if(i<=100){ 
      rect(10+20*i,H-d,10,d)
      fill(0)
      text(CC[i],10+20*i,H+10)
    }
    if(i>100 && i<=200){
     var ii = i-101;
     var H =600
     fill(0,255,0,100)
     rect(10+20*ii,H-d,10,d) 
     fill(0)
     text(CC[i],10+20*ii,H+10)
    }

    if(i>200){
     var ii = i-201;
     var H =400
     fill(0,0,255,100)
     rect(10+20*ii,H-d,10,d) 
     fill(0)
     text(CC[i],10+20*ii,H+10)
    }
  }
  

  j++
  if(j>=PopY.length){
    j=0
  }
  
}

function TitleDis(){
  var txt ='Population of World for last 10 years'
  textSize(30)
  text(txt,100,100)


}
