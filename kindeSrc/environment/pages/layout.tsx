"use server";

import {
  getKindeCSRF,
  getKindeRequiredCSS,
  getKindeRequiredJS,
  type KindePageEvent,
} from "@kinde/infrastructure";
import React from "react";
import { generateCSSVariables } from "./styles";

interface LayoutProps extends KindePageEvent {
  children: React.ReactNode;
}

export const Layout = ({
  request,
  context,
  children,
}: LayoutProps): React.JSX.Element => {
  return (
    <html lang={request.locale.lang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex" />
        <meta name="csrf-token" content={getKindeCSRF()} />
        <link
          rel="stylesheet"
          href="https://vid2doc-site.kindedemo.com/style.css"
        ></link>
        <title>{context.widget.content.page_title}</title>
        {getKindeRequiredCSS()}
        {getKindeRequiredJS()}
        <style
          dangerouslySetInnerHTML={{
            __html: generateCSSVariables(),
          }}
        />
      </head>
      <body>
        <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/gsap.min.js"></script>
        <div data-roast-root="true" data-kinde-root="true">
          {children}
        </div>
      </body>
    </html>
  );
};

export default Layout;
