import { useFrame } from "@react-three/fiber"
import { RigidBody, CuboidCollider, useRevoluteJoint, useFixedJoint } from "@react-three/rapier"
import { useEffect, useRef, useState } from "react"
import * as THREE from 'three'
import { useKeyboardControls } from "@react-three/drei"

export default function TestDrone()
{
    const obj = useRef()
    const roterTopRight = useRef()
    const roterBottomRight = useRef()
    const roterTopLeft = useRef()
    const roterBottomLeft = useRef()
    const landingLeft = useRef()
    const landingRight = useRef()

    console.log(roterTopRight.current)

    const [subscribeKeys, getKeys] = useKeyboardControls()
    
    const jump = () => {
        // console.log(obj.current)
        obj.current.applyImpulse({x: 0, y:2, z: -5})
        obj.current.applyTorqueImpulse({ x: Math.random() - 0.5, y: Math.random() - 0.5, z: Math.random() - 0.5 })
    }

    const [ smoothedCameraPosition ] = useState(() => new THREE.Vector3(10, 50, 10))
    const [ smoothedCameraTarget ] = useState(() => new THREE.Vector3())

    const STIFFNESS = 150000
    const DAMPING = 2
    const joint = useRevoluteJoint(obj, roterTopLeft, [
        [-0.0 , 0, -1],
        [0.25, 0, 0],
        [0, 1, 0]
    ])

    const joint2 = useRevoluteJoint(obj, roterTopRight, [
        [0.5, 0., -1],
        [0, 0, 0],
        [0, 1, 0]
    ])

    const joint3 = useRevoluteJoint(obj, roterBottomLeft, [
        [-0.5, 0, 1],
        [0, 0, 0],
        [0, 1, 0]
    ])

    const joint4 = useRevoluteJoint(obj, roterBottomRight, [
        [0.5, 0, 1],
        [0, 0, 0],
        [0, 1, 0]
    ])

    const fixedJointLeft = useFixedJoint(obj, landingLeft, [
        [0, 0, 0],
        [0, 0, 0, 1],
        [0, 0, 0],
        [0, 0, 0, 1]
    ])

    const fixedJointRight = useFixedJoint(obj, landingRight, [
        [0, 0, 0],
        [0, 0, 0, 1],
        [0, 0, 0],
        [0, 0, 0, 1]
    ])
    
    
    useEffect(() => {
        console.log(joint.current)
        // joint.current?.configureMotorPosition(0.3, STIFFNESS, DAMPING)
        
    })
  

    useFrame((state, delta) => {
        const bodyPosition = obj.current.translation()
        const cameraPosition = new THREE.Vector3()
        cameraPosition.copy(bodyPosition)
        cameraPosition.z += 5
        cameraPosition.y += 1

        const cameraTarget = new THREE.Vector3()
        cameraTarget.copy(bodyPosition)
        cameraTarget.y += 0.25

        smoothedCameraPosition.lerp(cameraPosition, 5 * delta)
        smoothedCameraTarget.lerp(cameraTarget, 5 * delta)

        state.camera.position.copy(smoothedCameraPosition)
        state.camera.lookAt(smoothedCameraTarget)

        const { upward, downward, forward, backward, leftward, rightward } = getKeys()
        const impulse = { x: 0, y: 0, z: 0 }
        const torque = { x: 0, y: 0, z: 0 }
        const force = { x: 0, y:0, z: 0}

        const impulseStrength = 0.6 * delta
        const torqueStrength = 0.2 * delta
        const forceStrength = 5.2 * delta

        if(upward)
        {
            force.y += forceStrength
            // console.log(state.clock.elapsedTime)
            joint.current?.configureMotorVelocity(forceStrength * 550, DAMPING)
            joint.current?.anchor1(new THREE.Vector3(0, 1, 0))
            obj.current?.wakeUp()
            roterTopLeft.current?.wakeUp()

        }

        
        if(downward){
            force.y -= forceStrength
        }

        if(forward)
        {
            impulse.z -= impulseStrength
            torque.x -= torqueStrength
        }

        if(rightward)
        {
            impulse.x += impulseStrength
            torque.z -= torqueStrength
        }

        if(backward)
        {
            impulse.z += impulseStrength
            torque.x += torqueStrength
        }
        
        if(leftward)
        {
            impulse.x -= impulseStrength
            torque.z += torqueStrength
        }

        // obj.current.applyImpulse(impulse)
        // obj.current.applyTorqueImpulse(torque)
        // obj.current.addForce(force)

        // roterBottomRight.current.rotation.y += 2 * delta * Math.random()
        // roterBottomLeft.current.rotation.y += 2 * delta * Math.random()
        // roterTopRight.current.rotation.y += 2 * delta * Math.random()
        // roterTopLeft.current.rotation.y += 2 * delta * Math.random()
    })

    return(
        <>
            {/* <RigidBody colliders={'cuboid'} restitution={0.5} ref={obj} onClick={jump}> */}
                <group>
                    <RigidBody colliders='cuboid' ref={landingLeft}>
                        <mesh position={[-0.25, -0.25, 0]}> 
                            <boxGeometry args={[0.1, 0.5, 0.5]} />
                            <meshNormalMaterial />
                        </mesh>
                    </RigidBody>
                    <RigidBody ref={landingRight}>
                        <mesh position={[0.25, -0.25, 0]}> 
                            <boxGeometry args={[0.1, 0.5, 0.5]} />
                            <meshNormalMaterial />
                        </mesh>
                    </RigidBody>
                    <RigidBody ref={roterBottomRight}>
                        <mesh position={[0.5, 0.2, 0.5]} > 
                            <boxGeometry args={[0.1, 0.01, 0.25]} />
                            <meshStandardMaterial color='green' />
                        </mesh>
                    </RigidBody>
                    <RigidBody ref={roterBottomLeft}>
                        <mesh position={[-0.5, 0.2, 0.5]} > 
                            <boxGeometry args={[0.1, 0.01, 0.25]} />
                            <meshStandardMaterial color='red' />
                        </mesh>
                    </RigidBody>
                    <RigidBody ref={roterTopRight}>
                        <mesh position={[0.5, 0.2, -0.5]} > 
                            <boxGeometry args={[0.1, 0.01, 0.25]} />
                            <meshStandardMaterial color='orange' />
                        </mesh>
                    </RigidBody>
                    <RigidBody ref={roterTopLeft}>
                        <mesh position={[-0.5, 0.2, -0.5]} > 
                            <boxGeometry args={[0.1, 0.01, 0.25]} />
                            <meshStandardMaterial color='blue' />
                        </mesh>
                    </RigidBody>
                    <RigidBody ref={obj} onClick={jump}>
                        <mesh castShadow >
                            <boxGeometry args={[1, 0.2, 1]}/>
                            <meshNormalMaterial />
                        </mesh>
                    </RigidBody>   
                </group>
                
            {/* </RigidBody> */}
            
        </>
    )
}