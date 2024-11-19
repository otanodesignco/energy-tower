import { MeshReflectorMaterial } from "@react-three/drei"

export default function Floor( props ) 
{
  return (
    <mesh {...props }>
        <boxGeometry
            args={[15, 15, 1, 5, 5, 1 ]}
        />
        <MeshReflectorMaterial
            blur={[400, 100]}
            resolution={1024}
            mixBlur={1}
            mixStrength={15}
            depthScale={1}
            minDepthThreshold={0.85}
            color="#f9f9f9"
            metalness={0.6}
            roughness={1}
        />
    </mesh>
  )
}
