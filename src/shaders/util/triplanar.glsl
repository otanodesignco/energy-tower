// worldPos and normal should be in world space

vec4 triplanar( sampler2D tex, vec3 worldPos, vec3 normal, float scale) 
{

    vec3 blend = abs(normal);
    blend = blend / (blend.x + blend.y + blend.z);
    
    worldPos *= scale;
    
    vec4 xAxis = texture(tex, worldPos.yz);
    vec4 yAxis = texture(tex, worldPos.xz);
    vec4 zAxis = texture(tex, worldPos.xy);
    
    return xAxis * blend.x + yAxis * blend.y + zAxis * blend.z;

}