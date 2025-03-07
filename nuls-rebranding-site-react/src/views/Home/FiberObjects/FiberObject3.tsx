import * as THREE from 'three'
import React, { useRef, useReducer, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  useGLTF,
  MeshTransmissionMaterial,
  Environment,
  Lightformer,
} from '@react-three/drei'
import {
  CuboidCollider,
  BallCollider,
  Physics,
  RigidBody,
} from '@react-three/rapier'
import { EffectComposer, N8AO } from '@react-three/postprocessing'
import { useInView } from 'react-intersection-observer'
import { easing } from 'maath'
import { Scale } from './utils'
import { FibterObjectProps } from './types'
import FiberObjectState from './fiberObjectState'
import { cdnFile } from '../../../utils'

const accents = ['#4060ff', '#20ffa0', '#ff4060', '#ffcc00']
const shuffle = (accent = 0) => [
  { color: '#444', roughness: 0.1 },
  { color: '#444', roughness: 0.75 },
  { color: '#444', roughness: 0.75 },
  { color: 'white', roughness: 0.1 },
  { color: 'white', roughness: 0.75 },
  { color: 'white', roughness: 0.1 },
  { color: accents[accent], roughness: 0.1, accent: true },
  { color: accents[accent], roughness: 0.75, accent: true },
  { color: accents[accent], roughness: 0.1, accent: true },
]

const oldNulsColor1 = '#20ffa0'
const oldNulsColor2 = '#a6ffd8'
const newNulsColor1 = '#93c9fc'
const newNulsColor2 = '#3e9ff9'

function getConnectors() {
  return [
    { color: newNulsColor1, roughness: 0.1 },
    { color: newNulsColor1, roughness: 0.75 },
    { color: newNulsColor1, roughness: 0.75 },
    { color: oldNulsColor2, roughness: 0.1 },
    { color: oldNulsColor2, roughness: 0.1, accent: true },
    { color: oldNulsColor1, roughness: 0.75, accent: true },
    { color: 'white', roughness: 0.1 },
    { color: 'white', roughness: 0.75 },
    { color: oldNulsColor1, roughness: 0.1, accent: true },
  ]
}

function Connector({
  position,
  children,
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  accent,
  ...props
}) {
  const api = useRef()
  const pos = useMemo(() => position || [r(20), r(10), r(10)], [])
  useFrame((state, delta) => {
    delta = Math.min(0.1, delta)
    api.current?.applyImpulse(
      vec.copy(api.current.translation()).negate().multiplyScalar(0.2)
    )
  })
  return (
    <RigidBody
      linearDamping={4}
      angularDamping={1}
      friction={0.1}
      position={pos}
      ref={api}
      colliders={false}
    >
      <CuboidCollider args={[0.38, 1.27, 0.38]} />
      <CuboidCollider args={[1.27, 0.38, 0.38]} />
      <CuboidCollider args={[0.38, 0.38, 1.27]} />
      {children ? children : <Model {...props} />}
      {accent && (
        <pointLight intensity={4} distance={2.5} color={props.color} />
      )}
    </RigidBody>
  )
}

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef()
  useFrame(({ mouse, viewport }) => {
    ref.current?.setNextKinematicTranslation(
      vec.set(
        (mouse.x * viewport.width) / 2,
        (mouse.y * viewport.height) / 2,
        0
      )
    )
  })
  return (
    <RigidBody
      position={[0, 0, 0]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[1]} />
    </RigidBody>
  )
}

function Model({ children, color = 'white', roughness = 0, ...props }) {
  const ref = useRef()
  const { nodes, materials } = useGLTF(cdnFile('/glbs/c-transformed.glb'))
  useFrame((state, delta) => {
    easing.dampC(ref.current.material.color, color, 0.2, delta)
  })
  return (
    <mesh
      ref={ref}
      castShadow
      receiveShadow
      scale={10}
      geometry={nodes.connector.geometry}
    >
      <meshStandardMaterial
        metalness={0.2}
        roughness={roughness}
        map={materials.base.map}
      />
      {children}
    </mesh>
  )
}

const nulsConnectors = getConnectors()

export const FiberObject3: React.FC<FibterObjectProps> = ({ rendering }) => {
  const { size } = FiberObjectState.useContainer()
  const { ref, inView } = useInView()
  const [mouseIn, setMouseIn] = useState(false)
  const shouldRender = useMemo(() => rendering && inView, [rendering, inView])

  const connectors = nulsConnectors
  return (
    <Canvas
      // onClick={click}
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: false }}
      camera={{ position: [0, 0, 15], fov: 17.5, near: 1, far: 20 }}
      resize={{ scroll: false }}
      frameloop={shouldRender ? 'always' : 'never'}
      onPointerMove={() => setMouseIn(true)}
      onPointerLeave={() => setMouseIn(false)}
      ref={ref}
    >
      <Scale width={size.width} height={size.height} />
      <color attach="background" args={['rgba(235, 254, 255, 0.7)']} />
      <ambientLight intensity={0.9} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
      />
      <Physics /*debug*/ gravity={[8, 0, 0]}>
        <Pointer />
        {
          connectors.map((props, i) => <Connector key={i} {...props} />) /* prettier-ignore */
        }
        <Connector position={[0, 0, 5]}>
          <Model>
            <MeshTransmissionMaterial
              clearcoat={1}
              thickness={0.1}
              anisotropicBlur={0.1}
              chromaticAberration={0.1}
              samples={8}
              resolution={512}
            />
          </Model>
        </Connector>
      </Physics>
      <EffectComposer disableNormalPass multisampling={8}>
        <N8AO distanceFalloff={1} aoRadius={1} intensity={4} />
      </EffectComposer>
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer
            form="circle"
            intensity={4}
            rotation-x={Math.PI / 2}
            position={[0, 5, -9]}
            scale={2}
          />
          <Lightformer
            form="circle"
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-5, 1, -1]}
            scale={2}
          />
          <Lightformer
            form="circle"
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-5, -1, -1]}
            scale={2}
          />
          <Lightformer
            form="circle"
            intensity={2}
            rotation-y={-Math.PI / 2}
            position={[10, 1, 0]}
            scale={8}
          />
        </group>
      </Environment>
    </Canvas>
  )
}

export default FiberObject3
