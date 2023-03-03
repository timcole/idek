import { useCallback, useEffect, useState } from "preact/hooks";
import parseIrc, { Message } from "../lib/irc.ts";

type Result = {
  prompt: string;
  requester?: string;
  image?: string;
  time: Date;
};

const Results = () => {
  const [socket, setSocket] = useState<WebSocket | null>(() =>
    new WebSocket("wss://irc-ws.chat.twitch.tv")
  );

  const [results, setResults] = useState<Result>({
    prompt: "A photo of a teddy bear on a skateboard in Times Square",
    image:
      "https://cdn.openai.com/labs/images/A%20photo%20of%20a%20teddy%20bear%20on%20a%20skateboard%20in%20Times%20Square.webp?v=1",
    time: new Date(),
  });

  const [loading, setLoading] = useState(false);

  const pending = useCallback((result: Result) => {
    setLoading(true);
    fetch(`/generate`, {
      method: "POST",
      body: JSON.stringify({
        user: result.requester,
        prompt: result.prompt,
      }),
    }).then(async (data) => {
      const res = await data.json();
      result.image = res.data ? res.data[0]?.url : undefined;
      if (result.image) setResults(result);
      setLoading(false);
    });
  }, [results]);

  useEffect(() => {
    if (!socket) return () => {};
    socket.onmessage = (data) => {
      const eventData = data.data.split(/\r?\n/g);

      eventData.map((line: string) => {
        if (line.replace(/\s/g, "") === "") return;
        const parsed = parseIrc(line);
        if (!parsed) return;
        else if (parsed.command === "PING") {
          socket.send("PONG\r\n");
        } else if (parsed.command !== "PRIVMSG") return;
        if (!parsed.params[1].startsWith("!prompt")) return;

        if (!loading) {
          pending({
            prompt: parsed.params[1].slice(8),
            requester: parsed.prefix!.split("!")[0],
            time: new Date(),
          });
        }
      });
    };
  }, [results, loading, socket]);

  useEffect(() => {
    if (!socket) return () => {};
    socket.onopen = () => {
      socket.send(`CAP REQ :twitch.tv/tags twitch.tv/commands`);
      socket.send(`NICK justinfan69420`);
      socket.send(`PASS oauth:justinfan69420`);
      socket.send(`JOIN #qatim`);
      console.log("Chat Connected");
    };
    socket.onclose = () =>
      setSocket(new WebSocket("wss://irc-ws.chat.twitch.tv"));
  }, [socket]);

  return (
    <div class="mx-auto container text-center flex-1 pt-10 flex flex-col gap-4">
      <img src={results.image} class="flex-1 min-h-full object-contain" />
      <p class="text-gray-200 text-xl">
        {results.requester
          ? `Requested by, ${results.requester}:`
          : `Default Image:`} {results.prompt}
      </p>
      {loading && (
        <p class="text-gray-200 text-l absolute w-full bg-gray-800 left-0 top-0">
          Loading next image...
        </p>
      )}
    </div>
  );
};

export default Results;
