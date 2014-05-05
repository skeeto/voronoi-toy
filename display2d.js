function Display2D(canvas) {
    this.context = canvas.getContext('2d');;
    this.points = [];
    this.selection = null;
}

Display2D.prototype.clear = function() {
    var can = this.context.canvas, c = this.context;
    c.fillStyle = '#000';
    c.fillRect(0, 0, can.width, can.height);
    return this;
};

Display2D.prototype.draw = function() {
    var c = this.context, h = c.canvas.height, w = c.canvas.width,
        d = c.getImageData(0, 0, w, h);
    for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {
            var i = w * 4 * y + x * 4,
                t = P(x / w, y / h).closest(this.points);
            d.data[i+0] = t.r;
            d.data[i+1] = t.g;
            d.data[i+2] = t.b;
            d.data[i+3] = 255;
        }
    }
    c.putImageData(d, 0, 0);
    var _this = this;
    c.strokeStyle = 'red';
    this.points.forEach(function(p) {
        var radius = 1;
        if (p === _this.selection) {
            radius *= 3;
            c.beginPath();
            c.arc(p.x * w, p.y * h, 8, 0, Math.PI * 2, false);
            c.stroke();
        }
        c.fillStyle = p.isDark() ? '#fff' : '#000';
        c.beginPath();
        c.arc(p.x * w, p.y * h, radius, 0, Math.PI * 2, false);
        c.fill();
    });
    return this;
};

Display2D.prototype.add = function(point) {
    this.points.push(point);
    return this;
};

Display2D.prototype.select = function(point) {
    if (this.selection !== point) {
        this.selection = point;
        this.draw();
        this.context.canvas.style.cursor = point == null ? 'auto' : 'pointer';
    }
};
