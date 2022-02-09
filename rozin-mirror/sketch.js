let capture;
const w = 720;
const h = 480;

function setup() {
  createCanvas(w, h);
  capture = createCapture(VIDEO);
  capture.size(w, h);
  capture.hide();
  
  colorMode(HSB, 160);
  
  rectMode(CENTER)
}

function draw() {
  background(220);
  
  const stepSize = 10;
  noStroke();
  capture.loadPixels();
  
  push()
    translate(width, 0);
    scale(-1, 1);
  for(let y = 0; y < capture.height; y+=stepSize) {
    for(let x = 0; x < capture.width; x+=stepSize) {
      
      const i = (x + y * width) * 4;
      
      const r = capture.pixels[i]; // red channel
      const g = capture.pixels[i+1]; // green channel
      const b = capture.pixels[i+2]; // blue channel
      // capture.pixels[i+3] = 1; // alpha channel
      
      const brightness = (r + g + b) / 3
      
      fill(r,g,b);
      //stroke(0);
      //strokeWeight(1);
      rect(x, y, stepSize, stepSize);
      
       rect(x, y, brightness/6, 6);
      textSize(brightness/10)
      // text('cool', x, y);
    }
  }
  pop();
  
  capture.updatePixels();
  
  // image(capture, 0, 0);
  //print(capture.pixels.length)
  
}