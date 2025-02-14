import React, { useState } from "react";
import ButtonWithIcon from "../ButtonWithIcon";
import { Layout1, Layout2, Layout3, Layout4 } from "../toolsdata";

const Layout = ({ onLayoutChange }) => {
  const [activeId, setActiveId] = useState("layout1");

  const buttons = [
    { id: "layout1", icon: Layout1 },
    { id: "layout2", icon: Layout2 },
    { id: "layout3", icon: Layout3 },
    { id: "layout4", icon: Layout4 },
  ];

  const handleButtonClick = (id) => {
    setActiveId(id);
    onLayoutChange(id); // ส่งค่า layout ไปที่ Visualize.jsx
  };

  return (
    <div className="flex flex-col items-center justify-center bg-light-blue rounded-lg gap-y-2 p-2 w-full">
      <h1 className="text-dark-blue text-sm">Layout</h1>
      <div className="grid grid-cols-2 gap-2 items-center justify-between">
        {buttons.map((button) => (
          <ButtonWithIcon
            key={button.id}
            icon={button.icon}
            isActive={activeId === button.id}
            onClick={() => handleButtonClick(button.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Layout;
