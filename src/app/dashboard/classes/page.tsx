"use client";

import { classesHook } from "@/app/hooks/classes";
import { userHook } from "@/app/hooks/user";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { OverlayPanel } from "primereact/overlaypanel";
import { TreeTable } from "primereact/treetable";
import {
  Component,
  createRef
} from "react";
import ClassForm from "./student-form";

const userCrud = userHook();

export default class Classes extends Component {
  op: any;
  classe: any;
  classes = [];
  constructor(props: any) {
    super(props);
    this.state = {
      classLabel: null,
      classesLoaded: false,
      classes: [],
    };
    this.op = createRef();
    this.classe = createRef();
  }

  componentDidMount(): void {
    classesHook()
      .getClasses()
      .then((e: any) => {
        // this.state.classes = e;
        this.setState({
          classes: e,
          classesLoaded: true,
        });
        e.forEach((_class: any, idx: number) => {
          userHook()
            .getUser(_class.id)
            .then((val) => {
              e[idx].children = val;
              this.setState({
                classes: e,
                classesLoaded: true,
              });
            });
        });
      });
  }

  render() {
    return (
      <div>
        <div className="flex grid">
          <div className="col px-4">
            <div className="flex">
              <h2 className="px-3 mx-auto text-blue-600 pb-2">CLASSE</h2>
              <span className="my-auto">
                <Button
                  onClick={(e) => this.op.current.toggle(e)}
                  icon="pi pi-plus"
                  rounded
                />
                <OverlayPanel ref={this.op}>
                  <div className="field flex flex-col w-full px-3">
                    <label htmlFor="">Libellé</label>
                    <InputText
                      // value={classLabel}
                      // onChange={(e) => setClassLabel(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="flex px-3">
                    <Button
                      className="m-auto w-full"
                      label="Enregistrer"
                      icon="pi pi-save"
                      // onClick={addUser}
                    />
                  </div>
                </OverlayPanel>
              </span>
            </div>

            <TreeTable
              value={this.state.classes}
              tableStyle={{ minWidth: "50rem" }}
            >
              <Column field="name" header="Nom" expander></Column>
              <Column field="year" header="Année"></Column>
              <Column
                body={(e) => (
                  <Button
                    onClick={(v) => {
                      this.classe.current.boom(e);
                      // console.log(this.classe.current);
                    }}
                    icon="pi pi-pencil"
                    text
                  />
                )}
              />
            </TreeTable>
          </div>
          <div className="col-4">
            <ClassForm ref={this.classe} />
          </div>
        </div>
      </div>
    );
  }
}
