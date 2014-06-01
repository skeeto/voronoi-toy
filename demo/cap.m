function cap(n)
  ext = 'png';
  filename = sprintf('frames/%08d.%s', n, ext);
  refresh();
  sleep(0.5);
  ##print(filename, ['-d' ext]);
  system(['scrot ' filename]);
end
