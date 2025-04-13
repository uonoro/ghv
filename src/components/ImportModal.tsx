import { API } from "@/app/API";
import {
  Entities,
  FileImporter,
  LocalFileImporter,
  TransferType,
} from "@/app/pages/termine/constants";
import {
  TerminStore,
  useTerminStore,
} from "@/app/pages/termine/useTerminStore";
import { ReadFileResponse } from "electron/main/FILEAPI";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { TabPanel, TabView } from "primereact/tabview";
import { useState } from "react";
import { ImportLocalFile } from "./importer/LocalFileImporter";
import "./ImportModal.css";
import { Flex } from "./layout/Flex";

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
