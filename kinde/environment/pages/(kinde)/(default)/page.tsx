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
        <style>{`
        :root {
  --kinde-button-primary-background-color: #0063e0;
  --kinde-button-primary-color: white;
  --kinde-button-font-weight: 600;
  --kinde-designer-control-select-text-border-radius: 12px;
  --kinde-button-border-radius: 24px;
  --
}

.kinde-control-label {
  display: none;
}

* {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

header {
  text-align: center;
}

.links {
  display: flex;
  justify-content: center;
  gap: 12px;
  font-size: 12px;


}

.links a{
  text-decoration: none;
  color: #777;
}


.kinde-form {

  & > *:not(:nth-last-child(2)) {
    margin-block-end: 1rem;
  }
}

        `}</style>
      </head>
      <body>
        <div id="root" data-roast-root="/admin">
          <header>English (UK)</header>
          <div>icon(replace)</div>
          <main>{getKindeWidget()}</main>

          <div>
            <button>Create new account</button>
          </div>
          <div>
            <div className="meta-logo">Meta</div>
            <div className="links">
              <a href="">About</a>
              <a href="">Help</a>
              <a href="">More</a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default async function Page(event: KindePageEvent) {
  const page = await Layout({ ...event });
  return renderToString(page);
}
