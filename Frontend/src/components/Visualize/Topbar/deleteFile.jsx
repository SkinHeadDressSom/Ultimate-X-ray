import React, { useState } from "react";
import { ReactComponent as DeleteLine } from "../../../assets/topbar/deleteLine.svg";
import { ReactComponent as DeleteFill } from "../../../assets/topbar/deleteFill.svg";

const DeleteFile = ({ onClickDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked((prev) => !prev);
    if (onClickDelete) onClickDelete();
  };
  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isClicked ? (
        <DeleteFill className="w-4 h-auto" fill="#DC2626" />
      ) : isHovered ? (
        <DeleteFill className="w-4 h-auto" fill="#DC2626" />
      ) : (
        <DeleteLine className="w-4 h-auto" fill="#0D42C9" />
      )}
    </button>
  );
};

export default DeleteFile;
