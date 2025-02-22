import { PageTitle } from "@/components/PageTitle";
import { ChangeEvent, useState } from "react";
import { Termin } from "./Termin";
import { Flex } from "@/components/layout/Flex";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { Calendar } from "primereact/calendar";
import { FormEvent } from "primereact/ts-helpers";

export const TerminePage = () => {
  const [termine, setTermine] = useState<Termin[]>([]);

  const onAddTermin = () => {
    setTermine([...termine, {} as Termin]);
  };

  return (
    <>
      <PageTitle title="Termine" />
      <Flex style={{ width: "100%", justifyContent: "flex-end" }}>
        <Button>Speichern</Button>
      </Flex>

      <Flex col>
        {
          <Flex col style={{ width: "100%", alignItems: "center" }}>
            {termine.length === 0 && <p>Noch kein Termin vorhanden</p>}
            <a href="javascript:;" onClick={() => onAddTermin()}>
              Neuen Termin erstellen
            </a>
          </Flex>
        }

        {termine.map((termin, index) => (
          <TerminRenderer key={index} termin={termin} />
        ))}
      </Flex>
    </>
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
      <Flex>
        <span>{termin.name ?? NOT_AVAILABLE}</span> am
        {termin.eventDateTime ?? NOT_AVAILABLE}
        <span>{termin.eventDateTime ?? NOT_AVAILABLE}</span>
        <span>{termin.description ?? NOT_AVAILABLE}</span>
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
