"use server";

import React from "react";

import { getKindeRequiredCSS, getKindeRequiredJS } from "@kinde/infrastructure";
import { renderToString } from "react-dom/server";

export const pageSettings = {
  bindings: {
    "kinde.localization": {},
  },
};

const Layout = async ({ request }) => {
  return (
    <html lang={request.locale.lang}>
      <head>meta</head>
      <body>sup</body>
    </html>
  );
};

export default async function Page(event) {
  const page = await Layout({ ...event });
  return renderToString(page);
}
