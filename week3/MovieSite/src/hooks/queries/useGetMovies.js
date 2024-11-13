import { axiosInstance } from "../../apis/axios-instance";
// pageparam의 기본값을 줌
const useGetMovies = async ({ category, pageParam = 1 }) => {
  const { data } = await axiosInstance.get(`/movie/${category}?language=ko-kr&page=${pageParam}`);
  return data;
};

export { useGetMovies };
