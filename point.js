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
}

Point.prototype.dist2 = function(other) {
    var dx = this.x - other.x;
    var dy = this.y - other.y;
    return dx * dx + dy * dy;
};

Point.prototype.dist = function(other) {
    return Math.sqrt(this.dist2(other));
};

Point.prototype.closest = function(points) {
    var point = points[0], dist = this.dist2(point);
    for (var i = 0; i < points.length; i++) {
        var idist = this.dist2(points[i]);
        if (idist < dist) {
            point = points[i];
            dist = idist;
        }
    }
    return point;
};

function P(x, y) {
    return new Point(x, y);
}
