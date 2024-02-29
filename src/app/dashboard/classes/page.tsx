"use client";

import { classesHook } from "@/app/hooks/classes";
import { userHook } from "@/app/hooks/user";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { OverlayPanel } from "primereact/overlaypanel";
import { TreeTable } from "primereact/treetable";
import { useEffect, useRef, useState } from "react";
import ClassForm from "./student-form";

export default function Classes() {
  const [classes, setClasses]: any = useState([]),
    [classesLoaded, setClassesLoaded] = useState(false);

  const op: any = useRef(null);

  useEffect(() => {
    if (!classesLoaded) {
      classesHook()
        .getClasses()
        .then((e: any) => {
          setClassesLoaded(true);
          // setClasses(e);
          let count = 0;
          e.forEach((_class: any, idx: number) => {
            console.log(classes);
            userHook()
              .getUser(_class.id)
              .then((val) => {
                count++;
                e[idx].children = val;
                if (count === e.length) {
                  setClassesLoaded(true);
                  setClasses(e);
                }
              });
          });
        });
    }
  });
  return (
    <div>
      <div className="flex grid">
        <div className="col px-4">
          <div className="flex">
            <h2 className="px-3 mx-auto text-blue-600 pb-2">CLASSE</h2>
            <span className="my-auto">
              <Button
                onClick={(e) => op.current.toggle(e)}
                icon="pi pi-plus"
                rounded
              />
              <OverlayPanel ref={op}>
                <div className="field flex flex-col w-full px-3">
                  <label htmlFor="">Libellé</label>
                  <InputText className="w-full" />
                </div>
                <div className="flex px-3">
                  <Button
                    className="m-auto w-full"
                    label="Enregistrer"
                    icon="pi pi-save"
                  />
                </div>
              </OverlayPanel>
            </span>
          </div>

          <TreeTable value={classes} tableStyle={{ minWidth: "50rem" }}>
            <Column field="name" header="Nom" expander></Column>
            <Column field="year" header="Année"></Column>
            <Column body={<Button icon="pi pi-pencil" text />} />
          </TreeTable>
        </div>
        <div className="col-4">
          <ClassForm />
        </div>
      </div>
    </div>
  );
}
