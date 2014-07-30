#version 330
 
// 5x5 �o�C���e�����t�B���^
 
uniform sampler2DRect image;
 
layout (location = 0) out vec4 fc;
 
// ���U
const float variance = 0.05;
 
// �d�ݕt����f�l�̍��v�Əd�݂̍��v�����߂�
vec4 f(const in vec4 base, const in vec4 c)
{
  vec4 d = c - base;                      // internal format �� GL_RGB �Ȃ� d.w == 0 �̂͂�
  vec4 e = exp(-0.5 * d * d / variance);  // ���������� e.w == 1 �̂͂�
  return c * e;
}
 
// �d�ݕt�����ς����߂�
void main(void)
{
  vec4 csum = texture(image, gl_FragCoord.xy);
  vec4 base = csum;

  csum += (f(base, textureOffset(image, gl_FragCoord.xy, ivec2( 0, -1)))
         + f(base, textureOffset(image, gl_FragCoord.xy, ivec2(-1,  0)))
         + f(base, textureOffset(image, gl_FragCoord.xy, ivec2( 1,  0)))
         + f(base, textureOffset(image, gl_FragCoord.xy, ivec2( 0,  1)))) * 0.60653066;

  csum += (f(base, textureOffset(image, gl_FragCoord.xy, ivec2( 1, -1)))
         + f(base, textureOffset(image, gl_FragCoord.xy, ivec2(-1, -1)))
         + f(base, textureOffset(image, gl_FragCoord.xy, ivec2(-1,  1)))
         + f(base, textureOffset(image, gl_FragCoord.xy, ivec2( 1,  1)))) * 0.367879441;

  csum += (f(base, textureOffset(image, gl_FragCoord.xy, ivec2( 0, -2)))
         + f(base, textureOffset(image, gl_FragCoord.xy, ivec2(-2,  0)))
         + f(base, textureOffset(image, gl_FragCoord.xy, ivec2( 2,  0)))
         + f(base, textureOffset(image, gl_FragCoord.xy, ivec2( 0,  2)))) * 0.135335283;

  csum += (f(base, textureOffset(image, gl_FragCoord.xy, ivec2(-1, -2))) * 0.082084999;
         + f(base, textureOffset(image, gl_FragCoord.xy, ivec2( 1, -2))) * 0.082084999;
  csum +f(base, textureOffset(image, gl_FragCoord.xy, ivec2(-2, -1))) * 0.082084999;
  csum += f(base, textureOffset(image, gl_FragCoord.xy, ivec2( 2, -1))) * 0.082084999;
  csum += f(base, textureOffset(image, gl_FragCoord.xy, ivec2(-2,  1))) * 0.082084999;
  csum += f(base, textureOffset(image, gl_FragCoord.xy, ivec2( 2,  1))) * 0.082084999;
  csum += f(base, textureOffset(image, gl_FragCoord.xy, ivec2(-1,  2))) * 0.082084999;
  csum += f(base, textureOffset(image, gl_FragCoord.xy, ivec2( 1,  2))) * 0.082084999;

  csum += (f(base, textureOffset(image, gl_FragCoord.xy, ivec2(-2, -2)))
         + f(base, textureOffset(image, gl_FragCoord.xy, ivec2( 2, -2)))
         + f(base, textureOffset(image, gl_FragCoord.xy, ivec2(-2,  2)))
         + f(base, textureOffset(image, gl_FragCoord.xy, ivec2( 2,  2)))) * 0.018315639;

  fc = csum / csum.w;
}
