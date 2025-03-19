import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, purgeStore } from "../../redux/auth";
const API_URL = process.env.REACT_APP_BACKEND_URL;

const LogoutButton = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const postLogout = async () => {
    try {
      const response = await axios.post(
        `${API_URL}http://localhost:8000/auth/api/logout`,
        {},
        { withCredentials: true }
      );
      console.log("Logout successful:", response.data);

      dispatch(logout());

      dispatch(purgeStore());

      navigate("/");
    } catch (error) {
      setError("Invalid cookie");
      console.log(error);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    postLogout();
  };

  return (
    <>
      <button
        onClick={handleLogout}
        className="flex border-2 border-vivid-blue rounded-full 2xl:px-6 px-4 py-1 text-vivid-blue font-medium hover:bg-error-color cursor-pointer hover:text-wheat hover:border-error-color"
      >
        <label className="inline-flex w-full space-x-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z"></path>
          </svg>
          <span className="2xl:text-lg font-medium text-base">Logout</span>
        </label>
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </>
  );
};

export default LogoutButton;