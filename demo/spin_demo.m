sleep(2);
frame = 0;    # frame counter
n     = 128;

## Animation speed:
drate = 0.05; # shadow rate
srate = 0.1;  # zoom rate
vrate = 1;    # vertical tilt rate
hrate = 2;    # spin rate

## Tilt limits
vmin = 20.9;
vmax = 89.9;  # (workaround fltk depth bug)

## Plot scaling
xl = [-1 1];
yl = [-1 1];
zl = [-1 0];

shadow = 0.3;
for alpha = 0:drate:shadow
  cones(n, alpha, 0);
  xlim(xl);
  ylim(yl);
  zlim(zl);
  view(0, vmax);
  cap(frame++);
end

xysmax = 1;
zsmax = 2;
for s = 0:srate:1;
  xlim(xl * (1 + s * (xysmax - 1)));
  ylim(yl * (1 + s * (xysmax - 1)));
  zlim(zl / (1 + s * (zsmax - 1)));
  cap(frame++);
end

for v = vmax:-vrate:vmin
  view(0, v);
  cap(frame++);
end

for v = 0:hrate:360
  cones(n, shadow, v / 180 * pi);
  xlim(xl * xysmax);
  ylim(yl * xysmax);
  zlim(zl / zsmax);
  view(0, vmin);
  cap(frame++);
end

for v = vmin:vrate:90
  view(0, v);
  cap(frame++);
end

for s = 1:-srate:0;
  xlim(xl * (1 + s * (xysmax - 1)));
  ylim(yl * (1 + s * (xysmax - 1)));
  zlim(zl / (1 + s * (zsmax - 1)));
  cap(frame++);
end

for alpha = shadow:-drate:0
  cones(n, alpha, 0);
  xlim(xl);
  ylim(yl);
  zlim(zl);
  view(0, vmax);
  cap(frame++);
end
