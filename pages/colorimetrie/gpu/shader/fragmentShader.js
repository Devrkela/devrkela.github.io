import Shader from "./shader.js";

function FragmentShader(compositor){
    Shader.call(this,compositor,compositor.FRAGMENT_SHADER)
}

FragmentShader.prototype = Shader.prototype;

FragmentShader.constructor = FragmentShader;

export default FragmentShader;