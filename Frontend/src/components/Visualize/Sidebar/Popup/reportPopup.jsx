import React, { useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Information from "../Report/information";
import Result from "../Report/result";
import PrintButton from "../../../Button/printButton";
import SaveButton from "../../../Button/saveButton";
import "../style/report.css";
import { ReactComponent as PinIcon } from "../../../../assets/report/pin.svg";
import { ReactComponent as EmailIcon } from "../../../../assets/report/email.svg";
import { ReactComponent as PhoneIcon } from "../../../../assets/report/phone.svg";
const API_URL = process.env.REACT_APP_BACKEND_URL;

const ReportPopup = ({ onClose }) => {
  const selectedCases = useSelector(
    (state) => state.selectedCases.selectedCases[0]
  );
  const printableAreaRef = useRef();

  //store section values
  const [sectionValues, setSectionValues] = useState({
    clinicalHistory: selectedCases.clinical_history || "",
    examinationDetails: `Type of Study: Chest X-Ray (${selectedCases.description})\nImaging Technique: Digital Radiography`,
    finding: selectedCases.findings || "",
    impression: selectedCases.impression || "",
    recommendations: selectedCases.recommendations || "",
    actionComment: selectedCases.action_comments || "",
  });

  //update state
  const handleChange = (key, value) => {
    setSectionValues((prev) => ({ ...prev, [key]: value }));
  };

  //save report
  const handleSave = async () => {
    try {
      const response = await axios.patch(
        `${API_URL}/fetch-data/api/report/${selectedCases.an}/save`,
        {
          clinical_history: sectionValues.clinicalHistory,
          examination_details: sectionValues.examinationDetails,
          findings: sectionValues.finding,
          impression: sectionValues.impression,
          recommendations: sectionValues.recommendations,
          action_comments: sectionValues.actionComment,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200 || response.status === 201) {
        console.error("Saved report successfully!");
      } else {
        console.error("Error saving report:", response);
      }
    } catch (error) {
      console.error("Error saving report:", error);
    }
  };

  //print report
  const handlePrint = () => {
    const printableArea = printableAreaRef.current;

    //เปลี่ยน text-area เป็น <p>
    const textareas = printableArea.querySelectorAll("textarea");
    textareas.forEach((textarea) => {
      const section = textarea.closest("div.flex-col");
      if (section) {
        const value = textarea.value.trim() || "-"; //ถ้าไม่ได้กรอกให้แสดง "-"
        const p = document.createElement("p");
        p.textContent = value;
        p.classList.add("print-text");
        textarea.replaceWith(p);
      }
    });

    //เอา checkbox บนรูปออก
    const checkboxes = printableArea.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      const listItem = checkbox.closest("li");
      if (!checkbox.checked && listItem) {
        listItem.remove();
      } else if (listItem) {
        checkbox.remove();
        const span = listItem.querySelector("span");
        if (span) {
          span.replaceWith(...span.childNodes);
        }
      }
    });

    //ปรับขนาดรูป
    const images = printableArea.querySelectorAll("img");
    images.forEach((img) => {
      img.classList.remove("w-28", "h-28"); //ลบขนาดเดิม
      img.classList.add("w-48", "h-48"); //เพิ่มขนาดใหม่
    });

    const printContents = printableArea.cloneNode(true);

    document.body.innerHTML = printContents.innerHTML;

    window.print();

    window.location.reload();
  };

  return (
    <div className="absolute w-full flex justify-center h-5/6 max-h-fit z-50 top-14 left-0 ">
      <div className="w-2/4 rounded-lg">
        <div className="bg-light-blue flex justify-between rounded-t-lg py-2 px-4">
          <h1 className="text-vivid-blue inline-flex gap-1 items-center">
            <ReportIcon />
            <span className="text-darkest-blue font-medium text-xl">
              Report
            </span>
          </h1>
          <CloseButton onClick={onClose} />
        </div>
        <div className=" bg-wheat rounded-b-lg py-4 px-6 flex flex-col gap-y-4 max-h-fit h-full overflow-y-scroll">
          {/* หัวกระดาษ (แสดงเฉพาะตอนพิมพ์) */}
          <div ref={printableAreaRef} className="printable-area">
            <div className="print-header hidden print:block">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col justify-between">
                  <h1 className="text-3xl font-bold text-start">
                    KMUTT Hospital
                  </h1>
                  <p className="flex flex-row items-center gap-1">
                    <span>
                      <PinIcon className="w-4 h-auto icon" fill="#0D42C9" />
                    </span>
                    126 Pracha Uthit Rd., Bang Mod, Thung Khru, Bangkok 10140,
                    Thailand
                  </p>
                </div>
                <div className="flex flex-col items-end justify-end">
                  <p className="flex flex-row items-center gap-1">
                    +66 2470 8000
                    <span>
                      <PhoneIcon className="w-4 h-auto icon" fill="#0D42C9" />
                    </span>
                  </p>
                  <p className="flex flex-row items-center gap-1">
                    contact@kmutt.ac.th
                    <span>
                      <EmailIcon className="w-4 h-auto icon" fill="#0D42C9" />
                    </span>
                  </p>
                </div>
              </div>
              <hr className="my-2 border-t-2 border-vivid-blue" />
              {/* เส้นกั้น */}
            </div>
            <Information />
            <hr className="my-2 border-t-2 border-vivid-blue" />
            {/* เส้นกั้น */}
            <Result sectionValues={sectionValues} handleChange={handleChange} />
          </div>
          <div className="flex gap-2">
            <SaveButton onSave={handleSave} />
            <PrintButton onClick={handlePrint} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ReportIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-8 h-8"
  >
    <path d="M21 8V20.9932C21 21.5501 20.5552 22 20.0066 22H3.9934C3.44495 22 3 21.556 3 21.0082V2.9918C3 2.45531 3.4487 2 4.00221 2H14.9968L21 8ZM19 9H14V4H5V20H19V9ZM8 7H11V9H8V7ZM8 11H16V13H8V11ZM8 15H16V17H8V15Z"></path>
  </svg>
);

const CloseButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="text-darkest-blue hover:cursor-pointer hover:scale-105"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
    </svg>
  </button>
);

export default ReportPopup;
