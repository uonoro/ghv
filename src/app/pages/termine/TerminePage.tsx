import { PageTitle } from "@/components/PageTitle";

import { Flex } from "@/components/layout/Flex";

import { TerminActions, TerminStore, useTerminStore } from "./useTerminStore";
import { TerminRenderer } from "./TerminRenderer";
import { ImportModal } from "@/components/ImportModal";
import { useState } from "react";
import { Entities } from "./constants";
import { ReadFileResponse } from "electron/main/FILEAPI";
import { Termin } from "./Termin";

export const TerminePage = () => {
  const termine = useTerminStore((store: TerminStore) => store.termine);
  const dispatch = useTerminStore((store: TerminStore) => store.dispatch);

  const onImportResult = (result: ReadFileResponse) => {
    const { document } = result;
    const termine = Termin.fromDocument(document);

    if (termine.length > 0) {
      dispatch({
        type: TerminActions.SET_IMPORT_RESPONSE,
        payload: result,
      });
      dispatch({
        type: TerminActions.SET_TERMINE,
        payload: termine,
      });
    }
  };
  return (
    <>
      <PageTitle title="Termine" />
      <ImportModal entity={Entities.TERMINE} onImportResult={onImportResult} />
      <Flex col>
        {termine.map((termin) => (
          <TerminRenderer key={termin.key} termin={termin} />
        ))}
      </Flex>
    </>
  );
};
