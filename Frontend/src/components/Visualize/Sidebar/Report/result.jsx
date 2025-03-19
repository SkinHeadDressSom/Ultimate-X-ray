import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "../style/report.css";
//resize textarea ตามขนาดบรรทัด
const AutoResizingTextarea = ({
  value,
  className,
  placeHolder,
  ref,
  onChange,
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
  }, [value]);

  return (
    <textarea
      ref={ref || textareaRef}
      value={value}
      className={`${className} print-textarea`}
      onInput={(e) => {
        resizeTextarea();
        onChange(e);
      }}
      placeholder={placeHolder}
    />
  );
};

//checkbox and image
const CheckboxImage = ({ image, index, isAnnotation = false }) => {
  const checkboxId = isAnnotation ? `annotation-${index}` : `image-${index}`;
  const [isValid, setIsValid] = React.useState(true);

  return isValid ? (
    <li className="relative mt-2">
      <input type="checkbox" className="hidden" id={checkboxId} />
      <label htmlFor={checkboxId} className="cursor-pointer">
        <img
          src={image.file_path}
          alt={`Attached Image ${index + 1}`}
          className="w-28 h-28 object-cover rounded-md bg-black transition-all"
          onError={() => setIsValid(false)}
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
        #${checkboxId}:checked + label img {
          border: 2px solid #0d42c9;
        }
        #${checkboxId}:checked + label span svg {
          opacity: 1;
        }
      `}</style>
    </li>
  ) : null;
};

//main component
const Result = () => {
  const selectedCases = useSelector(
    (state) => state.selectedCases.selectedCases[0]
  );

  const CommonTextareaStyles =
    "border border-light-gray rounded-md p-2 text-sm focus:border-none focus:ring-1 focus:ring-vivid-blue [appearance:textfield] outline-none";

  const [sectionValues, setSectionValues] = React.useState({
    clinicalHistory: selectedCases.clinical_history || "",
    examinationDetails: `Type of Study: Chest X-Ray (${selectedCases.description})\nImaging Technique: Digital Radiography`,
    finding: "",
    impression: "",
    recommendations: "",
    actionComment: "",
  });

  const handleChange = (key, value) => {
    setSectionValues((prev) => ({ ...prev, [key]: value }));
  };

  const sections = [
    {
      label: "Clinical history",
      key: "clinicalHistory",
      value: sectionValues.clinicalHistory,
      placeHolder: "",
    },
    {
      label: "Examination Details",
      key: "examinationDetails",
      value: sectionValues.examinationDetails,
      placeHolder: "",
    },
    {
      label: "Findings",
      key: "finding",
      value: sectionValues.finding,
      placeHolder: "Enter finding",
    },
    {
      label: "Impression",
      key: "impression",
      value: sectionValues.impression,
      placeHolder: "Enter impression",
    },
    {
      label: "Recommendations",
      key: "recommendations",
      value: sectionValues.recommendations,
      placeHolder: "Enter recommendation",
    },
    {
      label: "Action Comment",
      key: "actionComment",
      value: sectionValues.actionComment,
      placeHolder: "Enter action Comment",
    },
  ];

  return (
    <div className="result flex flex-col gap-y-3 text-darkest-blue text-sm pt-2">
      {sections.map((section, index) => {
        const isEmpty = !section.value.trim();

        return (
          <div
            key={index}
            className={`flex flex-col ${isEmpty ? "print:hidden" : ""}`}
          >
            <label className="print-label">{section.label}</label>
            <AutoResizingTextarea
              value={section.value}
              placeHolder={section.placeHolder}
              className={CommonTextareaStyles}
              onChange={(e) => handleChange(section.key, e.target.value)}
            />
          </div>
        );
      })}
      <div className="flex flex-col">
        <label className="print-label">Attached images</label>
        <ul className="flex flex-wrap gap-x-2">
          {selectedCases.case_images?.map((image, index) => (
            <>
              <CheckboxImage
                key={`image-${index}`}
                image={image}
                index={index}
                isAnnotation={false}
              />
              {image.annotation_image && (
                <CheckboxImage
                  key={`annotation-${index}`}
                  image={image.annotation_image}
                  index={index}
                  isAnnotation={true}
                />
              )}
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Result;
