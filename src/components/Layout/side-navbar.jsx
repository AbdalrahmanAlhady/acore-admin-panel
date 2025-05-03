import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import React, { forwardRef } from "react";
import { NavLink } from "react-router-dom";

const SideNavbar = forwardRef((props, ref) => {
  return (
    <aside
      ref={ref}
      id="default-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full  overflow-y-auto bg-white shadow-lg">
        <img src="/logo.png" className="w-1/2 m-auto" />
        <ul className="space-y-2 font-medium mt-10">
          <li className=" h-20">
            <NavLink
              className="flex items-center p-5 text-gray-900"
              to="/books"
              style={({ isActive }) => ({
                backgroundColor: isActive ? "#f2f8ff" : "transparent",
                borderRight: isActive ? "4px solid #bc79d6" : "none",
              })}
            >
              <span className="ms-3">
                <LibraryBooksIcon></LibraryBooksIcon> Books
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
});

export default SideNavbar;
