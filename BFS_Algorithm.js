let queue = [];
let visited = [];
let prev = new Array(cols*rows);

const bfs = async () => {
  queue.push(startN);
  visited.push(startN);
  while (queue.length > 0){
    current = queue.shift();
    let neighbours = getNeighbours(current);
    for (n of neighbours){ 
      if (n.end == true){ // if end is found
        prev[n._id] = current._id;
        return n._id;
      }
      if (!visited.includes(n)){
        queue.push(n);
        visited.push(n);
        n.visited = true;
        prev[n._id] = current._id;
      }
    }
    await sleep(10);
  }
  return -1;
}

let rightBoundary = cols*scale-(scale/2);
let leftBoundary = scale / 2;

function getNeighbours(current){ // returns array of neighbours
  let neighbours = [];

  cId = current._id;
  let top = containers[cId-(width/scale)];
  let bottom = containers[cId+(width/scale)];
  let right = containers[cId+1];
  let left = containers[cId-1];

  if (checkNeighbour(top, current)) {
    neighbours.push(top);
  }
  if (checkNeighbour(bottom, current)) {
    neighbours.push(bottom);
  }
  if (checkNeighbour(right, current)) {
    neighbours.push(right);
  }
  if (checkNeighbour(left, current)) {
    neighbours.push(left);
  }
  return neighbours;
}

function checkNeighbour(n, c){
  if (n !== undefined && n.wall == false) {
    // check for boundaries, so search won't wrap around
    if (c.x == leftBoundary && n.x == rightBoundary) {
      return false;
    }
    if (c.x == rightBoundary && n.x == leftBoundary){
      return false;
    }
    return true;
  }
  return false;
}

function startSearch(){
  searching = true;
  disableButtons();
  clearSearch();

  result = bfs();
  result.then((res) => {
    searching = false;
    enableButtons();
    if (res == -1) alert("Path not found.");
    else {
      let path = backtrack(prev);
      if (path.length > 0){
        drawPath(path);
      }
    }
  });
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function backtrack(prev){
  let path = [];
  for (let i = endN._id; i != null; i = prev[i]){
    path.push(i);
  }
  path = path.reverse();

  if (path[0] == startN._id) return path;
  return [];
}

function drawPath(p){
  for (let i = 1; i < p.length-1; i++){ // ignore start and end node
    id = p[i];
    containers[id].path = true;
  }
}

function disableButtons(){
  document.getElementById("startSearch").disabled = true;
  document.getElementById("clearSearch").disabled = true;
  document.getElementById("clearAll").disabled = true;
}

function enableButtons(){
  document.getElementById("startSearch").disabled = false;
  document.getElementById("clearSearch").disabled = false;
  document.getElementById("clearAll").disabled = false;
}