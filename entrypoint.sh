#!/bin/bash
Xvfb :0 -ac -screen 0.0 "$XVFB_RES" -nolisten tcp $XVFB_ARGS &
XVFB_PROC=$!

deno run -A main.ts &
echo "started webapp"

firefox --kiosk http://localhost:3000 -width 2560 -height 1440 &
echo "started firefox"

ffmpeg \
  -f x11grab -draw_mouse 0 -i :0.0 -video_size 2560x1440 -pix_fmt yuv420p -tune zerolatency -profile:v baseline -preset veryfast \
  -c:v libx264 -b:v 1500k -s 1280x720 -maxrate 1500k -minrate 1500k -draw_mouse 0 \
  -f flv "rtmp://iad03.contribute.live-video.net/app/$STREAM_KEY"

kill $XVFB_PROC
