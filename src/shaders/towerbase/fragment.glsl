uniform float uTime;
uniform sampler2D uNoiseTexture;
uniform vec3 uColor1;
uniform vec3 uColor2;

in vec2 vUv;

#include ../uv/polarCoords.glsl
#include ../uv/uvPan.glsl

void main()
{

    vec2 uv = vUv;
    float time = uTime;
    vec2 uvCenter = uv - 0.5;

    vec2 uvPolar = polarCoords( uv );

    vec2 uvOffset = vec2( 5.0, 0.5 );

    uvPolar *= uvOffset;

    uvPolar = uvPan( uvPolar, time, vec2( 0.02, 0.6 ), false, false );


    float maskInner = smoothstep( 0.0, 0.4, length( uvCenter ) );
    maskInner = pow( maskInner, 3.0 );
    float maskOuter = smoothstep( 0.0, 0.5, length( uvCenter ) );
    maskOuter = pow( maskOuter, 5.0);
    float maskAlpha = 1.0 - smoothstep( 1.0, 0.8, length( uvCenter ) );

    float noiseTexture = texture( uNoiseTexture, uvPolar ).r;

    float mask = smoothstep( 0.1, 0.52, length( uvCenter ) );
    mask = pow( mask, 1.0 );
    mask = 1.0 - mask;

    noiseTexture = pow( noiseTexture, 1.2 );

    float noise = noiseTexture * maskInner;

    noise += maskOuter;
    noise += maskAlpha;

    noise = pow( noise, 4.0 );

    vec3 color = uColor1;
    color = mix( uColor2, color * 1.8, noise );

    vec4 colorFinal = vec4( color, mask * maskInner );

    gl_FragColor = colorFinal;

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    
}