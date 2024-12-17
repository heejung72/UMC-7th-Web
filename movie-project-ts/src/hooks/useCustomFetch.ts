import { useEffect, useState } from "react";
import { axiosInstance } from "../apis/axios-instance";

// Type for the response data, adjust based on the actual response structure
interface ResponseData {
  // Define the shape of the response data here
  // Example:
  // results: Array<any>;
  [key: string]: any; // Replace `any` with the actual type if possible
}

const useCustomFetch = (url: string) => {
  const [data, setData] = useState<ResponseData | null>(null); // Response data can be null initially
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(url);
        setData(response.data); // Assume response.data is the data you're looking for
      } catch (error) {
        setIsError(true);
        console.error("Error fetching data:", error); // Optional logging
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, isLoading, isError };
};

export default useCustomFetch;
