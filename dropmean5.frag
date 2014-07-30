#version 330

// 5×5 の閾値未満を除いた平均

uniform sampler2DRect image;

layout (location = 0) out vec4 fc;

// 閾値
const float threshold = 0.2;

// 閾値処理
vec4 f(const in vec4 c)
{
  // internal format が GL_RGB なので a には必ず 1 が入っている
  return c * step(threshold * 3.0, c.r + c.g + c.b);
}

// 閾値未満を含まない平均を求める
void main(void)
{
  vec4 csum = f(texture(image, gl_FragCoord.xy));
  
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2(-2, -2)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2(-1, -2)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 0, -2)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 1, -2)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 2, -2)));
  
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2(-2, -1)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2(-1, -1)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 0, -1)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 1, -1)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 2, -1)));
  
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2(-2,  0)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2(-1,  0)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 1,  0)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 2,  0)));
  
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2(-2,  1)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2(-1,  1)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 0,  1)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 1,  1)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 2,  1)));
  
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2(-2,  2)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2(-1,  2)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 0,  2)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 1,  2)));
  csum += f(textureOffset(image, gl_FragCoord.xy, ivec2( 2,  2)));
  
  fc = csum.a > 0.0 ? csum / csum.a : vec4(1.0, 0.0, 0.0, 0.0);
}
