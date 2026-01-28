function Program(compositor){
    this.compositor = compositor;
    this.program = this.compositor.createProgram();
}

Program.prototype.compile = function compile(vertexShader,fragmentShader){
    
    this.compositor.attachShader(this.program, vertexShader.shader);
    this.compositor.attachShader(this.program, fragmentShader.shader);
    this.compositor.linkProgram(this.program);

  
    const success = this.compositor.getProgramParameter(this.program, this.compositor.LINK_STATUS);

    if(!success){
        this.error(this.compositor.getProgramInfoLog(this.program));
        this.compositor.deleteProgram(this.program);
    }

}

Program.prototype.error = function error(e){
    console.error(e);
}

export default Program;