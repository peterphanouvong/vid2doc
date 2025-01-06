"use server";

import React from "react";

const getKindeWidget = () => "@cd65da2987c740d58961024aa4a27194@";

const getKindeNonce = () => "@43dffdf2c22f40e9981303cb383f6fac@";

const getKindeRequiredCSS = () => "@ce0ef44d50f6408985f00c04a85d8430@";

const getKindeRequiredJS = () => "@8103c7ff23fe49edb9b0537d2927e74e@";

const getKindeCSRF = () => "@0c654432670c4d0292c3a0bc3c533247@";

const getKindeSignUpUrl = () => "@b1d3a51558e64036ad072b56ebae37f5@";

const getKindeSignInUrl = () => "@847681e125384709836f921deb311104@";

// export {
//   getKindeWidget,
//   getKindeNonce,
//   getKindeCSRF,
//   getKindeRequiredCSS,
//   getKindeRequiredJS,
// };

// import {
//   getKindeRequiredCSS,
//   getKindeRequiredJS,
//   getKindeCSRF,
//   getKindeWidget,
// } from "@kinde/infrastructure";
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
