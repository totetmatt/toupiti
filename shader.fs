#version 300 es
		precision highp float;

		out vec4 c;
		uniform vec3 t;
float box(vec2 p,vec2 b){p=abs(p)-b;return length(max(p,vec2(0)));}

vec3 hash3d(vec3 p){

    uvec3 q= floatBitsToUint(p);
     q+=((q>>16U)^q.yzx)*1111111111u;
     q+=((q>>16U)^q.yzx)*1111111111u;
   return vec3(q)/float(-1U);
}
		void main() {
		vec2 uv = (gl_FragCoord.xy-.5*t.xy)/t.y;
		uv*=5.;

    
    vec2 id  = floor(uv);


        uv.y += (floor(t.z)+smoothstep(.1,.9,fract(t.z)))*mix(.5,1.5,hash3d(vec3(id.xx,-1u)).x);
        
        id  = floor(uv);
        vec3 rnd =hash3d(vec3(id,-1u));
   float sc= 1.;
    uv = fract(uv)-.5;
    if(rnd.x<.5){
       
        sc*=2.;
        id  = floor(uv*=2.);
        uv= fract(uv)-.5;
        rnd =hash3d(vec3(id,-1u)*rnd);
        if(rnd.y<.5){
           
            sc*=2.;
            id  = floor(uv*=2.);
            uv= fract(uv)-.5;
            rnd =hash3d(vec3(id,-1u)*rnd);
         if(rnd.z<.5){
              
                sc*=2.;
                id  = floor( uv*=2.);
                uv= fract(uv)-.5;
            
            }
        }
    }
    rnd =hash3d(vec3(id,-1u)*rnd);
 

    float d = .001/(.001+max(.0,abs(rnd.z <.5 ? length(uv)-.45:box(uv,vec2(.45)))-.01))*sc;



		c = vec4(sqrt(vec3(rnd.x<.5 ? 1.-d:d)),1.);
		}