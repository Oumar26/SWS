"use client";

import SideNav from "@/app/ui/dashboards/sidenav";
import { redirect } from "next/navigation";
import { Avatar } from "primereact/avatar";
import { Menubar } from "primereact/menubar";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      redirect("/");
    }
  });
  const start = (
    <img
      alt="logo"
      src="https://app.sowesign.com/student/assets/img/sws-logo.png"
      height="40"
      className="mr-2"
    ></img>
  );
  const end = (
    <div className="flex align-items-center gap-2">
      <Avatar
        image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
        shape="circle"
      />
    </div>
  );
  return (
    <div>
      <Menubar
        className="bg-transparent border-0 shadow-4 z-5 relative"
        start={start}
        end={end}
      />
      <div
        className="flex flex-col md:flex-row md:overflow-hidden"
        style={{ height: "calc(100vh - 76px)" }}
      >
        <div className="">
          <SideNav />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12 bg-white">
          {children}
        </div>
      </div>
    </div>
  );
}
