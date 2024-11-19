import { shaderMaterial, useTexture } from '@react-three/drei'
import { useRef } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import { Color, DoubleSide, RepeatWrapping, Vector2 } from 'three'
import vertex from '../shaders/dust/vertex.glsl'
import fragment from '../shaders/dust/fragment.glsl'

export default function MeshDustMaterial( {
    texture = './textures/widen_1840x0.png',
    color1 = '#ABFBFF',
    color2 = '#00C6D1',
    clipThreshold = 0.3,
    mask = false,
    maskOffset = new Vector2( 0.0, 1.0 ),
    panOffset = new Vector2( 0.6, 0.0 ),
    colorIntensity = 1,


},props) 
{

    const self = useRef()

    texture = useTexture( texture )
    texture.wrapT = RepeatWrapping
    texture.wrapS = RepeatWrapping

    color1 = new Color( color1 ).multiplyScalar( colorIntensity )
    color2 = new Color( color2 )

    maskOffset = ( maskOffset instanceof Vector2 ) ? maskOffset : new Vector2( 0, 1 )
    panOffset = ( panOffset instanceof Vector2 ) ? panOffset : new Vector2( 0.5, 0.0 )

    const uniforms =
    {
        uTime: 0,
        uTexture: texture,
        uClipThreshold: clipThreshold,
        uMask: mask,
        uColor1: color1,
        uColor2: color2,
        uMaskOffset: maskOffset,
        uPanOffset: panOffset,
    }

    useFrame( ( state, delta ) =>
    {
        self.current.uniforms.uTime.value += delta
    })

    const MeshDustMaterial = shaderMaterial( uniforms, vertex, fragment )
    extend( { MeshDustMaterial } )

  return (
    <meshDustMaterial
        key={ MeshDustMaterial.key }
        ref={ self }
        transparent={ true }
        side={ DoubleSide }
        depthTest={ true }
        depthWrite={ false }
        { ... props }
    />
  )
}
