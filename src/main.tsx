import React from "react";
import ReactDOM from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primeicons/primeicons.css";

import "./index.css";

import { BrowserRouter, HashRouter, Route, Routes } from "react-router";
import { routes } from "./app/routes";
import { Layout } from "./app/Layout";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            {routes.map((route) => (
              <Route
                key={route.route}
                path={route.route}
                element={route.element}
              />
            ))}
          </Route>
        </Routes>
      </HashRouter>
    </PrimeReactProvider>
  </React.StrictMode>
);

postMessage({ payload: "removeLoading" }, "*");
