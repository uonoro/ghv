import { create } from "zustand";
import { Termin } from "./Termin";
import { TransferType } from "./constants";

export interface TerminStore {
  termine: Termin[];
  filepath?: string;
  transferType: TransferType;
  dispatch: (action: TerminActionType) => void;
}

export const useTerminStore = create<TerminStore>((set) => ({
  termine: [],
  transferType: TransferType.FILE,
  filepath: undefined,

  dispatch: (action: any) =>
    set((state: TerminStore) => terminReducer(state, action)),
}));

export enum TerminActions {
  SET_FILE_PATH = "SET_FILE_PATH",
  SET_TRANSFERTYPE = "SET_TRANSFERTYPE",
  SET_TERMINE = "SET_TERMINE",
}

export interface SetFilePathAction {
  type: TerminActions.SET_FILE_PATH;
  payload: string;
}
export interface SetTransferTypeAction {
  type: TerminActions.SET_TRANSFERTYPE;
  payload: TransferType;
}
export interface SetTermineAction {
  type: TerminActions.SET_TERMINE;
  payload: Termin[];
}

type TerminActionType =
  | SetFilePathAction
  | SetTransferTypeAction
  | SetTermineAction;

const terminReducer = (store: TerminStore, action: TerminActionType) => {
  switch (action.type) {
    case TerminActions.SET_TERMINE:
      return {
        ...store,
        termine: action.payload,
      };
    default:
      return store;
  }
  return store;
};
