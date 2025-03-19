import { InputText } from "primereact/inputtext";
import { Termin } from "./Termin";
import { InputTextarea } from "primereact/inputtextarea";

export const getFieldEditor = (field: string, termin: Termin) => {
  const style = { width: "100%" };
  switch (field) {
    case "key":

    case "name":

    case "createdBy":
      return <InputText defaultValue={termin[field]} style={style} />;
    case "content":
      return (
        <InputTextarea
          defaultValue={termin[field]}
          style={{ ...style }}
          rows={5}
        />
      );
    case "eventDate":
    case "eventTime":
    case "eventDateTime":
    case "createdAt":
      return null;
  }
};
