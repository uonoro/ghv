import { PageHeader } from "@/components/PageHeader";
import { Navigation } from "./Navigation";
import { Outlet } from "react-router";
import { Flex } from "@/components/layout/Flex";

export const Layout = () => {
  return (
    <Flex col className="app-container">
      <PageHeader />
      <Navigation />
      <div className="content">
        <Outlet />
      </div>
      <Flex className="footer">erstellt von: Roth-IT Beratung</Flex>
    </Flex>
  );
};
