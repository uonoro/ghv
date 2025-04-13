import { TransferType } from "@/app/pages/termine/constants";
import { ChangeEvent, useEffect, useState } from "react";

export const useImporter = <T,>(type: TransferType) => {
  const [importer, setImporter] = useState<T>({} as T);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const key = event.target.attributes.getNamedItem("data-id")?.value ?? "";
    setImporterProperty(key, event.target.value ?? "");
  };

  useEffect(() => {
    const jsonString = localStorage.getItem(`${type}_importer`);
    if (jsonString) {
      const importer = JSON.parse(jsonString);
      setImporter(importer);
    }
  }, []);

  const setImporterProperty = (field: string, value: string) => {
    setImporter((state) => ({
      ...state,
      [field]: value,
    }));
  };

  const setAndSaveImporter = (importer: T) => {
    const jsonString = JSON.stringify(importer);
    localStorage.setItem(`${type}_importer`, jsonString);
    setImporter(importer);
  };
  return {
    importer,
    setImporterProperty,
    setImporter: (importer: T) => setAndSaveImporter(importer),
    onChangeHandler,
  };
};
