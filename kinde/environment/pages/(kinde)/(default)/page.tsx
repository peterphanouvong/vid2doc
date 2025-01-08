"use server";

import React from "react";

import {
  getKindeRequiredCSS,
  getKindeRequiredJS,
  getKindeCSRF,
  getKindeWidget,
} from "@kinde/infrastructure";

import { renderToString } from "react-dom/server.browser";
import { KindePageEvent } from "@/lib/utils";

const Layout = async ({ request, context }: KindePageEvent) => {
  return (
    <html lang={request.locale.lang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex" />
        <meta name="csrf-token" content={getKindeCSRF()} />
        <title>{context.widget.content.page_title}</title>
        {getKindeRequiredCSS()}
        {getKindeRequiredJS()}
      </head>
      <body>
        <div id="root" data-roast-root="/admin">
          <main>
            <div>{getKindeWidget()}</div>
          </main>
        </div>
      </body>
    </html>
  );
};

export default async function Page(event: KindePageEvent) {
  const page = await Layout({ ...event });
  return renderToString(page);
}
