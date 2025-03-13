import { CSSProperties, MouseEventHandler, PropsWithChildren } from "react";

interface FlexProps extends PropsWithChildren {
  col?: boolean;
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler;
}

export const Flex = (props: FlexProps) => {
  const { style = {} } = props;
  const flexStyle: CSSProperties = {
    display: "flex",
    flexDirection: props.col ? "column" : "row",
    ...style,
  };
  return (
    <div className={props.className} style={flexStyle} onClick={props.onClick}>
      {props.children}
    </div>
  );
};
