function cones(n, alpha, rot)
  clf();
  axis('equal');
  hold('on');
  axis('off');
  rm = [cos(rot) sin(rot); -sin(rot) cos(rot)];
  coneR = rm * [-0.3 0]';
  coneG = rm * [0.3 0.15]';
  coneB = rm * [0.25 -0.2]';
  cone(coneR, [1 0 0], n, alpha);
  cone(coneG, [0 1 0], n, alpha);
  cone(coneB, [0 0 1], n, alpha);
  set(gca, 'DataAspectRatio', [1 1 0.6]);
end
