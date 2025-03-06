import shaderVert from './shader.vert.glsl?raw'
import shaderFrag from './shader.frag.glsl?raw'
import channel0 from '../../assets/img/textures/channel0.png'
import channel1 from '../../assets/img/textures/channel1.jpg'

const shaders = [shaderVert, shaderFrag]

function alert(msg: any): void {
  console.log(msg)
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => {
      reject(new Error('Failed to load image from: ' + src))
    }
    img.crossOrigin = 'anonymous'
    img.src = src
  })
}

// 用于加载纹理的辅助函数
function createTexture(
  gl: WebGLRenderingContext,
  image: HTMLImageElement
): WebGLTexture {
  const texture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, texture)

  // 加载纹理数据
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)

  // 设置纹理参数
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

  return texture!
}

export default function loadscene(canvas: HTMLCanvasElement): () => void {
  let gl: WebGLRenderingContext | null = null
  let vp_size: [number, number] = [0, 0]
  let progDraw: WebGLProgram | null = null
  const uniforms: Record<string, any> = {}
  const bufObj: Record<string, any> = {}
  let mousepos = [0, 0]
  let status: any

  const onMousemove = (e: MouseEvent) => {
    mousepos = [e.clientX, e.clientY]
  }

  const resize = () => {
    //vp_size = [gl.drawingBufferWidth, gl.drawingBufferHeight];
    vp_size = [window.innerWidth, window.innerHeight]
    //vp_size = [256, 256]
    canvas.width = vp_size[0]
    canvas.height = vp_size[1]
  }

  function initScene() {
    gl = canvas.getContext('webgl')
    if (!gl) return

    canvas.addEventListener('mousemove', onMousemove)

    progDraw = gl.createProgram()
    if (!progDraw) return

    for (let i = 0; i < 2; ++i) {
      const source = shaders[i]
      const shaderObj = gl.createShader(
        i == 0 ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER
      )
      if (!shaderObj) return
      gl.shaderSource(shaderObj, source)
      gl.compileShader(shaderObj)
      status = gl.getShaderParameter(shaderObj, gl.COMPILE_STATUS)
      if (!status) alert(gl.getShaderInfoLog(shaderObj))
      gl.attachShader(progDraw, shaderObj)
      gl.linkProgram(progDraw)
    }
    status = gl.getProgramParameter(progDraw, gl.LINK_STATUS)
    if (!status) alert(gl.getProgramInfoLog(progDraw))
    uniforms.inPos = gl.getAttribLocation(progDraw, 'inPos')
    uniforms.iTime = gl.getUniformLocation(progDraw, 'iTime')
    uniforms.iMouse = gl.getUniformLocation(progDraw, 'iMouse')
    uniforms.iResolution = gl.getUniformLocation(progDraw, 'iResolution')
    gl.useProgram(progDraw)

    const pos = [-1, -1, 1, -1, 1, 1, -1, 1]
    const inx = [0, 1, 2, 0, 2, 3]
    bufObj.pos = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, bufObj.pos)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pos), gl.STATIC_DRAW)
    bufObj.inx = gl.createBuffer()
    bufObj.inx.len = inx.length
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufObj.inx)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(inx), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(uniforms.inPos)
    gl.vertexAttribPointer(uniforms.inPos, 2, gl.FLOAT, false, 0, 0)

    gl.enable(gl.DEPTH_TEST)
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    window.addEventListener('resize', resize)
    resize()
    requestAnimationFrame(render)

    Promise.all([loadImage(channel0), loadImage(channel1)]).then(
      ([image0, image1]) => {
        if (!gl || !progDraw) return
        // 创建纹理
        const texture0 = createTexture(gl, image0)
        const texture1 = createTexture(gl, image1)

        // 获取 uniform 位置
        const iChannel0Location = gl.getUniformLocation(progDraw, 'iChannel0')
        const iChannel1Location = gl.getUniformLocation(progDraw, 'iChannel1')

        // 绑定纹理到相应的纹理单元并设置 uniform
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, texture0)
        gl.uniform1i(iChannel0Location, 0)

        gl.activeTexture(gl.TEXTURE1)
        gl.bindTexture(gl.TEXTURE_2D, texture1)
        gl.uniform1i(iChannel1Location, 1)
      }
    )
  }

  function render(deltaMS: DOMHighResTimeStamp) {
    if (gl) {
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

      gl.uniform1f(uniforms.iTime, deltaMS / 1000.0)
      gl.uniform2f(uniforms.iResolution, canvas.width, canvas.height)
      gl.uniform2f(uniforms.iMouse, mousepos[0], mousepos[1])
      gl.drawElements(gl.TRIANGLES, bufObj.inx.len, gl.UNSIGNED_SHORT, 0)
    }

    requestAnimationFrame(render)
  }

  initScene()

  return () => {
    canvas.removeEventListener('mousemove', onMousemove)
    window.removeEventListener('resize', resize)
  }
}
