import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import { OrbitControls } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import { KeyboardControls } from '@react-three/drei'

const root = ReactDOM.createRoot(document.querySelector('#root'))
console.log(root)
root.render(
    <>
        <KeyboardControls map={[
            { name: 'upward', keys: ['KeyQ' ] },
            { name: 'downward', keys: [ 'KeyE' ] },
            { name: 'forward', keys: [ 'ArrowUp', 'KeyW' ] },
            { name: 'backward', keys: [ 'ArrowDown', 'KeyS' ] },
            { name: 'leftward', keys: [ 'ArrowLeft', 'KeyA' ] },
            { name: 'rightward', keys: [ 'ArrowRight', 'KeyD' ] },
            { name: 'jump', keys: [ 'Space' ] },
        ]}>
            <Canvas shadows camera={{fov: 50, position: [0, 1.5, 5]}} >
                {/* <OrbitControls makeDefault
                    maxDistance={30}
                    minDistance={5}
                    maxPolarAngle={Math.PI * 0.5}
                /> */}
                <Physics debug>
                    <Experience  />
                </Physics> 
            </Canvas>
        </KeyboardControls>
    </>
)