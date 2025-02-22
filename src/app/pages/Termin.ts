import { S } from "react-router/dist/development/route-data-Cw8htKcF";

export interface ITermin {
  key: string;
  name: string;
  description: string;
  eventDateTime: number;
  createdAt: number;
  createdBy: string;
}

export class Termin implements ITermin {
  key: string = "";
  name: string = "";
  description: string = "";
  eventDateTime: number = 0;
  createdAt: number = 0;
  createdBy: string = "";

  static getLabel = (field: string) => {
    switch (field) {
      case "name":
        return "Termin Name";
      case "description":
        return "Termin Beschreibung";
      case "eventDateTime":
        return "Datum/Uhrzeit";
      case "createdBy":
        return "erstellt von";
    }
  };
}
