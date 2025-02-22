import { Button } from "primereact/button";
import "./App.css";
import { Flex } from "@/components/layout/Flex";
import { PageHeader } from "@/components/PageHeader";
import { Outlet } from "react-router";
import { Navigation } from "./Navigation";
import { PageTitle } from "@/components/PageTitle";

export const App = () => {
  return (
    <>
      <PageTitle title="Start" />
    </>
  );
};
