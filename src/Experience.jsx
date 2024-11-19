import EnergyTower from "./components/EnergyTower.jsx"
import Floor from "./components/Floor.jsx"

export default function Experience()
{

    
    return(
        <group>
            <EnergyTower position-y={ -2 }/>
            <Floor
                rotation-x={[ -90 * Math.PI / 180 ]}
                position-y={ -2.54 }
            /> 
        </group>
    )
}