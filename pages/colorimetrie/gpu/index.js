import FragmentShader from "./shader/fragmentShader.js"
import VertexShader   from "./shader/vertexShader.js";
import Program from "./program/index.js";
import {fragmentLoader,vertexLoader} from  "../collections/loader.js";

let lightness = 0.5;

function GPU(){
    this.canvas     = document.createElement("canvas");
    this.compositor = this.canvas.getContext("webgl2");
    document.querySelector("workspace").prepend(this.canvas)
    this.vertex_shaders = {};
    this.fragment_shaders = {};
    this.programs = {};
    this.uniforms = {};
}

GPU.prototype.addVertexShader = function addVertexShader(vertexCode){
    this.vertex_shaders[vertexCode.name] = vertexCode.code;
}

GPU.prototype.addFragmentShader = function addFragmentShader(fragmentCode){
    this.fragment_shaders[fragmentCode.name] = fragmentCode.code;
}

GPU.prototype.compileProgram = function compileProgram(shaderEnum,name){
    const vertexShader = new VertexShader(this.compositor);
    const fragmentShader = new FragmentShader(this.compositor);
    const program = new Program(this.compositor);

    vertexShader.compile(this.vertex_shaders[shaderEnum.vertex]);
    fragmentShader.compile(this.fragment_shaders[shaderEnum.fragment]);

    program.compile(vertexShader,fragmentShader);
    this.programs[name] = program.program;
}

GPU.prototype.createVertexAttribute = function createVertexAttribute(programName){
  const attributPourCoordonnees = this.compositor.getAttribLocation(this.programs[programName], "coordonnees");
  this.compositor.enableVertexAttribArray(attributPourCoordonnees);
  this.compositor.vertexAttribPointer(
      attributPourCoordonnees,
      2,
      this.compositor.FLOAT,
      false,
      0,
      0,
  );
}

function convert(value){
  return (value * 2 - 1);
}

GPU.prototype.createPositionBuffer = function createPositionBuffer(){
  const positionBuffer = this.compositor.createBuffer();
 
  this.compositor.bindBuffer(this.compositor.ARRAY_BUFFER, positionBuffer);
  
  this.compositor.bufferData(this.compositor.ARRAY_BUFFER, new Float32Array([
    -1,  1,
     1, -1,
     -1,  -1,
    -1,  1,
     1, -1,
     1,  1,
  ]), this.compositor.STATIC_DRAW);

  this.compositor.bindBuffer(this.compositor.ARRAY_BUFFER, positionBuffer);
}

GPU.prototype.createUniform = function createUniform(name,programName){
    this.uniforms[name] = this.compositor.getUniformLocation(this.programs[programName], name);
}

GPU.prototype.updateUniform = function createUniform(name,value){
    this.uniforms[name] = this.compositor.uniform2fv(this.uniforms[name], value);
}

GPU.prototype.updateUniformFloat = function updateUniformFloat(name,value){
    this.uniforms[name] = this.compositor.uniform1f(this.uniforms[name], value);
}
let gpu;

const colorCode = {};

colorCode.xyz = {
  name:"xyz",
  code: await fragmentLoader("Colorspace/xyz.fs")
};

colorCode.luv = {
  name:"xyz",
  code: await fragmentLoader("Colorspace/luv.fs")
}

async function main(){
  const vertexCode = {
    name:"dummy",
    code: await vertexLoader("basic.vs")
  }
  
  gpu = new GPU();
  let second = 6.5;
  gpu.addVertexShader(vertexCode);

  update(colorCode.xyz);

  gpu.createPositionBuffer();
  gpu.createVertexAttribute("dummy");

  draw();

}

function update(colorCode){
    const enumColor = {
    vertex:"dummy",
    fragment:"xyz"
  }

  gpu.compositor.useProgram(gpu.programs["dummy"]);
  gpu.addFragmentShader(colorCode);
  gpu.compileProgram(enumColor,"dummy");
  gpu.compositor.useProgram(gpu.programs["dummy"]);
  gpu.createUniform("resolution","dummy");
  gpu.canvas.width = 500;
  gpu.canvas.height = 500;
  gpu.compositor.viewport(0,0,gpu.canvas.width,gpu.canvas.height);
  gpu.updateUniform("resolution",[gpu.canvas.width,gpu.canvas.height]);

  
}

function input(e){
  update(colorCode[e.target.value]);
  draw();
}

color_select.addEventListener("input", input);

function draw(){
  gpu.createUniform("lightness","dummy");

  gpu.updateUniformFloat("lightness",lightness);
  gpu.compositor.drawArrays(
      gpu.compositor.TRIANGLES,
      0,     // offset
      6,     // num vertices to process
  );
}

main();

const controller = document.querySelector("#light_range");

controller.setAttribute("type","range");
controller.setAttribute("min","0");
controller.setAttribute("max","1");
controller.setAttribute("step","0.01");
controller.setAttribute("value","0.5");

controller.addEventListener("input",function(e){
  lightness = Number(this.value);
  draw();
})


function xyY2xyz(x,y,Y){
  return [Math.floor(Y/y*x * 100 * 10000)/10000,Math.floor(Y* 100 * 10000)/10000,Math.floor(Y/y*(1-x-y)* 100 * 10000)/10000]
}

function matxvec(mat,vec){
  return [
    mat[0][0]*vec[0] + mat[1][0] * vec[1] + mat[2][0]*vec[2],
    mat[0][1]*vec[0] + mat[1][1] * vec[1] + mat[2][1]*vec[2],
    mat[0][2]*vec[0] + mat[1][2] * vec[1] + mat[2][2]*vec[2],
  ]
}

const matrix = [
  [0.4124,0.2126,0.0193],
  [0.3576,0.7152,0.1192],
  [0.1805,0.0722,0.9505],
];

const srgbwhite = matxvec(matrix,[1,1,1]);

function uv(srgb){
  return [116*(1)**(1/3)-16,(4*srgb[0])/(srgb[0]+15*srgb[1]+3*srgb[2]),(9*srgb[1])/(srgb[0]+15*srgb[1]+3*srgb[2])]
}

function uvxy(x,y){
  return [4*x/(-2*x+12*y+3),(9*y)/(-2*x+12*y+3)];
}

console.log(uvxy(0.3127,0.3290))
console.log(uv(srgbwhite))
const x = 0.3127;
const y = 0.3290;
const Y = 1;
