#version 330

// 5x5 の最大値と最小値を除いた平均

uniform sampler2DRect image;

layout (location = 0) out vec4 fc;

// 画素値の合計・最大値・最小値を求める
void f(inout vec4 csum, inout vec4 cmin, inout vec4 cmax, const in vec4 c)
{
  csum += c;
  cmax = max(c, cmax);
  cmin = min(c, cmin);
}

// 最大値と最小値を含まない平均を求める
void main()
{
  vec4 csum = texture(image, gl_FragCoord.xy);
  vec4 cmin = csum;
  vec4 cmax = csum;

  f(csum, cmin, cmax, textureOffset(image, gl_FragCoord.xy, ivec2(-2, -2)));
  f(csum, cmin, cmax, textureOffset(image, gl_FragCoord.xy, ivec2(-1, -2)));
  f(csum, cmin, cmax, textureOffset(image, gl_FragCoord.xy, ivec2( 0, -2)));
  f(csum, cmin, cmax, textureOffset(image, gl_FragCoord.xy, ivec2( 1, -2)));
  f(csum, cmin, cmax, textureOffset(image, gl_FragCoord.xy, ivec2( 2, -2)));
        
  f(csum, cmin, cmax, textureOffset(image, gl_FragCoord.xy, ivec2(-2, -1)));
  f(csum, cmin, cmax, textureOffset(image, gl_FragCoord.xy, ivec2(-1, -1)));
  f(csum, cmin, cmax, textureOffset(image, gl_FragCoord.xy, ivec2( 0, -1)));
  f(csum, cmin, cmax, textureOffset(image, gl_FragCoord.xy, ivec2( 1, -1)));
  f(csum, cmin, cmax, textureOffset(image, gl_FragCoord.xy, ivec2( 2, -1)));
        
  f(csum, cmin, cmax, textureOffset(image, gl_FragCoord.xy, ivec2(-2,  0)));
  f(csum, cmin, cmax, textureOffset(image, gl_FragCoord.xy, ivec2(-1,  0)));
  f(csum, cmin, cmax, textureOffset(image, gl_FragCoord.xy, ivec2( 1,  0)));
  f(csum, cmin, cmax, textureOffset(image, gl_FragCoord.xy, ivec2( 2,  0)));
        
  f(csum, cmin, cmax, textureOffset(image, gl_FragCoord.xy, ivec2(-2,  1)));
  f(csum, cmin, cmax, textureOffset(image, gl_FragCoord.xy, ivec2(-1,  1)));
  f(csum, cmin, cmax, textureOffset(image, gl_FragCoord.xy, ivec2( 0,  1)));
  f(csum, cmin, cmax, textureOffset(image, gl_FragCoord.xy, ivec2( 1,  1)));
  f(csum, cmin, cmax, textureOffset(image, gl_FragCoord.xy, ivec2( 2,  1)));
        
  f(csum, cmin, cmax, textureOffset(image, gl_FragCoord.xy, ivec2(-2,  2)));
  f(csum, cmin, cmax, textureOffset(image, gl_FragCoord.xy, ivec2(-1,  2)));
  f(csum, cmin, cmax, textureOffset(image, gl_FragCoord.xy, ivec2( 0,  2)));
  f(csum, cmin, cmax, textureOffset(image, gl_FragCoord.xy, ivec2( 1,  2)));
  f(csum, cmin, cmax, textureOffset(image, gl_FragCoord.xy, ivec2( 2,  2)));

  fc = (csum - cmin - cmax) * 0.043478261;
}
