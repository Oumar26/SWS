import { TreeTable } from "primereact/treetable";
import ClassForm from "./student-form";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

export default function Classes() {
  const nodes = [
    {
      key: "0",
      label: "Documents",
      data: {
        name: "ECE",
        code: "6511",
      },
      children: [
        {
          label: "Work",
          data: { name: "Oumar BA" },
        },
      ],
    },
  ];
  return (
    <div>
      <div className="flex grid">
        <div className="col px-4">
          <h2 className="px-3 text-center text-blue-600 pb-2">CLASSE</h2>
          <TreeTable value={nodes} tableStyle={{ minWidth: "50rem" }}>
            <Column field="name" header="Nom" expander></Column>
            <Column field="code" header="Code"></Column>
            <Column body={<Button icon="pi pi-pencil" text />} />
          </TreeTable>
        </div>
        <div className="col-4">
          <ClassForm></ClassForm>
        </div>
      </div>
    </div>
  );
}
