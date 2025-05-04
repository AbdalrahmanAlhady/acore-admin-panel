import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import DropDown from "../shared/dropDown";
import { useEffect, useState } from "react";

export default function Header() {
  const [email, setEmail] = useState(localStorage.getItem("email"));
  useEffect(() => {
    const storedEmail = JSON.parse(localStorage.getItem("email"));
    if (storedEmail && storedEmail !== email) {
      setEmail(storedEmail);
    }
  }, []);
  return (
    <AppBar position="static">
      <Toolbar className="bg-white">
        <span className="text-xl font-bold text-blue-600 mr-auto pl-4">
          Acore admin dashboard
        </span>
        <div className="ml-auto">
          <DropDown text="Super Admin" email={email}></DropDown>
        </div>
      </Toolbar>
    </AppBar>
  );
}
