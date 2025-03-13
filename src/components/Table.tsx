import { PropsWithChildren } from "react";

export const Table = (props: PropsWithChildren) => {
  return (
    <table>
      <tbody>{props.children}</tbody>
    </table>
  );
};
