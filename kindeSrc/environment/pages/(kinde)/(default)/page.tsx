"use server";

import {
  getDarkModeLogoUrl,
  getKindeWidget,
  getLogoUrl,
  type KindePageEvent,
} from "@kinde/infrastructure";
import React from "react";
// @ts-ignore
import { renderToString } from "react-dom/server.browser";
import Layout from "../../layout";

const DefaultPage: React.FC<KindePageEvent> = ({ context, request }) => {
  return (
    <Layout context={context} request={request}>
      <div className="container">
        <main className="login-form">
          <div className="p-2 bg-amber-50">
            <div style={{ textAlign: "center" }}>
              <div className="logo-wrapper">
                <picture>
                  <source
                    media="(prefers-color-scheme: dark)"
                    srcSet={getDarkModeLogoUrl()}
                  />
                  <img
                    className="logo"
                    src={getLogoUrl()}
                    alt={context.widget.content.logo_alt}
                  />
                </picture>
              </div>
              <h2 className="heading">{context.widget.content.heading}</h2>
              <p className="description">
                {context.widget.content.description}
              </p>
            </div>
            {getKindeWidget()}
          </div>
        </main>
        <div className="side-panel"></div>
      </div>
    </Layout>
  );
};

// Page Component
export default async function Page(event: KindePageEvent): Promise<string> {
  const page = await DefaultPage(event);
  return renderToString(page);
}
