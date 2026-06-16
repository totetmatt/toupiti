#version 300 es
precision highp float;
uniform float r;
out vec2 dest;

#define bpm 140.
#define B2T (60.0 / bpm)
#define TAU acos(-1.0)*2.
const float SWING = 0.0;
vec3 hash3u(vec3 q) {
  uvec3 v=  floatBitsToUint(q);
  v = v * 1145141919u + 1919810u;
  v.x += v.y * v.z;
  v.y += v.z * v.x;
  v.z += v.x * v.y;
  v ^= v >> 16u;
  v.x += v.y * v.z;
  v.y += v.z * v.x;
  v.z += v.x * v.y;
  return vec3(v)/float(-1U);
}
float s2tSwing(float st) {
  return 0.5 * B2T * (floor(st / 2.0) + SWING * mod(st, 2.0));
}
float t2sSwing(float t) {
  float st = 4.0 * t / B2T;
  return 2.0 * floor(st / 2.0) + step(SWING, fract(0.5 * st));
}
vec4 seq16(float t, int seq) {
  t = mod(t, 4.0 * B2T);
  int sti = clamp(int(t2sSwing(t)), 0, 15);
  int rotated = ((seq >> (15 - sti)) | (seq << (sti + 1))) & 0xffff;

  float i_prevStepBehind = log2(float(rotated & -rotated));
  float prevStep = float(sti) - i_prevStepBehind;
  float prevTime = s2tSwing(prevStep);
  float i_nextStepForward = 16.0 - floor(log2(float(rotated)));
  float nextStep = float(sti) + i_nextStepForward;
  float nextTime = s2tSwing(nextStep);

  return vec4(
    prevStep,
    t - prevTime,
    nextStep,
    nextTime - t
  );
}


void main() {
    vec4 time = mod(vec4(gl_FragCoord.x+4096.*gl_FragCoord.y)/r,vec4( 60./bpm,240./bpm,3840./bpm,1e16));
    //time = mod(time*B2T,4.);
 dest = vec2(0.0);
  
  
{ // kick
    vec4 seq = seq16(time.y, 0x8888);
    float t = seq.t;
    float q = seq.q;
   

    float env = smoothstep(0.0, 0.1, q) * smoothstep(2.0 * B2T, 0.1 * B2T, t);

 
    {
      float wave = sin(TAU * (
        55.0 * t
        - 7.0 * exp2(-t * 40.0)
        - 2.0 * exp2(-t * 100.0)
        //- 10.0 * exp2(-t * 1000.0)
        //- 0.04 * sin(120.0 * t)
      ));
      dest += 0.9 * tanh(2.0 * env * wave);
    }
  }
  { // bass
    vec4 seq = seq16(time.y, 0xFFFF);
    float t = seq.t;
    float q = seq.q;
    
    float b[]=float[](55.,55.*2.,55.*4.,55.*2.);
    for(float i=0.;i<4.;i++){
      vec3 rnd  = hash3u(vec3(i,floor(time.a/B2T/2.),-1U));
      float gg = b[int(mod(time.a/B2T*4.,4.))]+i*55.+(rnd.y*2.-1.);     
      float wave = sin(TAU*gg*seq.a)*sin(3.14/2.+TAU*gg*seq.x)*dot(sin(55.*seq.yyxx*TAU),cos(110.*seq.xxyy*TAU));
      dest +=tanh(4.0 *  wave*rnd.yz)*seq.a;
    }
  }
   { // CH
    vec4 seq = seq16(time.y, 0x2222);
    float t = seq.t;
    float q = seq.q;
    vec3 n = hash3u(time.xyz);
       dest += tanh(dot(sin(n*TAU),cos(n.yzx*TAU*2.))*exp(-15.*fract(seq.y)))*.3;
  }

}

