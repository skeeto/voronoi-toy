function cone(pos, color, n, alpha)
  n += 2;
  xs = [0];
  ys = [0];
  zs = [0];
  shadow = [0];
  for i = 0:n
    v = i / (n - 2) * pi * 2;
    xs = [xs cos(v) * sqrt(2)];
    ys = [ys sin(v) * sqrt(2)];
    zs = [zs -1];
    shadow = [shadow cos(v) * alpha + (1 - alpha)];
  end
  xs += pos(1);
  ys += pos(2);
  for i = 3:n
    s = i - 1;
    x = [xs(1) xs(s:i)];
    y = [ys(1) ys(s:i)];
    z = [zs(1) zs(s:i)];
    p = patch(x, y, z, color * shadow(i), 'edgecolor', 'none');
  end
  plot3(xs(1), ys(1), zs(1), 'k.', 'markersize', 10);
end
