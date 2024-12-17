import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../apis/axios-instance";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  // You can add other movie properties as needed
}

interface GetMoviesResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

interface UseGetInfiniteMoviesProps {
  category: string;
  pageParam?: number;
}

const useGetInfiniteMovies = ({ category, pageParam = 1 }: UseGetInfiniteMoviesProps) => {
  const fetchMovies = async (page: number): Promise<GetMoviesResponse> => {
    try {
      // You may consider handling errors in a more user-friendly way
      const { data } = await axiosInstance.get<GetMoviesResponse>(
        `/movie/${category}?language=ko-KR&page=${page}`
      );
      console.log('영화 받아오는 중...');
      return data;
    } catch (error) {
      console.error('영화 데이터를 가져오는 중 오류 발생:', error);
      throw error; // Let React Query handle the error gracefully
    }
  };

  return useQuery<GetMoviesResponse, Error>(
    ['movies', category, pageParam],
    () => fetchMovies(pageParam),
    {
      getNextPageParam: (lastPage) => {
        // Only return the next page if there's more data
        return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
      },
      // Set to true to automatically refetch when component remounts
      refetchOnWindowFocus: false,
      retry: 1, // Adjust retry logic if needed
      staleTime: 1000 * 60 * 5, // Optional: make the query stale after 5 minutes
    }
  );
};

export { useGetInfiniteMovies };
