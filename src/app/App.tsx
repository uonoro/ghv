import { Button } from "primereact/button";
import "./App.css";
import { Flex } from "@/components/layout/Flex";
import { PageHeader } from "@/components/PageHeader";
import { Outlet } from "react-router";
import { Navigation } from "./Navigation";
import { PageTitle } from "@/components/PageTitle";
import wappen from "../assets/images/wappen.gif";
export const App = () => {
  return (
    <>
      <PageTitle title="Start" />
      <div
        style={{ display: "flex", justifyContent: "center", margin: "5rem" }}
      >
        <img src={wappen} width={300} height={300} />
      </div>
    </>
  );
};
