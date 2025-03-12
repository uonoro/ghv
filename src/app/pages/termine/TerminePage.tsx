import { PageTitle } from "@/components/PageTitle";
import { ChangeEvent, useRef, useState } from "react";
import { Termin } from "./Termin";
import { Flex } from "@/components/layout/Flex";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { Calendar } from "primereact/calendar";
import { FormEvent } from "primereact/ts-helpers";
import { TerminActions, TerminStore, useTerminStore } from "./useTerminStore";
import { API } from "@/app/API";
import { ReadFileResponse } from "electron/main/FILEAPI";

export const TerminePage = () => {
  const termine = useTerminStore((store: TerminStore) => store.termine);

  return (
    <>
      <PageTitle title="Termine" />
      {termine.length === 0 && <ImportTermine />}
      <Flex col>
        {termine.map((termin) => (
          <TerminRenderer termin={termin} />
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

/*****************************************************
 *
 *****************************************************/

interface TerminRendererProps {
  termin: Termin;
}
const NOT_AVAILABLE = "Nicht angegeben";
const TerminRenderer = (props: TerminRendererProps) => {
  const [termin, setTermin] = useState<Termin>(props.termin);
  const [editing, setEditing] = useState<boolean>(false);

  if (editing) {
    return (
      <TerminEditor termin={termin} onSave={(termin) => setTermin(termin)} />
    );
  }

  const asTableRow = (prop: string, termin: Termin) => {
    return (
      <td>
        <td>{Termin.getLabel(prop)}</td>
        <td>{termin[prop] as string}</td>
      </td>
    );
  };
  return (
    <Flex
      col
      style={{
        border: "1px solid var(--ghv-primary-color)",
        borderRadius: "4px",
        padding: "1rem",
      }}
    >
      <Flex style={{ justifyContent: "space-between", width: "100%" }}>
        <span>Termin</span>
        <Button onClick={() => setEditing(true)} icon="pi pi-pen-to-square" />
      </Flex>
      <table>
        <tbody>
          <tr></tr>
        </tbody>
      </table>
      <Flex col>
        <span>{termin.name ?? NOT_AVAILABLE}</span> am
        {termin.eventDate ?? NOT_AVAILABLE}
        <span>{termin.eventTime ?? NOT_AVAILABLE}</span>
        <span>{termin.content ?? NOT_AVAILABLE}</span>
      </Flex>
    </Flex>
  );
};

/*****************************************************
 *
 *****************************************************/

interface TerminEditorProps {
  termin: Termin;
  onSave: (termin: Termin) => void;
}
const TerminEditor = (props: TerminEditorProps) => {
  const [formData, setFormData] = useState<Termin>(props.termin ?? {});

  const handleChange = (
    event: ChangeEvent | FormEvent | EditorTextChangeEvent
  ) => {
    console.log(event);
  };

  return (
    <Flex col>
      <Flex>
        <label>{Termin.getLabel("name")}</label>
        <InputText data-id="name" onChange={handleChange} />
      </Flex>
      <Flex>
        <label>{Termin.getLabel("eventDateTime")}</label>
        <Calendar data-id="name" onChange={handleChange} />
      </Flex>
      <Flex>
        <label>{Termin.getLabel("description")}</label>
        <Editor data-id="description" onTextChange={handleChange} />
      </Flex>
      <Flex>
        <label>{Termin.getLabel("createdBy")}</label>
        <InputText data-id="createdBy" onChange={handleChange} />
      </Flex>
    </Flex>
  );
};
