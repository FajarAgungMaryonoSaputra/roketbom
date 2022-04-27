let vs = []
function setup() {
  createCanvas(600, 600);
  v = new Vehicle(300,300);
}

function draw() {
  background(255);
  
  v.display()
  v.edges()
  v.update();
  v.wander();
  
}

class Vehicle{
  constructor(x,y){
    this.location = createVector(x,y);
    this.velocity = createVector(10,10);
    this.acceleration = createVector(0,0);
    this.l = 20.0;
    this.maxspeed = 4;
    this.maxforce = 0.2;
    this.wanderTheta = PI/8;
  }
  
  wander(){
    let projVector = this.velocity.copy(); 
    projVector.setMag(100);     
    let projPoint = projVector.add(this.location);
    let wanderRadius = 50;
    let theta = this.wanderTheta + this.velocity.heading();
    let xBar = wanderRadius * cos(theta);
    let yBar = wanderRadius * sin(theta);

    let wanderPoint = p5.Vector.add(projPoint, createVector(xBar,yBar));
    let steeringForce = wanderPoint.sub(this.location);
    steeringForce.setMag(this.maxforce);
    this.applyForce(steeringForce);
    
    this.wanderTheta += random(-0.3 , 0.3);
    
    let debug = true;
    if(debug){
      push()
      noStroke();
      fill(255,0,0); 
      
      strokeWeight(0)
    fill(0)
    rect(projPoint.x+30,projPoint.y+10,3,3)
    rect(projPoint.x+27,projPoint.y+13,3,3)
    rect(projPoint.x+33,projPoint.y+13,3,3)
    rect(projPoint.x+24,projPoint.y+16,3,3)
    rect(projPoint.x+36,projPoint.y+16,3,3)
    rect(projPoint.x+21,projPoint.y+19,3,6)
    rect(projPoint.x+39,projPoint.y+19,3,6)
    rect(projPoint.x+24,projPoint.y+25,15,3)
    rect(projPoint.x+18,projPoint.y+25,3,3)
    rect(projPoint.x+42,projPoint.y+25,3,3)
    rect(projPoint.x+15,projPoint.y+28,3,6)
    rect(projPoint.x+45,projPoint.y+28,3,6)
    rect(projPoint.x+12,projPoint.y+34,3,9)
    rect(projPoint.x+48,projPoint.y+34,3,9)
    rect(projPoint.x+9,projPoint.y+43,3,12)
    rect(projPoint.x+51,projPoint.y+43,3,12)
    rect(projPoint.x+6,projPoint.y+55,3,27)
    rect(projPoint.x+54,projPoint.y+55,3,27)
    
    rect(projPoint.x+9,projPoint.y+82,3,12)
    rect(projPoint.x+51,projPoint.y+82,3,12)
    rect(projPoint.x+12,projPoint.y+94,3,6)
    rect(projPoint.x+48,projPoint.y+94,3,6)
    rect(projPoint.x+15,projPoint.y+100,3,3)
    rect(projPoint.x+45,projPoint.y+100,3,3)
    rect(projPoint.x+18,projPoint.y+103,3,3)
    rect(projPoint.x+42,projPoint.y+103,3,3)
    rect(projPoint.x+12,projPoint.y+106,15,3)
    rect(projPoint.x+36,projPoint.y+106,15,3)
    rect(projPoint.x+25,projPoint.y+91,3,18)
    rect(projPoint.x+34,projPoint.y+91,3,18)
    
    rect(projPoint.x+28,projPoint.y+88,6,3)
    rect(projPoint.x+28,projPoint.y+109,6,3)
    
    rect(projPoint.x+19,projPoint.y+109,3,6)
    rect(projPoint.x+42,projPoint.y+109,3,6)
    rect(projPoint.x+22,projPoint.y+115,21,3)
    
    rect(projPoint.x+19,projPoint.y+118,3,3)
    rect(projPoint.x+43,projPoint.y+118,3,3)
    rect(projPoint.x+16,projPoint.y+121,3,6)
    rect(projPoint.x+46,projPoint.y+121,3,6)
    rect(projPoint.x+13,projPoint.y+127,3,9)
    rect(projPoint.x+49,projPoint.y+127,3,9)
    rect(projPoint.x+16,projPoint.y+136,3,3)
    rect(projPoint.x+46,projPoint.y+136,3,3)
    rect(projPoint.x+19,projPoint.y+139,3,6)
    rect(projPoint.x+43,projPoint.y+139,3,6)
    rect(projPoint.x+22,projPoint.y+135,6,3)
    rect(projPoint.x+37,projPoint.y+145,6,3)
    rect(projPoint.x+28,projPoint.y+148,3,6)
    rect(projPoint.x+34,projPoint.y+148,3,6)
    rect(projPoint.x+31,projPoint.y+154,3,3)
    
    //sayap    
    rect(projPoint.x+7,projPoint.y+109,6,3)  
    rect(projPoint.x+49,projPoint.y+109,6,3) 
    rect(projPoint.x+4,projPoint.y+103,3,6)
    rect(projPoint.x+55,projPoint.y+103,3,6)
    rect(projPoint.x+1,projPoint.y+93,3,12)
    rect(projPoint.x+58,projPoint.y+93,3,12) 
    rect(projPoint.x+4,projPoint.y+90,3,3)
    rect(projPoint.x+55,projPoint.y+90,3,3)
    
    //kaca
    rect(projPoint.x+27,projPoint.y+32,9,3)
    rect(projPoint.x+24,projPoint.y+35,3,15)
    rect(projPoint.x+27,projPoint.y+50,9,3)
    rect(projPoint.x+36,projPoint.y+35,3,15)
    
    //warnakaca
    fill(0,191,255)
    rect(projPoint.x+27,projPoint.y+35,9,15)
    
    //bodywarna merah
    fill('red')
    rect(projPoint.x+28,projPoint.y+91,6,18)
    rect(projPoint.x+24,projPoint.y+19,15,6)
    rect(projPoint.x+27,projPoint.y+16,9,3)
    rect(projPoint.x+30,projPoint.y+13,3,3)
    rect(projPoint.x+4,projPoint.y+93,3,11)
    rect(projPoint.x+7,projPoint.y+90,3,19)
    rect(projPoint.x+10,projPoint.y+94,3,15)
    rect(projPoint.x+13,projPoint.y+100,3,6)
    rect(projPoint.x+16,projPoint.y+103,3,3)
    
    rect(projPoint.x+56,projPoint.y+93,3,11)
    rect(projPoint.x+53,projPoint.y+90,3,19)
    rect(projPoint.x+50,projPoint.y+94,3,15)
    rect(projPoint.x+48,projPoint.y+100,3,6)
    rect(projPoint.x+45,projPoint.y+103,3,3)
    
    //ekor
    fill('yellow')
    rect(projPoint.x+22,projPoint.y+117,21,3)
    rect(projPoint.x+19,projPoint.y+120,27,6)
    rect(projPoint.x+16,projPoint.y+126,9,9)
    rect(projPoint.x+40,projPoint.y+126,9,9)
    rect(projPoint.x+22,projPoint.y+138,21,6)
    rect(projPoint.x+19,projPoint.y+135,27,3)
    rect(projPoint.x+28,projPoint.y+144,9,3)
    rect(projPoint.x+31,projPoint.y+147,3,6)
    
    fill('orange')
    rect(projPoint.x+25,projPoint.y+126,15,9)
    
    
      
      
      
      noFill();
      stroke('black')
      console.log(wanderRadius)
      circle(projPoint.x, projPoint.y,wanderRadius*2)
     
      pop()
    }
  }
  
