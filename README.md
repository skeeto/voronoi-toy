# WebGL Interactive Voronoi Diagram

**Play with it online!** : http://skeeto.github.io/voronoi-toy/

You can drag the vertices around on the fly with your mouse.
Left-clicking away from any vertex places a new vertex and
right-clicking on a vertex removes that vertex.

The diagram is computed and rendered entirely in the GPU via a
fragment shader. There's a slow HTML5 canvas fallback for when WebGL
is unavailable. Due to OpenGL ES's very small uniform constraints (as
little as 16 4-component elements), even high-end GPUs will generally
only support around 64 vertices in this demo.
