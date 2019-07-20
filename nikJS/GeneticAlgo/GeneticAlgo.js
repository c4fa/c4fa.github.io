//var target;
var popmax;
var mutationRate;
var population;

var bestPhrase;
var allPhrases;
var stats;
var button;
var statstext;

function setup() {
  //frameRate(10)
  //clear();
  createCanvas(windowWidth, windowHeight);
  restart();
  //frameRate(3)
  button = createButton('Start Again');
  button.position(80,300);
  button.mousePressed(restart);
}

function restart(){
  //background();
  background(255);
  statstext ='';
  stats = createP("Stats");
  stats.position(550,200);
  stats.class("stats");
  
  //target = "124879343261323";
  textSize(20)
  fill(0)
  text('TARGET PATTERN',20,20)
  text('BEST CHOOSEN',20,100)
  text('ALL PETTERNS',300,20)
  textSize(30)
  text('GENETIC ALGORITHM',550,100)
  target =  getRP(15)
  var N = Str2Num(target)
  DispBB(N,20,30)

  popmax = 200;
  mutationRate = 0.05;

  // Create a populationation with a target phrase, mutation rate, and populationation max
  population = new Population(target, mutationRate, popmax);
  redraw();
  loop();
}



function DispBB(N,x,y){
  for(var k=0;k<N.length;k++){
   var ci = 255*N[k]/9;
    fill(ci)
    rect(x +k*15,y,15,15)
    }
}

function Str2Num(txt){
  var Num = [];
  for(var i=0;i<txt.length;i++){
    for(j=48;j<=58;j++){
      if(String.fromCharCode(j)==txt[i]){
        Num[i] = j-48;
      }
    }

  }
  return Num 
}


function getRP(num) {
  g = [];
  
  for (var i = 0; i < num; i++) {
    g[i] = newChr();
    }
  
    return g.join("");
  }

function newChr() {
  var c = floor(random(48,58));
  return String.fromCharCode(c);
}

// function mousePressed() {
//   noLoop();
// }

// function mouseReleased() {
//   loop();
// }


function draw() {



  // Generate mating pool
  population.naturalSelection();
  //Create next generation
  
  population.generate();
  // Calculate fitness
  
  population.calcFitness();

  population.evaluate();
  
  var Ni = Str2Num(population.getBest())
  DispBB(Ni,20,130)

  for(var ki=0;ki<35;ki++){
    var Nj = Str2Num(population.population[ki].getPhrase())
    DispBB(Nj,300,30+ki*15)
  }

  //for(var i=48;i<58;i++){
   // text(String.fromCharCode(i),10+i*10-40,10 +i*10-40)
    //text('Helll000',100,100)
  //}

  //ellipse(100,100,100,100)

    // If we found the target phrase, stop
  if(population.isFinished()) {
    println(millis()/1000.0);
    noLoop();
  }

  //population.allPhrases()

  displayInfo();

}

function displayInfo() {
  // Display current status of populationation
  var answer = population.getBest();

  //bestPhrase.html("Best phrase:<br>" + answer);

  statstext = "Total generations:     " + population.getGenerations() + "<br>";
  statstext +=    "Average fitness:       " + nf(population.getAverageFitness()) + "<br>";
  statstext +=    "Total population:      " + popmax + "<br>";
  statstext +=    "Mutation rate:         " + floor(mutationRate * 100) + "%";

  stats.html(statstext);

  //allPhrases.html("All phrases:<br>" + population.allPhrases())
}
