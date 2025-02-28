import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { dialog } = require("electron");

const fs = require("fs");

export const selectFile = () => {
  return dialog.showOpenDialogSync({
    properties: ["openFile", "multiSelections"],
  });
};
