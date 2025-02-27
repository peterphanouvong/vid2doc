"use server";

import {
  getKindeCSRF,
  getKindeRequiredCSS,
  getKindeRequiredJS,
  type KindePageEvent,
} from "@kinde/infrastructure";
import React from "react";

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
        <title>{context.widget.content.page_title}</title>
        {getKindeRequiredCSS()}
        {getKindeRequiredJS()}
        <link
          href="https://vid2doc-site.kindedemo.com/output.css"
          rel="stylesheet"
        ></link>
        <link
          rel="stylesheet"
          href="https://vid2doc-site.kindedemo.com/style.css"
        ></link>
      </head>
      <body>
        <div data-roast-root="true" data-kinde-root="true">
          {children}
        </div>
        <script src="https://vid2doc-site.kindedemo.com/auth.js"></script>
      </body>
    </html>
  );
};

export default Layout;
