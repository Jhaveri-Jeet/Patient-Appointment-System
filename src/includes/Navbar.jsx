import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

function Navbar() {
  return (
    <div className="m-2">
      <Menubar className="flex space-x-4">
        <MenubarMenu>
          <MenubarTrigger>Dashboard</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Patients</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Appointments</MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}

export default Navbar;
