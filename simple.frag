#version 330

// ‰½‚à‚µ‚È‚¢

uniform sampler2DRect color;

layout (location = 0) out vec4 fc;

void main(void)
{
  fc = texture(color, gl_FragCoord.xy);
}
