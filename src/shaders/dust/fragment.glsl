uniform float uTime;
uniform sampler2D uTexture;
uniform float uClipThreshold;
uniform bool uMask;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec2 uMaskOffset;
uniform int uMaskDir;
uniform vec2 uPanOffset;

in vec2 vUv;

#include ../uv/uvPan.glsl

void main()
{

    vec2 uv = vUv;
    float time = uTime;

    vec2 uvPanned = uvPan( uv, time, uPanOffset, false, false );

     float texture = texture( uTexture, uvPanned ).r;
    texture = 1.0 - smoothstep( 0.0, uClipThreshold, texture );

    float mask = 1.0;

    float maskDir = uv.y;

    switch( uMaskDir )
    {

        case 0:
            maskDir = uv.y;
        break;

        case 1:
            maskDir = uv.x;
        break;

        default:
            maskDir = uv.y;
        break;

    }

    vec3 color = uColor1;
    color *= texture;

    vec4 colorFinal = vec4( color, 1.0 );
    colorFinal.a *= texture;

    colorFinal.rgb = mix( colorFinal.rgb, uColor2, maskDir );

    float maskTop = smoothstep( 0.0, 0.1, maskDir );

    colorFinal.a *= maskTop;

    if( uMask )
    {
        mask = smoothstep( uMaskOffset.x, uMaskOffset.y, maskDir );
        colorFinal.a *= mask;
    }

    gl_FragColor = colorFinal;
    
}