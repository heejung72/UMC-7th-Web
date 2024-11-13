import axiosInstance from "../../apis/axios-instance"; 

const useGetMovies = async ({ category, pageParam = 1 }) => {
  try {
    const { data } = await axiosInstance.get(`/movie/${category}?language=ko-KR&page=${pageParam}`);
    console.log('영화 받아오는 중...');
    return data;
  } catch (error) {
    console.error('영화 데이터를 가져오는 중 오류 발생:', error);
    throw error; }
}

export { useGetMovies };

/*import { axiosInstance } from "../../apis/axios-instance";
// pageparam의 기본값을 줌
const useGetMovies = async ({ category, pageParam = 1 }) => {
  const { data } = await axiosInstance.get(`/movie/${category}?language=ko-kr&page=${pageParam}`);
  return data;
};

export { useGetMovies };*/
