# version 300 es

precision highp float;

uniform vec2 resolution;
uniform float lightness;

vec2 uv_white_srgb = vec2(0.19784, 0.46832);

vec3 luv2xyz(vec3 luv){
    float up = luv.y / (13.*luv.x) + uv_white_srgb.x;
    float vp = luv.z / (13.*luv.x) + uv_white_srgb.y;

    float Y = pow((luv.x + 16.)/116.,3.);

    if(luv.x <= 8.){
        Y = luv.x * pow(3./29.,3.);
    }

    float X = Y * (9.*up)/(4.*vp);
    float Z = Y * (12. - 3.*up - 20.*vp)/(4.*vp);
    return vec3(X,Y,Z);
}

vec3 xyL2luv(vec3 xyL){
    float u = (4.*xyL.x)/(-2.*xyL.x+12.*xyL.y+3.);
    float v = (9.*xyL.y)/(-2.*xyL.x+12.*xyL.y+3.);
    return vec3(
        xyL.z,
        13.* xyL.z *(u-uv_white_srgb.x),
        13.* xyL.z *(v-uv_white_srgb.y));
}

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
    vec2 normalizePosition = vec2(gl_FragCoord.x/resolution.x*2.-1.,gl_FragCoord.y/resolution.y*1.5-0.5);
    vec3 luv = vec3(lightness,normalizePosition)*100.;
    vec3 xyz = luv2xyz(luv);
    color = vec4(xyz2srgb(xyz),1.);
}