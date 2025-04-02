import { PageTitle } from "@/components/PageTitle";

import { Flex } from "@/components/layout/Flex";

import { TerminActions, TerminStore, useTerminStore } from "./useTerminStore";
import { TerminRenderer } from "./TerminRenderer";
import { ImportModal } from "@/components/ImportModal";
import { Entities } from "./constants";
import { ReadFileResponse } from "electron/main/FILEAPI";
import { Termin } from "./Termin";

export const TerminePage = () => {
  const termine = useTerminStore((store: TerminStore) => store.termine);
  const importedFile = useTerminStore(
    (store: TerminStore) => store.importedFile
  );
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
  const onChange = (what: "delete" | "modify", termin: Termin) => {
    if (what === "delete") {
      const neue_termine = termine.filter((t) => t.key !== termin.key);
      dispatch({
        type: TerminActions.SET_TERMINE,
        payload: neue_termine,
      });
    } else {
      const neue_termine = termine.filter((t) => t.key !== termin.key);
      neue_termine.push(termin);
      dispatch({
        type: TerminActions.SET_TERMINE,
        payload: neue_termine,
      });
    }
  };

  return (
    <>
      <PageTitle title="Termine" />
      {importedFile === undefined && (
        <ImportModal
          entity={Entities.TERMINE}
          onImportResult={onImportResult}
        />
      )}
      <Flex col style={{ alignItems: "center" }}>
        {termine.length > 0 &&
          termine.map((termin) => (
            <TerminRenderer
              key={termin.key}
              termin={termin}
              onChange={onChange}
            />
          ))}
        {importedFile && termine.length === 0 && (
          <NoEventsAvailable
            onClick={() => {
              dispatch({
                type: TerminActions.SET_TERMINE,
                payload: [new Termin()],
              });
            }}
          />
        )}
      </Flex>
    </>
  );
};

/**
 *
 */
const NoEventsAvailable = ({ onClick }: { onClick: () => void }) => {
  return (
    <Flex col className={"no-file-imported"} onClick={onClick}>
      <i
        className="pi pi-calendar-plus"
        style={{ fontSize: "3rem", color: "var(--blue-400)" }}
      />
      <p>Keine Termine verfügbar.</p>
      <p>Hier clicken um einen neuen Termine zu erstellen.</p>
    </Flex>
  );
};
