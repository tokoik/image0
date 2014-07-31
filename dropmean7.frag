#version 330

// 7x7 ��臒l����������������

uniform sampler2DRect image;

layout (location = 0) out vec4 fc;

// 臒l
const float threshold = 0.2;

// 臒l����
vec4 f(const in vec4 c)
{
  // internal format �� GL_RGB �Ȃ� c.a �ɂ͕K�� 1 �������Ă���
  return c * step(threshold * 3.0, c.r + c.g + c.b);
}

// 臒l�������܂܂Ȃ����ς����߂�
void main()
{
  vec4 csum = f(texture(image, gl_FragCoord.xy));
  
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2(-3, -3)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2(-2, -3)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2(-1, -3)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 0, -3)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 1, -3)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 2, -3)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 3, -3)));
  
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2(-3, -2)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2(-2, -2)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2(-1, -2)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 0, -2)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 1, -2)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 2, -2)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 3, -2)));
  
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2(-3, -1)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2(-2, -1)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2(-1, -1)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 0, -1)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 1, -1)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 2, -1)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 3, -1)));
  
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2(-3,  0)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2(-2,  0)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2(-1,  0)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 1,  0)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 2,  0)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 3,  0)));
  
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2(-3,  1)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2(-2,  1)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2(-1,  1)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 0,  1)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 1,  1)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 2,  1)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 3,  1)));
  
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2(-3,  2)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2(-2,  2)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2(-1,  2)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 0,  2)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 1,  2)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 2,  2)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 3,  2)));
  
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2(-3,  3)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2(-2,  3)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2(-1,  3)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 0,  3)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 1,  3)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 2,  3)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 3,  3)));
  
  fc = csum.a > 0.0 ? csum / csum.a : vec4(1.0, 0.0, 0.0, 0.0);
}
