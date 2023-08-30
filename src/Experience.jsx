import { Light } from "three"
import Environment from "./Environment"
import Lights from "./Lights"
import TestDrone from "./TestDrone"

export default function Experience()
{
    return <>
        <Environment />
        <Lights />
        <TestDrone />
    </>
}