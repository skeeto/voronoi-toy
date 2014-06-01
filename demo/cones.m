function cones(alpha, rot)
  clf();
  axis('equal');
  hold('on');
  axis('off');
  rm = [cos(rot) sin(rot); -sin(rot) cos(rot)];
  coneR = rm * [-0.3 0]';
  coneG = rm * [0.3 0.15]';
  coneB = rm * [0.25 -0.2]';
  cone(coneR, [1 0 0], alpha);
  cone(coneG, [0 1 0], alpha);
  cone(coneB, [0 0 1], alpha);
  set(gca, 'DataAspectRatio', [1 1 0.6]);
end