  seek(vektorTarget){
    // percieve target location
    var desired = p5.Vector.sub(vektorTarget, this.location);
    desired.normalize();
    desired.mult(this.maxspeed);
    
    //kemudi
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  arrive(vektorTarget){
    // percieve target location
    var desired = p5.Vector.sub(vektorTarget, this.location);
    var jarak = desired.mag()

    if (jarak < 100){
      var m = map(jarak, 0, 100, 0, this.maxspeed);
      desired.normalize();
      desired.mult(m);
      
    }
    else{
      desired.normalize();
      desired.mult(this.maxspeed);    
    }

    
    //kemudi
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  
  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }
  applyForce(force){
    this.acceleration.add(force);
  }
  display(){
    var theta = this.velocity.heading()// + PI/2;
    push();
    stroke(0);
    translate(this.location.x, this.location.y)
    rotate(theta+20)
    //circle(this.l, -this.l, 5,5)
    
    fill(0)
rect(this.l+20,this.l+50,2,10)
rect(this.l+22,this.l+46,2,18)
rect(this.l+24,this.l+44,2,8)    
rect(this.l+24,this.l+58,2,8)
rect(this.l+26,this.l+42,2,6)
rect(this.l+26,this.l+50,2,10)
rect(this.l+26,this.l+62,2,6)
rect(this.l+28,this.l+42,2,26)    
rect(this.l+30,this.l+36,2,26)   
rect(this.l+30,this.l+64,2,6)  
rect(this.l+32,this.l+36,8,34)
rect(this.l+40,this.l+42,4,26)
rect(this.l+44,this.l+44,2,22)    
rect(this.l+46,this.l+46,2,18)
rect(this.l+48,this.l+50,2,10)  
    
rect(this.l+34,this.l+32,2,4)
rect(this.l+36,this.l+30,2,2)    
rect(this.l+38,this.l+28,6,2)
    
fill('red')  
rect(this.l+44,this.l+28,2,2)
rect(this.l+44,this.l+24,2,2) 
rect(this.l+44,this.l+32,2,2)  
rect(this.l+48,this.l+28,2,2) 
    
    
    pop();
  }

  edges() {
    if (this.location.x > width + 10) {
      this.location.x = -10;
    } else if (this.location.x < -10) {
      this.location.x = width + 10;
    }
    if (this.location.y > height + 10) {
      this.location.y = -10;
    } else if (this.location.y < -10) {
      this.location.y = height + 10;
    }
  }

}