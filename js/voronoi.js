var START_VERTICES = 16;

function $(s) {
    return document.querySelector(s);
}

var display = null, controller = null;
window.addEventListener('load', function() {
    /* Update cavas size. */
    var canvas = $('#voronoi'),
        parent = canvas.parentNode;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;

    /* Set up display. */
    display = new Display(canvas);
    display.clear();
    for (var i = 0; i < START_VERTICES; i++) {
        display.add(new Point());
    }
    display.draw();

    /* Set up controller. */
    controller = new Controller(display, canvas);
});

window.addEventListener('mousewheel', function(event) {
    event.preventDefault();
    return false;
}, false);
