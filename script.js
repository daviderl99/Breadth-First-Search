let cols = 20;
let rows = 16;
let scale = 50;
let containers = [];

let settingStart = false;
let settingEnd = false;
let startN, endN;

document.getElementById("startSearch").disabled = true

function setup(){
  let canvas = createCanvas(cols*scale, rows*scale);
  canvas.parent("canvas-div");
  rectMode(CENTER);
  createGrid();
}

function draw(){
  drawGrid();
  checkIfReady();
}

function drawGrid(){
  containers.forEach(c => {
    c.display();
  });
}

function createGrid(){
  for (let i = 0; i < height/scale; i++){
    for (let j = 0; j < width/scale; j++){
      let x = j*scale+scale/2;
      let y = i*scale+scale/2;
      let c = new Container(x, y, scale);
      containers.push(c);
    }
  }
}

function mouseClicked(){
  for (let c of containers) {
    if (clickingRect(mouseX, mouseY, c.x, c.y) == 0){
      val = checkForStartEnd(c); // if start/end, don't set wall there
      console.log(val);
      if (val) return;
      c.wall = true;
    }
  }
}

function mouseDragged(){
  for (let c of containers) {
    if (clickingRect(mouseX, mouseY, c.x, c.y) == 0){
      val = checkForStartEnd(c);
      if (val) return;
      c.wall = true;
    }
  }
}

function clickingRect(mx, my, x, y){
  dx = max(abs(mx - x) - scale/2, 0);
  dy = max(abs(my - y) - scale/2, 0);
  return (dx * dx + dy * dy);
}

function clearGrid(){
  containers.forEach(c => {
    c.wall = false;
    c.visited = false;
    c.checking = false;
    queue = [];
    visited = [];
  });
}

function setStartPoint(){
  settingStart = true;
}

function setEndPoint(){
  settingEnd = true;
}

function clearStartPoint(){
  containers.forEach(c => {
    c.start = false;
  });
}

function clearEndPoint(){
  containers.forEach(c => {
    c.end = false;
  });
}

function checkForStartEnd(c){
  if (settingStart) {
    clearStartPoint(); // get rid of previous start
    c.start = true; startN = c;
    c.wall = false;
    settingStart = false;
    return true;
  } else if (settingEnd) {
    clearEndPoint(); // get rid of previous end
    c.end = true; endN = c;
    settingEnd = false;
    return true;
  } else if (c.start == true || c.end == true){
    return true;
  }
  return false;
}

function checkIfReady(){
  // if start and end points set, enable button
  if (startN && endN) {
    document.getElementById("startSearch").disabled = false
  }
}