precision mediump float;

attribute vec2 position;

uniform vec2 selection;

void main() {
    gl_Position = vec4(position * 2.0 - 1.0, 0.0, 1.0);
    if (selection.x == position.x && selection.y == position.y) {
        gl_PointSize = 12.0;
    } else {
        gl_PointSize = 6.0;
    }
}
