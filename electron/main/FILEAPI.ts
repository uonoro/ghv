import { readFileContent, selectFile } from "./FileManager";
import { OpenDialogReturnValue } from "electron";
import * as htmlparser from "htmlparser2";
import { Document } from "domhandler";
import { LocalFileImporter } from "@/app/pages/termine/constants";

export interface ReadFileResponse {
  content: string;
  document: Document;
}
export interface IFileApi {
  [key: string]: Function;
}
export const FileAPI = {
  readFile: async (importer: LocalFileImporter): Promise<ReadFileResponse> => {
    return new Promise((done, fail) => {
      readFileContent(importer.path)
        .then((content: string) =>
          done({
            content: content,
            document: htmlparser.parseDocument(content),
          })
        )
        .catch(fail);
    });
  },
  selectFile: async () => {
    return new Promise((done, fail) => {
      selectFile().then(done).catch(fail);
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
