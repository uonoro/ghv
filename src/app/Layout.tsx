import { PageHeader } from "@/components/PageHeader";
import { Navigation } from "./Navigation";
import { Outlet } from "react-router";

export const Layout = () => {
  return (
    <>
      <PageHeader />
      <Navigation />
      <div style={{ margin: "0 2rem" }}>
        <Outlet />
      </div>
    </>
  );
};
