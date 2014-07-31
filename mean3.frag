#version 330

// 3x3 ˆÚ“®•½‹ÏƒtƒBƒ‹ƒ^

uniform sampler2DRect image;

layout (location = 0) out vec4 fc;

// •½‹Ï‚ğ‹‚ß‚é
void main()
{
  fc = texture(image, gl_FragCoord.xy);

  fc += textureOffset(image, gl_FragCoord.xy, ivec2(-1, -1));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2( 0, -1));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2( 1, -1));

  fc += textureOffset(image, gl_FragCoord.xy, ivec2(-1,  0));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2( 1,  0));

  fc += textureOffset(image, gl_FragCoord.xy, ivec2(-1,  1));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2( 0,  1));
  fc += textureOffset(image, gl_FragCoord.xy, ivec2( 1,  1));

  fc *= 0.11111111;
}
