#version 330

layout (location = 0) in vec4 pv;

void main()
{
  gl_Position = pv;
}
