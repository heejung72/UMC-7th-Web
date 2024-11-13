/*import { useQuery } from "react-query";
import { axiosInstance } from "../apis/axios-instance";

const useCustomFetch = (url) => {
  return useQuery(
    url, // queryKey로 URL을 사용하여 캐싱 관리
    async () => {
      const response = await axiosInstance.get(url);
      return response.data; // response에서 data만 반환
    },
    {
      staleTime: 10000, // 필요에 따라 staleTime, cacheTime을 설정합니다.
      cacheTime: 10000,
      refetchOnWindowFocus: false, // 사용자가 필요에 따라 설정
    }
  );
};

export default useCustomFetch;*/


import { useEffect, useState } from "react"
import axiosInstance  from "../apis/axios-instance"

const useCustomFetch = (url) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try{
                const response = await axiosInstance.get(url)
                setData(response)
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [url])

    return {data, isLoading, isError}
}

export default useCustomFetch;