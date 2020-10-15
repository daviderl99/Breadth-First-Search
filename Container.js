class Container {
  constructor(x, y, scl){
    this._id = Container.incrementId();
    this.x = x;
    this.y = y;
    this.scl = scl;
    this.wall = false;
    this.start = false;
    this.end = false;
    this.visited = false;
    this.path = false;
  }

  display(){
    fill(255);
    if (this.wall) fill(25);
    if (this.start) fill(0, 255, 100);
    if (this.end) fill(255, 0, 0);
    if (this.visited && !this.start && !this.end) fill(200);
    if (this.path) fill(100, 200, 255);

    rect(this.x, this.y, this.scl, this.scl);
  }

  static incrementId() {
    if (this.latestId === undefined) this.latestId = 0;
    else this.latestId++;
    return this.latestId;
  }
}