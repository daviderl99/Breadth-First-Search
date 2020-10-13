let queue = [];
let visited = [];

const bfs = async () => {
  queue.push(startN);
  visited.push(startN);
  while (queue.length > 0){
    current = queue.shift();
    let neighbours = getNeighbours(current);
    for (n of neighbours){ 
      n.checking = true; // CHECKING MULTIPLE TIMES IDK WHY
      if (n.end == true){ // if end is found
        console.log(n._id);
        return n._id;
      }
      if (!visited.includes(n)){
        queue.push(n);
        visited.push(n);
        n.checking = false;
        n.visited = true;
      }
    }
    await sleep(10);
  }
  clearTimeout(sleep);
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
  document.getElementById("startSearch").disabled = true
  path = bfs();
  if (path == -1) console.log("Path not found");
  console.log("Found: ", path);
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}