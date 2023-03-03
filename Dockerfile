FROM denoland/deno:1.26.0
RUN apt update -y \
  && apt install -y xvfb libgl1-mesa-dri mesa-utils x11-apps ffmpeg xz-utils ca-certificates firefox-esr

WORKDIR /opt/app
ADD . .
ARG GITHUB_HASH
ENV DENO_DEPLOYMENT_ID $GIT_HASH
RUN deno cache main.ts

RUN sed -i 's/\r$//' entrypoint.sh
ARG RESOLUTION="2560x1440x24"
ENV XVFB_RES="${RESOLUTION}"
ARG XARGS=""
ENV XVFB_ARGS="${XARGS}"
ENV DISPLAY=":0.0"

ENTRYPOINT ["./entrypoint.sh"]
