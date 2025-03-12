import { readFileContent, selectFile } from "./FileManager";
import { OpenDialogReturnValue } from "electron";
import * as htmlparser from "htmlparser2";
import { Document } from "domhandler";

export interface ReadFileResponse {
  content: string;
  document: Document;
}
export interface IFileApi {
  [key: string]: Function;
}
export const FileAPI = {
  readFile: async (): Promise<ReadFileResponse> => {
    return new Promise((done, fail) => {
      selectFile().then((result: OpenDialogReturnValue) => {
        if (!result.canceled) {
          readFileContent(result.filePaths[0])
            .then((content: string) =>
              done({
                content: content,
                document: htmlparser.parseDocument(content),
              })
            )
            .catch(fail);
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
