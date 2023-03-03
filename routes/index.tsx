import { Head } from "$fresh/runtime.ts";
import Results from "../islands/Results.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>I Don't Even Know</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div class="min-h-screen bg-gray-900 text-center relative">
        <div class="container mx-auto py-8 flex flex-col min-h-screen">
          <h1 class="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500">
            I Don't Even Know
          </h1>
          <h1 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">
            type <code class="px-3 text-gray-200 italic">!prompt phrase</code>
            {" "}
            in chat to generate!
          </h1>
          <Results />
        </div>
      </div>
    </>
  );
}
