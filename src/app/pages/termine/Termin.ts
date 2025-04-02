import { DomUtils, ElementType } from "htmlparser2";
import { Document, Element } from "domhandler";
import { getNodeContent } from "@/app/util";
export interface ITermin {
  key: string;
  name: string;
  content: string;
  eventDate?: string;
  eventTime?: string;
  createdAt: string;
  createdBy: string;
  _isModified: boolean;
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
  [key: string]: boolean | string | undefined | Function;
  key: string = "";
  name: string = "";
  content: string = "";
  eventDate?: string = undefined;
  eventTime?: string = undefined;
  createdAt: string = "";
  createdBy: string = "";
  _isModified: boolean = false;

  static getLabel = (field: string) => {
    switch (field) {
      case "key":
        return "Kennung:";
      case "name":
        return "Name:";
      case "content":
        return "Beschreibung";
      case "eventDate":
        return "Datum:";
      case "eventTime":
        return "Uhrzeit:";
      case "eventDateTime":
        return "Datum/Uhrzeit:";
      case "createdBy":
        return "erstellt von:";
      case "createdAt":
        return "letzte Änderung:";
    }
  };
  setValue = (field: string, value: string) => {
    switch (field) {
      case "key":
      case "name":
      case "content":
      case "eventDate":
      case "eventTime":
      case "eventDateTime":
      case "createdBy":
      case "createdAt": {
        this[field] = value;
        this["createdAt"] = new Date().toLocaleString();
        this._isModified = true;
      }
      default: {
        console.warn("Field not found", field);
      }
    }
  };
  getValue = (field: string): string => {
    switch (field) {
      case "key":
      case "name":
      case "content":
      case "eventDate":
      case "eventTime":
      case "eventDateTime":
      case "createdBy":
      case "createdAt":
        return this[field] as string;
      default: {
        console.warn("Field not found", field);
      }
    }
    return "";
  };
  /**
   * convert from HTMLElement to a valid Termin instance
   * @param terminNode
   * @returns
   */
  static fromHTML = (terminNode: Element): Termin | undefined => {
    const termin = new Termin();
    try {
      termin.key = terminNode.attribs[TerminIds.TERMIN_ID];
      termin.createdAt = terminNode.attribs[TerminIds.TERMIN_CREATED_AT];
      termin.createdBy = terminNode.attribs[TerminIds.TERMIN_CREATED_BY];

      termin.name = getNodeContent(TerminIds.TERMIN_NAME_ID, terminNode);
      termin.content = getNodeContent(TerminIds.TERMIN_CONTENT_ID, terminNode);
      termin.eventDate = getNodeContent(TerminIds.TERMIN_DATE, terminNode);
      termin.eventTime = getNodeContent(TerminIds.TERMIN_TIME, terminNode);
    } catch (error) {
      console.log("Error parsing TerminNode ", terminNode);
      return undefined;
    }

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
  static isTermin = (termin: Termin | undefined): termin is Termin => {
    return !!termin;
  };
  static fromDocument = (document: Document): Termin[] => {
    return DomUtils.getElementsByClassName(TerminIds.TERMIN_CLASS, document)
      .map((element: Element) => Termin.fromHTML(element))
      .filter(this.isTermin);
  };
}
