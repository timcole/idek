# I Don't Even Know
_I maybe currently [streaming it](https://www.twitch.tv/qatim), I may not be idek lol_

**This was created in 3 hours for fun**. The idea was stolen from
[Rox](https://twitter.com/RoxCodes/)'s [Twitch
Difussion](https://www.twitch.tv/twitchdiffusion) project that he worked on for
a sponsor. He made something very similar on stream and I wanted to see how
quick I could recreate it for fun.

This of course isn't the best code ever written, but YOLO it was for fun lol.

I used Open AI because I have free start-up credits from Microsoft Founders
program.

100% self contained in a single docker image, about 1vCPU @ 512 MB of RAM.

Environment variables are `OPEN_AI` Open AI API key, and `STREAM_KEY`
for streaming to Twitch.

This is hard coded to stream to Ashburn VA 3, you can change that
[here](https://github.com/timcole/idek/blob/main/entrypoint.sh#L14). List of
Twitch's ingest servers can be found [here](https://stream.twitch.tv/ingests/).
