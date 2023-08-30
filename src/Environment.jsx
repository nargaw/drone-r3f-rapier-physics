import { Grid } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

function Floor(){
    return (
        <RigidBody type="fixed">
            <mesh receiveShadow position={[0, -3.5, 0]}>
                <boxGeometry args={[300, 5, 300]} />
                <meshStandardMaterial color="lightblue" />
            </mesh>
        </RigidBody>
        
    )
}

function Buildings(){
    return (
        <>
        
        </>
    )
}

export default function Environment(){
    return <>
        <Grid 
            args={[300, 300]}
            sectionColor={"lightgray"}
            cellColor={"gray"}
            position={[0, -0.99, 0]}
        />
        <Floor />
    </>
}