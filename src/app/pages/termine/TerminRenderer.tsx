import { Flex } from "@/components/layout/Flex";
import { Button } from "primereact/button";
import { useState } from "react";
import { Termin } from "./Termin";

interface TerminRendererProps {
  termin: Termin;
}
export const TerminRenderer = ({ termin }: TerminRendererProps) => {
  const [editingTermin, setEditingTermin] = useState<Termin>(new Termin());
  const [editing, setEditing] = useState<boolean>(false);

  const asTableRow = (prop: string, termin: Termin, editing: boolean) => {
    return (
      <tr key={prop}>
        <td valign="top" style={{ minWidth: "15rem" }}>
          {Termin.getLabel(prop)}
        </td>
        {!editing && <td>{termin[prop]}</td>}
        {editing && null}
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
          <Button
            outlined
            onClick={onStartEditing}
            icon="pi pi-pen-to-square"
          />
        )}
        {editing && (
          <Button outlined onClick={onStopEditing} icon="pi pi-save" />
        )}
      </Flex>
      <table>
        <tbody>
          {fields.map((field) => asTableRow(field, termin, editing))}
        </tbody>
      </table>
    </Flex>
  );
};
