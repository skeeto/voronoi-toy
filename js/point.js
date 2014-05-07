function Point(x, y, r, g, b) {
    if (x == null || y == null) {
        this.x = Math.random();
        this.y = Math.random();
    } else {
        this.x = x;
        this.y = y;
    }
    if (r == null || g == null || b == null) {
        this.r = Math.floor(Math.random() * 256);
        this.g = Math.floor(Math.random() * 256);
        this.b = Math.floor(Math.random() * 256);
    } else {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    this.dirty = false;
}

Point.prototype.set = function(x, y) {
    this.x = x;
    this.y = y;
    this.dirty = true;
};

Point.prototype.dist2 = function(other, sx, sy) {
    var dx = (this.x - other.x) * sx;
    var dy = (this.y - other.y) * sy;
    return dx * dx + dy * dy;
};

Point.prototype.dist = function(other) {
    return Math.sqrt(this.dist2(other, 1, 1));
};

Point.prototype.closest = function(points, sx, sy) {
    var point = points[0], dist = this.dist2(point, sx, sy);
    for (var i = 0; i < points.length; i++) {
        var idist = this.dist2(points[i], sx, sy);
        if (idist < dist) {
            point = points[i];
            dist = idist;
        }
    }
    return point;
};

Point.prototype.isDark = function() {
    return this.r * 0.30 + this.g * 0.59 + this.b * 0.11 < 64;
};

function P(x, y) {
    return new Point(x, y);
}
