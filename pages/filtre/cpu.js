const b_point = highlight_bienvenue.querySelector("#spot");
const p_point = highlight_presentation.querySelector("#spot");
const m_point = highlight_metier.querySelector("#spot");
const pr_point = highlight_projet.querySelector("#spot");

const b_diffuse = highlight_bienvenue.querySelector("#diffuse");
const p_diffuse = highlight_presentation.querySelector("#diffuse");
const m_diffuse = highlight_metier.querySelector("#diffuse");
const pr_diffuse = highlight_projet.querySelector("#diffuse");

const x = window.innerWidth/2;
const y = window.innerHeight/2;

const b_light = computeLight(bienvenue, x, y);


setPoint(b_diffuse, b_light);


window.addEventListener("pointermove", function(e){
  const x = e.clientX;
  const y = e.clientY;

  const b_light = computeLight(bienvenue, x, y);

  setPoint(b_point, b_light);
});

function computeLight(element, x, y){
  const box = element.getBoundingClientRect();
  const light = {
    x: (x - box.x) / box.width,
    y: (y - box.y) / box.height,
  }
  return light;
}

function setPoint(element, light){
  element.setAttribute("pointsAtX", light.x);
  element.setAttribute("x", light.x);
  
  element.setAttribute("pointsAtY", light.y);
  element.setAttribute("y", light.y);

}