TARGET	= image0
SOURCES	= $(wildcard *.cpp)
HEADERS	= $(wildcard *.h)
OBJECTS	= $(patsubst %.cpp,%.o,$(SOURCES))
CXXFLAGS	= --std=c++0x -Wall -DX11 -I/usr/local/include
LDLIBS	= -lGL -lglfw3 -lXrandr -lXinerama -lXcursor -lXxf86vm -lXi -lX11 -lpthread -lm -lpng -L/usr/local/lib -lopencv_core -lopencv_highgui -lopencv_imgproc

.PHONY: clean

$(TARGET): $(OBJECTS)
	$(LINK.cc) $^ $(LOADLIBES) $(LDLIBS) -o $@

$(TARGET).dep: $(SOURCES) $(HEADERS)
	$(CXX) $(CXXFLAGS) -MM $(SOURCES) > $@

clean:
	-$(RM) $(TARGET) *.o *~ .*~ a.out core

-include $(TARGET).dep
