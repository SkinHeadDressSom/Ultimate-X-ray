import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
const API_URL = process.env.REACT_APP_BACKEND_URL;

const useAnnotationImages = (xnArray) => {
  const [annotations, setAnnotations] = useState({});
  const prevXnArrayRef = useRef([]);
  const { isLoading } = useSelector((state) => state.visualize);
  const prevIsLoadingRef = useRef(false);

  useEffect(() => {
    const wasLoading = prevIsLoadingRef.current;
    const prevXnArray = prevXnArrayRef.current;

    prevIsLoadingRef.current = isLoading;
    prevXnArrayRef.current = xnArray;

    const hasXnArrayChanged =
      prevXnArray.length !== xnArray.length ||
      !prevXnArray.every((val, index) => val === xnArray[index]);

    if (
      xnArray.length === 0
    ) {
      return;
    }

    if (!hasXnArrayChanged && !(wasLoading && !isLoading)) {
      return;
    }

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

    fetchAnnotations()
      .then(() => {
        console.log("Fetched annotations successfully");
      })
      .catch((error) => {
        console.error("Error fetching annotations:", error);
      });
  }, [xnArray, isLoading]);

  return annotations;
};

export default useAnnotationImages;