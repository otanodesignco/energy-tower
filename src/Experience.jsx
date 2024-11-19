import EnergyTower from "./components/EnergyTower.jsx"
import Floor from "./components/Floor.jsx"
import TowerBottom from "./components/TowerBottom.jsx"

export default function Experience()
{

    
    return(
        <group>
            <EnergyTower position-y={ -2.02 }/>
            <TowerBottom 
                position-y={ -2.01 }
                rotation-x={[ -90 * Math.PI / 180 ]}
            />
            <Floor
                rotation-x={[ -90 * Math.PI / 180 ]}
                position-y={ -2.54 }
            /> 
        </group>
    )
}