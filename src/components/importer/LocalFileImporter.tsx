import { API } from "@/app/API";
import { useImporter } from "../useImporter";
import { LocalFileImporter, TransferType } from "@/app/pages/termine/constants";
import { MouseEvent, useEffect } from "react";
import { OpenDialogReturnValue } from "electron";
import { InputText } from "primereact/inputtext";
import { Flex } from "../layout/Flex";
import { Table } from "../Table";
import { Button } from "primereact/button";

export const ImportLocalFile = ({
  onChange,
}: {
  onChange: (importer: LocalFileImporter) => void;
}) => {
  const { importer, onChangeHandler, setImporter } =
    useImporter<LocalFileImporter>(TransferType.FILE);

  useEffect(() => {
    if (importer) {
      onChange(importer);
    }
  }, [importer]);

  /**
   *
   * @param event
   */
  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    API.call("FILE.selectFile", "").then((result: OpenDialogReturnValue) => {
      if (result.canceled) return;

      const importer = {
        path: result.filePaths[0],
      };
      setImporter(importer as LocalFileImporter);
      onChange(importer as LocalFileImporter);
    });
  };
  const cellStyle = {
    padding: ".5rem 0",
  };
  return (
    <div>
      <p style={{ margin: "1rem 0" }}>
        Importieren der Termin-Seite von der localen Festplatte
      </p>
      <Table>
        <tr>
          <td style={cellStyle}>Pfad:</td>
          <td style={cellStyle}>
            <Flex style={{ position: "relative" }}>
              <InputText
                data-id={"path"}
                style={{ width: "100%" }}
                defaultValue={importer.path}
                onChange={onChangeHandler}
              />
              <Button
                style={{ border: "none", boxShadow: "none" }}
                onClick={(e) => onClick(e)}
                text
                icon="pi pi-folder-open"
              />
            </Flex>
          </td>
        </tr>
      </Table>
      <p />
    </div>
  );
};
