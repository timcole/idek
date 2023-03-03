import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async POST(req) {
    const { user, prompt } = await req.json();

    return await fetch(`https://api.openai.com/v1/images/generations`, {
      method: "POST",
      body: JSON.stringify({
        user,
        prompt,
        n: 1,
        size: "512x512",
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Deno.env.get("OPEN_AI")}`,
      },
    });
  },
};
