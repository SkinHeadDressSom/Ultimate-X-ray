import React from "react";
import Logo from "../assets/logo.png";
import LogoutButton from "./logoutButton";    
const Navbar = () => {             
  return (
    <header className="bg-wheat border-b-[1px] border-b-light-gray shadow-md">
      <div className="flex shrink-0 max-w-full mx-4 my-2 items-center justify-between">
        <a aria-current="page" className="flex items-center" href="/dashboard">
          <img className="h-12 w-auto" src={Logo} alt="Logo" />
          <p className="inline-block px-3 py-1 text-xl text-darkest-blue font-medium transition-all duration-200">
            Ultimate X-ray
          </p>
        </a>
        <div className="">
          <LogoutButton />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
 