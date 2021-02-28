var canvas;

let objs = [];
let objsNum = 1200;
let MAX;
const palette = ["#ff6f61","#ff6f61","#ff6f61","#ff6f61"];
let maximumSize = 0.3;
let rotSpeedValue = 3;
let startingSpeed = 0.03;
let minSpeed = 80;
let maxSpeed = 800;
let hexSize = 0.2;
let tooFar;

function setup() {
    frameRate(30);
    canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    tooFar = windowWidth * 0.7;
  angleMode(DEGREES);
  // noStroke();
	stroke(255);
  MAX = min(width, height) * hexSize;

  for (let i = 0; i < objsNum; i++) {
    objs.push(new Obj());
  }
}

function draw() {
  background("#000000");

  lights();
  ambientLight(100);
  pointLight(color(0, 100, 0), 0, 0, 0);

  for (let i = 0; i < objs.length; i++) {
    objs[i].move();
    objs[i].display();
  }
}

class Obj {
  constructor() {
    this.sMax = random(MAX * 0, MAX * maximumSize);
    this.s = this.sMax;
    this.pos = createVector(0, 0);
    this.t = random(360);
    this.speed = random(minSpeed, maxSpeed);
    this.r = map(sq(sq(random(MAX, tooFar))), sq(sq(MAX)), sq(sq(tooFar)), MAX, tooFar);
    this.currentSpeed = startingSpeed;
    this.rot = createVector(random(360), random(360), random(360));
    this.rotSpeed = createVector(random(-rotSpeedValue, rotSpeedValue), random(-rotSpeedValue, rotSpeedValue), random(-rotSpeedValue, rotSpeedValue));
    this.c = random(palette);
  }

  move() {
    this.rot.add(this.rotSpeed);
    this.s = map(sqrt(this.r), sqrt(tooFar), sqrt(MAX), this.sMax, 0);
    this.currentSpeed = map(sq(sq(this.r)), sq(sq(MAX)), sq(sq(tooFar)), startingSpeed, this.speed);
    this.r += this.currentSpeed;

    this.pos = calcPos(this.r, this.t, 6);

    if (this.r > tooFar) {
      this.r = MAX;
    }
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotateX(this.rot.x);
    rotateY(this.rot.y);
    rotateZ(this.rot.z);
    fill(this.c);
    noStroke();
    //noFill();
    //stroke(this.c);
    strokeWeight(2);
    sphere(this.s, 3, 3);
    pop();
  }
}

function calcPos(r, t, num) {
  let x = r * cos(t) * func(t, num);
  let y = r * sin(t) * func(t, num);
  let p = createVector(x, y);

  return p;
}

function func(t, num) {
  let A = cos(180 / num);
  let b = 360 / num;
  let B = cos(b * (t / b - floor(t / b)) - 180 / num);

  return A / B;
}
