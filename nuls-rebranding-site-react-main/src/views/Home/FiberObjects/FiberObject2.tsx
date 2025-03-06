import * as THREE from 'three'
import React, { useRef, useReducer, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import { BallCollider, Physics, RigidBody } from '@react-three/rapier'
import { easing } from 'maath'
import { Effects } from './FiberObject2Effects'
import { useInView } from 'react-intersection-observer'
import { FibterObjectProps } from './types'
import FiberObjectState from './fiberObjectState'
import { Scale } from './utils'

const accents = ['#ff4060', '#ffcc00', '#20ffa0', '#4060ff']
const shuffle = (accent = 0) => [
  { color: '#444', roughness: 0.1, metalness: 0.5 },
  { color: '#444', roughness: 0.1, metalness: 0.5 },
  { color: '#444', roughness: 0.1, metalness: 0.5 },
  { color: 'white', roughness: 0.1, metalness: 0.1 },
  { color: 'white', roughness: 0.1, metalness: 0.1 },
  { color: 'white', roughness: 0.1, metalness: 0.1 },
  { color: accents[accent], roughness: 0.1, accent: true },
  { color: accents[accent], roughness: 0.1, accent: true },
  { color: accents[accent], roughness: 0.1, accent: true },
  { color: '#444', roughness: 0.1 },
  { color: '#444', roughness: 0.3 },
  { color: '#444', roughness: 0.3 },
  { color: 'white', roughness: 0.1 },
  { color: 'white', roughness: 0.2 },
  { color: 'white', roughness: 0.1 },
  {
    color: accents[accent],
    roughness: 0.1,
    accent: true,
    transparent: true,
    opacity: 0.5,
  },
  { color: accents[accent], roughness: 0.3, accent: true },
  { color: accents[accent], roughness: 0.1, accent: true },
]

const oldNulsColor1 = '#edfff7'
const oldNulsColor2 = '#a6ffd8'
const newNulsColor1 = '#93c9fc'
const newNulsColor2 = '#3e9ff9'

function getConnectors() {
  return [
    { color: '#ddd', roughness: 0.6, metalness: 0.5 },
    { color: '#ddd', roughness: 0.6, metalness: 0.5 },
    { color: '#ddd', roughness: 0.6, metalness: 0.5 },
    { color: oldNulsColor2, roughness: 0.6, metalness: 0.6 },
    { color: oldNulsColor2, roughness: 0.6, metalness: 0.6 },
    { color: oldNulsColor2, roughness: 0.6, metalness: 0.6 },
    { color: oldNulsColor1, roughness: 0.6, accent: true },
    { color: oldNulsColor1, roughness: 0.6, accent: true },
    { color: oldNulsColor1, roughness: 0.6, accent: true },
    { color: '#ddd', roughness: 0.6 },
    { color: '#ddd', roughness: 0.3 },
    { color: '#ddd', roughness: 0.3 },
    { color: newNulsColor2, roughness: 0.1 },
    { color: newNulsColor2, roughness: 0.2 },
    { color: newNulsColor2, roughness: 0.1 },
    {
      color: newNulsColor1,
      roughness: 0.1,
      accent: true,
      transparent: true,
      opacity: 0.5,
    },
    { color: newNulsColor1, roughness: 0.3, accent: true },
    { color: newNulsColor1, roughness: 0.1, accent: true },
  ]
}

interface SphereProps {
  position?: [number, number, number]
  children?: React.ReactNode
  vec?: THREE.Vector3
  scale?: number
  r?: (range: number) => number
  accent?: number
  color?: string
  [key: string]: any
}

const Sphere: React.FC<SphereProps> = ({
  position,
  children,
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  accent,
  color = 'white',
  ...props
}) => {
  const api = useRef()
  const ref = useRef()
  const pos = useMemo(() => position || [r(10), r(10), r(10)], [])
  useFrame((state, delta) => {
    delta = Math.min(0.1, delta)
    api.current?.applyImpulse(
      vec.copy(api.current.translation()).negate().multiplyScalar(0.2)
    )
    easing.dampC(ref.current.material.color, color, 0.2, delta)
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
      <BallCollider args={[1]} />
      <mesh ref={ref} castShadow receiveShadow>
        {/* <sphereGeometry args={[1, 64, 64]} /> */}
        <dodecahedronGeometry args={[1]} />
        <meshStandardMaterial {...props} />
        {children}
      </mesh>
    </RigidBody>
  )
}

interface PointerProps {
  vec?: THREE.Vector3
}

const Pointer: React.FC<PointerProps> = ({ vec = new THREE.Vector3() }) => {
  const ref = useRef()
  useFrame(({ mouse, viewport }) =>
    ref.current?.setNextKinematicTranslation(
      vec.set(
        (mouse.x * viewport.width) / 2,
        (mouse.y * viewport.height) / 2,
        0
      )
    )
  )
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

const nulsConnectors = getConnectors()

const FibterObject2: React.FC<FibterObjectProps> = ({ rendering }) => {
  const { size } = FiberObjectState.useContainer()
  const { ref, inView } = useInView()
  const [mouseIn, setMouseIn] = useState(false)
  const shouldRender = useMemo(() => rendering && inView, [rendering, inView])

  const connectors = nulsConnectors
  return (
    <Canvas
      flat
      shadows
      // onClick={click}
      dpr={[1, 1.5]}
      gl={{ antialias: false }}
      camera={{ position: [0, 0, 18], fov: 17.5, near: 10, far: 40 }}
      resize={{ scroll: false }}
      frameloop={shouldRender ? 'always' : 'never'}
      onPointerMove={() => setMouseIn(true)}
      onPointerLeave={() => setMouseIn(false)}
      ref={ref}
    >
      <Scale width={size.width} height={size.height} />
      <color attach="background" args={['rgba(235, 254, 255, 0.7)']} />
      <Physics /*debug*/ timeStep="vary" gravity={[8, 0, 0]}>
        <Pointer />
        {connectors.map((props, i) => (
          <Sphere key={i} {...props} />
        ))}
      </Physics>
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer
            form="circle"
            intensity={100}
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
          <Lightformer
            form="ring"
            color="#bbc6ff"
            intensity={80}
            onUpdate={(self) => self.lookAt(0, 0, 0)}
            position={[10, 10, 0]}
            scale={10}
          />
        </group>
      </Environment>
      <Effects />
    </Canvas>
  )
}

export default FibterObject2
