function DisplayGL(gl) {
    this.gl = gl;
    this.fragmax = gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS);
    this.max = Math.floor(this.fragmax / 4);
    console.log('Max uniforms: ' + this.fragmax + ', using ' + this.max);
    this.programs = {
        color: new Igloo.Program(gl, 'identity.vert', 'color.frag',
                                 DisplayGL.replacer({MAX: this.max}))
    };
    this.buffers = {
        quad: new Igloo.Buffer(gl, new Float32Array([
                -1, -1, 1, -1, -1, 1, 1, 1
        ])),
        verts: new Float32Array(this.max * 2),
        colors: new Float32Array(this.max)
    };
}
DisplayGL.prototype = Object.create(Display.prototype);
DisplayGL.prototype.constructor = DisplayGL;

DisplayGL.replacer = function(map) {
    var keys = Object.keys(map);
    return function(source) {
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i], regex = new RegExp('%%' + key + '%%', 'g');
            source = source.replace(regex, map[key]);
        }
        return source;
    };
};

DisplayGL.prototype.clear = function() {
    var gl = this.gl;
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(this.gl.COLOR_BUFFER_BIT);
    return this;
};

DisplayGL.prototype.draw = function() {
    var gl = this.gl;

    for (var i = 0; i < this.fragmax; i++) {
        if (i < this.points.length) {
            var p = this.points[i];
            this.buffers.verts[i * 2 + 0] = p.x;
            this.buffers.verts[i * 2 + 1] = 1.0 - p.y;
            this.buffers.colors[i] = (p.r << 16) | (p.g << 8) | (p.b << 0);
        } else {
            this.buffers.verts[i * 2 + 0] = Infinity;
            this.buffers.verts[i * 2 + 1] = Infinity;
            this.buffers.colors[i] = 0;
        }
    }

    this.programs.color.use()
        .attrib('position', this.buffers.quad, 2)
        .uniform('verts', this.buffers.verts, 2)
        .uniform('colors', this.buffers.colors, 1)
        .draw(gl.TRIANGLE_STRIP, 4);
};
