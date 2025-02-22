import { DBAPI, IDBApi } from "./DBAPI";
import { FileAPI, IFileApi } from "./FILEAPI";

export interface IApi {
  [key: string]: IDBApi | IFileApi;
}
export const API = {
  DB: DBAPI,
  FILE: FileAPI,
};
