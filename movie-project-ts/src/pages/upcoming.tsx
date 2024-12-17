import { useEffect, useState } from "react";
import styled from "styled-components";
import MovieCard from "../components/moviecards";
import CardSkeleton from "../components/skeleton/card-skeleton";
import { axiosInstance } from "../apis/axios-instance";
import Pagination from "../components/pagination";

// Type Definitions
interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

interface MovieResponse {
  results: Movie[];
  total_pages: number;
}

const UpComing: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchMovies = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get<MovieResponse>(
        `/movie/upcoming?language=ko-KR&page=${page}`
      );
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

  return (
    <>
      <MoviesContainer>
        {isLoading
          ? [...Array(9)].map((_, index) => <CardSkeleton key={index} />)
          : movies.map((movie) => (
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

export default UpComing;

const MoviesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-gap: 15px;
  padding: 20px;
`;
