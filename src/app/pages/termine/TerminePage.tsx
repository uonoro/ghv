import { PageTitle } from "@/components/PageTitle";
import { Termin } from "./Termin";
import { Flex } from "@/components/layout/Flex";
import { Button } from "primereact/button";
import { TerminActions, TerminStore, useTerminStore } from "./useTerminStore";
import { API } from "@/app/API";
import { ReadFileResponse } from "electron/main/FILEAPI";
import { TerminRenderer } from "./TerminRenderer";

export const TerminePage = () => {
  const termine = useTerminStore((store: TerminStore) => store.termine);

  return (
    <>
      <PageTitle title="Termine" />
      {termine.length === 0 && <ImportTermine />}
      <Flex col>
        {termine.map((termin) => (
          <TerminRenderer key={termin.key} termin={termin} />
        ))}
      </Flex>
    </>
  );
};

/*****************************************************
 *
 *****************************************************/
const ImportTermine = () => {
  const dispatch = useTerminStore((store: TerminStore) => store.dispatch);

  const onClick = () => {
    API.call("FILE.readFile", "").then((result: ReadFileResponse) => {
      const { document } = result;
      const termine = Termin.fromDocument(document);

      if (termine.length > 0) {
        dispatch({
          type: TerminActions.SET_TERMINE,
          payload: termine,
        });
      }
    });
  };

  return (
    <Flex col style={{ alignItems: "center" }}>
      <Flex>
        <h4>Termindatei noch nicht verfügbar.</h4>
      </Flex>
      <Flex>
        <h5>Datei jetzt einlesen.</h5>
      </Flex>
      <Flex>
        <Button onClick={onClick}>Datei aufwählen</Button>
      </Flex>
    </Flex>
  );
};
