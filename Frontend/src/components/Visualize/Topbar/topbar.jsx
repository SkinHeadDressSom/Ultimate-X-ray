import React, { useState } from "react";
import mockup from "./mockup";
import Thumbnail from "./thumbnail";
import Addfile from "./addfile"
import DeleteFile from "./deleteFile"; //ปุ่มถังขยะ
import DeleteItem from "./deleteItem"; //ปุ่มลบเคสในวันที่ที่เลือก

const Topbar = ({ onImageSelect }) => {
  const [selectedItems, setSelectedItems] = useState([...mockup]);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);

  //กดเลือกดูเคสให้แสดงที่ thumbnail
  const handleCheckbox = (item) => {
    if (selectedItems.some((selected) => selected.an === item.an)) {
      setSelectedItems(
        selectedItems.filter((selected) => selected.an !== item.an)
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };
  // ปิด component thumbnail
  const handleCloseSection = (itemToRemove) => {
    setSelectedItems(
      selectedItems.filter((item) => item.an !== itemToRemove.an)
    );
  };
  // sort thumbnail ตามเลข an
  const sortedSelectedItems = [...selectedItems].sort((a, b) => a.an - b.an);

  return (
    <div className="flex flex-row bg-wheat h-28 w-fit border-b-[1px] border-b-light-gray items-start">
      <div className="w-56 min-w-56 h-full border border-light-gray">
        <div className="sticky flex justify-between w-full bg-light-blue border-b border-b-light-gray px-2 p-0.5 text-sm ">
          <h1 className="text-darkest-blue font-medium">Studies</h1>
          <div className="flex gap-1">
            <Addfile />
            <DeleteFile onClickDelete={() => setIsDelete((prev) => !prev)} />
          </div>
        </div>

        <div className="flex flex-col px-2 py-1 h-20 overflow-y-scroll">
          {mockup.map((item, index) => (
            <div key={index} className="flex gap-2 items-center text-sm">
              {/* ถ้ากดปุ่มถังขยะให้เปลี่ยนจาก checkbox เป็นปุ่มลบเคส */}
              {isDelete ? (
                //ปุ่มลบเคส
                <DeleteItem />
              ) : (
                <label className="flex items-center cursor-pointer relative">
                  {/* checkbox ของ case */}
                  <input
                    type="checkbox"
                    className="peer h-3.5 w-3.5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-vivid-blue checked:border-2"
                    onChange={() => handleCheckbox(item)}
                    checked={selectedItems.some(
                      (selected) => selected.an === item.an
                    )}
                  />
                  <span className="absolute text-vivid-blue opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </label>
              )}
              <span className="text-darkest-blue">{item.date}</span>
              <span className="text-darkest-blue">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-row overflow-auto w-full">
        {/* เพิ่ม thumbnail รูปภาพตามเคสที่เลือก */}
        {sortedSelectedItems.map((item) => (
          <Thumbnail
            key={item.an}
            item={item}
            onClose={handleCloseSection}
            onImageSelect={onImageSelect}
            selectedImageId={selectedImageId}
            setSelectedImageId={setSelectedImageId}
          />
        ))}
      </div>
    </div>
  );
};

export default Topbar;
