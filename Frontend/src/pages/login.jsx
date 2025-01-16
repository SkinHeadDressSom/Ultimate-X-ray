import React, { useState } from "react";
import Logo from "../assets/logo.png";
import eyeClosed from "../assets/eyeClose.svg";
import eyeOpen from "../assets/eyeOpen.svg";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "password") {
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-lightest-blue w-screen h-screen flex justify-center items-center">
      {/* BIG background  */}
      <div className="flex flex-wrap flex-col center w-3/5 px-5 py-10 md:w-2/6 lg:w-2/6 h-auto justify-center items-center bg-wheat gap-y-3 rounded-xl shadow-md border-[1px] border-light-gray">
        {/*  background  */}
        <img
          src={Logo}
          alt="Ultimate X-ray"
          className="lg:w-2/6 md:w-1/3 w-1/3"
        />
        <h2 className="2xl:text-3xl lg:text-2xl text-xl font-medium text-center text-darkest-blue pb-3">
          Welcome to Ultimate X-ray
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-3 w-4/5 max-w-[300px] center items-center"
        >
          <div className="w-full">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="flex w-full overflow-hidden appearance-none border-[1px] rounded-full text-vivid-blue border-light-gray leading-tight items-center focus:border-vivid-blue focus:ring-1 focus:ring-vivid-blue py-2 px-3 placeholder:font-light 2xl:placeholder:text-lg placeholder:text-base focus:outline-none"
              required
            />
          </div>

          {/* ฟังก์ชั้น password  */}
          <div className="mb-3 w-full">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="flex overflow-hidden w-full appearance-none border-[1px] rounded-full text-vivid-blue border-light-gray leading-tight items-center focus:border-vivid-blue focus:ring-1 focus:ring-vivid-blue py-2 px-3 placeholder:font-light 2xl:placeholder:text-lg placeholder:text-base focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-vivid-blue"
              >
                <img src={showPassword ? eyeOpen : eyeClosed} alt="Toggle Password Visibility" className="w-6 h-auto active:scale-105 duration-300"></img>
              </button>
            </div>
            {error && (
              <p className="text-red-500 text-sm text-left mt-1">{error}</p>
            )}
          </div>

          {/* ปุ่ม login */}
          <button
            type="submit"
            className="w-full bg-vivid-blue text-wheat p-2 rounded-full flex items-center justify-center hover:bg-dark-blue duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-auto mx-2"
            >
              <path d="M4 15H6V20H18V4H6V9H4V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V15ZM10 11V8L15 12L10 16V13H2V11H10Z"></path>
            </svg>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
