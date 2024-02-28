import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";

export default function ClassForm() {
  const footer = (
    <div className="flex pe-3">
      <Button
        label="Enregistrer"
        iconPos="right"
        icon="pi pi-save"
        severity="success"
        className="ms-auto"
      />
    </div>
  );
  return (
    <Card
      title={<div className="text-blue-600 text-center">Groupe</div>}
      footer={footer}
    >
      <form action="" className="w-100 p-3">
        <div className="field flex flex-col w-full px-3">
          <label htmlFor="">Adresse email</label>
          <InputText className="w-full" type="email" required name="email" />
        </div>
        <div className="field flex flex-col w-full px-3">
          <label htmlFor="">Prénom</label>
          <InputText className="w-full" />
        </div>
        <div className="field flex flex-col w-full px-3">
          <label htmlFor="">Nom</label>
          <InputText className="w-full" />
        </div>
      </form>
    </Card>
  );
}
