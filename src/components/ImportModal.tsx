import {
  Entities,
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
import { useState } from "react";
import { Flex } from "./layout/Flex";
import "./ImportModal.css";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { InputText } from "primereact/inputtext";
import { Table } from "./Table";

interface ImportModalProps {
  entity: Entities;
}
export const ImportModal = (props: ImportModalProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>();
  const [importer, setImporter] = useState<
    LocalFileImporter | HTTPFileImporter | FTPFileImporter
  >();

  const importedFile = useTerminStore(
    (store: TerminStore) => store.importedFile
  );

  if (importedFile) return null;
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
            <Button outlined onClick={() => setModalOpen(false)}>
              OK
            </Button>
          </Flex>
        }
        visible={modalOpen}
        onHide={() => setModalOpen(false)}
      >
        <TabView
          activeIndex={activeTab}
          onTabChange={(event) => setActiveTab(event.index)}
        >
          {Object.keys(TransferType).map((tranferType) => {
            return <TabPanel header={tranferType}></TabPanel>;
          })}
        </TabView>
      </Dialog>
    </>
  );
};

const ImportLocalFile = () => {
  return (
    <>
      <p>Importieren der Termin-Seite von der localen Festplatte</p>
      <Table>
        <tr>
          <td>Pfad:</td>
          <td>
            <InputText></InputText>
          </td>
        </tr>
        <tr>
          <td>Datei:</td>
          <td>
            <InputText></InputText>
          </td>
        </tr>
      </Table>
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
