import { useState, useEffect } from "react";
import axios from "axios";

const useCaseImages = (patient_cases) => {
  const [casesWithImages, setCasesWithImages] = useState([]);

  useEffect(() => {
    const fetchAllCaseImages = async () => {
      const casesWithImages = await Promise.all(
        patient_cases.map(async (item) => {
          const images = await getCaseImage(item.an);
          return {
            ...item,
            case_images: images?.case_images || [],
          };
        })
      );
      setCasesWithImages(casesWithImages);
    };

    if (patient_cases?.length > 0) {
      fetchAllCaseImages();
    }
  }, [patient_cases]);

  const getCaseImage = async (an) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/fetch-data/api/images/${an}`,
        { withCredentials: true }
      );
      return response.data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return casesWithImages;
};

export default useCaseImages;