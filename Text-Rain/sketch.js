let w = 640;
let h = 480;
let capture;
let threshold;
let fallingLetters = [];

// let fallingLetters[i];

function setup() {
  createCanvas(w, h);

  capture = createCapture(VIDEO);
  capture.size(w, h);
  capture.hide();

  let sourceText = "난 내가 뭘 하고 있는지 모르겠다.";

  for (let i = 0; i < sourceText.length; i++) {
    let currentLetter = new FallingLetter(sourceText[i], i * 24, 200);

    fallingLetters.push(currentLetter);
  }
  //print(fallingLetters);
}

function draw() {
  background(220);

  image(capture, 0, 0);
  // do calculations
  capture.loadPixels();

  if (capture.pixels.length > 0) {
    
    for (let i = 0; i < fallingLetters.length; i++) {
      let currentPixelIndex = (fallingLetters[i].x + fallingLetters[i].y * w) * 4;

      while (fallingLetters[i].y > 0 && getBrightness(capture.pixels, i) < 50) {
        fallingLetters[i].y--;
      }
      if (fallingLetters[i].y >= h) {
        fallingLetters[i].y = 0;
      } else {
        fallingLetters[i].y++;
      }
    }
  }
// getBrightness(capture.pixels, i)
  for(let i = 0; i < fallingLetters.length; i++) {
    textSize(30);
    fill(0, 255, 0);
    text(fallingLetters[i].char, fallingLetters[i].x, fallingLetters[i].y)
  }
}

class FallingLetter {
  constructor(char, x, y) {
    this.char = char;
    this.x = x;
    this.y = y;
  }
}


function getBrightness(p, i) {
  // get the brightness of the pixel at the current position of the letter
  
  const currentPixelIndex = (fallingLetters[i].x + fallingLetters[i].y * width) * 4
  let r = p[currentPixelIndex];
  let g = p[currentPixelIndex + 1];
  let b = p[currentPixelIndex + 2];
  
  return (r + g + b) / 3;
}
