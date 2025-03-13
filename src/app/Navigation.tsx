import { routes } from "./routes";
import { useLocation, useNavigate } from "react-router";
import { TabMenu } from "primereact/tabmenu";

export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  return (
    <TabMenu
      model={navRoutes}
      activeIndex={routes.findIndex(
        (route) => route.route === location.pathname
      )}
    />
  );
};
