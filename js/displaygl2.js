function DisplayGL2(gl, resolution) {
    this.gl = gl;
    this.resolution = resolution = resolution || 63;

    var cone = [0, 0, -1.0];
    for (var i = 0; i < resolution; i++) {
        var v = i / (resolution - 1) * Math.PI * 2;
        cone.push(Math.cos(v) * Math.sqrt(2) * 2);
        cone.push(Math.sin(v) * Math.sqrt(2) * 2);
        cone.push(1.0);
    }

    this.programs = {
        cone: new Igloo.Program(gl, 'glsl/cone.vert', 'glsl/cone.frag'),
        points: new Igloo.Program(gl, 'glsl/point.vert', 'glsl/point.frag')
    };
    this.buffers = {
        cone: new Igloo.Buffer(gl, new Float32Array(cone)),
        points: new Igloo.Buffer(gl, null, gl.STREAM_DRAW),
        dark: new Igloo.Buffer(gl, null, gl.STREAM_DRAW)
    };
    gl.enable(gl.BLEND);
    gl.enable(gl.DEPTH_TEST);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
}
DisplayGL2.prototype = Object.create(Display.prototype);
DisplayGL2.prototype.constructor = DisplayGL2;

DisplayGL2.prototype.clear = function() {
    var gl = this.gl;
    gl.clearColor(0.5, 0.5, 0.5, 1.0);
    gl.clear(this.gl.COLOR_BUFFER_BIT);
    gl.clear(this.gl.DEPTH_BUFFER_BIT);
    return this;
};

DisplayGL2.prototype.draw = function() {
    var gl = this.gl;

    var cone = this.programs.cone.use()
            .attrib('vert', this.buffers.cone, 3);
    for (var i = 0; i < this.points.length; i++) {
        var p = this.points[i],
            position = vec3(p.x * 2 - 1, p.y * -2 + 1, 0.0),
            color = vec4(p.r, p.g, p.b, 255).fdivide(255);
        cone.uniform('position', position)
            .uniform('color', color)
            .draw(gl.TRIANGLE_FAN, this.resolution + 1);
    }

    var selection;
    if (this.selection != null) {
        selection = vec2(this.selection.x, 1 - this.selection.y);
    } else {
        selection = vec2(NaN, NaN); // matches nothing
    }

    var dark = [], points = [];
    this.points.forEach(function(p) {
        points.push(p.x);
        points.push(1 - p.y);
        dark.push(p.isDark() ? 1 : 0);
    });
    this.buffers.points.update(new Float32Array(points));
    this.buffers.dark.update(new Float32Array(dark));
    this.programs.points.use()
        .attrib('position', this.buffers.points, 2)
        .attrib('dark', this.buffers.dark, 1)
        .uniform('selection', selection)
        .draw(gl.POINTS, this.points.length);

    return this;
};
