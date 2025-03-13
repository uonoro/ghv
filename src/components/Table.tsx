import { PropsWithChildren } from "react";

export const Table = (props: PropsWithChildren) => {
  return (
    <table style={{ width: "100%" }}>
      <tbody>{props.children}</tbody>
    </table>
  );
};
