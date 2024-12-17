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

const Popular: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]); // 영화 데이터를 저장
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 번호
  const [totalPages, setTotalPages] = useState<number>(1); // 전체 페이지 수
  const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태

  // 데이터를 가져오는 함수
  const fetchMovies = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get<ApiResponse>(
        `/movie/popular?language=ko-KR&page=${page}`
      );
      setMovies(response.data.results); // 현재 페이지 데이터만 설정
      setTotalPages(response.data.total_pages); // 전체 페이지 수 설정
    } catch (error) {
      console.error("영화 데이터를 가져오는 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 페이지 변경 시 데이터를 가져옴
  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading && movies.length === 0) {
    return (
      <div>
        <CardSkeleton number={20} />
        <h1>로딩 중입니다...</h1>
      </div>
    );
  }

  if (!isLoading && movies.length === 0) {
    return (
      <div>
        <h1>영화 데이터를 가져올 수 없습니다.</h1>
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
      {isLoading && <CardSkeleton number={10} />} {/* 로딩 중 스켈레톤 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Popular;

// Styled Component
const MoviesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-gap: 15px;
  padding: 20px;
`;
