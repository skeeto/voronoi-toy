function Display(canvas) {
    var gl = canvas.getContext('webgl') ||
            canvas.getContext('experimental-webgl');
    var display;
    if (gl == null) {
        console.error('WebGL initialization failed!');
        display = new Display2D(canvas.getContext('2d'));
    } else {
        display = new DisplayGL(gl);
    }
    display.points = [];
    display.selection = null;
    display.canvas = canvas;
    return display;
}

Display.prototype.max = 4096;

Display.prototype.add = function(point) {
    if (this.points.length < this.max) {
        this.points.push(point);
    }
    return this;
};

Display.prototype.select = function(point) {
    if (this.selection !== point) {
        this.selection = point;
        this.canvas.style.cursor = point == null ? 'auto' : 'pointer';
        this.draw();
    }
    return this;
};
