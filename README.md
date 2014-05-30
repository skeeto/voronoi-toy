# WebGL Interactive Voronoi Diagram

**Play with it online!** : http://skeeto.github.io/voronoi-toy/

Video, for non-WebGL capable browsers:
[WebM](http://nullprogram.s3.amazonaws.com/voronoi/voronoi.webm)
[H.264](http://nullprogram.s3.amazonaws.com/voronoi/voronoi.mkv)

You can drag the vertices around on the fly with your mouse.

* **left-click**  : place a new vertex or move an existing vertex
* **right-click** : remove a vertex
* **A** : toggle animation

The diagram is computed and rendered entirely in the GPU via a
fragment shader. There's a slow HTML5 canvas fallback for when WebGL
is unavailable. Due to OpenGL ES's very small uniform constraints (as
little as 16 4-component elements), even high-end GPUs will generally
only support around 64 vertices in this demo.
