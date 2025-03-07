import * as THREE from 'three'
import React, { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Instances, Instance } from '@react-three/drei'
import { EffectComposer, N8AO, Bloom } from '@react-three/postprocessing'
import { RoundedBoxGeometry } from 'three-stdlib'
import { easing } from 'maath'
import { InstancedMesh } from 'three'
import { FibterObjectProps } from './types'
import { useInView } from 'react-intersection-observer'
import { Scale } from './utils'
import FiberObjectState from './fiberObjectState'

extend({ RoundedBoxGeometry })

interface CubesProps {
  gap?: number
  stride?: number
  displacement?: number
  intensity?: number
  mouseIn?: boolean
}

const Cubes: React.FC<CubesProps> = ({
  gap = 0.1,
  stride = 4,
  displacement = 3,
  intensity = 1,
  mouseIn = false,
}) => {
  const cursor = new THREE.Vector3()
  const oPos = new THREE.Vector3()
  const vec = new THREE.Vector3()
  const dir = new THREE.Vector3()
  const ref = useRef<InstancedMesh>()

  const positions = useMemo(() => {
    const temp = []
    const center = stride / 2 - stride * gap + gap
    for (let x = 0; x < stride; x++)
      for (let y = 0; y < stride; y++)
        for (let z = 0; z < stride; z++)
          temp.push([
            x + x * gap - center,
            y + y * gap - center,
            z + z * gap - center,
          ])
    return temp
  }, [stride, gap])

  useFrame(({ pointer, camera, clock }, delta) => {
    // console.log(mouseIn)
    cursor.set(pointer.x, pointer.y, 0.5).unproject(camera)
    dir.copy(cursor).sub(camera.position).normalize()
    cursor.add(dir.multiplyScalar(camera.position.length()))
    let count = 0
    for (const child of ref.current.children) {
      oPos.set(...positions[count++])
      dir.copy(oPos).sub(cursor).normalize()
      const dist = mouseIn ? oPos.distanceTo(cursor) : 999999
      const distInv = displacement - dist
      const col = Math.max(0.5, distInv) / 1.5
      const mov = 1 + Math.sin(clock.elapsedTime * 2 + 1000 * count)
      easing.dampC(
        child.color,
        dist > displacement * 1.1
          ? [0.9, 0.99, 1]
          : [col / 2, col * 2, col * 4],
        0.1,
        delta
      )
      easing.damp3(
        child.position,
        dist > displacement
          ? oPos
          : vec
              .copy(oPos)
              .add(dir.multiplyScalar(distInv * intensity + mov / 4)),
        0.2,
        delta
      )
    }
    // console.log(count)
  })

  return (
    <Instances
      key={stride}
      limit={stride * stride * stride}
      castShadow
      receiveShadow
      frames={Infinity}
      ref={ref}
      position={[2, 0.5, 0]}
    >
      <roundedBoxGeometry args={[1, 1, 1, 2, 0.15]} />
      <meshLambertMaterial />
      {Array.from({ length: stride * stride * stride }, (v, n) => (
        <Instance key={n} position={positions[n]} />
      ))}
    </Instances>
  )
}

const FibterObject1: React.FC<FibterObjectProps> = ({ rendering }) => {
  const { size } = FiberObjectState.useContainer()
  const { ref, inView } = useInView()
  const [mouseIn, setMouseIn] = useState(false)
  const shouldRender = useMemo(() => rendering && inView, [rendering, inView])

  // useThree(({ camera }) => {
  //   camera.rotation.set(THREE.MathUtils.degToRad(30), 0, 0)
  // })

  return (
    <Canvas
      shadows
      gl={{ antialias: false }}
      camera={{ position: [8, 5, 7], fov: 25 }}
      id="fiberObject1"
      className="fiberBg"
      resize={{ scroll: false }}
      frameloop={shouldRender ? 'always' : 'never'}
      ref={ref}
      onPointerMove={() => setMouseIn(true)}
      onPointerLeave={() => setMouseIn(false)}
    >
      <Scale width={size.width} height={size.height} />
      <color attach="background" args={['rgba(235, 254, 255, 0.7)']} />
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[-10, 40, 40]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={2}
        castShadow
      />
      <Cubes
        gap={0.1}
        stride={4}
        displacement={3}
        intensity={1}
        mouseIn={mouseIn}
      />
      <EffectComposer>
        <N8AO aoRadius={1} intensity={1} />
        <Bloom mipmapBlur luminanceThreshold={1} levels={7} intensity={1} />
      </EffectComposer>
      {/* <OrbitControls /> */}
    </Canvas>
  )
}

export default FibterObject1
