#version 330

// 3x3 �̍ő�l�ƍŏ��l������������

uniform sampler2DRect image;

layout (location = 0) out vec4 fc;

// ��f�l�̍��v�E�ő�l�E�ŏ��l�����߂�
void f(inout vec4 csum, inout vec4 cmin, inout vec4 cmax, const in vec4 c)
{
  csum += c;
  cmax = max(c, cmax);
  cmin = min(c, cmin);
}

// �ő�l�ƍŏ��l���܂܂Ȃ����ς����߂�
void main(void)
{
  vec4 csum = texture(image, gl_FragCoord.xy);
  vec4 cmin = csum;
  vec4 cmax = csum;

  f(csum, cmin, cmax, textureOffset(image, gl_FragCoord.xy, ivec2(-1, -1)));
  f(csum, cmin, cmax, textureOffset(image, gl_FragCoord.xy, ivec2( 0, -1)));
  f(csum, cmin, cmax, textureOffset(image, gl_FragCoord.xy, ivec2( 1, -1)));

  f(csum, cmin, cmax, textureOffset(image, gl_FragCoord.xy, ivec2(-1,  0)));
  f(csum, cmin, cmax, textureOffset(image, gl_FragCoord.xy, ivec2( 1,  0)));

  f(csum, cmin, cmax, textureOffset(image, gl_FragCoord.xy, ivec2(-1,  1)));
  f(csum, cmin, cmax, textureOffset(image, gl_FragCoord.xy, ivec2( 0,  1)));
  f(csum, cmin, cmax, textureOffset(image, gl_FragCoord.xy, ivec2( 1,  1)));

  fc = (csum - cmin - cmax) * 0.14285714;
}
