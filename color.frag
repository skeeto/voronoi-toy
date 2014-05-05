precision mediump float;

varying vec2 coord;

uniform vec2 verts[%%MAX%%];
uniform int colors[%%MAX%%];

void main() {
    float dist = 1e20;
    int color = 0;
    for (int i = 0; i < %%MAX%%; i++) {
        float dx = verts[i].x - coord.x;
        float dy = verts[i].y - coord.y;
        float newdist = dx * dx + dy * dy;
        if (newdist < dist) {
            color = colors[i];
            dist = newdist;
        }
    }
    float r = mod(float(color) / 65536.0, 256.0) / 255.0;
    float g = mod(float(color) / 256.0,   256.0) / 255.0;
    float b = mod(float(color) / 1.0,     256.0) / 255.0;
    gl_FragColor = vec4(r, g, b, 1.0);
}
