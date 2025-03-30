import { InputText } from "primereact/inputtext";
import { Termin } from "./Termin";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { ChangeEvent, ChangeEventHandler } from "react";
import { format, parse } from "date-fns";
import { Editor } from "primereact/editor";

type ChangeEventCallback = (
  dataId: string,
  event: Partial<ChangeEvent> | ChangeEvent
) => void;

const asChangeEvent = (dateOrTime?: string): any => {
  return {
    target: {
      value: dateOrTime,
    },
  };
};

export const getFieldEditor = (
  field: string,
  termin: Termin,
  changeHandler: ChangeEventCallback
) => {
  const style = { width: "100%" };
  switch (field) {
    case "key":
    case "name":
    case "createdBy":
      return (
        <InputText
          data-id={field}
          defaultValue={termin[field] ?? "nicht angegeben"}
          style={style}
          onChange={(event) => changeHandler(field, event)}
        />
      );
    case "content":
      return (
        <Editor
          data-id={field}
          value={termin[field]}
          style={{
            height: "20rem",
            fontSize: "1rem",
            backgroundColor: "white",
            borderRadius: "var(--ghv-border-radius)",
            ...style,
          }}
          onChange={(event) => changeHandler(field, event)}
        />
      );
    case "eventDate":
      return (
        <Calendar
          data-id={field}
          showTime={false}
          appendTo={"self"}
          dateFormat="dd.mm.yy"
          value={parse(termin[field], "dd.MM.yyyy", new Date())}
          onChange={(event) => console.log(event)}
        />
      );
    case "eventTime": {
      const date = parse(termin[field], "HH:mm", new Date());

      return (
        <Calendar
          data-id={field}
          timeOnly
          hourFormat="24"
          appendTo={"self"}
          value={date}
          onChange={(event) => {
            const formatted = event.value
              ? format(event.value, "HH:mm")
              : undefined;
            console.log("SUMSUM Formatted ", formatted);

            changeHandler(field, asChangeEvent(formatted));
          }}
        />
      );
    }
    case "createdAt":
      return null;
  }
};
