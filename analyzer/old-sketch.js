let faceapi;
let detections = [];
let video;
let canvas;



// let words = [];
// let wordFall = setInterval(makeWord, 100);
// let letters = ['H', 'A', 'P', 'P',] 



function setup() {
  canvas = createCanvas(480, 360);
  canvas.id("canvas");

  video = createCapture(VIDEO);// Creat the video
  video.id("video");
  video.size(width, height);
  // video.hide();
  //Initialize the model
  const faceOptions = {
    withLandmarks: true,
    withExpressions: true,
    withDescriptors: true,
    minConfidence: 0.5
  };
  faceapi = ml5.faceApi(video, faceOptions, faceReady);
}

function draw() {
  clear();
  drawBoxs(detections);//Draw detection box: 
  drawLandmarks(detections);//// Draw all the face points: 
  drawExpressions(detections, 20, 250, 14);//Draw face expression:
}




function faceReady() {
  faceapi.detect(gotFaces);// Start detecting faces
}

// Got faces
function gotFaces(error, result) {
  if (error) {
    console.error(error);
    return;
  }

  detections = result;　//Now all the data in this detections: 
  // console.log(detections);

  clear();//Draw transparent background;: 
  // drawBoxs(detections);//Draw detection box: 
  // drawLandmarks(detections);//// Draw all the face points: 
  // drawExpressions(detections, 20, 250, 14);//Draw face expression:

  faceapi.detect(gotFaces);// Call the function again at here: 
}

function drawBoxs(detections) {
  if (detections.length > 0) {//If at least 1 face is detected: 
    for (f = 0; f < detections.length; f++) {
      let { _x, _y, _width, _height } = detections[f].alignedRect._box;
      stroke(0, 255, 225);
      strokeWeight(1);
      noFill();
      rect(_x, _y, _width, _height);
    }
  }
}

function drawLandmarks(detections) {
  if (detections.length > 0) {//If at least 1 face is detected: 
    for (f = 0; f < detections.length; f++) {
      let points = detections[f].landmarks.positions;
      for (let i = 0; i < points.length; i++) {
        stroke(255, 0, 0);
        // strokeWeight(3);
        // point(points[i]._x, points[i]._y);
      }
    }
  }
}

function drawExpressions(detections, x, y, textYSpace) {
  if (detections.length > 0) {//If at least 1 face is detected:
    let { neutral, happy, angry, sad, disgusted, surprised, fearful } = detections[0].expressions;
    textFont('Helvetica Neue');
    textSize(18);
    noStroke();
    fill(255, 255, 0);

    push()
    translate(width, 0);
    scale(-1, 1);
    text("🙃: " + nf(neutral * 100, 2, 2) + "%", x, y);
    text("😊: " + nf(happy * 100, 2, 2) + "%", x, y + textYSpace);
    text("😡: " + nf(angry * 100, 2, 2) + "%", x, y + textYSpace * 2);
    text("😢: " + nf(sad * 100, 2, 2) + "%", x, y + textYSpace * 3);
    text("😫: " + nf(disgusted * 100, 2, 2) + "%", x, y + textYSpace * 4);
    text("😱: " + nf(surprised * 100, 2, 2) + "%", x, y + textYSpace * 5);
    text("😦: " + nf(fearful * 100, 2, 2) + "%", x, y + textYSpace * 6);
    pop()

   happyFace(happy);



  } else {//If no faces is detected:
    push()
    translate(width, 0);
    scale(-1, 1);
    text("🙃: ", x, y);
    text("😊: ", x, y + textYSpace);
    text("😡: ", x, y + textYSpace * 2);
    text("😢: ", x, y + textYSpace * 3);
    text("😫: ", x, y + textYSpace * 4);
    text("😱: ", x, y + textYSpace * 5);
    text("😦: ", x, y + textYSpace * 6);
    pop();
  }

  // happyFace(happy);
  
}

function happyFace(h) {
  if(h * 100 >85) {
    fill(255, 0, 0);
    newFunction();
  }

  function newFunction() {
    push()
    translate(width, 0);
    scale(-1, 1);

    text("HAPPY FACE", 20, 20);
    
  }
}
