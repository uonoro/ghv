import { create } from "zustand";
import { Termin } from "./Termin";

import { ReadFileResponse } from "electron/main/FILEAPI";

export interface TerminStore {
  termine: Termin[];
  importedFile?: ReadFileResponse;

  dispatch: (action: TerminActionType) => void;
}

export const useTerminStore = create<TerminStore>((set) => ({
  termine: [],
  importedFile: undefined,
  dispatch: (action: any) =>
    set((state: TerminStore) => terminReducer(state, action)),
}));

export enum TerminActions {
  SET_FILE_PATH = "SET_FILE_PATH",
  SET_IMPORT_RESPONSE = "SET_IMPORT_RESPONSE",
  SET_TERMINE = "SET_TERMINE",
}

export interface SetTermineAction {
  type: TerminActions.SET_TERMINE;
  payload: Termin[];
}
export interface SetImportResponseAction {
  type: TerminActions.SET_IMPORT_RESPONSE;
  payload?: ReadFileResponse;
}

type TerminActionType = SetTermineAction | SetImportResponseAction;

const terminReducer = (store: TerminStore, action: TerminActionType) => {
  switch (action.type) {
    case TerminActions.SET_TERMINE:
      return {
        ...store,
        termine: action.payload,
      };
    case TerminActions.SET_IMPORT_RESPONSE:
      return {
        ...store,
        importedFile: action.payload,
      };
    default:
      return store;
  }
  return store;
};
