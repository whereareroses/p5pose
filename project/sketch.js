// setup initializes this to a p5.js Video instance.
let video;
let active = true;
let one, two, three, four, five, six,seven;
let audios;
let bgm;
let star1, star2, star3, star4, star5, star6;
let stars;
let img0,img1, img2, img3, img4, img5, img6, btn, end1 ,end2, end3;
let imgs;
let whichImg = null;
let end = []
let endb = true;
// let text1,text2,text3,rect1;
export function preload() {
  bgm = loadSound("audio/background.mp3")
}
// p5js calls this code once when the page is loaded (and, during development,
// when the code is modified.)
export function setup() {
  let cnv = createCanvas(1200, 900);
  cnv.position(0, 0, 'fixed');
  video = select("video") || createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with single-pose detection. The second argument
  // is a function that is called when the model is loaded. It hides the HTML
  // element that displays the "Loading model…" text.
  const poseNet = ml5.poseNet(video, () => select("#status").hide());

  // Every time we get a new pose, apply the function `drawPoses` to it (call
  // `drawPoses(poses)`) to draw it.
  poseNet.on("pose", drawPoses);

  // Hide the video element, and just show the canvas
  video.hide();
  //load sound and image file

  one = loadSound("audio/044 Rose.mp3")
  two = loadSound("audio/062 King.mp3")
  three = loadSound("audio/074 Admirer.mp3")
  four = loadSound("audio/084 Businessman.mp3")
  five = loadSound("audio/122 Fox.mp3")
  six = loadSound("audio/126 Roses.mp3")
  seven = loadSound("audio/end.mp3")
  audios = [one,two,three,four,five,six]
  img0 = loadImage("img/0.png")
  img1 = loadImage("img/1.png")
  img2 = loadImage("img/2.png")
  img3 = loadImage("img/3.png")
  img4 = loadImage("img/4.png")
  img5 = loadImage("img/5.png")
  img6 = loadImage("img/6.png")
  btn = loadImage("img/btn.gif")
  end1 = loadImage("img/end1.png")
  end2 = loadImage("img/end2.png")
  end3 = loadImage("img/end3.png")
  imgs = [img1,img2,img3,img4,img5,img6]
  bgm.loop();

}

// p5js calls this function once per animation frame. In this program, it does
// nothing---instead, the call to `poseNet.on` in `setup` (above) specifies a
// function that is applied to the list of poses whenever PoseNet processes a
// video frame.
export function draw() {}

function drawPoses(poses) {
  // Modify the graphics context to flip all remaining drawing horizontally.
  // This makes the image act like a mirror (reversing left and right); this is
  // easier to work with.
  translate(width, 0); // move the left side of the image to the right
  scale(-1.0, 1.0);
  var color1 = color(0, 0, 153);
  var color2 = color(51, 51, 51);
  setGradient(0, 0,1200, 900, color1, color2, "Y");
  drawKeypoints(poses);
  drawSkeleton(poses);
  drawStars();
  if (millis() < 13000){
   firInterface(poses);
  }

  //if statements to check
  let starposition = [ [width - width * 0.1, height * 0.10], [width - width * 0.3, height * 0.15],
                       [width - width * 0.4, height * 0.1], [width - width * 0.63, height * 0.13],
                       [width - width * 0.7, height * 0.14], [width - width * 0.85, height * 0.13] ]
  if (poses.length > 0){
  if (poses[0].pose.rightWrist.confidence > 0.5 ) {
    let x = poses[0].pose.rightWrist.x
    let y = poses[0].pose.rightWrist.y
    for (let i = 0; i < starposition.length; i++){
      if (( x >= starposition[i][0] - 20 && x <= starposition[i][0] + 20 ) &&
          ( y >= starposition[i][1] - 20 && y <= starposition[i][1] + 20) &&
          active) {
           console.log("yes")
           active = false
           story(i)


      }
    }
  }
  if (poses[0].pose.leftWrist.confidence > 0.5) {
    let x = poses[0].pose.leftWrist.x
    let y = poses[0].pose.leftWrist.y
    for (let i = 0; i < starposition.length; i++){
      if (( x >= starposition[i][0] - 20 && x <= starposition[i][0] + 20 ) &&
          ( y >= starposition[i][1] - 20 && y <= starposition[i][1] + 20) &&
          active) {
           console.log("yes")
           active = false
           story(i)


      }
    }
  }

  }

  //if statement to present the story
  if (whichImg != null){
  push();
  translate(width, 0)
  scale(-1.0,1.0)
  image(imgs[whichImg],0,100)
  image(btn,525,800,150,100)
  pop();


  if (poses.length > 0){
    if (poses[0].pose.rightWrist.confidence > 0.5) {
      let x = poses[0].pose.rightWrist.x
      let y = poses[0].pose.rightWrist.y
      if (( x >= 525 && x <= 675 ) && ( y >= 800 && y <= 900)){
        end.push(whichImg)
        audios[whichImg].pause();
        whichImg = null;
        active = true
      }
    }
    if (poses[0].pose.leftWrist.confidence > 0.5) {
      let x = poses[0].pose.leftWrist.x
      let y = poses[0].pose.leftWrist.y
      if (( x >= 525 && x <= 675 ) && ( y >= 800 && y <= 900)){
        end.push(whichImg)
        audios[whichImg].pause();
        whichImg = null;
        active = true
      }
    }
  }

  }
  var unique = end.filter( onlyUnique );
  var array = [0,1,2,3,4,5]
  if ((unique.length === array.length) &&
    (unique.sort().every(function(value, index)
    { return value === array.sort()[index]})) && endb){
      seven.play()
      endb = false
    }


  if (endb == false) {
      translate(width, 0); // move the left side of the image to the right
      scale(-1.0, 1.0);
      if (seven.currentTime() > 0 && seven.currentTime() < 23){
        image(end1,0,100)
      }
      else if (seven.currentTime() > 23 && seven.currentTime() < 36 ){
        image(end2,0,100)
      }
      else{
        image(end3,0,100)
      }

    }


}

