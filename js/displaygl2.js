function DisplayGL2(gl, resolution) {
    this.gl = gl;
    this.resolution = resolution = resolution || 63;

    /* Prepare cone model. */
    var w = this.gl.canvas.width, h = this.gl.canvas.height,
        a = vec2(w, h).fdivide(vec2(w, h).magnitude());
    var cone = [0, 0, -0.95];
    for (var i = 0; i < resolution; i++) {
        var v = i / (resolution - 1) * Math.PI * 2;
        cone.push(Math.cos(v) * a.y * 2);
        cone.push(Math.sin(v) * a.x * 2);
        cone.push(1.0);
    }

    this.instancing = gl.getExtension("ANGLE_instanced_arrays");
    var vert, frag;
    if (this.instancing == null) {
        document.title += ' (no instancing)';
        vert = 'glsl/cone.vert';
        frag = 'glsl/cone.frag';
    } else {
        vert = 'glsl/cone-instanced.vert';
        frag = 'glsl/cone-instanced.frag';
    }
    this.programs = {
        cone: new Igloo.Program(gl, vert, frag),
        points: new Igloo.Program(gl, 'glsl/point.vert', 'glsl/point.frag')
    };
    this.buffers = {
        cone: new Igloo.Buffer(gl, new Float32Array(cone)),
        points: new Igloo.Buffer(gl, null, gl.STREAM_DRAW),
        dark: new Igloo.Buffer(gl, null, gl.STREAM_DRAW),
        colors: new Igloo.Buffer(gl, null, gl.STREAM_DRAW)
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
    var gl = this.gl, ext = this.instancing;
    gl.clear(this.gl.DEPTH_BUFFER_BIT);

    var dark = [], points = [], colors = [];
    this.points.forEach(function(p) {
        points.push(p.x);
        points.push(1 - p.y);
        colors.push(p.r / 255);
        colors.push(p.g / 255);
        colors.push(p.b / 255);
        dark.push(p.isDark() ? 1 : 0);
    });
    this.buffers.points.update(new Float32Array(points));
    this.buffers.dark.update(new Float32Array(dark));
    this.buffers.colors.update(new Float32Array(colors));

    var cone = this.programs.cone.use();
    if (ext != null) {
        /* Use instancing extension. */
        cone.attrib('vert', this.buffers.cone, 3)
            .attrib('position', this.buffers.points, 2)
            .attrib('color', this.buffers.colors, 3);
        ext.vertexAttribDivisorANGLE(cone.vars['vert'], 0);
        ext.vertexAttribDivisorANGLE(cone.vars['position'], 1);
        ext.vertexAttribDivisorANGLE(cone.vars['color'], 1);
        ext.drawArraysInstancedANGLE(gl.TRIANGLE_FAN, 0, this.resolution + 1,
                                     this.points.length);
    } else {
        /* One draw per Voronoi vertex. */
        cone.attrib('vert', this.buffers.cone, 3);
        for (var i = 0; i < this.points.length; i++) {
            var color = vec3(colors[i * 3 + 0],
                             colors[i * 3 + 1],
                             colors[i * 3 + 2]),
                position = vec2(points[i * 2 + 0], points[i * 2 + 1]);
            cone.uniform('color', color)
                .uniform('position', position)
                .draw(gl.TRIANGLE_FAN, this.resolution + 1);
        }
    }

    /* Draw points. */
    var selection;
    if (this.selection != null) {
        selection = vec2(this.selection.x, 1 - this.selection.y);
    } else {
        selection = vec2(NaN, NaN); // matches nothing
    }
    this.programs.points.use()
        .attrib('position', this.buffers.points, 2)
        .attrib('dark', this.buffers.dark, 1)
        .uniform('selection', selection)
        .draw(gl.POINTS, this.points.length);

    return this;
};
