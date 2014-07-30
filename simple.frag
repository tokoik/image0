#version 330
 
// 5x5 バイラテラルフィルタ
 
uniform sampler2DRect image;
 
layout (location = 0) out vec4 fc;
 
// 分散
const float variance = 0.05;
 
// 重み付き画素値の合計と重みの合計を求める
vec4 f(const in vec4 base, const in vec4 c)
{
  vec4 d = c - base;                      // internal format が GL_RGB なら d.w == 0 のはず
  vec4 e = exp(-0.5 * d * d / variance);  // したがって e.w == 1 のはず
  return c * e;
}
 
// 重み付き平均を求める
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
