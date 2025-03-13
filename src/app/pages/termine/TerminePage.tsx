import { PageTitle } from "@/components/PageTitle";

import { Flex } from "@/components/layout/Flex";

import { TerminStore, useTerminStore } from "./useTerminStore";
import { TerminRenderer } from "./TerminRenderer";
import { ImportModal } from "@/components/ImportModal";
import { useState } from "react";
import { Entities } from "./constants";

export const TerminePage = () => {
  const termine = useTerminStore((store: TerminStore) => store.termine);
  const [importOpen, setImportOpen] = useState<boolean>(false);
  return (
    <>
      <PageTitle title="Termine" />
      <ImportModal entity={Entities.TERMINE} />
      <Flex col>
        {termine.map((termin) => (
          <TerminRenderer key={termin.key} termin={termin} />
        ))}
      </Flex>
    </>
  );
};

const FileNotImported = () => {
  const termine = useTerminStore((store: TerminStore) => store.termine);

  /*    const onClick = () => {
     API.call("FILE.readFile", "").then((result: ReadFileResponse) => {
       const { document } = result;
       const termine = Termin.fromDocument(document);

       if (termine.length > 0) {
         dispatch({
           type: TerminActions.SET_TERMINE,
           payload: termine,
         });
       }
     });
   };
*/
  return <Flex></Flex>;
};
