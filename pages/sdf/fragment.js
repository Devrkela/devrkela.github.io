const fragment = `# version 300 es
precision mediump float;

#define MAX_STEPS 10000
#define MAX_DISTANCE 100.
#define SURFACE_DISTANCE 0.0001

out vec4 color;
uniform vec2 resolution;
vec4 ellipse = vec4(0.,1.,6.,1.);
vec3 ellipsoid = vec3(1.,1.,1.);
float getDist(vec3 point){
  
  float l = length((point-ellipse.xyz)*ellipsoid)-ellipse.w;
  float p = point.y;
  return min(l,p);
}

float RayMarch(vec3 rayOrigin, vec3 rayDirection){
  float d0 = 0.;
  for(int i=0;i<MAX_STEPS;i+=1){
    vec3 point = rayOrigin + d0 * rayDirection;
    float dS = getDist(point);
    d0+=dS;
    if(d0 > MAX_DISTANCE || dS < SURFACE_DISTANCE) break;
  }

  return d0;
}

float Light(vec3 position,vec3 point, vec3 normal){
  return dot(normal,normalize(position-point));
}

void main() {
  vec2 uv = vec2((vec2(gl_FragCoord)-0.5*resolution)/resolution.y);

  vec3 rayOrigin = normalize(vec3(0.,1.,0.));
  vec3 rayDirection = vec3(uv,1.);

  float d = RayMarch(rayOrigin,rayDirection);
  vec3 point = rayOrigin+rayDirection*d;
  vec3 np;
  if(point.y > 0.01){
    np = point - vec3(ellipse);
  } else {
    np = vec3(0.,1.,0.);
  }

  float l = Light(vec3(0.,5.,2.),point,normalize(np));

  float u = RayMarch(normalize(vec3(0.,5.,2.)-point),point);

  if(u<SURFACE_DISTANCE){
    color = vec4(0.,0.,0.,1.);
  } else {
    color = vec4(vec3(l),1.);
  }
}
`

export default fragment;