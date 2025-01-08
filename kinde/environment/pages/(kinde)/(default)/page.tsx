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
}

.kinde-control-label {
  display: none;
}

* {
  font-family: sans-serif;
}

#root {
  pointer-events: auto;
  height: 100vh;
  padding: 0.5rem;
  width: 100%;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(
    to right,
    white,
    rgba(243, 232, 255, 0.3),
    rgba(239, 246, 255, 0.3)
  );
}

.icon-wrapper {
  display: flex;
  justify-content: center;
  pointer-events: none;
  margin-top: 0px;
  margin-bottom: 20px;
  flex-grow: 1;
  flex-shrink: 100;
  align-items: center;
  justify-content: center;
}

.wbloks_1 {
  max-height: 60px;
  min-height: 0px;
  object-fit: contain;
  overflow: hidden;
}

header {
  text-align: center;
  color: rgb(70, 90, 105);
  font-weight: 400;
  display: inline;
  font-size: 13px;
  white-space: pre-wrap;
  overflow-wrap: break-word;
}

.links {
  display: flex;
  justify-content: center;
  gap: 12px;
  font-size: 12px;
}

.links a {
  text-decoration: none;
  color: #777;
}

.kinde-form {
  & > *:not(:nth-last-child(2)) {
    margin-block-end: 1rem;
  }
}

.button {
  pointer-events: none;
  opacity: 1;
  height: 44px;
  min-width: 44px;
  flex-grow: 1;
  padding-left: 20px;
  padding-right: 20px;
  background: rgba(255, 255, 255, 0);
  border: 1px solid rgb(0, 100, 224);
  border-radius: 22px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}

.button span {
  color: rgb(0, 100, 224);
  font-weight: 500;
  display: inline;
  font-size: 16px;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  font-weight: 600;
}

.footer {
  pointer-events: none;
  flex-grow: 1;
  flex-shrink: 1e6;
  padding-bottom: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.meta-logo-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-block: 20px;
}
.meta-logo {
  height: 12px;
  aspect-ratio: 5 / 1;
}
.meta-img {
  height: 100%;
  width: 100%;
  pointer-events: inherit;
  mask-image: url("https://z-m-static.xx.fbcdn.net/rsrc.php/v4/yM/r/DDgwTv3JehF.png");
  mask-size: contain;
  background-color: rgb(70, 90, 105);
  object-position: 10000px 10000px;
  object-fit: contain;
  overflow: hidden;
}


        `}</style>
      </head>
      <body>
        <div id="root" data-roast-root="/admin">
          <header>English (UK)</header>
          <div className="icon-wrapper">
            <img
              data-bloks-name="bk.components.Image"
              role="heading"
              alt="Facebook from Meta"
              class="wbloks_1"
              src="https://z-m-static.xx.fbcdn.net/rsrc.php/v4/yD/r/5D8s-GsHJlJ.png"
            />
          </div>
          <main>{getKindeWidget()}</main>
          <div className="footer">
            <div>
              <button className="button">
                <span>Create new account</span>
              </button>
            </div>
            <div>
              <div className="meta-logo-wrapper">
                <div className="meta-logo">
                  <img
                    data-bloks-name="bk.components.Image"
                    alt="Meta logo"
                    class="meta-img"
                    src="https://z-m-static.xx.fbcdn.net/rsrc.php/v4/yM/r/DDgwTv3JehF.png"
                  />
                </div>
              </div>
              <div className="links">
                <a href="">About</a>
                <a href="">Help</a>
                <a href="">More</a>
              </div>
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
