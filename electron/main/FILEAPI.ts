import { error } from "node:console";
import { selectFile } from "./FileManager";

export interface IFileApi {
  [key: string]: Function;
}
export const FileAPI = {
  readFile: async () => {
    selectFile();
    console.log("SUMSUM FILE read");
    return new Promise((result, error) => {
      result("GOT IT ");
    });
  },
  writeFile: async () => {
    console.log("SUMSUM FILE write");
    return new Promise((result, error) => {
      result("GOT IT ");
    });
  },
  deleteFile: async () => {
    console.log("SUMSUM FILE delete");
    return new Promise((result, error) => {
      result("GOT IT ");
    });
  },
};
