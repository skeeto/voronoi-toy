#!/bin/bash

ls frames/*.png \
    | xargs -P2 -n1 \
            mogrify -format gif -crop 600x600+362+98 +repage

gifsicle --colors 256 -O3 --loop -d 200 frames/00000000.gif -d3 \
         frames/*.gif > cones.gif
