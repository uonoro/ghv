import { Flex } from "@/components/layout/Flex";
import { Button } from "primereact/button";
import { useState } from "react";
import { Termin } from "./Termin";
import { getFieldEditor } from "./TerminUtil";

interface TerminRendererProps {
  termin: Termin;
  onChange: (what: "delete" | "modify", termin: Termin) => void;
}
export const TerminRenderer = ({ termin, onChange }: TerminRendererProps) => {
  const [editingTermin, setEditingTermin] = useState<Termin>(new Termin());
  const [editing, setEditing] = useState<boolean>(false);

  const asTableRow = (prop: string, termin: Termin, editing: boolean) => {
    return (
      <tr key={prop}>
        <td valign="top" style={{ minWidth: "15rem", verticalAlign: "center" }}>
          {Termin.getLabel(prop)}
        </td>
        {!editing && <td style={{ width: "80%" }}>{termin[prop]}</td>}
        {editing && (
          <td style={{ width: "80%" }}>{getFieldEditor(prop, termin)}</td>
        )}
      </tr>
    );
  };

  const onStartEditing = () => {
    setEditingTermin(termin);
    setEditing(true);
  };
  const onStopEditing = () => {
    setEditing(false);
  };

  const onSave = () => {
    setEditing(false);
  };

  const onDelete = () => {
    onChange("delete", termin);
    console.log("SUMSUM DELETE ");
  };

  const fields = [
    "key",
    "name",
    "eventDate",
    "eventTime",
    "content",
    "createdBy",
    "createdAt",
  ];
  return (
    <Flex
      col
      style={{
        position: "relative",
        border: "1px solid var(--ghv-primary-color-light)",
        borderRadius: "4px",
        padding: "1rem",
        margin: "1rem 0",
        width: "100%",
        boxShadow: "var(--ghv-box-shadow)",
      }}
    >
      <Flex
        style={{
          justifyContent: "flex-end",
          width: "100%",
          position: "absolute",
          top: 10,
          right: 10,
        }}
      >
        {!editing && (
          <>
            <Button
              outlined
              onClick={onDelete}
              icon="pi pi-trash"
              style={{ margin: " 0 .5rem", color: "red" }}
              tooltip={"Termin löschen "}
            />
            <Button
              outlined
              onClick={onStartEditing}
              icon="pi pi-pen-to-square"
              tooltip="Termin ändern"
            />
          </>
        )}
        {editing && (
          <>
            <Button
              outlined
              onClick={onStopEditing}
              icon="pi pi-undo"
              style={{ margin: " 0 .5rem", color: "gray" }}
              tooltip={"Termin löschen "}
            />
            <Button outlined onClick={onSave} icon="pi pi-save" />
          </>
        )}
      </Flex>
      <table style={{ marginTop: "3rem" }}>
        <tbody>
          {fields.map((field) => asTableRow(field, termin, editing))}
        </tbody>
      </table>
    </Flex>
  );
};
