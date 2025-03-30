import {
  Entities,
  FileImporter,
  FTPFileImporter,
  HTTPFileImporter,
  LocalFileImporter,
  TransferType,
} from "@/app/pages/termine/constants";
import {
  TerminStore,
  useTerminStore,
} from "@/app/pages/termine/useTerminStore";
import { Dialog } from "primereact/dialog";
import {
  ChangeEventHandler,
  MouseEvent,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { Flex } from "./layout/Flex";
import "./ImportModal.css";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { InputText } from "primereact/inputtext";
import { Table } from "./Table";
import { useImporter } from "./useImporter";
import { API } from "@/app/API";
import { OpenDialogReturnValue } from "electron/renderer";
import { ReadFileResponse } from "electron/main/FILEAPI";

interface ImportModalProps {
  entity: Entities;
  onImportResult: (result: ReadFileResponse) => void;
}
export const ImportModal = ({ entity, onImportResult }: ImportModalProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [importer, setImporter] = useState<FileImporter | undefined>();

  const importedFile = useTerminStore(
    (store: TerminStore) => store.importedFile
  );

  if (importedFile) return null;

  const getImporter = (type: TransferType) => {
    switch (type) {
      case TransferType.FILE:
        return (
          <ImportLocalFile
            onChange={(importer: LocalFileImporter) => {
              setImporter(importer);
            }}
          />
        );
      case TransferType.FTP:
      case TransferType.HTTP:
        return (
          <>
            <p>Dieser Bereich befinget sich noch in Arbeit. </p>
            <p>Gut Ding will Weile haben.</p>
          </>
        );
      default:
        return null;
    }
  };

  const onOk = () => {
    setModalOpen(false);
    API.call("FILE.readFile", importer)
      .then((result) => {
        onImportResult(result);
      })
      .catch((error) => {
        console.log("Error Reading fild");
      });
  };

  return (
    <>
      <Flex style={{ justifyContent: "center" }}>
        <NoFileImported onClick={() => setModalOpen(true)} />
      </Flex>
      <Dialog
        modal
        header={<span>Termine importieren</span>}
        footer={
          <Flex style={{ justifyContent: "space-between" }}>
            <Button outlined onClick={() => setModalOpen(false)}>
              Abbruch
            </Button>
            <Button disabled={importer === undefined} outlined onClick={onOk}>
              Importieren
            </Button>
          </Flex>
        }
        visible={modalOpen}
        onHide={() => setModalOpen(false)}
        style={{ width: "50vw", bottom: "20rem" }}
      >
        <TabView
          activeIndex={activeTab}
          onTabChange={(event) => setActiveTab(event.index)}
        >
          {Object.values(TransferType).map((tranferType) => {
            return (
              <TabPanel
                key={tranferType}
                style={{ padding: 0 }}
                header={tranferType}
              >
                {getImporter(tranferType)}
              </TabPanel>
            );
          })}
        </TabView>
      </Dialog>
    </>
  );
};

const ImportLocalFile = ({
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
  const onClick = (event: MouseEvent) => {
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
                onClick={onClick}
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

/**
 *
 */
const NoFileImported = ({ onClick }: { onClick: () => void }) => {
  return (
    <Flex col className={"no-file-imported"} onClick={onClick}>
      <i
        className="pi pi-file-import"
        style={{ fontSize: "3rem", color: "var(--blue-400)" }}
      />
      <p>Es ist noch keine Datei importiert worden.</p>
      <p>Hier clicken um Termine zu importieren.</p>
    </Flex>
  );
};
