import fragment from "./fragment.js";

const vertex = `# version 300 es
in vec2 a_texCoord;
 
void main() {
   gl_Position = vec4(a_texCoord,0.,1.);
}
`



function AudioProcessUnit(canvas,width,height){
  this.canvas = canvas;
  this.processor = this.canvas.getContext("webgl2");
  this.canvas.width = canvas.clientWidth * devicePixelRatio;
  this.canvas.height = canvas.clientHeight * devicePixelRatio;
  this.processor.clearColor(1,0,0,0),
  this.processor.clear(this.processor.COLOR_BUFFER_BIT);
}

class Shader extends EventTarget{
  constructor(processor,type){
    super();
    this.processor = processor;
    this.type = type;
    this.shader = this.processor.createShader(this.type);
  }
}

Shader.prototype.compile = function compile(code){
  this.processor.shaderSource(this.shader,code);
  this.processor.compileShader(this.shader);

  const success = this.processor.getShaderParameter(this.shader, this.processor.COMPILE_STATUS);

  if(!success){
    const ErrorEvent = new Event("error");
    ErrorEvent.error = this.processor.getShaderInfoLog(this.shader);
    this.processor.deleteShader(this.shader);
    console.log(ErrorEvent)
    this.dispatchEvent(ErrorEvent);
    return;
  }

  return true;
}

class VertexShader extends Shader{
    constructor(processor){
      super(processor,processor.VERTEX_SHADER);
    }
}

class FragmentShader extends Shader{
    constructor(processor){
      super(processor,processor.FRAGMENT_SHADER);
    }
}

class Program extends EventTarget{
  constructor(processor){
    super();
    this.processor = processor;
    this.program = this.processor.createProgram();
  }
}

Program.prototype.compile = function compile(vertex,fragment){
  this.processor.attachShader(this.program, vertex.shader);
  this.processor.attachShader(this.program, fragment.shader);
  this.processor.linkProgram(this.program);

  
  const success = this.processor.getProgramParameter(this.program, this.processor.LINK_STATUS);

  if(!success){
    const ErrorEvent = new Event("error");
    ErrorEvent.error = this.processor.getProgramInfoLog(this.program);
    this.processor.deleteShader(this.shader);
    this.dispatchEvent(ErrorEvent);
    return;
  }

  return true;
}

function clip(value){
  return (value * 2) -1;
}
function Buffer(processor){
  this.processor = processor;
  this.buffer = this.processor.createBuffer();
  this.processor.bindBuffer(this.processor.ARRAY_BUFFER, this.buffer);
  this.processor.bufferData(this.processor.ARRAY_BUFFER, new Float32Array([
    -1,  1,
     1, -1,
     -1,  -1,
    -1,  1,
     1, -1,
     1,  1,
  ]), this.processor.STATIC_DRAW);
}

function Texture(processor){
  this.processor = processor
  this.texture = this.processor.createTexture();
}

Texture.prototype.update = function(image){
  this.processor.bindTexture(this.processor.TEXTURE_2D, this.texture);

  // Set the parameters so we can render any size image.
  this.processor.texParameteri(this.processor.TEXTURE_2D, this.processor.TEXTURE_WRAP_S, this.processor.CLAMP_TO_EDGE);
  this.processor.texParameteri(this.processor.TEXTURE_2D, this.processor.TEXTURE_WRAP_T, this.processor.CLAMP_TO_EDGE);
  this.processor.texParameteri(this.processor.TEXTURE_2D, this.processor.TEXTURE_MIN_FILTER, this.processor.NEAREST);
  this.processor.texParameteri(this.processor.TEXTURE_2D, this.processor.TEXTURE_MAG_FILTER, this.processor.NEAREST);

  const niveau = 0;
  const formatInterne = this.processor.RGBA;
  const formatSrc = this.processor.RGBA;
  const typeSrc = this.processor.UNSIGNED_BYTE;
  this.processor.texImage2D(this.processor.TEXTURE_2D, niveau, formatInterne,
                formatSrc, typeSrc, image);
}

function Uniform(processor,program,name){
  this.processor = processor;
  this.location = processor.getUniformLocation(program, name);
}

Uniform.prototype.update = function(value){
  this.processor.uniform2fv(this.location, value); 
}
// MAIN

const apu = new AudioProcessUnit(document.querySelector("canvas"),500,500);

const vertexShader = new VertexShader(apu.processor);
vertexShader.compile(vertex);

const fragmentShader = new FragmentShader(apu.processor);
fragmentShader.compile(fragment);

const program = new Program(apu.processor);

program.compile(vertexShader,fragmentShader);

apu.processor.useProgram(program.program);

const resolution = new Uniform(apu.processor,program.program,"resolution");
resolution.update([apu.canvas.width,apu.canvas.height]);

const buffer = new Buffer(apu.processor);
const texcoordLocation = apu.processor.getAttribLocation(program.program, "a_texCoord");

const positionLoc = apu.processor.getAttribLocation(program.program, 'a_position');

apu.processor.enableVertexAttribArray(texcoordLocation);
apu.processor.vertexAttribPointer(
    texcoordLocation,
    2,         // size (num components)
    apu.processor.FLOAT,  // type of data in buffer
    false,     // normalize
    0,         // stride (0 = auto)
    0,         // offset
);

apu.processor.viewport(0, 0, apu.canvas.width, apu.canvas.height);


let start = performance.now();

function drawWithTime(time){
  const timeLocation = apu.processor.getUniformLocation(program.program, "time");
  apu.processor.uniform1f(timeLocation,time);
  draw();
}

function draw(image){
  //const t0 = performance.now();
  apu.processor.drawArrays(apu.processor.TRIANGLES, 0, 6);
  //console.log(performance.now()-t0);  
}

vertexShader.addEventListener("error",function(e){
  console.log(e)
})

fragmentShader.addEventListener("error",function(e){
  console.log(e)
})

program.addEventListener("error",function(e){
  console.log(e)
})


const result = {
  draw,
  drawWithTime
}

draw()
export default result;