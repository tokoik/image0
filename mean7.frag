#version 330

// 7x7 à⁄ìÆïΩãœÉtÉBÉãÉ^

uniform sampler2DRect image;

layout (location = 0) out vec4 fc;

// ïΩãœÇãÅÇﬂÇÈ
void main()
{
  fc = texture(image, gl_FragCoord.xy);

  fc += textureOffset(image, gl_FragCoord.xy, ivec2(-3, -3));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2(-2, -3));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2(-1, -3));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2( 0, -3));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2( 1, -3));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2( 2, -3));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2( 3, -3));
        
  fc += textureOffset(image, gl_FragCoord.xy, ivec2(-3, -2));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2(-2, -2));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2(-1, -2));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2( 0, -2));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2( 1, -2));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2( 2, -2));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2( 3, -2));
        
  fc += textureOffset(image, gl_FragCoord.xy, ivec2(-3, -1));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2(-2, -1));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2(-1, -1));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2( 0, -1));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2( 1, -1));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2( 2, -1));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2( 3, -1));
        
  fc += textureOffset(image, gl_FragCoord.xy, ivec2(-3,  0));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2(-2,  0));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2(-1,  0));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2( 1,  0));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2( 2,  0));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2( 3,  0));
        
  fc += textureOffset(image, gl_FragCoord.xy, ivec2(-3,  1));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2(-2,  1));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2(-1,  1));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2( 0,  1));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2( 1,  1));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2( 2,  1));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2( 3,  1));
        
  fc += textureOffset(image, gl_FragCoord.xy, ivec2(-3,  2));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2(-2,  2));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2(-1,  2));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2( 0,  2));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2( 1,  2));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2( 2,  2));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2( 3,  2));
        
  fc += textureOffset(image, gl_FragCoord.xy, ivec2(-3,  3));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2(-2,  3));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2(-1,  3));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2( 0,  3));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2( 1,  3));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2( 2,  3));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2( 3,  3));

  fc *= 0.020408163;
}
