import { FileImporter } from "@/app/pages/termine/constants";
import { ChangeEvent, useState } from "react";

export const useImporter = <T,>() => {
  const [importer, setImporter] = useState<T>({} as T);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const key = event.target.attributes.getNamedItem("data-id")?.value ?? "";
    setImporterProperty(key, event.target.value ?? "");
  };

  const setImporterProperty = (field: string, value: string) => {
    setImporter((state) => ({
      ...state,
      [field]: value,
    }));
    console.log("SUMSUM importer ", importer);
  };
  return {
    importer,
    setImporterProperty,
    setImporter: (importer: T) => setImporter(importer),
    onChangeHandler,
  };
};
