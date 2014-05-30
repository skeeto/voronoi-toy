precision mediump float;

uniform vec2 selection;

attribute vec2 position;
attribute float dark;

varying float vdark, selected;

void main() {
    gl_Position = vec4(position * 2.0 - 1.0, -1.0, 1.0);
    vdark = dark;
    if (selection.x == position.x && selection.y == position.y) {
        gl_PointSize = 12.0;
        selected = 1.0;
    } else {
        gl_PointSize = 6.0;
        selected = 0.0;
    }
}
