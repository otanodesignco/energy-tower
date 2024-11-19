import { shaderMaterial, useTexture } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import vertex from '../shaders/towerbase/vertex.glsl'
import fragment from '../shaders/towerbase/fragment.glsl'
import { Color, DoubleSide, FrontSide, RepeatWrapping } from 'three'

export default function MeshTowerBottomMaterial( {
    noiseTexture = './textures/noiseWavey.png',
    color1 = '#ABFBFF',
    color2 = '#00C6D1',
}, props ) 
{
    const self = useRef()

    const texture = useTexture( noiseTexture )
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping

    color1 = new Color( color1 )
    color2 = new Color( color2 )

    const uniforms =
    {
        uTime: 0,
        uNoiseTexture: texture,
        uColor1: color1,
        uColor2: color2,
    }

    useFrame( ( state, delta ) =>
    {
        self.current.uniforms.uTime.value += delta
    })

    const MeshTowerBottomMaterial = shaderMaterial( uniforms, vertex, fragment )
    extend( { MeshTowerBottomMaterial } )

    return (
        <meshTowerBottomMaterial 
            key={ MeshTowerBottomMaterial.key }
            ref={ self }
            transparent={ true }
            side={ FrontSide }
            {...props}
        />
    )
}
