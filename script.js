let cols = 60;
let rows = 40;
let scale = 20;

let containers = [];
let settingStart = false;
let settingEnd = false;
let searching = false;
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
      if (document.getElementById("removeWalls").checked) {
        deleteWall(c);
        return;
      }
      setStartOrEnd(c);
      if (!(c.start || c.end)){ // if start/end, don't set wall there
        c.wall = true;
      }
    }
  }
}

function mouseDragged(){
  for (let c of containers) {
    if (clickingRect(mouseX, mouseY, c.x, c.y) == 0){
      if (document.getElementById("removeWalls").checked) {
        deleteWall(c);
        return;
      }
      setStartOrEnd(c);
      if (!(c.start || c.end)){
        c.wall = true;
      }
    }
  }
}

function clickingRect(mx, my, x, y){
  dx = max(abs(mx - x) - scale/2, 0);
  dy = max(abs(my - y) - scale/2, 0);
  return (dx * dx + dy * dy);
}

function clearSearch(){
  containers.forEach(c => {
    c.visited = false;
    c.path = false;
    queue = [];
    visited = [];
  });
}

function clearWalls(){
  containers.forEach(c => {
    c.wall = false;
  });
}

function deleteWall(c){
  c.wall = false;
}

function toggleSetStart(){
  settingStart = true;
}

function toggleSetEnd(){
  settingEnd = true;
}

function clearStartPoint(){
  if (startN) { // don't loop, if start node defined
    startN.start = false; 
    return;
  }
  containers.forEach(c => {
    c.start = false;
  });
}

function clearEndPoint(){
  if (endN) {
    endN.end = false; 
    return;
  }
  containers.forEach(c => {
    c.end = false;
  });
}

function setStartOrEnd(c){
  if (settingStart && c.end == false) {
    clearStartPoint(); // get rid of previous start
    c.wall = false;
    c.start = true; startN = c;
    settingStart = false;

  } else if (settingEnd && c.start == false) {
    clearEndPoint();
    c.wall = false;
    c.end = true; endN = c;
    settingEnd = false;
  }
}

function checkIfReady(){
  // if start and end points set, enable button
  if (startN && endN && !searching) {
    document.getElementById("startSearch").disabled = false
  }
}