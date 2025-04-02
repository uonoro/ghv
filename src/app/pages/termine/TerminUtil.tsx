import { InputText } from "primereact/inputtext";
import { Termin } from "./Termin";
import { Calendar } from "primereact/calendar";
import { format, parse } from "date-fns";
import { Editor } from "primereact/editor";
import { log } from "node:console";

export type GHVChangeEventHandler = (field: string, value: string) => void;

export const getFieldEditor = (
  field: string,
  value: string,
  changeHandler: GHVChangeEventHandler
) => {
  const style = { width: "100%" };

  switch (field) {
    case "key":
    case "name":
    case "createdBy":
      return (
        <InputText
          data-id={field}
          defaultValue={value ?? "nicht angegeben"}
          style={style}
          onChange={(event) => changeHandler(field, event.target.value)}
        />
      );
    case "content":
      return (
        <Editor
          data-id={field}
          value={value}
          style={{
            height: "20rem",
            fontSize: "1rem",
            backgroundColor: "white",
            borderRadius: "var(--ghv-border-radius)",
            ...style,
          }}
          onTextChange={(event) => {
            const value = event.htmlValue;
            changeHandler(field, value ?? "");
          }}
        />
      );
    case "eventDate": {
      const date = value ? parse(value, "dd.MM.yyyy", new Date()) : new Date();
      console.log("SUMSUM ", date, value);

      return (
        <Calendar
          data-id={field}
          showTime={false}
          showIcon={true}
          appendTo={"self"}
          dateFormat="dd.mm.yy"
          value={date}
          onChange={(event) => {
            const formatted = event.value
              ? format(event.value, "dd.MM.yyyy")
              : "";
            changeHandler(field, formatted);
          }}
        />
      );
    }
    case "eventTime": {
      const date = value ? parse(value, "HH:mm", new Date()) : new Date();

      return (
        <Calendar
          data-id={field}
          timeOnly
          showIcon={true}
          hourFormat="24"
          icon={() => <i className="pi pi-clock" />}
          appendTo={"self"}
          value={date}
          onChange={(event) => {
            const formatted = event.value ? format(event.value, "HH:mm") : "";

            changeHandler(field, formatted);
          }}
        />
      );
    }
    case "createdAt":
      const nowString = new Date().toLocaleString();
      const date = parse(value ?? nowString, "dd.MM.yyyy, HH:mm", new Date());
      return (
        <Calendar
          data-id={field}
          hourFormat="24"
          appendTo={"self"}
          value={date}
        />
      );
  }
};
