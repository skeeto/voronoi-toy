function cap(n)
  ext = 'png';
  filename = sprintf('frames/%08d.%s', n, ext);
  #display(gca()); #sleep(0.1);
  print(filename, ['-d' ext]);
end
