uniform float uTime;

in vec2 vUv;

void main()
{

    vec2 uv = vUv;
    float time = uTime;

   

    gl_FragColor = vec4( uv, 0.8, 1.0 );
    
}