// import React from 'react';
// import { createRoot } from 'react-dom/client';
// // import { Popup } from './Popup';
// import { Clipboard } from './Clipboard';

// const container = document.getElementById('root');
// // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
// const root = createRoot(container!);
// root.render(<Clipboard />);

import React from "react";
import ReactDOM from "react-dom";
import { Clipboard } from "./Clipboard";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain={"dev-qu5lnxfn8lophrcd.us.auth0.com"}
    clientId={"U4B2PRZwMvA6rWt90WdLF7nHNqBiVH4V"}
    // redirectUri={"http://localhost:3000/dashboard"}
    redirectUri={"chrome-extension://ndhjnbhhijpobdlgbmbmchgilhmanapn"}
    audience={"toranoi-backend-local"}
    scope={"read:status"}
  >
    <Clipboard />
  </Auth0Provider>,
  document.getElementById("root")
);