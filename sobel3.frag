#version 330

// 3x3 É\Å[ÉxÉã

uniform sampler2DRect image;

layout (location = 0) out vec4 fc;

void main(void)
{
  vec4 dx = textureOffset(image, gl_FragCoord.xy, ivec2( 1, -1))
          - textureOffset(image, gl_FragCoord.xy, ivec2(-1, -1))
          + textureOffset(image, gl_FragCoord.xy, ivec2( 1,  0)) * 2.0
          - textureOffset(image, gl_FragCoord.xy, ivec2(-1,  0)) * 2.0
          + textureOffset(image, gl_FragCoord.xy, ivec2( 1,  1))
          - textureOffset(image, gl_FragCoord.xy, ivec2(-1,  1));
  
  vec4 dy = textureOffset(image, gl_FragCoord.xy, ivec2(-1,  1))
          - textureOffset(image, gl_FragCoord.xy, ivec2(-1, -1))
          + textureOffset(image, gl_FragCoord.xy, ivec2( 0,  1)) * 2.0
          - textureOffset(image, gl_FragCoord.xy, ivec2( 0, -1)) * 2.0
          + textureOffset(image, gl_FragCoord.xy, ivec2( 1,  1))
          - textureOffset(image, gl_FragCoord.xy, ivec2( 1, -1));

  fc = sqrt(dx * dx + dy * dy) * 0.5;
}
