import * as THREE from 'three'
import React, { useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Outlines, Environment, useTexture } from '@react-three/drei'
import { Physics, useSphere } from '@react-three/cannon'
import { EffectComposer, N8AO, SMAA, Bloom } from '@react-three/postprocessing'
import { useInView } from 'react-intersection-observer'
// import { useControls } from "leva"
import { Scale } from './utils'
import { FibterObjectProps } from './types'
import FiberObjectState from './fiberObjectState'
import { cdnFile } from '../../../utils'

const rfs = THREE.MathUtils.randFloatSpread
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
const baubleMaterial = new THREE.MeshStandardMaterial({
  color: 'white',
  roughness: 0,
  envMapIntensity: 1,
})

function Clump({
  mat = new THREE.Matrix4(),
  vec = new THREE.Vector3(),
  ...props
}) {
  const texture = useTexture(cdnFile('/glbs/cross.jpg'))
  const [ref, api] = useSphere(() => ({
    args: [1],
    mass: 1,
    angularDamping: 0.1,
    linearDamping: 0.65,
    position: [rfs(20), rfs(20), rfs(20)],
  }))
  useFrame((state) => {
    for (let i = 0; i < 40; i++) {
      // Get current whereabouts of the instanced sphere
      ref.current.getMatrixAt(i, mat)
      // Normalize the position and multiply by a negative force.
      // This is enough to drive it towards the center-point.
      api
        .at(i)
        .applyForce(
          vec
            .setFromMatrixPosition(mat)
            .normalize()
            .multiplyScalar(-40)
            .toArray(),
          [0, 0, 0]
        )
    }
  })
  return (
    <instancedMesh
      ref={ref}
      castShadow
      receiveShadow
      args={[sphereGeometry, baubleMaterial, 40]}
      material-map={texture}
    />
  )
}

function Pointer() {
  const viewport = useThree((state) => state.viewport)
  const [ref, api] = useSphere(() => ({
    type: 'Kinematic',
    args: [1],
    position: [0, 0, 0],
  }))
  useFrame((state) =>
    api.position.set(
      (state.mouse.x * viewport.width) / 2,
      (state.mouse.y * viewport.height) / 2,
      0
    )
  )
  return (
    <mesh ref={ref} scale={0.2}>
      <sphereGeometry />
      <meshBasicMaterial color={[4, 4, 4]} toneMapped={false} />
      {/* <pointLight intensity={8} distance={10} /> */}
    </mesh>
  )
}

const FiberObject4: React.FC<FibterObjectProps> = ({ rendering }) => {
  const { size } = FiberObjectState.useContainer()
  const { ref, inView } = useInView()
  const [mouseIn, setMouseIn] = useState(false)
  const shouldRender = useMemo(() => rendering && inView, [rendering, inView])

  return (
    <Canvas
      shadows
      gl={{ antialias: false }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 10], fov: 35, near: 1, far: 40 }}
      resize={{ scroll: false }}
      frameloop={shouldRender ? 'always' : 'never'}
      onPointerMove={() => setMouseIn(true)}
      onPointerLeave={() => setMouseIn(false)}
      ref={ref}
    >
      <Scale width={size.width} height={size.height} />
      <ambientLight intensity={0.5} />
      <color attach="background" args={['rgba(219, 248, 248, 0.7)']} />
      <spotLight
        intensity={1}
        angle={0.2}
        penumbra={1}
        position={[30, 30, 100]}
        castShadow
        shadow-mapSize={[512, 512]}
      />
      <Physics gravity={[50, 2, 0]} iterations={10}>
        <Pointer />
        <Clump />
      </Physics>
      <Environment files={cdnFile('/glbs/adamsbridge.hdr')} />
      <EffectComposer enableNormalPass={false} multisampling={0}>
        <N8AO
          halfRes
          color="#fff"
          aoRadius={2}
          intensity={1}
          aoSamples={6}
          denoiseSamples={4}
        />
        <Bloom mipmapBlur levels={2} intensity={1} />
        <SMAA />
      </EffectComposer>
    </Canvas>
)
}

export default FiberObject4
