#version 330

// 3x3 の中間値

uniform sampler2DRect image;

layout (location = 0) out vec4 fc;

// 二値の並べ替え
void s2(inout vec4 a, inout vec4 b)
{
  vec4 t = a;
  a = min(t, b);
  b = max(t, b);
}

// 三値の並べ替え
void s3(inout vec4 a, inout vec4 b, inout vec4 c)
{
  s2(a, b);
  s2(a, c);
  s2(b, c);
}

void main(void)
{
  vec4 h[9] = vec4[]
  (
    textureOffset(image, gl_FragCoord.xy, ivec2(-1, -1)),
    textureOffset(image, gl_FragCoord.xy, ivec2( 0, -1)),
    textureOffset(image, gl_FragCoord.xy, ivec2( 1, -1)),
    
    textureOffset(image, gl_FragCoord.xy, ivec2(-1,  0)),
    texture(image, gl_FragCoord.xy),
    textureOffset(image, gl_FragCoord.xy, ivec2( 1,  0)),
    
    textureOffset(image, gl_FragCoord.xy, ivec2(-1,  1)),
    textureOffset(image, gl_FragCoord.xy, ivec2( 0,  1)),
    textureOffset(image, gl_FragCoord.xy, ivec2( 1,  1))
  );
  
  s3(h[0], h[1], h[2]);
  s3(h[3], h[4], h[5]);
  s3(h[6], h[7], h[8]);
  
  s3(h[0], h[3], h[6]);
  s3(h[1], h[4], h[7]);
  s3(h[2], h[5], h[8]);
  
  s3(h[1], h[2], h[3]);
  s3(h[5], h[6], h[7]);
  
  s3(h[3], h[4], h[5]);

  fc = h[4];
}
