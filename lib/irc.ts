export type Message = {
  raw: string;
  tags: Record<string, string | boolean>;
  prefix: string | null;
  command: string | null;
  params: string[];
};

export default (data: string) => {
  const message: Message = {
    raw: data,
    tags: {},
    prefix: null,
    command: null,
    params: [],
  };

  let position = 0;
  let nextspace = 0;
  if (data.charCodeAt(0) === 64) {
    const nextspace = data.indexOf(" ");
    if (nextspace === -1) return null;

    const rawTags = data.slice(1, nextspace).split(";");
    for (let i = 0; i < rawTags.length; i++) {
      const tag = rawTags[i];
      const pair = tag.split("=");
      message.tags[pair[0]] = pair[1] === "0"
        ? false
        : pair[1] === "1"
        ? true
        : pair[1] || true;
    }
    position = nextspace + 1;
  }

  while (data.charCodeAt(position) === 32) position++;

  if (data.charCodeAt(position) === 58) {
    nextspace = data.indexOf(" ", position);
    if (nextspace === -1) return null;

    message.prefix = data.slice(position + 1, nextspace);
    position = nextspace + 1;

    while (data.charCodeAt(position) === 32) position++;
  }

  nextspace = data.indexOf(" ", position);

  if (nextspace === -1) {
    if (data.length > position) {
      message.command = data.slice(position);
      return message;
    }

    return null;
  }

  message.command = data.slice(position, nextspace);
  position = nextspace + 1;

  while (data.charCodeAt(position) === 32) position++;

  while (position < data.length) {
    nextspace = data.indexOf(" ", position);

    if (data.charCodeAt(position) === 58) {
      message.params.push(data.slice(position + 1));
      break;
    }

    if (nextspace !== -1) {
      message.params.push(data.slice(position, nextspace));
      position = nextspace + 1;
      while (data.charCodeAt(position) === 32) position++;
      continue;
    }

    if (nextspace === -1) {
      message.params.push(data.slice(position));
      break;
    }
  }

  return message;
};
