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
	c(q=g.createProgram(),`#MS#`
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