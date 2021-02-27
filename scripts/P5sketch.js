var canvas;

let objs = [];
let objsNum = 500;
let MAX;
const palette = ["#ff6f61","#ff6f61","#ff6f61","#ff6f61"];
let maximumSize = 0.3;
let rotSpeedValue = 3;
let minSpeed = 3;
let maxSpeed = 7;

function setup() {
    frameRate(30);
    canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  // noStroke();
	stroke(255);
  MAX = min(width, height) * 0.525;

  for (let i = 0; i < objsNum; i++) {
    objs.push(new Obj());
  }
}

function draw() {
  background("#000000");

  lights();
  ambientLight(150);
  pointLight(color(0, 100, 0), 0, 0, 0);

  for (let i = 0; i < objs.length; i++) {
    objs[i].move();
    objs[i].display();
  }
}

class Obj {
  constructor() {
    this.sMax = random(MAX * 0.1, MAX * maximumSize);
    this.s = this.sMax;
    this.pos = createVector(0, 0);
    this.r = random(MAX * 0.6, MAX);
    this.t = random(360);
    this.speed = random(minSpeed, maxSpeed);
    this.rot = createVector(random(360), random(360), random(360));
    this.rotSpeed = createVector(random(-rotSpeedValue, rotSpeedValue), random(-rotSpeedValue, rotSpeedValue), random(-rotSpeedValue, rotSpeedValue));
    this.c = random(palette);
  }

  move() {
    this.r += this.speed;
    this.rot.add(this.rotSpeed);
    this.s = map(this.r, 0, MAX, this.sMax, 0);

    this.pos = calcPos(this.r, this.t, 6);
    if (this.r > MAX) {
      this.r = random(MAX * 0.6, MAX);
    }
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotateX(this.rot.x);
    rotateY(this.rot.y);
    rotateZ(this.rot.z);
    fill(this.c);
    box(this.s);
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