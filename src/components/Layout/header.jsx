import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import DropDown from "../shared/dropDown";

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar className="bg-white">
        <span className="text-xl font-bold text-blue-600 mr-auto pl-4">
          Acore admin dashboard
        </span>
        <div className="ml-auto">
          <DropDown text="Super Admin"></DropDown>
        </div>
      </Toolbar>
    </AppBar>
  );
}
