precision mediump float;

attribute vec3 vert;
attribute vec2 position;
attribute vec3 color;

varying vec3 vcolor;

void main() {
    vcolor = color;
    vec3 offset = vec3(position * 2.0 - 1.0, 0.0);
    gl_Position = vec4(vert + offset, 1.0);
}
