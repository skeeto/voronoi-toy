precision mediump float;

attribute vec3 vert;
uniform vec3 position;

void main() {
    gl_Position = vec4(vert + position, 1.0);
}
