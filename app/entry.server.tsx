import type { EntryContext } from "@remix-run/cloudflare";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";

const shellHtml = `
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <div id="app"><!-- Remix SPA --></div>
  </body>
</html>
`;

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const appHtml = renderToString(
    <RemixServer context={remixContext as Parameters<typeof RemixServer>[0]["context"]} url={request.url} />
  );

  const html = shellHtml.replace("<!-- Remix SPA -->", appHtml);

  return new Response(html, {
    headers: { "Content-Type": "text/html" },
    status: responseStatusCode,
  });
}
