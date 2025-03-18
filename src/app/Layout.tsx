import { PageHeader } from "@/components/PageHeader";
import { Navigation } from "./Navigation";
import { Outlet } from "react-router";
import { Flex } from "@/components/layout/Flex";

export const Layout = () => {
  return (
    <Flex col style={{ height: "100%" }}>
      <PageHeader />
      <Navigation />
      <div className="content" style={{ padding: "0 2rem" }}>
        <Outlet />
      </div>
      <Flex className="footer">erstellt von: Roth-IT Beratung</Flex>
    </Flex>
  );
};
