import React from "react";
import LogoutButton from "../Button/logoutButton";
import Logo from "./logo";
import Search from "./Search";
const Navbar = () => {
  return (
    <nav className="bg-wheat border-b-[1px] border-b-light-gray shadow-md">
      <div className="flex shrink-0 max-w-full mx-4 my-3 2xl:my-3 items-center justify-between">
        <Logo />
        <Search />
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Navbar;
