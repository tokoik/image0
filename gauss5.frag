#version 330

// 5x5 ガウシアンフィルタ

uniform sampler2DRect image;

layout (location = 0) out vec4 fc;

// 重み付き平均を求める
void main()
{
  fc = texture(image, gl_FragCoord.xy) * 0.159154943

    + (textureOffset(image, gl_FragCoord.xy, ivec2( 0, -1))
     + textureOffset(image, gl_FragCoord.xy, ivec2( 1,  0))
     + textureOffset(image, gl_FragCoord.xy, ivec2( 0,  1))
     + textureOffset(image, gl_FragCoord.xy, ivec2(-1,  0))) * 0.098320331
        
    + (textureOffset(image, gl_FragCoord.xy, ivec2(-1, -1))
     + textureOffset(image, gl_FragCoord.xy, ivec2( 1, -1))
     + textureOffset(image, gl_FragCoord.xy, ivec2( 1,  1))
     + textureOffset(image, gl_FragCoord.xy, ivec2(-1,  1))) * 0.059634295

    + (textureOffset(image, gl_FragCoord.xy, ivec2( 0, -2))
     + textureOffset(image, gl_FragCoord.xy, ivec2( 2,  0))
     + textureOffset(image, gl_FragCoord.xy, ivec2( 0,  2))
     + textureOffset(image, gl_FragCoord.xy, ivec2(-2,  0))) * 0.021938231

    + (textureOffset(image, gl_FragCoord.xy, ivec2(-1, -2))
     + textureOffset(image, gl_FragCoord.xy, ivec2( 1, -2))
     + textureOffset(image, gl_FragCoord.xy, ivec2( 2, -1))
     + textureOffset(image, gl_FragCoord.xy, ivec2( 2,  1))
     + textureOffset(image, gl_FragCoord.xy, ivec2( 1,  2))
     + textureOffset(image, gl_FragCoord.xy, ivec2(-1,  2))
     + textureOffset(image, gl_FragCoord.xy, ivec2(-2,  1))
     + textureOffset(image, gl_FragCoord.xy, ivec2(-2, -1))) * 0.01330621

    + (textureOffset(image, gl_FragCoord.xy, ivec2(-2, -2))
     + textureOffset(image, gl_FragCoord.xy, ivec2( 2, -2))
     + textureOffset(image, gl_FragCoord.xy, ivec2( 2,  2))
     + textureOffset(image, gl_FragCoord.xy, ivec2(-2,  2))) * 0.002969017;
}
