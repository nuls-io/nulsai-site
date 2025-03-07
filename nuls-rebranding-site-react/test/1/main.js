(function loadscene() {    

  var canvas, gl, vp_size, prog, bufObj = {}, mousepos = [0, 0];
  
  function initScene() {
  
      canvas = document.getElementById( "ogl-canvas");
      gl = canvas.getContext( "experimental-webgl" );
      if ( !gl )
        return;
  
      canvas.addEventListener('mousemove', (e) => {
          mousepos = [e.clientX, e.clientY];
      });
  
      progDraw = gl.createProgram();
      for (let i = 0; i < 2; ++i) {
          let source = document.getElementById(i==0 ? "draw-shader-vs" : "draw-shader-fs").text;
          let shaderObj = gl.createShader(i==0 ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER);
          gl.shaderSource(shaderObj, source);
          gl.compileShader(shaderObj);
          let status = gl.getShaderParameter(shaderObj, gl.COMPILE_STATUS);
          if (!status) alert(gl.getShaderInfoLog(shaderObj));
          gl.attachShader(progDraw, shaderObj);
          gl.linkProgram(progDraw);
      }
      status = gl.getProgramParameter(progDraw, gl.LINK_STATUS);
      if ( !status ) alert(gl.getProgramInfoLog(progDraw));
      progDraw.inPos = gl.getAttribLocation(progDraw, "inPos");
      progDraw.iTime = gl.getUniformLocation(progDraw, "iTime");
      progDraw.iMouse = gl.getUniformLocation(progDraw, "iMouse");
      progDraw.iResolution = gl.getUniformLocation(progDraw, "iResolution");
      gl.useProgram(progDraw);
  
      var pos = [ -1, -1, 1, -1, 1, 1, -1, 1 ];
      var inx = [ 0, 1, 2, 0, 2, 3 ];
      bufObj.pos = gl.createBuffer();
      gl.bindBuffer( gl.ARRAY_BUFFER, bufObj.pos );
      gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( pos ), gl.STATIC_DRAW );
      bufObj.inx = gl.createBuffer();
      bufObj.inx.len = inx.length;
      gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, bufObj.inx );
      gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( inx ), gl.STATIC_DRAW );
      gl.enableVertexAttribArray( progDraw.inPos );
      gl.vertexAttribPointer( progDraw.inPos, 2, gl.FLOAT, false, 0, 0 ); 
      
      gl.enable( gl.DEPTH_TEST );
      gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
  
      window.onresize = resize;
      resize();
      requestAnimationFrame(render);
  }
  
  function resize() {
      //vp_size = [gl.drawingBufferWidth, gl.drawingBufferHeight];
      vp_size = [window.innerWidth, window.innerHeight];
      //vp_size = [256, 256]
      canvas.width = vp_size[0];
      canvas.height = vp_size[1];
  }
  
  function render(deltaMS) {
  
      gl.viewport( 0, 0, canvas.width, canvas.height );
      gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
     
      gl.uniform1f(progDraw.iTime, deltaMS/1000.0);
      gl.uniform2f(progDraw.iResolution, canvas.width, canvas.height);
      gl.uniform2f(progDraw.iMouse, mousepos[0], mousepos[1]);
      gl.drawElements( gl.TRIANGLES, bufObj.inx.len, gl.UNSIGNED_SHORT, 0 );
      
      requestAnimationFrame(render);
  }  
  
  initScene();
  
  })();