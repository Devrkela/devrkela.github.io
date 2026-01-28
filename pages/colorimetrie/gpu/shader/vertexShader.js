import Shader from "./shader.js";

function VertexShader(compositor){
    Shader.call(this,compositor,compositor.VERTEX_SHADER)
}

VertexShader.prototype = Shader.prototype;

VertexShader.constructor = VertexShader;

export default VertexShader;