import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
//resize textarea ตามขนาดบรรทัด
const AutoResizingTextarea = ({
  defaultValue,
  className,
  placeHolder,
  ref,
}) => {
  const textareaRef = useRef(null);

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    resizeTextarea();
  }, []);

  return (
    <textarea
      ref={ref || textareaRef}
      defaultValue={defaultValue}
      className={className}
      onInput={resizeTextarea}
      placeholder={placeHolder}
    />
  );
};

//checkbox and image
const CheckboxImage = ({ image, index }) => {
  return (
    <li className="relative mt-2">
      <input type="checkbox" className="hidden" id={`check-${index}`} />
      <label htmlFor={`check-${index}`} className="cursor-pointer">
        <img
          src={image.file_path}
          alt={`Attached Image ${index + 1}`}
          className="w-28 h-28 object-cover rounded-md bg-black transition-all"
        />
        <span className="absolute top-2 right-2 w-4 h-4 border-2 rounded-[5px] border-vivid-blue flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-vivid-blue opacity-0 transition-opacity"
            viewBox="0 0 20 20"
            fill="currentColor"
            strokeWidth="1"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </label>
      <style jsx>{`
        #check-${index}:checked + label img {
          border: 2px solid #0d42c9;
        }
        #check-${index}:checked + label span svg {
          opacity: 1;
        }
      `}</style>
    </li>
  );
};
//main component
const Result = ({
  clinicalHistoryRef,
  examinationDetailsRef,
  findingRef,
  impressionRef,
  recommendationsRef,
}) => {
  const selectedCases = useSelector(
    (state) => state.selectedCases.selectedCases[0]
  );

  const CommonTextareaStyles =
    "border border-light-gray rounded-md p-2 text-sm focus:border-none focus:ring-1 focus:ring-vivid-blue [appearance:textfield] outline-none";

  const sections = [
    {
      label: "Clinical history",
      defaultValue: "",
      placeHolder: "",
      ref: clinicalHistoryRef,
    },
    {
      label: "Examination Details",
      defaultValue: `Type of Study: Chest X-Ray (${selectedCases.description})\nImaging Technique: Digital Radiography`,
      placeHolder: "",
      ref: examinationDetailsRef,
    },
    {
      label: "Finding",
      defaultValue: "",
      placeHolder: "Enter finding",
      ref: findingRef,
    },
    {
      label: "Impression",
      defaultValue: "",
      placeHolder: "Enter impression",
      ref: impressionRef,
    },
    {
      label: "Recommendations",
      defaultValue: "",
      placeHolder: "Enter recommendation",
      ref: recommendationsRef,
    },
  ];

  return (
    <div className="flex flex-col gap-y-2 text-darkest-blue text-sm">
      {sections.map((section, index) => (
        <div key={index} className="flex flex-col">
          <label>{section.label}</label>
          <AutoResizingTextarea
            ref={section.ref}
            defaultValue={section.defaultValue}
            placeHolder={section.placeHolder}
            className={CommonTextareaStyles}
          />
        </div>
      ))}
      <div className="flex flex-col gap-y-2">
        <label>Attached images</label>
        <ul className="flex flex-wrap gap-2">
          {selectedCases.case_images?.map((image, index) => (
            <CheckboxImage key={index} image={image} index={index} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Result;
