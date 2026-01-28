function Shader(compositor,type){
    this.compositor = compositor;
    this.type = type;
    this.shader = this.compositor.createShader(this.type);
}

Shader.prototype.compile = function compile(code){
  this.compositor.shaderSource(this.shader,code);
  this.compositor.compileShader(this.shader);

  const success = this.compositor.getShaderParameter(this.shader, this.compositor.COMPILE_STATUS);

  if(!success){
    this.error(this.compositor.getShaderInfoLog(this.shader));
    this.compositor.deleteShader(this.shader);
    return;
  }
}

Shader.prototype.error = function error(e){
    console.error(e);
}

export default Shader;