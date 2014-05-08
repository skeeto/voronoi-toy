precision mediump float;

varying vec2 coord;

uniform vec2 verts[%%MAX%%];
uniform vec3 colors[%%MAX%%];
uniform vec2 size;

void main() {
    float dist = 1e10;
    vec3 color = vec3(1.0, 0.0, 0.0);
    for (int i = 0; i < %%MAX%%; i++) {
        float newdist = distance(verts[i] * size, coord * size);
        if (newdist < dist) {
            color = colors[i];
            dist = newdist;
        }
    }
    gl_FragColor = vec4(color, 1.0);
}
