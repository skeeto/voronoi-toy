precision mediump float;

varying vec2 coord;

uniform vec2 verts[%%MAX%%];
uniform float colors[%%MAX%%];
uniform vec2 size;

void main() {
    float dist = 1e20, color = 0.0;
    for (int i = 0; i < %%MAX%%; i++) {
        float newdist = distance(verts[i] * size, coord * size);
        if (newdist < dist) {
            color = colors[i];
            dist = newdist;
        }
    }
    float r = mod(color / 65536.0, 256.0) / 255.0;
    float g = mod(color / 256.0,   256.0) / 255.0;
    float b = mod(color / 1.0,     256.0) / 255.0;
    gl_FragColor = vec4(r, g, b, 1.0);
}
