sleep(2);
frame = 0;

for n = 4:128
  cones(n, 0, 0);
  xlim([-1 1]);
  ylim([-1 1]);
  zlim([-1 0]);
  view(0, 90);
  text(-0.98, 0.95, 0, sprintf("Triangles: %d", n), 'fontsize', 20)
  cap(frame++);
end
