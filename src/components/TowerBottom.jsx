import MeshTowerBottomMaterial from "../materials/MeshTowerBottomMaterial.jsx"

export default function TowerBottom( props ) 
{
  return (
    <mesh {...props}>
        <planeGeometry
            args={[6.3, 6.3, 64, 64]}
        />
        <MeshTowerBottomMaterial
        
        />
    </mesh>
  )
}
