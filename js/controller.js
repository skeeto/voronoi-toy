function Controller(display, canvas) {
    this.display = display;
    this.canvas = canvas;
    var _this = this;
    canvas.addEventListener('mousemove', function(event) {
        _this.motion(P(event.pageX, event.pageY));
    });
    canvas.addEventListener('mousedown', function(event) {
        _this.down = true;
        _this.display.cursorPush('none');
    });
    canvas.addEventListener('mouseup', function(event) {
        _this.down = false;
        _this.display.cursorPop();
    });
    canvas.addEventListener('click', function(event) {
        _this.click(P(event.pageX, event.pageY));
    });
    canvas.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        _this.remove(P(event.pageX, event.pageY));
        return false;
    }, false);
    this.down = false;
}

Controller.THRESHOLD = 12;

Controller.prototype.motion = function(mouse) {
    if (this.down) {
        this.drag(mouse, this.display.selection);
    } else {
        var h = this.canvas.height, w = this.canvas.width,
            ps = this.display.points;
        for (var i = 0; i < ps.length; i++) {
            var p = P(ps[i].x * w, ps[i].y * h);
            if (p.dist(mouse) < Controller.THRESHOLD) {
                this.display.select(ps[i]);
                return;
            }
        }
        this.display.select(null);
    }
};

Controller.prototype.drag = function(mouse, point) {
    var h = this.canvas.height, w = this.canvas.width;
    if (point != null) {
        point.set(mouse.x / w, mouse.y / h);
        this.display.draw();
    }
};

Controller.prototype.click = function(mouse) {
    var h = this.canvas.height, w = this.canvas.width, d = this.display;
    if (d.selection == null) {
        d.add(P(mouse.x / w, mouse.y / h));
        d.draw();
    }
};

Controller.prototype.remove =  function(mouse) {
    this.display.remove(this.display.selection).select(null).draw();
};
