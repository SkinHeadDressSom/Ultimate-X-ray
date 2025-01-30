import React from "react";
import LogoImg from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/dashboard" aria-current="page" className="flex items-center">
      <img className="h-10 2xl:h-14 w-auto" src={LogoImg} alt="Logo" />
      <p className="inline-block px-3 py-1 text-xl 2xl:text-2xl text-darkest-blue font-medium transition-all duration-200">
        Ultimate X-ray
      </p>
    </Link>
  );
};

export default Logo;
