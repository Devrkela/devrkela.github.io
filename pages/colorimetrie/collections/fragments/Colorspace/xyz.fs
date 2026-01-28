# version 300 es

precision highp float;

uniform vec2 resolution;
uniform float lightness;

vec3 xyY2xyz (vec3 xyY){
    float x = xyY.x;
    float y = xyY.y;
    float Y = xyY.z;

    return vec3(
        Y/y*x,
        Y,
        Y/y*(1.-x-y)
    );
}

float linear2gamma(float c){
    if(c <= 0.0031308){
        return 12.92 * c;
    } else {
        return 1.055*pow(c,1./2.4) - 0.055;
    }
}

vec3 rgblinear2rgbgamma(vec3 rgb){
    return vec3(linear2gamma(rgb.r),linear2gamma(rgb.g),linear2gamma(rgb.b));
}

vec3 xyz2srgb(vec3 xyz){
    mat3 transform = mat3(
        3.2406, -0.9689, 0.0557,
        -1.5372, 1.8758, -0.2040,
        -0.4986, 0.0415, 1.0570
    );

    vec3 rgblinear = transform * xyz;
    return rgblinear2rgbgamma(rgblinear);
}

out vec4 color;

void main() {
    vec2 normalizePosition = vec2(vec2(gl_FragCoord)/resolution);
    vec3 xyY = vec3(normalizePosition.x,normalizePosition.y,lightness);
    vec3 xyz = xyY2xyz(xyY);
    color = vec4(xyz2srgb(xyz),1.);
}