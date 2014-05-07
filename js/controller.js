function Controller(display, canvas) {
    this.display = display;
    this.canvas = canvas;
    var _this = this;
    canvas.addEventListener('mousemove', function(event) {
        _this.motion(P(event.pageX, event.pageY));
    });
    canvas.addEventListener('mousedown', function(event) {
        _this.down = true;
        _this.display.cursor('none');
    });
    canvas.addEventListener('mouseup', function(event) {
        _this.down = false;
        _this.display.cursor();
    });
    canvas.addEventListener('click', function(event) {
        event.preventDefault();
        _this.click(P(event.pageX, event.pageY));
        return false;
    });
    canvas.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        _this.remove(P(event.pageX, event.pageY));
        return false;
    }, false);
    window.addEventListener('keypress', function(event) {
        _this.press(event.which);
    });
    this.down = false;
    this.lastmouse = null;
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
                this.display.cursor('pointer');
                return this;
            }
        }
        this.display.cursor('auto');
        this.display.select(null);
    }
    this.lastmouse = mouse;
    return this;
};

Controller.prototype.drag = function(mouse, point) {
    var h = this.canvas.height, w = this.canvas.width;
    if (point != null) {
        point.set(mouse.x / w, mouse.y / h);
        this.display.draw();
    }
    return this;
};

Controller.prototype.click = function(mouse) {
    var h = this.canvas.height, w = this.canvas.width, d = this.display;
    if (d.selection == null) {
        d.add(P(mouse.x / w, mouse.y / h));
        d.draw();
    }
    this.motion(mouse);
    return this;
};

Controller.prototype.remove =  function(mouse) {
    this.display.remove(this.display.selection).select(null).draw();
    return this;
};

Controller.prototype.drift = function() {
    var SPEED = 0.0005, ROTATION = 0.05;
    function clamp(p) {
        if (p.x < 0 || p.x >= 1.0 || p.y < 0 || p.y >= 1.0) {
            p.direction += Math.PI;
            p.x = Math.min(Math.max(p.x, 0), 1);
            p.y = Math.min(Math.max(p.y, 0), 1);
        }
    }

    var ps = this.display.points;
    for (var i = 0; i < ps.length; i++) {
        var p = ps[i];
        if (p.direction == null) {
            p.direction = Math.random() * Math.PI * 2;
        }
        p.x = p.x + Math.cos(p.direction) * SPEED;
        p.y = p.y + Math.sin(p.direction) * SPEED;
        clamp(p);
        p.direction += Math.random() * ROTATION * 2 - ROTATION;
    }
    return this;
};

Controller.prototype.redraw = function() {
    this.display.draw();
    return this;
};

Controller.prototype.animate = function() {
    if (this.animating) {
        this.drift();
        if (this.lastmouse != null) {
            this.motion(this.lastmouse);
        }
        this.redraw();
        var _this = this;
        window.requestAnimationFrame(function() {
            _this.animate();
        });
    }
};

Controller.prototype.startAnimate = function() {
    if (!this.animating) {
        this.animating = true;
        this.animate();
    }
};

Controller.prototype.stopAnimate = function() {
    this.animating = false;
};

Controller.prototype.toggleAnimate = function() {
    if (this.animating) {
        this.stopAnimate();
    } else {
        this.startAnimate();
    }
};

Controller.prototype.press = function(key) {
    switch (key) {
    case 'a'.charCodeAt(0):
        this.toggleAnimate();
        break;
    }
};
