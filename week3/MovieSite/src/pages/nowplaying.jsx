import { useEffect, useState } from "react";
import styled from "styled-components";
import MovieCard from "../components/moviecards";
import CardSkeleton from "../components/skeleton/card-skeleton";
import { axiosInstance } from "../apis/axios-instance";
import Pagination from "../components/pagination";

const NowPlaying = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async (page) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `/movie/now_playing?language=ko-KR&page=${page}`
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

  const handlePageChange = (page) => {
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

const MoviesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-gap: 15px;
  padding: 20px;
`;
