import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Thumbnail from "./thumbnail";
import Addfile from "./addfile";
import DeleteFile from "./deleteFile"; //ปุ่มถังขยะ
import DeleteItem from "./deleteItem"; //ปุ่มลบเคสในวันที่ที่เลือก
import { setSelectedImageId } from "../../../redux/selectedImage";
import { setSelectedAN, resetSelectedAN } from "../../../redux/selectedCase";

const Topbar = ({ onImageSelect, caseData, allCases, annotationMap }) => {
  const dispatch = useDispatch();
  const selectedImageId = useSelector(
    (state) => state.selectedImage.selectedImageId
  ); //ดึงselectedImageId
  const selectedAN = useSelector((state) => state.selectedCases.selectedAN); // ดึง selectedCase จาก Redux

  const [caseList, setCaseList] = useState(() => {
    const savedCases = localStorage.getItem("caseList");
    return savedCases ? JSON.parse(savedCases) : [...caseData];
  });
  const [selectedItems, setSelectedItems] = useState([...caseList]);
  const [isDelete, setIsDelete] = useState(false);

  //เอาเคสที่เพิ่มมาเก็บไว้ใน storage
  useEffect(() => {
    localStorage.setItem("caseList", JSON.stringify(caseList));
  }, [caseList]);
  //ถ้ายังไม่มี selectedAN ให้เลือกเคสแรกสุด
  useEffect(() => {
    if (!selectedAN && caseList.length > 0) {
      dispatch(setSelectedAN(caseList[0].an));
    }
  }, [caseList, selectedAN, dispatch]);

  //ภาพแรกสุดของเคสล่าสุดให้เปิดรอไว้
  useEffect(() => {
    const storedSelectedImageId = localStorage.getItem("selectedImageId");
    if (caseList.length > 0) {
      let latestCase;
      if (storedSelectedImageId) {
        latestCase = caseList.find((caseItem) =>
          caseItem.case_images.some((img) => img.xn === storedSelectedImageId)
        );
      }
      if (!latestCase) {
        latestCase =
          caseList.length === 1
            ? caseList[0]
            : [...caseList].sort((a, b) => b.an - a.an)[0];
      }
      if (latestCase?.case_images?.length > 0) {
        const firstImage = storedSelectedImageId
          ? latestCase.case_images.find(
              (img) => img.xn === storedSelectedImageId
            ) || latestCase.case_images[0]
          : latestCase.case_images[0];

        dispatch(setSelectedImageId(firstImage.xn)); //update selectedImageId
        onImageSelect(firstImage.file_path);
      }
    }
  }, [caseList, dispatch]);

  //กดเลือกดูเคสให้แสดงที่ thumbnail
  const handleCheckbox = (event, item) => {
    event.stopPropagation(); // หยุดการ bubbling ของเหตุการณ์
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
  //function เพิ่มเคส
  const handleAddCase = (newCases) => {
    const updatedCases = [
      ...caseList,
      ...newCases.filter((nc) => !caseList.some((c) => c.an === nc.an)),
    ];
    setCaseList(updatedCases);
  };
  // function ลบเคส
  const handleDeleteItem = (itemToDelete) => {
    const updatedCaseList = caseList.filter(
      (item) => item.an !== itemToDelete.an
    );
    const updatedSelectedItems = selectedItems.filter(
      (item) => item.an !== itemToDelete.an
    );
    setCaseList(updatedCaseList);
    setSelectedItems(updatedSelectedItems);
    localStorage.setItem("caseList", JSON.stringify(updatedCaseList));
  };
  // sort thumbnail ตามเลข an
  const sortedSelectedItems = [...selectedItems].sort((a, b) => b.an - a.an);

  // function สำหรับการคลิกที่เคส
  const handleCaseClick = (event, an) => {
    event.stopPropagation();
    if (selectedAN === an) {
      dispatch(resetSelectedAN());
    } else {
      dispatch(setSelectedAN(an));
    }
  };

  return (
    <div className="flex flex-row bg-wheat h-28 w-fit border-b-[1px] border-b-light-gray items-start">
      <div className="w-56 min-w-56 h-full border border-light-gray">
        <div className="sticky flex justify-between w-full bg-light-blue border-b border-b-light-gray px-2 p-0.5 text-sm z-50">
          <h1 className="text-darkest-blue font-medium">Studies</h1>
          <div className="flex gap-1">
            <Addfile
              allCases={allCases}
              onAddCase={handleAddCase}
              caseList={caseList}
            />
            <DeleteFile onClickDelete={() => setIsDelete((prev) => !prev)} />
          </div>
        </div>
        <div className="flex flex-col h-20 overflow-y-scroll">
          {caseList.map((item, index) => (
            <div
              key={index}
              className={`flex gap-2 items-center text-sm cursor-pointer transition-colors duration-200 px-2 py-0.5 ${
                selectedAN === item.an ? "bg-vivid-blue text-wheat" : ""
              }`}
              onClick={(event) => handleCaseClick(event, item.an)}
            >
              {/* ถ้ากดปุ่มถังขยะให้เปลี่ยนจาก checkbox เป็นปุ่มลบเคส */}
              {isDelete ? (
                //ปุ่มลบเคส
                <DeleteItem onDelete={() => handleDeleteItem(item)} />
              ) : (
                <label
                  className="flex items-center cursor-pointer relative"
                  onClick={(event) => event.stopPropagation()} // หยุดการ bubbling ของเหตุการณ์ใน label
                >
                  {/* checkbox ของ case */}
                  <input
                    type="checkbox"
                    className={`peer h-3.5 w-3.5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border ${
                      selectedAN === item.an
                        ? "border-wheat"
                        : "border-vivid-blue"
                    } checked:border-2 transition-colors duration-200`}
                    onChange={(event) => handleCheckbox(event, item)}
                    checked={selectedItems.some(
                      (selected) => selected.an === item.an
                    )}
                  />
                  <span
                    className={`absolute ${
                      selectedAN === item.an ? "text-wheat" : "text-vivid-blue"
                    } opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-500`}
                  >
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
              <span>{item.study_date}</span>
              <span>{item.time}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-row w-full h-full z-0">
        {/* เพิ่ม thumbnail รูปภาพตามเคสที่เลือก */}
        {sortedSelectedItems.map((item) => (
          <Thumbnail
            key={item.an}
            item={item}
            onClose={handleCloseSection}
            onImageSelect={onImageSelect}
            selectedImageId={selectedImageId}
            annotationMap={annotationMap}
          />
        ))}
      </div>
    </div>
  );
};

export default Topbar;
