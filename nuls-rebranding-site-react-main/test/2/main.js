function loadImage(src) {
    return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => {
      reject(new Error("Failed to load image from: " + src));
    }
    img.src = src;
  })
}
// 用于加载纹理的辅助函数
function createTexture(gl, image) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // 加载纹理数据
    gl.texImage2D(
        gl.TEXTURE_2D, 
        0, 
        gl.RGBA, 
        gl.RGBA, 
        gl.UNSIGNED_BYTE, 
        image
    );

    // 设置纹理参数
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    return texture;
}

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


      Promise.all([
        loadImage('./channel0.png'),
        loadImage('./channel1.jpg')
      ]).then(([image0, image1]) => {
        // 创建纹理
        const texture0 = createTexture(gl, image0);
        const texture1 = createTexture(gl, image1);


        // 获取 uniform 位置
        const iChannel0Location = gl.getUniformLocation(progDraw, "iChannel0");
        const iChannel1Location = gl.getUniformLocation(progDraw, "iChannel1");

        // 绑定纹理到相应的纹理单元并设置 uniform
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture0);
        gl.uniform1i(iChannel0Location, 0);

        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, texture1);
        gl.uniform1i(iChannel1Location, 1);
      })
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