import { DomUtils, ElementType } from "htmlparser2";
import { Document, Element } from "domhandler";
import { getNodeContent } from "@/app/util";
export interface ITermin {
  key: string;
  name: string;
  content: string;
  eventDate: string;
  eventTime: string;
  createdAt: string;
  createdBy: string;
}

enum TerminIds {
  CONTAINER = "termine-container",
  TERMIN_CLASS = "termin",
  TERMIN_ID = "id",
  TERMIN_NAME_ID = "termin.name",
  TERMIN_CONTENT_ID = "termin.content",
  TERMIN_DATE = "termin.date",
  TERMIN_TIME = "termin.time",
  TERMIN_CREATED_AT = "termin.created.at",
  TERMIN_CREATED_BY = "termin.created.by",
}

export class Termin implements ITermin {
  [key: string]: string | undefined;
  key: string = "";
  name: string = "";
  content: string = "";
  eventDate: string = "";
  eventTime: string = "";
  createdAt: string = "";
  createdBy: string = "";

  static getLabel = (field: string) => {
    switch (field) {
      case "name":
        return "Termin Name";
      case "content":
        return "Termin Beschreibung";
      case "eventDateTime":
        return "Datum/Uhrzeit";
      case "createdBy":
        return "erstellt von";
    }
  };

  /**
   *
   * @param terminNode
   * @returns
   */
  static fromHTML = (terminNode: Element): Termin | undefined => {
    const termin = new Termin();
    termin.key = terminNode.attribs[TerminIds.TERMIN_ID];
    termin.createdAt = terminNode.attribs[TerminIds.TERMIN_CREATED_AT];
    termin.createdBy = terminNode.attribs[TerminIds.TERMIN_CREATED_BY];

    termin.name = getNodeContent(TerminIds.TERMIN_NAME_ID, terminNode);
    termin.content = getNodeContent(TerminIds.TERMIN_CONTENT_ID, terminNode);
    termin.eventDate = getNodeContent(TerminIds.TERMIN_DATE, terminNode);
    termin.eventTime = getNodeContent(TerminIds.TERMIN_TIME, terminNode);

    console.log("SUMSUM terminNode ", termin);

    return termin;
  };
  /**
   *
   * @param termin
   * @returns
   */
  static toHTML = (termin: Termin): Element | undefined => {
    return undefined;
  };

  static fromDocument = (document: Document): Termin[] => {
    return DomUtils.getElementsByClassName(TerminIds.TERMIN_CLASS, document)
      .map((element: Element) => Termin.fromHTML(element))
      .filter((termin) => !!termin);
  };
}
