import { useState, useEffect, useRef } from "react";
import axios from "axios";
const API_URL = process.env.REACT_APP_BACKEND_URL;

const useAnnotationImages = (xnArray) => {
  const [annotations, setAnnotations] = useState({});
  const prevXnArrayRef = useRef([]);

  useEffect(() => {
    if (
      xnArray.length === 0 ||
      (prevXnArrayRef.current.length === xnArray.length &&
        prevXnArrayRef.current.every((val, index) => val === xnArray[index]))
    ) {
      return;
    }
    prevXnArrayRef.current = xnArray;
    const fetchAnnotations = async () => {
      const results = await Promise.all(
        xnArray.map(async (xn) => {
          try {
            const response = await axios.get(
              `${API_URL}/fetch-data/api/images/annotation/${xn}`,
              { withCredentials: true }
            );
            return { xn, data: response.data.data };
          } catch (error) {
            console.error("Error fetching annotation:", error);
            return { xn, data: null };
          }
        })
      );
      // Create a mapping of xn to its annotation data
      const annotationMap = {};
      results.forEach(({ xn, data }) => {
        annotationMap[xn] = data;
      });

      setAnnotations(annotationMap);
    };

    fetchAnnotations();
  }, [xnArray]);

  return annotations;
};

export default useAnnotationImages;