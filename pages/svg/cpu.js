import "./geometrie/vecteur.js"

Math.cbrt = function cbrt(number){
  return Math.pow(number,1/3);
}

let bezier;
let cubic;
const cubicRender = document.querySelector("#graph > #cubic");


function generateCubic(){
  const p0 = {
    x:Math.random(),
    y:Math.random(),
  }
  
  const p1 = {
    x:Math.random(),
    y:Math.random(),
  }
  
  const p2 = {
    x:Math.random(),
    y:Math.random(),
  }
  
  const p3 = {
    x:Math.random(),
    y:Math.random(),
  }
  
 bezier = [p0, p1, p2, p3];
    
  function renderPath(bezier){
    const d = `M${bezier[0].x} ${bezier[0].y}C${bezier[1].x} ${bezier[1].y} ${bezier[2].x} ${bezier[2].y} ${bezier[3].x} ${bezier[3].y}`
    cubicRender.setAttribute("d",d);
  }
  
  renderPath(bezier);
  
  cubic = new Geometrie.CubicKnot(bezier);
}

generateCubic();

const mousePoint = {x:Math.random(),y:Math.random()};
const  p = cubic.distanceMinimal(mousePoint);

const circle = document.querySelector("#mouse_point");
const pt = document.querySelector("#graph").createSVGPoint();

document.querySelector("#graph").addEventListener("pointermove",function(e){
  pt.x = event.clientX;
  pt.y = event.clientY;
  
  const point = pt.matrixTransform(this.getScreenCTM().inverse());

  const dmin = cubic.distanceMinimal(point);
  
  circle.setAttribute("cx",point.x);
  circle.setAttribute("cy",point.y);
  
  circle.setAttribute("r",dmin.length);
  
});

randomize.addEventListener("click", generateCubic)