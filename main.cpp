#include <iostream>
#include <cstdlib>
#include <opencv2/highgui/highgui.hpp>
#ifdef _WIN32
#  define CV_VERSION_STR CVAUX_STR(CV_MAJOR_VERSION) CVAUX_STR(CV_MINOR_VERSION) CVAUX_STR(CV_SUBMINOR_VERSION)
#  ifdef _DEBUG
#    define CV_EXT_STR "d.lib"
#  else
#    define CV_EXT_STR ".lib"
#  endif
#  pragma comment(lib, "opencv_core" CV_VERSION_STR CV_EXT_STR)
#  pragma comment(lib, "opencv_highgui" CV_VERSION_STR CV_EXT_STR)
#endif

// �⏕�v���O����
#include "gg.h"
using namespace gg;

//
// �E�B���h�E�֘A�̏���
//
class Window
{
  // �E�B���h�E�̎��ʎq
  GLFWwindow *const window;

  // �������e�ϊ��s��
  GgMatrix mp;
  
  // �^�C�v�����L�[
  int key;
  
public:

  // �R���X�g���N�^
  Window(const char *title = "Game Graphics", int width = 640, int height = 480)
    : window(glfwCreateWindow(width, height, title, NULL, NULL)), key(0)
  {
    if (window == NULL)
    {
      // �E�B���h�E���쐬�ł��Ȃ�����
      std::cerr << "Can't create GLFW window." << std::endl;
      exit(1);
    }

    // ���݂̃E�B���h�E�������Ώۂɂ���
    glfwMakeContextCurrent(window);

    // �쐬�����E�B���h�E�ɑ΂���ݒ�
    glfwSwapInterval(1);

    // �Q�[���O���t�B�b�N�X���_�̓s���ɂ��ƂÂ�������
    ggInit();

    // ���̃C���X�^���X�� this �|�C���^���L�^���Ă���
    glfwSetWindowUserPointer(window, this);

    // �L�[�{�[�h���쎞�ɌĂяo�������̓o�^
    glfwSetKeyCallback(window, keyboard);
    
    // �E�B���h�E�̃T�C�Y�ύX���ɌĂяo��������o�^����
    glfwSetFramebufferSizeCallback(window, resize);
    
    // �E�B���h�E�̐ݒ������������
    resize(window, width, height);
  }

  // �f�X�g���N�^
  virtual ~Window()
  {
    glfwDestroyWindow(window);
  }

  // �E�B���h�E�����ׂ����𔻒肷��
  int shouldClose() const
  {
    return glfwWindowShouldClose(window) | glfwGetKey(window, GLFW_KEY_ESCAPE);
  }

  // �J���[�o�b�t�@�����ւ��ăC�x���g�����o��
  void swapBuffers()
  {
    // �J���[�o�b�t�@�����ւ���
    glfwSwapBuffers(window);

    // OpenGL �̃G���[���`�F�b�N����
    ggError("SwapBuffers");

    // �C�x���g�����o��
    glfwPollEvents();
  }

  // �L�[�{�[�h���쎞�̏���
  static void keyboard(GLFWwindow *window, int key, int scancode, int action, int mods)
  {
    if (action == GLFW_PRESS)
    {
      // ���̃C���X�^���X�� this �|�C���^�𓾂�
      Window *const instance(static_cast<Window *>(glfwGetWindowUserPointer(window)));
      
      if (instance != NULL)
      {
        instance->key = key;
      }
    }
  }
  
  // �E�B���h�E�̃T�C�Y�ύX���̏���
  static void resize(GLFWwindow *window, int width, int height)
  {
    // �E�B���h�E�S�̂��r���[�|�[�g�ɂ���
    glViewport(0, 0, width, height);
    
    // ���̃C���X�^���X�� this �|�C���^�𓾂�
    Window *const instance(static_cast<Window *>(glfwGetWindowUserPointer(window)));
    
    if (instance != NULL)
    {
      // �������e�ϊ��s������߂�i�A�X�y�N�g�� w / h�j
      instance->mp.loadPerspective(0.5f, (float)width / (float)height, 1.0f, 20.0f);
    }
  }
  
  // ���e�ϊ��s������o��
  const GgMatrix &getMp() const
  {
    return mp;
  }
  
  // �L�[�����o��
  int getKey() const
  {
    return key;
  }
};

//
// �v���O�����I�����̏���
//
static void cleanup()
{
  // GLFW �̏I������
  glfwTerminate();
}

