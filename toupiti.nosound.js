s = Date.now();
r=()=>{
  g.viewport(
    0,
    0,
    V.width = V.clientWidth,
    V.height = V.clientHeight
  );
  g.uniform3fv(g.getUniformLocation(p, "r"), [
    V.clientWidth,
    V.clientHeight,
    (Date.now() - s) / 2e3,
  ]);
  g.drawArrays(5, 0, 4);
  window.requestAnimationFrame(r);
}
g =(V = document.createElement("canvas")).getContext("webgl2")
document.body.innerHTML = "", document.body.style.margin = "0";
document.body.appendChild(V);
V.style.width = V.style.height = "100%";
p = g.createProgram();
g.shaderSource(o = g.createShader(0x8b31), `#version 300 es
in vec4 p;void main(){gl_Position=p;}`);
g.compileShader(o);
g.attachShader(p, o);
g.shaderSource(o = g.createShader(0x8b30), `#version 300 es
precision highp float;out vec4 x;uniform vec3 r;vec3 R(vec3 p,vec3 a,float t){return mix(dot(a,p)*a,p,cos(t))+cross(a,p)*sin(t);}float T(vec3 p){float d,i=.5;for(;i<2e3;d+=abs(dot(asin(sin(R(p*(i+=i),normalize(vec3(.3,1,-.5)),i))),vec3(.5)))/i/3.5);return d;}void main(){vec3 c,p,d=normalize(vec3((gl_FragCoord.xy-.5*r.xy)/r.y,1));for(float i,e,g;i++<40.;p=R(d*g,vec3(0,0,1),r.z*.5+p.z*.2)){vec2 q=abs(vec2(length(p.xy+=sin((p.z=asin(sin(p.z*.5+r.z)*.5)/.5)*.5))-1.3,p.z))-.4;g+=e=max(4e-4,(length(q)-T(p+sin(atan(q.x,q.y)+r.z+.1*fract(5e3*sin(dot(q,vec2(3e3,7e3)))))))*.8);c+=R(vec3(1,.5,.7),vec3(.09,.99,-.09),p.z+p.y+p.x+.2*dot(sin(p*5.),cos(p.zxy*7.)))*.04/exp(i*i*e);}x=vec4(sqrt(c),1);}`);
g.compileShader(o);
g.attachShader(p, o);
g.linkProgram(p);
g.bindBuffer(0x8892, g.createBuffer());
g.bufferData(
  0x8892,
  new Float32Array([ -1, -1, 1, -1, -1, 1, 1, 1 ]),
  0x88e4
);
g.bindVertexArray(g.createVertexArray()),
  g.enableVertexAttribArray(g.getAttribLocation(p, "p"));
g.vertexAttribPointer(g.getAttribLocation(p, "p"), 2,0x1406, !1, 0, 0);
g.useProgram(p);
r();
