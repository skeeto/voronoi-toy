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
    display.cursors = [];
    return display;
}

Display.prototype.max = 4096;

Display.prototype.add = function(point) {
    if (this.points.length < this.max) {
        this.points.push(point);
    }
    return this;
};

Display.prototype.remove = function(point) {
    var ps = this.points;
    for (var i = 0; i < ps.length; i++) {
        if (ps[i] === point) {
            if (i === ps.length - 1) {
                ps.pop();
            } else {
                ps[i] = ps.pop();
            }
            break;
        }
    }
    return this;
};

Display.prototype.cursorPush = function(name) {
    this.cursors.push(name);
    this.canvas.style.cursor = name;
    return this;
};

Display.prototype.cursorPop = function() {
    this.cursors.pop();
    var length = this.cursors.length;
    this.canvas.style.cursor = length === 0 ? 'auto' : this.cursors[length - 1];
    return this;
};

Display.prototype.select = function(point) {
    if (this.selection !== point) {
        this.selection = point;
        if (point == null) {
            this.cursorPop();
        } else {
            this.cursorPush('pointer');
        }
        this.draw();
    }
    return this;
};
