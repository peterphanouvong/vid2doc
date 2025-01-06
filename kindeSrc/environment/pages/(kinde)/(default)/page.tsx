"use server";

import React from "react";

import {
  getKindeRequiredCSS,
  getKindeRequiredJS,
  getKindeCSRF,
  getKindeWidget,
} from "@kinde/infrastructure";
import { renderToString } from "react-dom/server";

export const pageSettings = {
  bindings: {
    "kinde.localization": {},
  },
};

const Layout = async ({ request }) => {
  return (
    <html lang={request.locale.lang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex" />
        <meta name="csrf-token" content={getKindeCSRF()} />
        <title>{kinde.localization.get("page_title")}</title>
        {getKindeRequiredCSS()}
        {getKindeRequiredJS()}
      </head>
      <body>
        <div id="root" data-roast-root="/admin">
          <header>Company name</header>
          <main>
            <h2>{kinde.localization.get("heading")}</h2>
            <p>{kinde.localization.get("description")}</p>
            <div>{getKindeWidget()}</div>
          </main>
        </div>
      </body>
    </html>
  );
};

export default async function Page(event) {
  const page = await Layout({ ...event });
  return renderToString(page);
}
