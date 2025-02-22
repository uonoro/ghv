import { create } from "zustand";
import { Termin } from "./Termin";
import { TransferType } from "./constants";

export interface TerminStore {
  termine: Termin[];
  filepath?: string;
  transferType: TransferType;
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
}

export interface SetFilePathAction {
  type: TerminActions.SET_FILE_PATH;
  payload: string;
}
export interface SetTransferTypeAction {
  type: TerminActions.SET_TRANSFERTYPE;
  payload: TransferType;
}

type TerminActionType = SetFilePathAction | SetTransferTypeAction;
const terminReducer = (store: TerminStore, action: TerminActionType) => {
  return store;
};
