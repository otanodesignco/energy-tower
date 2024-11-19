uniform float uTime;
uniform sampler2D uNoise;
uniform vec2 uTimeOffset;
uniform vec2 uSkewOffset;
uniform vec2 uTileOffset;
uniform bool uTile;
uniform bool uSkew;
uniform bool uRimLighting;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uRimColor;
uniform bool uRimOnly;
uniform float uFresnelDensity;
uniform float uClipThreshold;
uniform bool uClip;
uniform bool uFlat;
uniform bool uColorBoth;
uniform bool uApplyNoise;
uniform bool uDarken;
uniform float uDarkenAmt;

in vec2 vUv;
in vec3 worldNormals;
in vec3 viewDirection;
in vec3 worldPosition;

#include ./uv/tileOffset.glsl
#include ./uv/uvPan.glsl
#include ./uv/uvSkew.glsl
#include ./lighting/lightingRim.glsl
#include ./util/clip.glsl

void main()
{

    vec2 uv = vUv;
    float time = uTime;

    vec2 uvPanned = uv;

    if( uTile )
    {
        uvPanned = tileOffset( uvPanned, uTileOffset, uTimeOffset * time, false );
    }

    if( uSkew )
    {
        uvPanned = uvSkew( uvPanned, uSkewOffset, false );
    }
    

    float noise = texture( uNoise, uvPanned ).r;

    float fresnel = lightingRim( worldNormals, viewDirection, uFresnelDensity, true );
    vec3 colorFresnel = uRimColor;
    colorFresnel *= fresnel;


    vec3 color = uColor1;

    // handle backface coloring
    if( uColorBoth )
    {
        color = ( gl_FrontFacing ) ? uColor1 : uColor2;
    }

    // handle step for flat shading
    noise = ( uFlat ) ? step( uClipThreshold,noise  ) : noise;

    noise = ( uDarken ) ? pow( noise, uDarkenAmt ) : noise;

    if( !uApplyNoise )
    {
        color = mix( color, uColor2, noise );
    }

    vec4 colorFinal = vec4( color, 1.0 );

    if( uRimLighting )
    {

        if( uRimOnly )
        {
            colorFinal = vec4( colorFresnel, 1.0 * fresnel );
        }
        else
        {
            colorFinal.rgb = mix( colorFinal.rgb, colorFresnel, fresnel );
        }
    }



    // handle clipping if enabled
    if( uClip )
    {
        clip( noise, uClipThreshold, 0 );
    } 

    gl_FragColor = colorFinal;

    #include <tonemapping_fragment>
    #include <colorspace_fragment>

}