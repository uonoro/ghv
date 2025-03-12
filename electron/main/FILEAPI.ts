import { error } from "node:console";
import { readFileContent, selectFile } from "./FileManager";
import { OpenDialogReturnValue } from "electron";

export interface IFileApi {
  [key: string]: Function;
}
export const FileAPI = {
  readFile: async () => {
    return new Promise((done, fail) => {
      selectFile().then((result: OpenDialogReturnValue) => {
        if (!result.canceled) {
          readFileContent(result.filePaths[0]).then(done).catch(fail);
        }
      });
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
