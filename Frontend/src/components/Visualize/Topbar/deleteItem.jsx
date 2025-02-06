import React, { useState } from "react";
import { ReactComponent as DeleteLine } from "../../../assets/topbar/closeLine.svg";
import { ReactComponent as DeleteFill } from "../../../assets/topbar/closeFill.svg";

const DeleteItem = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <DeleteFill className="w-4 h-auto" fill="#DC2626" />
      ) : (
        <DeleteLine className="w-4 h-auto" fill="#DC2626" />
      )}
    </button>
  );
};

export default DeleteItem;
