#version 330

// 5x5 のガウスフィルタの微分

uniform sampler2DRect image;

layout (location = 0) out vec4 fc;

// 重み付き平均を求める
void main()
{
  vec4 dx = (textureOffset(image, gl_FragCoord.xy, ivec2( 1,  0))
           - textureOffset(image, gl_FragCoord.xy, ivec2(-1,  0))) * 0.196640663
        
          + (textureOffset(image, gl_FragCoord.xy, ivec2( 1,  1))
           + textureOffset(image, gl_FragCoord.xy, ivec2( 1, -1))
           - textureOffset(image, gl_FragCoord.xy, ivec2(-1,  1))
           - textureOffset(image, gl_FragCoord.xy, ivec2(-1, -1))) * 0.119268591

          + (textureOffset(image, gl_FragCoord.xy, ivec2( 2,  0))
           - textureOffset(image, gl_FragCoord.xy, ivec2(-2,  0))) * 0.043876463

          + (textureOffset(image, gl_FragCoord.xy, ivec2( 1,  2))
           - textureOffset(image, gl_FragCoord.xy, ivec2(-1,  2))
           + textureOffset(image, gl_FragCoord.xy, ivec2( 1, -2))
           - textureOffset(image, gl_FragCoord.xy, ivec2(-1, -2))
           + textureOffset(image, gl_FragCoord.xy, ivec2( 2,  1))
           - textureOffset(image, gl_FragCoord.xy, ivec2(-2,  1))
           + textureOffset(image, gl_FragCoord.xy, ivec2( 2, -1))
           - textureOffset(image, gl_FragCoord.xy, ivec2(-2, -1))) * 0.02661242

          + (textureOffset(image, gl_FragCoord.xy, ivec2( 2,  2))
           - textureOffset(image, gl_FragCoord.xy, ivec2(-2,  2))
           + textureOffset(image, gl_FragCoord.xy, ivec2( 2, -2))
           - textureOffset(image, gl_FragCoord.xy, ivec2(-2, -2))) * 0.005938033;

  vec4 dy = (textureOffset(image, gl_FragCoord.xy, ivec2( 0,  1))
           - textureOffset(image, gl_FragCoord.xy, ivec2( 0, -1))) * 0.196640663
        
          + (textureOffset(image, gl_FragCoord.xy, ivec2( 1,  1))
           - textureOffset(image, gl_FragCoord.xy, ivec2( 1, -1))
           + textureOffset(image, gl_FragCoord.xy, ivec2(-1,  1))
           - textureOffset(image, gl_FragCoord.xy, ivec2(-1, -1))) * 0.119268591

          + (textureOffset(image, gl_FragCoord.xy, ivec2( 0,  2))
           - textureOffset(image, gl_FragCoord.xy, ivec2( 0, -2))) * 0.043876463

          + (textureOffset(image, gl_FragCoord.xy, ivec2( 1,  2))
           - textureOffset(image, gl_FragCoord.xy, ivec2( 1, -2))
           + textureOffset(image, gl_FragCoord.xy, ivec2(-1,  2))
           - textureOffset(image, gl_FragCoord.xy, ivec2(-1, -2))
           + textureOffset(image, gl_FragCoord.xy, ivec2( 2,  1))
           - textureOffset(image, gl_FragCoord.xy, ivec2( 2, -1))
           + textureOffset(image, gl_FragCoord.xy, ivec2(-2,  1))
           - textureOffset(image, gl_FragCoord.xy, ivec2(-2, -1))) * 0.02661242

          + (textureOffset(image, gl_FragCoord.xy, ivec2( 2,  2))
           - textureOffset(image, gl_FragCoord.xy, ivec2( 2, -2))
           + textureOffset(image, gl_FragCoord.xy, ivec2(-2,  2))
           - textureOffset(image, gl_FragCoord.xy, ivec2(-2, -2))) * 0.005938033;

  fc = sqrt(dx * dx + dy * dy);
}
