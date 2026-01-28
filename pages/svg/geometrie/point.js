function Point(x,y){
  this.x = x;
  this.y = y;
}

Point.prototype.toSVG = function toSVG(){
  return `${this.x} ${this.y}`
}