//
// ���C���v���O����
//
int main()
{
  // OpenCV �ɂ��r�f�I�L���v�`��������������
  cv::VideoCapture camera(CV_CAP_ANY);
  if (!camera.isOpened())
  {
    std::cerr << "cannot open input" << std::endl;
    exit(1);
  }
  
  // �J�����̏����ݒ�
  camera.grab();
  const GLsizei capture_width(GLsizei(camera.get(CV_CAP_PROP_FRAME_WIDTH)));
  const GLsizei capture_height(GLsizei(camera.get(CV_CAP_PROP_FRAME_HEIGHT)));
  
  // GLFW ������������
  if (glfwInit() == GL_FALSE)
  {
    // �������Ɏ��s����
    std::cerr << "Can't initialize GLFW" << std::endl;
    return 1;
  }

  // �v���O�����I�����̏�����o�^����
  atexit(cleanup);

  // OpenGL Version 3.3 Core Profile ��I������
  glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
  glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);
  glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GL_TRUE);
  glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);

  // �E�B���h�E���쐬����
  Window window("Image Processing Sample", capture_width, capture_height);

  // �w�i�F���w�肷��
  glClearColor(1.0f, 1.0f, 1.0f, 0.0f);
  
  // ���_�z��I�u�W�F�N�g
  GLuint vao;
  glGenVertexArrays(1, &vao);
  glBindVertexArray(vao);
  
  // ���_�o�b�t�@�I�u�W�F�N�g
  GLuint vbo;
  glGenBuffers(1, &vbo);
  glBindBuffer(GL_ARRAY_BUFFER, vbo);
  
  // �}�`�̓ǂݍ���
  static const GLfloat position[][2] =
  {
    { -1.0f, -1.0f },
    {  1.0f, -1.0f },
    {  1.0f,  1.0f },
    { -1.0f,  1.0f }
  };
  static const int vertices(sizeof position / sizeof position[0]);
  glBufferData(GL_ARRAY_BUFFER, sizeof position, position, GL_STATIC_DRAW);
  glVertexAttribPointer(0, 2, GL_FLOAT, GL_FALSE, 0, 0);
  glEnableVertexAttribArray(0);
  
  // �e�N�X�`������������
  GLuint image;
  glGenTextures(1, &image);
  glBindTexture(GL_TEXTURE_RECTANGLE, image);
  glTexImage2D(GL_TEXTURE_RECTANGLE, 0, GL_RGBA, capture_width, capture_height, 0, GL_BGR, GL_UNSIGNED_BYTE, NULL);
  glTexParameteri(GL_TEXTURE_RECTANGLE, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
  glTexParameteri(GL_TEXTURE_RECTANGLE, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
  glTexParameteri(GL_TEXTURE_RECTANGLE, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_BORDER);
  glTexParameteri(GL_TEXTURE_RECTANGLE, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_BORDER);

  // �v���O�����I�u�W�F�N�g�̍쐬
  const GLuint program(ggLoadShader("simple.vert", "simple.frag"));

  // uniform �ϐ��̃C���f�b�N�X�̌����i������Ȃ���� -1�j
  const GLuint imageLoc(glGetUniformLocation(program, "image"));
  
  // �E�B���h�E���J���Ă���ԌJ��Ԃ�
  while (window.shouldClose() == GL_FALSE)
  {
    glBindTexture(GL_TEXTURE_RECTANGLE, image);

    if (camera.grab())
    {
      // �L���v�`���f������摜��؂�o��
      cv::Mat frame;
      camera.retrieve(frame, 3);

      // �؂�o�����摜���e�N�X�`���ɓ]������
      cv::Mat flipped;
      cv::flip(frame, flipped, 0);
      glTexSubImage2D(GL_TEXTURE_RECTANGLE, 0, 0, 0, frame.cols, flipped.rows, GL_BGR, GL_UNSIGNED_BYTE, flipped.data);
    }

    // �V�F�[�_�v���O�����̎g�p�J�n
    glUseProgram(program);
    
    // uniform �T���v���̎w��
    glUniform1i(imageLoc, 0);
    
    // �e�N�X�`�����j�b�g�ƃe�N�X�`���̎w��
    glActiveTexture(GL_TEXTURE0);
    glBindTexture(GL_TEXTURE_RECTANGLE, image);
    
    // �`��Ɏg�����_�z��I�u�W�F�N�g�̎w��
    glBindVertexArray(vao);
    
    // �}�`�̕`��
    glDrawArrays(GL_TRIANGLE_FAN, 0, vertices);
    
    // ���_�z��I�u�W�F�N�g�̎w�����
    glBindVertexArray(0);
    
    // �V�F�[�_�v���O�����̎g�p�I��
    glUseProgram(0);

    // �J���[�o�b�t�@�����ւ��ăC�x���g�����o��
    window.swapBuffers();
  }
}
