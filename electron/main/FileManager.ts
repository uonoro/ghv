import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { dialog } = require("electron");

import { OpenDialogReturnValue } from "electron";
const fs = require("node:fs/promises");

export const selectFile = (): Promise<OpenDialogReturnValue> => {
  return dialog.showOpenDialog({
    properties: ["openFile" /*, "multiSelections"*/],
  });
};

export const readFileContent = (filePath: string): Promise<string> => {
  return fs.readFile(filePath, "utf8");
};
