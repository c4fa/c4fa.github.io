//Nikesh Bajaj
//nikeshbajaj.in

var nSnakes = 10; // Number of centipedes to generate
var S = []; // Container to store centipede objects

var xt=0,yt=0, Eaten =false;
var Ex =false
var xoff =0.1

var BackS1,BackS2;
function preload(){
    BackS1 = loadSound("Terrarium/sounds/Background.mp3");
    BackS1.rate(2);
    BackS1.loop();
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    for (var i = 0; i < nSnakes; i++) {
        S.push(new Snake(random(width), random(height), color(i/nSnakes * 360, 200, 100)));
    }
    xt=width/2,yt=height/2;
}
var s=1
function draw() {
    background(0);
    if(!Ex){
    if(!BackS1.isPlaying()){BackS1.play();}
    fill(0,0, random(255));
    ellipse(xt,yt,20,20);
    noFill();
    stroke(25);
    ellipse(xt,yt,20*s,20*s);
    ellipse(xt,yt,20*s/2,20*s/2);
    //ellipse(xt,yt,20*s/4,20*s/4);
    s+=1;
    if(s>width/4){
        s=1;
    }
    }
    
    for (var i = 0; i < S.length; i++) {
        if(!Ex){
        S[i].update(xt,yt);
        }else{
        var xti = noise(xoff + i*100)*width
        var yti = noise(xoff+100 +i*100)*height
        S[i].update(xti,yti);
        xoff+=0.001
        }
    }
    
    for (var i = 0; i < S.length; i++) {
        S[i].render();  
    }

    for (var i = 0; i < S.length; i++) {
        if(S[i].isEaten(xt,yt)){
            xt = random(100, width)
            yt = random(100, height)
            s=1;
        }
    }

}

function mousePressed(){
    Ex = !Ex;
    if(Ex){BackS1.rate(4);}
    if(!Ex){BackS1.rate(2);}
}

function Snake(x, y, c) {
    // Set steering variables
    this.separateCoef = 0.5; // How separate?
    this.steeringCoef = 0.2; // How long to transition from current velocity to desired target

    // Vectors: The object stores its position, velocity, and acceleration as vectors.
    this.acceleration = p5.Vector.fromAngle(random(TAU));
    this.velocity = createVector(0, 0);
    this.position = createVector(x, y);

    this.nSegments = 4; // Number of segments
    this.size = 8; // Size
    this.maxVelocity = 1; // Max velocity
    this.maxForce = 5;
    this.color = c;

    // Create segments (which are position vectors)
    this.segments = [];
    for (var i = 0; i < this.nSegments; i++) {
        this.segments.push(this.position.copy());
    }

    // Reynold's Arrive
    this.arrive = function(target) {
        var desired = p5.Vector.sub(target, this.position);

        // The arrive behavior!
        var d = desired.mag();

        if (d < 100) {
            // Map the desired magnitude according to distance
            var m = map(d, 0, 200, 0, this.maxVelocity);
            desired.setMag(m);
        } else {
            desired.setMag(this.maxVelocity);
        }

        desired.setMag(this.maxVelocity);
        // Apply steering
        this.steer(desired);
    }

    this.separate = function(vehicles) {
        var sum = createVector();
        var count = 0;

        // Loop throught every centipde
        for (var i = 0; i < vehicles.length; i++) {
            var vehicle = vehicles[i];

            // Loop through each segment
            for (var j = 0; j < vehicle.segments.length; j++) {
                var segment = vehicle.segments[j];
                var desiredseparation = (this.size * 2 + vehicle.size * 2) * this.separateCoef;
                var d = p5.Vector.dist(this.position, segment);

                // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
                if ((d > 0) && (d < desiredseparation)) {
                    // Calculate vector pointing away from neighbor
                    var diff = p5.Vector.sub(this.position, segment);
                    diff.normalize();
                    diff.div(d); // Weight by distance
                    sum.add(diff);
                    count++; // Keep track of how many
                }
            }
        }

        // Average -- divide by how many
        if (count > 0) {
            sum.div(count);
            // Our desired vector is the average scaled to maximum speed
            sum.normalize();
            sum.mult(this.maxVelocity);
            // Implement Reynolds: Steering = Desired - Velocity
            var steer = p5.Vector.sub(sum, this.velocity);
            steer.limit(this.maxForce);
            this.applyForce(steer);
        }
    }

    // formula: steering = desired - velocity
    this.steer = function(desired) {
        var steering = p5.Vector.sub(desired, this.velocity).mult(this.steeringCoef);;
        steering.limit(this.maxforce);
        this.applyForce(steering);
    }

    
    this.applyForce = function(force) {
        this.velocity.add(force);
        this.velocity.limit(this.maxVelocity); // Limit velocity
        this.position.add(this.velocity);
    };

    this.isEaten =function(xt,yt){
        if(dist(this.segments[0].x,this.segments[0].y,xt,yt)<this.size + 10){
            this.segments.push(this.position.copy())
            return true;
        }
        return false;
    }

    
    this.update = function(targetX,targetY) {
    
        var desired = createVector(targetX,targetY);
    
        this.applyForce(this.arrive(desired));
        this.separate(S);
    
        this.segments[0] = this.position;
        for (var i = 1; i < this.segments.length; i++) {
            var s0 = this.segments[i - 1]; // Previous segment
            var s1 = this.segments[i]; // Current segment
    
            if (dist(s0.x, s0.y, s1.x, s1.y) > this.size) {
                var v2 = p5.Vector.sub(s1, s0).setMag(this.size);
                this.segments[i] = s0.copy().add(v2);
            }
        }


    }

    
    this.render = function() {
        push();
        fill(this.color);
        noStroke();
    
        for (var i = this.segments.length - 1; i >= 0; i--) {
            var seg = this.segments[i];
            if(i==0){
                ellipse(seg.x, seg.y, 2*this.size, 2*this.size);
                if(Ex){fill(0)}
                else{fill(255)}
                ellipse(seg.x, seg.y, this.size, this.size);
                fill(0)
                ellipse(seg.x, seg.y, this.size/2, this.size/2);


            }else{
                ellipse(seg.x, seg.y, this.size, this.size);
                //fill(255)
                if(Ex==true){
                push()
                translate(seg.x,seg.y)
                rotate(random(-PI/2,PI/2))
                //ellipse(seg.x-5, seg.y, this.size/3, this.size*4);
                //ellipse(seg.x+5, seg.y, this.size/3, this.size*4);
                ellipse(5,0, this.size*4, this.size/4);
                ellipse(-5,0, this.size*4, this.size/4);
                pop()
                }else if(i==this.segments.length - 1){
                
                push()
                translate(seg.x,seg.y)
                rotate(random(-PI/1,PI/1))
                var tl=2
                ellipse(5,0, this.size*tl, this.size/tl);
                ellipse(-5,0, this.size*tl, this.size/tl);
                pop()

                }



            }
        }
        pop();
    }
}