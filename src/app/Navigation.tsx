import { routes } from "./routes";
import { useNavigate } from "react-router";
import { TabMenu } from "primereact/tabmenu";

export const Navigation = () => {
  const navigate = useNavigate();
  const navRoutes = routes
    .filter((routeCfg) => routeCfg.icon || routeCfg.label)
    .map((routeCfg) => {
      return {
        ...routeCfg,
        command: () => {
          navigate(routeCfg.route);
        },
      };
    });

  return <TabMenu model={navRoutes} />;
};
