"use client";

import { userHook } from "@/app/hooks/user";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Component, ReactNode } from "react";

export default class StudentForm extends Component {
  user: any = {};

  constructor(props: any) {
    super(props);
    this.state = {
      user: null,
    };
  }

  boom(e: any) {
    this.user = {};
    this.setState({});
    this.setState({
      user: e,
    });
    console.log(e);
  }

  addUser() {
    this.user.class = this.state.user.id;
    userHook().addUser(this.user).then(val => console.log(val));
  }

  render(): ReactNode {
    const footer = (
      <div className="flex ps-3">
        <Button
          label="Annuler"
          iconPos="right"
          severity="warning"
          onClick={() =>
            this.setState({
              user: { prenom: "", nom: "", email: "", class: "" },
            })
          }
        />
        <Button
          label="Enregistrer"
          iconPos="right"
          icon="pi pi-save"
          severity="success"
          className="ms-auto"
          onClick={() => this.addUser()}
        />
      </div>
    );
    return (
      <Card
        title={<div className="text-blue-600 text-center">Étudiant</div>}
        footer={footer}
      >
        <form action="" className="w-100 p-3">
          <div className="field flex flex-col w-full px-3">
            <label htmlFor="">Adresse email</label>
            <InputText
              value={this.state.user?.email}
              className="w-full"
              type="email"
              required
              name="email"
              onChange={(e) => (this.user.email = e.target.value)}
            />
          </div>
          <div className="field flex flex-col w-full px-3">
            <label htmlFor="">Prénom</label>
            <InputText
              onChange={(e) => (this.user.prenom = e.target.value)}
              value={this.state.user?.prenom}
              className="w-full"
            />
          </div>
          <div className="field flex flex-col w-full px-3">
            <label htmlFor="">Nom</label>
            <InputText
              onChange={(e) => (this.user.nom = e.target.value)}
              value={this.state.user?.nom}
              className="w-full"
            />
          </div>
        </form>
      </Card>
    );
  }
}
