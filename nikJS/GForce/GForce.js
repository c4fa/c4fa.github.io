var P =[],A =[];
var Ap =[];
var Pt;
var particle
var attractor;
var xoff =0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  var color = [0,0,0]
  Pt = new Particle(width/2,height/2,1,40,color)
  for(var i =0;i<5;i++){
    var xx = random(10,width)
    var yy = random(10,height)
    var color = [random(1,255),random(1,255),random(1,255)]
    A[i] = new Particle(xx,yy,0.01,40,color);
    var pi =[];
     for(var j =0;j<10;j++){
        pi[j]= new Particle(xx + random(-10,10),yy+ random(-10,10),0.5,1,color);
     }
     Ap[i] = pi;
  }

}

function draw() {
  background(255);

  for(var i =0;i<A.length;i++){
    var f = Pt.calculateAttraction(A[i]);
    A[i].applyForce(f);
    A[i].update();
    A[i].display2();
    var pi = Ap[i];
    for(var j =0;j<pi.length;j++){
      var f = A[i].calculateAttraction(pi[j]);
      pi[j].applyForce(f);
      pi[j].update();
      pi[j].display();
    }
  }

  Pt.display2();
  textSize(50); 
  fill(0,0,0,100)
  stroke(0,0,0,100);
  //noStroke();
  text('Gravitational Attraction', width/3.5,80)


  textSize(20); 
  fill(0,0,0)
  //stroke(0,0,0,100);
  noStroke();
  text('Refresh to start with new random setting',20,height-20)
  textSize(15); 
  fill(0,0,255,180)
  noStroke();
  text('http://nikeshbajaj.in',width/1.2,height-20)

}


var Particle = function(x,y,v,m,color) {
  this.pos = createVector(x, y);
  this.vel = createVector(v, 0);
  this.acc = createVector(0, 0);
  this.mass = m;
  this.c = color;
  this.G = 1/2;

  this.applyForce = function(force) {
    var f = force.copy();
    f.div(this.mass);
    this.acc.add(f);
  };

  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  };

  this.display = function() {
    //stroke(0);
    strokeWeight(2);
    fill(255, 127);
    fill(this.c[0],this.c[1],this.c[2],100)
    ellipse(this.pos.x, this.pos.y, this.mass*16, this.mass*16);
  };

  this.display2 = function() {
    ellipseMode(CENTER);
    strokeWeight(4);
    stroke(0);
    fill(this.c[0],this.c[1],this.c[2],200)
    ellipse(this.pos.x, this.pos.y, this.mass*2, this.mass*2);
  }

  this.calculateAttraction = function(p) {
    var force = p5.Vector.sub(this.pos, p.pos);
    var distance = force.mag();
    distance = constrain(distance, 10, 15);
    force.normalize();
    var strength = (this.G * this.mass * p.mass) / (distance * distance);
    force.mult(strength);
    return force;
  }
}

var Attractor = function(x,y) {
  this.pos = createVector(x, y);
  this.mass = 20;
  this.G = 1;

  this.calculateAttraction = function(p) {
    // Calculate direction of force
    var force = p5.Vector.sub(this.pos, p.pos);
    // Distance between objects
    var distance = force.mag();
    // Artificial constraint
    distance = constrain(distance, 5, 25);
    // Normalize vector (distance doesn't matter here, we just want this vector for direction)
    force.normalize();
    // Calculate gravitional force magnitude
    var strength = (this.G * this.mass * p.mass) / (distance * distance);
    // Get force vector --> magnitude * direction
    force.mult(strength);
    return force;
  }

  // Method to display
  this.display = function() {
    ellipseMode(CENTER);
    strokeWeight(4);
    stroke(0);
    ellipse(this.pos.x, this.pos.y, this.mass*2, this.mass*2);
  }

}