import { shaderMaterial, useTexture } from "@react-three/drei"
import { extend, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Color, DoubleSide, RepeatWrapping, Vector2 } from "three"
import vertex from '../shaders/vertex.glsl'
import fragment from '../shaders/fragment.glsl'


export default function MeshTowerMaterial({
    noiseTexture = './textures/noiseVoronoi2.png',
    frontColorIntensity = 1,
    backColorIntensity = 1,
    rimColorIntensity = 1,
    movementDirection = new Vector2( 0.1, 0.0 ),
    skewAmount = new Vector2( 1.0, 1.0 ),
    tileAmount = new Vector2( 1.0, 1.0 ),
    tile = false,
    skew = false,
    rimLighting = false,
    rimOnly = false,
    rimDensity = 1,
    colorRim = '#ffffff',
    colorFront = '#ffffff',
    colorBack = '#000000',
    clipThreshold = 0.5,
    clip = false,
    flat = false,
    backColored = false,
    noise = true,
    darken = false,
    darkenAmt = 1.5
}, props) 
{

    const self = useRef()

    noiseTexture = useTexture( noiseTexture )
    noiseTexture.wrapT = RepeatWrapping
    noiseTexture.wrapS = RepeatWrapping

    movementDirection = ( movementDirection instanceof Vector2 ) ? movementDirection : new Vector2( 1.0, 0.0 )
    skewAmount = ( skewAmount instanceof Vector2 ) ? skewAmount : new Vector2( 1.0, 1.0 )
    tileAmount = ( tileAmount instanceof Vector2 ) ? tileAmount : new Vector2( 1.0, 1.0 )

    colorRim = new Color( colorRim ).multiplyScalar( rimColorIntensity )
    colorFront = new Color( colorFront ).multiplyScalar( frontColorIntensity )
    colorBack = new Color( colorBack ).multiplyScalar( backColorIntensity )

    const uniforms =
    {
        uTime: 0,
        uNoise: noiseTexture,
        uTimeOffset: movementDirection,
        uSkewOffset: skewAmount,
        uTileOffset: tileAmount,
        uTile: tile,
        uSkew: skew,
        uRimLighting: rimLighting,
        uRimColor: colorRim,
        uFresnelDensity: rimDensity,
        uColor1: colorFront,
        uColor2: colorBack,
        uRimOnly: rimOnly,
        uClipThreshold: clipThreshold, // amount to clip by
        uClip: clip, // define is clipping is enabled
        uFlat: flat, // define if we use step or not
        uColorBoth: backColored,
        uApplyNoise: noise,
        uDarken: darken,
        uDarkenAmt: darkenAmt,
    }

    useFrame( ( state, delta ) =>
    {

        self.current.uniforms.uTime.value += delta

    })

    const MeshTowerMaterial = shaderMaterial( uniforms, vertex, fragment )
    extend( { MeshTowerMaterial } )

     return (
        <meshTowerMaterial
            key={ MeshTowerMaterial.key }
            ref={ self }
            trasparent={ true }
            side={ DoubleSide }
            { ... props }
        />
    )
}
