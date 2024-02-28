'use client'

import Link from 'next/link';
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";

export default function SideNav() { 

  let items = [
    { label: "Ajouter des écoles", icon: "pi pi-plus", url: '/superAdmin/newSchool' },
    { label: "Changer les droits", icon: "pi pi-hourglass", url: '/superAdmin/droits' },
    { label: "Mon compte", icon: "pi pi-user-edit", url: '/superAdmin/profile' },
  ];

  

  return (
    <div className="flex align-items-center flex-col h-full">
      <img
        alt="logo"
        src="https://storage.sowesign.com/sws-6511/2023/09/05/logo_6511-64F6F7827BE40.png"
        height="100"
        className="mr-2 border-2 border-circle border-blue-400 mt-3"
      ></img>
      <Menu model={items} className="bg-transparent border-0" />
      <Button
        icon="pi pi-power-off"
        className="mt-auto mx-auto mb-3"
        severity="danger"
        label="Déconnexion"
      />
    </div>
  );
}
