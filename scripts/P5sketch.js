var canvas;

let objs = [];
let objsNum;
let objsNumDesktop = 800;
let objsNumMobile = 170;
let MAX;
let pMAX;
const palette = ["#ff6f61"];

let maximumSize;
let maximumSizeDesktop = 0.4;
let maximumSizeMobile = 0.8;

let rotSpeedValue = 6;
let startingSpeed = 0.03;
let _minSpeed = 20;
let _maxSpeed = 80;
let minSpeed;
let maxSpeed;
let pminSpeed;
let pmaxSpeed;
let hexSize = 0.2;
let tooFar;
let longerSide;
let sphereShape = 2;

let removeFadingTime = 3; // en secondes
let startingCountdown = false;
let removeCountdown = removeFadingTime * 30; // removeFadingTime * frameRate * sécurité

function isMobileDevice() {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

function setup() {
    frameRate(30);
    canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.position(0, 0);
    canvas.style("z-index", "5000");
    canvas.id('canvas');

    if(isMobileDevice() == true){
      objsNum = objsNumMobile;
      maximumSize = maximumSizeMobile;
    } else {
      objsNum = objsNumDesktop;
      maximumSize = maximumSizeDesktop;
    }

    longerSide = max(width, height);
    tooFar = longerSide * 0.7;
    MAX = min(width, height) * hexSize;
    pMAX = MAX;
    minSpeed = longerSide*_minSpeed/100;
    maxSpeed = longerSide*_maxSpeed/100;
    pminSpeed = minSpeed;
    pmaxSpeed = maxSpeed;

  angleMode(DEGREES);
  // noStroke();
	stroke(255);
  

  for (let i = 0; i < objsNum; i++) {
    objs.push(new Obj());
  }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    tooFar = longerSide * 0.7;
    MAX = min(width, height) * hexSize;
    longerSide = max(width, height);
    console.log("longer side = "+longerSide);

    minSpeed = longerSide*_minSpeed/100;
    maxSpeed = longerSide*_maxSpeed/100;


    for (let i = 0; i < objs.length; i++) {
        objs[i].speed = map(objs[i].speed, pminSpeed, pmaxSpeed, minSpeed, maxSpeed);
        objs[i].sMax = map(objs[i].sMax, pMAX * 0, pMAX * maximumSize, MAX * 0, MAX * maximumSize);
    }
    pminSpeed = minSpeed;
    pmaxSpeed = maxSpeed;
    pMAX = MAX;
}

function draw() {
  //background("#070707");
  background(255);

  lights();
  ambientLight(100);
  pointLight(color(0, 100, 0), 0, 0, 0);

  for (let i = 0; i < objs.length; i++) {
    objs[i].move();
    objs[i].display();
  }
  if(startingCountdown == true){
    removeCountdown --;
    if(removeCountdown <= 0){
      canvas.remove();
    }
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

    if (this.r < MAX) {
        this.r = MAX;
    }

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
    sphere(this.s, 3, 2);
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



function mouseClicked(){
  shutDown();
}
function touchEnded(){
  shutDown();
}

function shutDown() {
  canvas.style("transition-property", "opacity");
  canvas.style("transition-duration", removeFadingTime+"s");
  canvas.style("opacity", 0);
  let body = select('#body');
  body.style("overflow", 'scroll');
  startingCountdown = true;
}