//interface
function drawStars(){
  let a;
//if we are not touching the first star then draw it
if (whichImg != 5){
  push();
  translate(width * 0.1, height * 0.10);
  a = 35;
  a += (random(10) - 5);
  star(0, 0, 8, a, 4);
  pop();
}

if (whichImg != 3){
  push();
  translate(width * 0.4, height * 0.1);
  rotate(frameCount / 250.0);
  star(0, 0, 6, 15, 5);
  pop();
}

if (whichImg != 4){
  push();
  translate(width * 0.3, height * 0.15);
  rotate(frameCount / -150.0);
  star(0, 0, 8, 20, 5);
  pop();
}

if (whichImg != 2){
  push();
  translate(width * 0.63, height * 0.13);
  rotate(225.0);
  star(0, 0, 7, 20, 4);
  pop();
}

if (whichImg != 1){
  push();
  translate(width * 0.7, height * 0.14);
  rotate(frameCount / -180.0);
  star(0, 0, 7, 13, 6);
  pop();
}

if (whichImg != 0){
  push();
  translate(width * 0.85, height * 0.13);
  rotate(80.0);
  a = 15;
  a += (random(10)-5);
  star(0, 0, 6,a, 5);
  pop();
}

}
function star(x, y, radius1, radius2, npoints) {
  fill(255, 255, 230)
  noStroke()
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
  if (axis == "Y") {  // Top to bottom gradient
    for (let i = y; i <= y+h; i++) {
      var inter = map(i, y, y+h, 0, 1);
      var c = lerpColor(c1, c2, inter,0.5);
      stroke(c);
      line(x, i, x+w, i);
    }
  }
  else if (axis == "X") {  // Left to right gradient
    for (let j = x; j <= x+w; j++) {
      var inter2 = map(j, x, x+w, 0, 1);
      var d = lerpColor(c1, c2, inter2,0.5);
      stroke(d);
      line(j, y, j, y+h);
    }
  }
}
function firInterface(poses){
  translate(width, 0); // move the left side of the image to the right
  scale(-1.0, 1.0);

  fill('rgba(204, 217, 255,0.5)')
  rect(0,100,1200,700)
  image(img0,0,100)
  textSize(30);
  textFont("Palatino")
  fill(255)
  text('Have you ever... dreamed of catching stars?', 40, 430);
  textSize(38)
  text("Here, you could actually catch one.",100,530)
  textSize(32)
  text("Raise your arms, see what's on them.",60,630)


}
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
//third interface
function story(i){
  audios[i].play();
  whichImg = i
}

// Draw ellipses over the detected keypoints
function drawKeypoints(poses) {
  poses.forEach(pose =>
    pose.pose.keypoints.forEach(keypoint => {
      if (keypoint.score > 0.2) {
        fill(255, keypoint.position.x,keypoint.position.y);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    })
  )
}

// Draw connections between the skeleton joints.
function drawSkeleton(poses) {
  poses.forEach(pose => {
    pose.skeleton.forEach(skeleton => {
      // skeleton is an array of two keypoints. Extract the keypoints.
      const [p1, p2] = skeleton;
      stroke(255,p1.score*255,p2.score*255);
      strokeWeight(3);
      line(p1.position.x, p1.position.y, p2.position.x, p2.position.y);
    });
  });
}
