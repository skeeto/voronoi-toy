function $(s) {
    return document.querySelector(s);
}

var display = null;
window.addEventListener('load', function() {
    /* Update cavas size. */
    var canvas = $('#voronoi'),
        parent = canvas.parentNode;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;

    var context2d = canvas.getContext('2d');
    display = new Display2D(context2d);
    display.clear();
    for (var i = 0; i < 100; i++) {
        display.add(new Point());
    }
    display.draw();
});
