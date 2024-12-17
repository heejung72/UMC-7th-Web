import { useEffect, useState } from "react";
import styled from "styled-components";
import MovieCard from "../components/moviecards";
import CardSkeleton from "../components/skeleton/card-skeleton";
import { axiosInstance } from "../apis/axios-instance";
import Pagination from "../components/pagination";

// Type definitions
interface Movie {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
}

interface ApiResponse {
  results: Movie[];
  total_pages: number;
}

const NowPlaying: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);  // State for movies
  const [currentPage, setCurrentPage] = useState<number>(1);  // State for current page
  const [totalPages, setTotalPages] = useState<number>(1);  // State for total pages
  const [isLoading, setIsLoading] = useState<boolean>(false);  // State for loading status

  const fetchMovies = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get<ApiResponse>(`/movie/now_playing?language=ko-KR&page=${page}`);
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("영화 데이터를 가져오는 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div>
        <CardSkeleton number={20} />
        <h1>로딩 중입니다...</h1>
      </div>
    );
  }

  return (
    <>
      <MoviesContainer>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            poster={movie.poster_path}
            title={movie.title}
            releaseDate={movie.release_date}
            movie={movie}
          />
        ))}
      </MoviesContainer>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default NowPlaying;

// Styled Component
const MoviesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-gap: 15px;
  padding: 20px;
`;
