
document.body.innerHTML=""
document.body.appendChild(b=document.createElement("button"))
p=b.innerHTML ="CLICK"

F=new Float32Array([ -1, -1, 1, -1, -1, 1, 1, 1 ]);
a = new AudioContext();
b.onclick=()=>{
  V = document.createElement("canvas")
  g =V.getContext("webgl2") 
document.body.appendChild(V);
g.getExtension( 'EXT_color_buffer_float' );
g.getExtension( 'OES_texture_float_linear' );  
document.body.requestFullscreen();
function B(){  

  s = Date.now();
  r=()=> {
  
    window.requestAnimationFrame(r);
    g.uniform3fv(g.getUniformLocation(p, "r"), [
      V.clientWidth,
      V.clientHeight,
      (Date.now() - s) / 2e3,
    ]);
    g.bindFramebuffer( 0x8d40, null );
    g.viewport(
      0,
      0,
      V.width = V.clientWidth,
      V.height = V.clientHeight
    );
    g.drawArrays(5, 0, 4);

  }



  p = g.createProgram();
  g.shaderSource(o = g.createShader(0x8b31), `#version 300 es
  in vec4 p;void main(){gl_Position=p;}`);
  g.compileShader(o);
  g.attachShader(p, o);
  //Replace Fragment Shader here
  g.shaderSource(o = g.createShader(0x8b30), `#version 300 es
  precision highp float;out vec4 x;uniform vec3 r;vec3 R(vec3 p,vec3 a,float t){return mix(dot(a,p)*a,p,cos(t))+cross(a,p)*sin(t);}float T(vec3 p){float d,i=.5;for(;i<2e3;d+=abs(dot(asin(sin(R(p*(i+=i),normalize(vec3(.3,1,-.5)),i))),vec3(.5)))/i/3.5);return d;}void main(){vec3 c,p,d=normalize(vec3((gl_FragCoord.xy-.5*r.xy)/r.y,1));for(float i,e,g;i++<20.;p=R(d*g,vec3(0,0,1),r.z*.5+p.z*.2)){vec2 q=abs(vec2(length(p.xy+=sin((p.z=asin(sin(p.z*.5+r.z)*.5)/.5)*.5))-1.3,p.z))-.4;g+=e=max(4e-4,(length(q)-T(p+sin(atan(q.x,q.y)+r.z+.1*fract(5e3*sin(dot(q,vec2(3e3,7e3)))))))*.8);c+=R(vec3(1,.5,.7),vec3(.09,.99,-.09),p.z+p.y+p.x+.2*dot(sin(p*5.),cos(p.zxy*7.)))*.04/exp(i*i*e);}x=vec4(sqrt(c),1);}`);
  g.compileShader(o);
  g.attachShader(p, o);
  g.linkProgram(p);
  g.bindBuffer(0x8892, g.createBuffer());
  g.bufferData(
    0x8892,
    F,
    0x88e4
  );
  g.bindVertexArray(g.createVertexArray()),
    g.enableVertexAttribArray(Q=g.getAttribLocation(p, "p"));
  g.vertexAttribPointer(Q, 2,0x1406, !1, 0, 0);
  g.useProgram(p);
  r();
 
}
function A(){


 const R = a.sampleRate;
 

 
 
 b = g.createBuffer();
 
 g.bindBuffer( 0x8892, b );
 g.bufferData( 0x8892,F, 0x88e4 );
 
 g.bindTexture( 0x0de1, t = g.createTexture() );
 g.texStorage2D( 0x0de1, 1, 0x8230, 4096, 4096 );
 
 g.bindFramebuffer( 0x8d40, g.createFramebuffer() );
 g.framebufferTexture2D(
  0x8d40,
  0x8ce0,
   0x0de1,
   t,
   0,
 );

p = g.createProgram();
g.shaderSource(o = g.createShader(0x8b31), `#version 300 es
in vec2 p;out vec2 v;void main(){gl_Position=vec4(v=p,0,1);}`);
g.compileShader(o);
g.attachShader(p, o);

  //Replace Audio Shader here
g.shaderSource(o = g.createShader(0x8b30), `#version 300 es
precision highp float;uniform float r;out vec2 dest;void main(){dest=vec2(0);float T=(gl_FragCoord.x+4096.*gl_FragCoord.y)/r;for(float i=1.;i++<4.;)dest+=asin(sin(T*440.*i+sin(i*3.14/4.+T)))*(.5+.5*sin(T+i))/4.;float a[4]=float[4](666.,333.,499.5,777.);for(float i=.5;i<5.;i+=i)dest+=asin(cos(T*a[int(mod(floor(T),4.))]*i+sin(i*3.14/4.+T*3.)))*(.5+.5*cos(fract(T/3.)+i))/8.;}`);
g.compileShader(o);
g.attachShader(p, o);
g.linkProgram(p);

 
g.bindBuffer( 0x8892, b );
g.enableVertexAttribArray( Q= g.getAttribLocation( p, 'p' ) );
g.vertexAttribPointer( Q, 2, 0x1406, false, 0, 0 );
  
 g.useProgram( p );
 // -- uniforms -------------------------------------------------------------------------------------
 
 
 g.uniform1f(
   g.getUniformLocation( p, 'r' ),
   R,
 );
 // -- render ---------------------------------------------------------------------------------------
 g.viewport( 0, 0, 4096, 4096 );
 g.drawArrays( 0x0005, 0, 4 );
 
 // -- read pixels ----------------------------------------------------------------------------------
X = new Float32Array( 2 * 4096 * 4096 );
 g.readPixels( 0, 0, 4096, 4096, 0x8227, 0x1406, X );
 
 // -- audio ----------------------------------------------------------------------------------------
  K = a.createBuffer( 2, 4096 * 4096, R );
  b = [
   K.getChannelData( 0 ),
   K.getChannelData( 1 ),
 ];
 X.map( ( v, i ) => (
   b[ i % 2 ][ ~~( i / 2 ) ] = v
 ) );

 
 // -- play -----------------------------------------------------------------------------------------
 
 

   a.resume();
   //musicBeginTime = A.currentTime; // delay 1 sec
   (b = a.createBufferSource()).buffer = K;
   b.connect( a.destination );
   b.start( 0 );   
 


}
b.onclick=()=>{
 V.requestFullscreen()
  A();
  B();
}
}