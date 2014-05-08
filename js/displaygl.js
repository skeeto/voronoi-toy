function DisplayGL(gl) {
    this.gl = gl;
    var fragmax = gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS);
    this.max = Math.min(128, Math.floor(fragmax / 4));
    console.log('Max uniforms: ' + fragmax + ', using ' + this.max);
    this.programs = {
        color: new Igloo.Program(gl, 'glsl/identity.vert', 'glsl/color.frag',
                                 DisplayGL.replacer({MAX: this.max})),
        points: new Igloo.Program(gl, 'glsl/point.vert', 'glsl/point.frag')
    };
    this.buffers = {
        quad: new Igloo.Buffer(gl, new Float32Array([
                -1, -1, 1, -1, -1, 1, 1, 1
        ])),
        verts: new Float32Array(this.max * 2),
        colors: new Float32Array(this.max * 3),
        points: new Igloo.Buffer(gl, null, gl.STREAM_DRAW),
        dark: new Igloo.Buffer(gl, null, gl.STREAM_DRAW)
    };
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
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

    var selection;
    if (this.selection != null) {
        selection = vec2(this.selection.x, 1 - this.selection.y);
    } else {
        selection = vec2(NaN, NaN); // matches nothing
    }

    var dark = new Float32Array(this.max);
    for (var i = 0; i < this.max; i++) {
        if (i < this.points.length) {
            var p = this.points[i];
            this.buffers.verts[i * 2 + 0] = p.x;
            this.buffers.verts[i * 2 + 1] = 1.0 - p.y;
            this.buffers.colors[i * 3 + 0] = p.r / 255;
            this.buffers.colors[i * 3 + 1] = p.g / 255;
            this.buffers.colors[i * 3 + 2] = p.b / 255;
            dark[i] = p.isDark();
        } else {
            this.buffers.verts[i * 2 + 0] = -1e10;
            this.buffers.verts[i * 2 + 1] = -1e10;
        }
    }
    this.buffers.points.update(this.buffers.verts);
    this.buffers.dark.update(dark);

    this.programs.color.use()
        .attrib('position', this.buffers.quad, 2)
        .uniform('size', vec2(this.gl.canvas.width, this.gl.canvas.height))
        .uniform('verts', this.buffers.verts, 2)
        .uniform('colors', this.buffers.colors, 3)
        .draw(gl.TRIANGLE_STRIP, 4);

    this.programs.points.use()
        .attrib('position', this.buffers.points, 2)
        .attrib('dark', this.buffers.dark, 1)
        .uniform('selection', selection)
        .draw(gl.POINTS, this.points.length);

    return this;
};
