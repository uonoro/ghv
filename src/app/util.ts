import { DomUtils, ElementType } from "htmlparser2";
import { Element } from "domhandler";

export const getNodeContent = (nodeId: string, element: Element): string => {
  const node = DomUtils.getElementById(nodeId, element)?.children[0];

  return node?.type == ElementType.Text ? node.data : "";
};
