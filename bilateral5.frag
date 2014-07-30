#version 330

// 5x5 �o�C���e�����t�B���^

uniform sampler2DRect image;

layout (location = 0) out vec4 fc;

// ���U
const float variance = 0.05;

// �d�ݕt����f�l�̍��v�Əd�݂̍��v�����߂�
void f(inout vec4 csum, inout vec4 wsum, const in vec4 base, const in vec4 c, const in float w)
{
  vec4 d = c - base;
  vec4 e = exp(-0.5 * d * d / variance) * w;
  csum += c * e;
  wsum += e;
}

// �d�ݕt�����ς����߂�
void main(void)
{
  vec4 csum = texture(image, gl_FragCoord.xy);
  vec4 wsum = vec4(1.0);
  vec4 base = csum;
  
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2(-2, -2)), 0.018315639);
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2(-1, -2)), 0.082084999);
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2( 0, -2)), 0.135335283);
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2( 1, -2)), 0.082084999);
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2( 2, -2)), 0.018315639);
  
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2(-2, -1)), 0.082084999);
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2(-1, -1)), 0.367879441);
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2( 0, -1)), 0.60653066);
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2( 1, -1)), 0.367879441);
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2( 2, -1)), 0.082084999);
  
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2(-2,  0)), 0.135335283);
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2(-1,  0)), 0.60653066);
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2( 1,  0)), 0.60653066);
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2( 2,  0)), 0.135335283);
  
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2(-2,  1)), 0.082084999);
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2(-1,  1)), 0.367879441);
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2( 0,  1)), 0.60653066);
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2( 1,  1)), 0.367879441);
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2( 2,  1)), 0.082084999);
  
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2(-2,  2)), 0.018315639);
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2(-1,  2)), 0.082084999);
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2( 0,  2)), 0.135335283);
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2( 1,  2)), 0.082084999);
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2( 2,  2)), 0.018315639);

  fc = csum / wsum;
}
