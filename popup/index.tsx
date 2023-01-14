// @ts-nocheck 
import React from "react";
import { Clipboard } from "./Clipboard";
import { Auth0Provider } from "@auth0/auth0-react";
import { MantineProvider } from '@mantine/core';
import { createRoot } from 'react-dom/client';
import './style.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <Auth0Provider
      domain={"dev-qu5lnxfn8lophrcd.us.auth0.com"}
      clientId={"U4B2PRZwMvA6rWt90WdLF7nHNqBiVH4V"}
      // redirectUri={"http://localhost:3000/dashboard"}
      redirectUri={"chrome-extension://ndhjnbhhijpobdlgbmbmchgilhmanapn"}
      audience={"toranoi-backend-local"}
      scope={"read:status"}
    >
      <Clipboard />
    </Auth0Provider>
  </MantineProvider>
)

// ReactDOM.render(
//   <Auth0Provider
//     domain={"dev-qu5lnxfn8lophrcd.us.auth0.com"}
//     clientId={"U4B2PRZwMvA6rWt90WdLF7nHNqBiVH4V"}
//     // redirectUri={"http://localhost:3000/dashboard"}
//     redirectUri={"chrome-extension://ndhjnbhhijpobdlgbmbmchgilhmanapn"}
//     audience={"toranoi-backend-local"}
//     scope={"read:status"}
//   >
//     <MantineProvider withGlobalStyles withNormalizeCSS>
//       <Clipboard />
//     </MantineProvider>
//   </Auth0Provider>,
//   document.getElementById("root")
// );