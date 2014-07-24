#version 330

uniform sampler2DRect image;

layout (location = 0) out vec4 fc;

void main(void)
{
  fc = texture(image, gl_FragCoord.xy);
}
