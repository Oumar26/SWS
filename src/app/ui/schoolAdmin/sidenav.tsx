'use client'
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";

export default function SideNav() { 

  let items = [
    { label: "Ajouter des cours", icon: "pi pi-plus", path: '/schoolAdmin/newClasse' },
    { label: "Ajouter des écoles", icon: "pi pi-plus", path: '/schoolAdmin/newSchool' },
    { label: "Liste d'attente des élèves", icon: "pi pi-hourglass", path: '/schoolAdmin/waitLists' },
    { label: "Mon compte", icon: "pi pi-user-edit", path: '/schoolAdmin/profile' },
    { label: "Aide", icon: "pi pi-question", path: '/schoolAdmin/help' }
  ];

  const generateMenuItems = () => {
    return items.map((item, index) => {
      return {
        label: (
          <Link href={item.path} key={index} className='no-underline text-gray-600'>
              <span className={`${item.icon} mx-1`}></span>
              <span>{item.label}</span>
          </Link>
        )
      };
    });
  };

  return (
    <div className="flex align-items-center flex-col h-full">
      <img
        alt="logo"
        src="https://storage.sowesign.com/sws-6511/2023/09/05/logo_6511-64F6F7827BE40.png"
        height="100"
        className="mr-2 border-2 border-circle border-blue-400 mt-3"
      ></img>
      <Menu model={generateMenuItems()} className="bg-transparent border-0" />
      <Button
        icon="pi pi-power-off"
        className="mt-auto mx-auto mb-3"
        severity="danger"
        label="Déconnexion"
      />
    </div>
  );
}
