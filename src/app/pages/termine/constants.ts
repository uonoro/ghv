import { S } from "react-router/dist/development/route-data-H2S3hwhf";

export enum TransferType {
  FILE = "Datei",
  FTP = "FTP",
  HTTP = "HTTP",
}

export enum Entities {
  TERMINE = "termine",
  GALLERIE = "gallerie",
}

export interface LocalFileImporter {
  path: string;
  fileName: string;
}
export interface HTTPFileImporter {
  fileUrl: string;
}
export interface FTPFileImporter {
  hostName: string;
  user: string;
  password: string;
  path: string;
  fileName: string;
}

export type FileImporter =
  | LocalFileImporter
  | HTTPFileImporter
  | FTPFileImporter;
