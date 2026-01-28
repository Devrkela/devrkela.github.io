# version 300 es

precision highp float;

uniform vec2 resolution;

out vec4 color;

const vec4 bitEnc = vec4(1.,255.,65025.,16581375.);
const vec4 bitDec = 1./bitEnc;

vec4 EncodeFloatRGBA (float v) {
    uint integer = floatBitsToUint(v);
    uint mask = uint(0xFF);
    float part1 = float((integer >> 24) & mask) / 255.;
    float part2 = float((integer >> 16) & mask) / 255.;
    float part3 = float((integer >> 8) & mask) / 255.;
    float part4 = float(integer & mask) / 255.;
    return vec4(part4,part3,part2,part1);
}
float DecodeFloatRGBA (vec4 v) {
    return dot(v, bitDec);
}

float pi = 3.14159265359;

float amplitude = 0.3;

float enveloppe(float w, float q,float t){
    return exp(-w*t/(2.*q));
}

float pureCosine(float w, float t){
    return cos(w*t);
}

float reasonantFrequency(float frequency){
    return 2.*pi*frequency;
}

float samplerate = 48000.;

float shape(float t,float o){
    if(t < 0.3*o){
        return t * 0.5/0.3;
    } else {
        return (0.5*o + (t-0.3) * 0.5 / 0.7);
    }
}
float notes[13] = float[13](65.41,69.30,73.42,77.78,82.41,87.31,92.50,98.00,103.83,110.00,116.54,123.47,130.81);
void main() {
    vec2 toInteger = vec2(gl_FragCoord)-0.5;
    //float frequency = 130.8*2.;
    float t = (toInteger.x + toInteger.y * resolution.x) / samplerate;

    float decal = floor(t/0.5);
    int a = int(decal);
    float frequency = notes[a];
    t = t-(decal*0.5);
    float tp = mod(t,1./frequency);

    float w = reasonantFrequency(frequency);
    float q = 75.;
    float env = enveloppe(w,q,t);

    float note = exp(3.*pureCosine(w,shape(t,1./frequency)))/20.;

    float impulse = amplitude * env * note;

    color = EncodeFloatRGBA(impulse);
}