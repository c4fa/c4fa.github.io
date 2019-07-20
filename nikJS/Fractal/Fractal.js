//Fractal Design

// Loops from 0 to 1 over time
var Phasor = function(inc) {
    this.phase = 0.0; // Current phase
    this.inc = inc; // Increment phase

};
// Update the phase
Phasor.prototype.update = function() {
    this.phase += this.inc;

    // Keep phase between 0 and 1
    while (this.phase > 1) {
        this.phase -= 1;
    }
    while (this.phase < 0) {
        this.phase += 1;
    }
};

var P =[], Q=[], R=[];

function setup() {
    createCanvas(windowWidth, windowHeight);
    //createCanvas(700, 700);
    //var cnv = createCanvas(700,700);
    //var shiftX = (windowWidth-700)/2;
    //cnv.position(shiftX,0);
    colorMode(HSB);

    for(var i=0;i<4;i++){
        P[i]= new Phasor(random(0.001,0.01));
        Q[i]= new Phasor(random(0.001,0.01));
        R[i]= new Phasor(random(0.001,0.01));
    }

}
var xoff=0;
function draw() {
    xoff+=0.01
    background(0);
    push();
    translate(width / 2, height * 0.5);
    rotate(-PI*noise(xoff));
    //animatedFractal(noise(xoff+100)*200, noise(xoff)*10)
    animatedFractal0(P, noise(xoff+100)*200, noise(xoff)*10)
    pop();

    push();
    translate(width /2, height * 0.5);
    rotate(PI*noise(xoff));
    //animatedFractal(noise(xoff+100)*200, noise(xoff)*10)
    animatedFractal0(Q, noise(xoff+100)*200, noise(xoff)*10)
    pop();

    push();
    translate(width /2, height * 0.5);
    rotate(2*PI*noise(xoff));
    //animatedFractal(noise(xoff+100)*200, noise(xoff)*10)
    animatedFractal0(R, noise(xoff+100)*200, noise(xoff)*10)
    pop();

    for(var i=0;i<4;i++){
        P[i].update();
        Q[i].update();
        R[i].update();
    }

      textSize(30); 
      fill(255,0,200,0.5)
      //stroke(0,0,0,100);
      //noStroke();
      text('Fractal Design', 30,80)
      textSize(15);
      text('Three different trees', 30,100)


      // textSize(20); 
      // fill(0,0,0)
      // //stroke(0,0,0,100);
      // noStroke();
      // text('Refresh to start with new random setting',20,height-20)
      textSize(15); 
      fill(0,0,255,0.5)
      noStroke();
      text('http://nikeshbajaj.in',width/1.2,height-20)

}

function animatedFractal0(P, length, gen) {
    gen++; // Tracks which generation
    var end = createVector(length, 0); // Endpoint

    // Don't draw the initial generation
    if (gen > 1) {
        // Modulated hue, offset by generation
        var h = gen * 20 - P[3].phase * 360;

        // Keep hue values between 0 and 360
        while (h > 360) {
            h -= 360;
        }
        while (h < 0) {
            h += 360;
        }
        stroke(h, 80, 100, 0.8);

        // Strokes get thinner with each generation
        strokeWeight(1 / gen * 8);
        line(0, 0, end.x, end.y);
    }

    // Create new branches. Terminates if length is less 5 or less.
    if (length > 5) {
        // Generation angle offset
        var genOffset = gen / map(sin(P[2].phase * TAU), -1, 1, 16, 64);

        // Angles for branches
        angle = map(sin(genOffset * TWO_PI + P[0].phase * TAU), -1, 1, TWO_PI, 0);
        angle2 = -map(sin(genOffset * TWO_PI + P[1].phase * TAU + PI), -1, 1, -TWO_PI, 0);

        // Create new length
        var newLength = length * 0.7;

        // Use matrix transformations when creating two new branches
        push();
        translate(length, 0);
        push();
        rotate(angle);
        animatedFractal0(P,newLength, gen);
        pop();
        push();
        rotate(angle2);
        animatedFractal0(P,newLength, gen);
        pop();
        pop();
    }
}