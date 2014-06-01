#!/bin/bash

ls frames/*.png \
    | xargs -P2 -n1 \
            mogrify -format gif -resize 1024 -crop 600x600+220+60 +repage

gifsicle --colors 256 -O3 --loop -d 200 frames/00000000.gif -d3 \
         frames/*.gif > cones.gif
