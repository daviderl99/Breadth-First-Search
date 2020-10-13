class Container {
  constructor(x, y, scl){
    this._id = Container.incrementId();
    this.x = x;
    this.y = y;
    this.scl = scl;
    this.wall = false;
    this.start = false;
    this.end = false;

    this.checking = false;
    this.visited = false;
  }

  display(){
    fill(255);
    if (this.wall) fill(25);
    if (this.start) fill(0, 255, 100);
    if (this.end) fill(255, 0, 0);

    if (this.visited) fill(200);
    if (this.checking && !this.start && !this.end) fill(150, 250, 255);

    rect(this.x, this.y, this.scl, this.scl);
    fill(0);
    text(this._id, this.x, this.y);
  }

  static incrementId() {
    if (this.latestId === undefined) this.latestId = 0;
    else this.latestId++;
    return this.latestId;
  }
}