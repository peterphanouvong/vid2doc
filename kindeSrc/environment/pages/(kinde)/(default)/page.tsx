"use server";

import {
  getKindeWidget,
  getLogoUrl,
  type KindePageEvent,
} from "@kinde/infrastructure";
import React from "react";
// @ts-ignore
import { renderToString } from "react-dom/server.browser";
import Layout from "../../layout";

const styles: {
  container: React.CSSProperties;
  sidePanel: React.CSSProperties;
  loginForm: React.CSSProperties;
  heading: React.CSSProperties;
  description: React.CSSProperties;
  logoWrapper: React.CSSProperties;
  logo: React.CSSProperties;
} = {
  container: {
    display: "flex",
    height: "100vh",
  },
  sidePanel: {
    borderTopLeftRadius: "2rem",
    borderBottomLeftRadius: "2rem",
    borderBottomRightRadius: "0.5rem",
    borderTopRightRadius: "0.5rem",
    backgroundColor: "#f5f5f5",
    borderColor: "#ccc",
    borderStyle: "solid",
    borderWidth: "1px",
    flex: 1,
    margin: "0.5rem",
    maxWidth: "1024px",
  },
  loginForm: {
    minWidth: "400px",
    margin: "0 auto",
    minInlineSize: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  heading: {
    fontWeight: "600",
    fontSize: "1.5rem",
  },
  description: {
    fontSize: "14px",
    marginBottom: "1.5rem",
    color: "#555",
  },
  logoWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "1rem",
  },
  logo: {
    width: "44px",
    height: "44px",
  },
};

const DefaultPage: React.FC<KindePageEvent> = ({ context, request }) => {
  return (
    <Layout context={context} request={request}>
      <div style={styles.container}>
        <main style={styles.loginForm}>
          <div style={{ padding: "2rem" }}>
            <div style={{ textAlign: "center" }}>
              <div style={styles.logoWrapper}>
                <img
                  style={styles.logo}
                  src={getLogoUrl()}
                  alt={context.widget.content.logo_alt}
                />
              </div>
              <h2 style={styles.heading}>{context.widget.content.heading}</h2>
              <p style={styles.description}>
                {context.widget.content.description}
              </p>
            </div>
            {getKindeWidget()}
          </div>
        </main>
        <div style={styles.sidePanel}></div>
      </div>
    </Layout>
  );
};

// Page Component
export default async function Page(event: KindePageEvent): Promise<string> {
  const page = await DefaultPage(event);
  return renderToString(page);
}
