import { App } from "./App";
import { ReactNode } from "react";
import { Webseite } from "./pages/Webseite";
import { TerminePage } from "./pages/termine/TerminePage";
import { GalleriePage } from "./pages/GalleriePage";
interface UIRoute {
  route: string;
  label: string;
  icon: string;
  element: ReactNode;
}
export const routes: UIRoute[] = [
  {
    route: "/",
    label: "",
    icon: "pi pi-home",
    element: <App />,
  },
  {
    route: "/webseite/termine",
    label: "Termine",
    icon: "pi pi-globe",
    element: <TerminePage />,
  },
  {
    route: "/webseite/gallerie",
    label: "Gallerie",
    icon: "pi pi-image",
    element: <GalleriePage />,
  },
];
