import { Canvas } from '@react-three/fiber'
import { Center, Environment, OrbitControls } from '@react-three/drei'
import { Model } from './datsun.tsx'
import { XROrigin, XR, createXRStore } from '@react-three/xr'
import { Suspense } from 'react'

const store = createXRStore({ depthSensing: true, hand: false })

// Function to dynamically load the script into the head
function loadARScript() {
  const script = document.createElement('script')
  script.src = 'https://launchar.app/sdk/v1?key=wq218Ks333kuBXLbT2XZ4hJjeLGGZMnN&redirect=true'
  script.async = true
  document.head.appendChild(script)
}

export default function App() {
  return (
    <>
      <button
        style={{
          position: 'absolute',
          zIndex: 10000,
          background: 'black',
          borderRadius: '0.5rem',
          border: 'none',
          fontWeight: 'bold',
          color: 'white',
          padding: '1rem 2rem',
          cursor: 'pointer',
          fontSize: '1.5rem',
          bottom: '1rem',
          left: '50%',
          boxShadow: '0px 0px 20px rgba(0,0,0,1)',
          transform: 'translate(-50%, 0)',
        }}
        onClick={() => {
          store.enterAR()
          loadARScript()  // Injects the script when AR starts
        }}
      >
        Enter AR
      </button>
      <Canvas shadows camera={{ position: [4, 0, 6], fov: 35 }}>
        <XR store={store}>
          <group position={[0, -0.75, 0]}>
            <Suspense>
              <Center top>
                <Model />
              </Center>
            </Suspense>
            <directionalLight position={[1, 8, 1]} castShadow />
            <ambientLight />
            <mesh receiveShadow rotation-x={-Math.PI / 2} scale={100}>
              <shadowMaterial opacity={0.7} />
              <planeGeometry />
            </mesh>
            <group position={[0, 0, 2.6]}>
              <XROrigin />
            </group>
          </group>
          <OrbitControls />
          <Suspense>
            <Environment preset="dawn" blur={1} />
          </Suspense>
        </XR>
      </Canvas>
    </>
  )
}
