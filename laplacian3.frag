#version 330

// 3x3 ƒ‰ƒvƒ‰ƒVƒAƒ“

uniform sampler2DRect image;

layout (location = 0) out vec4 fc;

void main(void)
{
  fc = texture(image, gl_FragCoord.xy) * 4.0
     - textureOffset(image, gl_FragCoord.xy, ivec2( 1,  0))
     - textureOffset(image, gl_FragCoord.xy, ivec2(-1,  0))
     - textureOffset(image, gl_FragCoord.xy, ivec2( 0,  1))
     - textureOffset(image, gl_FragCoord.xy, ivec2( 0, -1));
}
