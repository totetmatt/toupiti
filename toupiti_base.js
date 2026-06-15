/*
f = frame
g = glcontext

p  = program

v = gl_VertexID
*/

document.body.innerHTML ="CLICK"


v='gl_VertexID'

c=(p,f)=>{for([x,y]of[[0x8b31,`#version 300 es\nvoid main(){gl_Position=vec4(vec2(${v}&1,${v}>>1&1)*2.-1.,0,1);}`],[0x8b30,f]]){g.shaderSource(o=g.createShader(x),y);g.compileShader(o);g.attachShader(p,o)}g.linkProgram(p)}
document.body.onclick = () =>{
	h=4096
	document.body.innerHTML =""
	

	document.body.appendChild(V = document.createElement("canvas")).requestFullscreen();

	document.body.style.margin =0;
	V.style.width = V.style.height = "100%";
	g =V.getContext("webgl2") 


	// AUDIO
	g.getExtension( 'EXT_color_buffer_float' );
	g.getExtension( 'OES_texture_float_linear' );  
	 
	g.bindTexture( 0xde1, t = g.createTexture() );
	g.texStorage2D( 0xde1, 1, 0x8230, h, h );

	g.bindFramebuffer( 0x8d40, g.createFramebuffer() );
	g.framebufferTexture2D(
		0x8d40,
		0x8ce0,
		0xde1,
		t,
		0,
	);
	c(q=g.createProgram(),`#version 300 es
		precision highp float;uniform float r;out vec2 dest;
		#define BPM 140.
		#define PI 3.1415
		#define TAU 6.28318530718
		#define FBI floatBitsToInt
		#define FFBI(a)FBI(cos(a))^FBI(a)
		float hash(vec2 uv){int x=FFBI(uv.x),y=FFBI(uv.y);return float((x*x+y)*(y*y-x)+x)/2.14e9;}float kick(float t){return t<0.?0.:exp(-4.*t)*sin(TAU*(12.5*t-4.*(exp(-40.*t)+exp(-2e2*t))));}void main(){dest=vec2(0);float T=mod((gl_FragCoord.x+4096.*gl_FragCoord.y)/r,60.),tt=mod(fract(T/2.*BPM/60.),4.),sq=mod(T,30.),q=mix(1.05,.9,smoothstep(0.,1.,T));dest+=clamp(smoothstep(-.5,.5,sin(TAU*55.*(tt*q))+.1*sin(cos(TAU*55.*tt*q)+TAU*110.*(tt*q))),-.9,.9);dest+=tanh(2.*kick(fract(T*140./60.)));for(float i=1.;i++<32.&&T>30.;){float sc=smoothstep(.1,.9,i/32.);dest+=.1*exp(-3.*clamp(fract(tt-sc),.2,.95))*sin(tt*TAU*550.*sc+cos(tt*TAU*550.*sc));}int step=int(floor(T/2.*BPM/60.))%4;q=log2(8.);float a[4]=float[4](990./q,990./q,990./q,990.);for(float i=1.;i++<8.&&sq>3.5;){float r=hash(vec2(T,i));dest+=sin(a[step]*T*TAU+i/8.)*exp(-30.*smoothstep(.1,.3,fract(tt+i/8.)))/i;dest+=sin(a[step]/2.*T*TAU+i/8.)*exp(-30.*smoothstep(.1,.3,fract(tt+i/8.)))/i;if(sq>10.)dest+=sin(a[step]*T*6.28+r)*exp(-30.*smoothstep(.1,.3,fract(tt)))/8.;}}`
		)
   

 g.useProgram( q);
  g.uniform1f(
   g.getUniformLocation( q, 'r' ),
   r = (a = new AudioContext()).sampleRate,
 );
  g.viewport( 0, 0, h, h );
 g.drawArrays( 5, 0, 4 );

 // -- read pixels ----------------------------------------------------------------------------------

 g.readPixels( 0, 0, h, h, 0x8227, 0x1406, x = new Float32Array( 2 * h * h ) );
 
 // -- audio ----------------------------------------------------------------------------------------
  k = a.createBuffer( 2, h * h, r );
  b = [
   k.getChannelData( 0 ),
   k.getChannelData( 1 ),
 ];
 x.map( ( v, i ) => (
   b[ i % 2 ][ ~~( i / 2 ) ] = v
 ) );

 
 // -- play -----------------------------------------------------------------------------------------
 
 

   a.resume();
   //musicBeginTime = A.currentTime; // delay 1 sec
   (b = a.createBufferSource()).buffer = k;
   b.connect( a.destination );
   b.start(f=0);
	// VIDEO
	c(p = g.createProgram(),`#FS#`)
	
g.bindFramebuffer( 0x8d40,  null);
	
	(draw =() => {

	
			g.useProgram(p);
	
	
	g.viewport(0, 0,g.canvas.width = V.clientWidth, g.canvas.height = V.clientHeight);	// Clear the canvas
		g.uniform3f(g.getUniformLocation(p, 't'),V.clientWidth,V.clientHeight,(f++)/60*140/60);
		g.drawArrays(5, 0, 4);

		setTimeout(() =>requestAnimationFrame(draw),16);
	})()
}