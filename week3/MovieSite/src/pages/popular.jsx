import { useEffect, useState } from "react";
import styled from "styled-components";
import MovieCard from "../components/moviecards";
import CardSkeleton from "../components/skeleton/card-skeleton";
import { axiosInstance } from "../apis/axios-instance";

const Popular = () => {
  const [movies, setMovies] = useState([]); // 영화 데이터를 저장
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [hasMore, setHasMore] = useState(true); // 추가 데이터가 있는지 확인

  // 데이터를 가져오는 함수
  const fetchMovies = async (page) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `/movie/popular?language=ko-KR&page=${page}`
      );
      const newMovies = response.data.results;

      setMovies((prevMovies) => [...prevMovies, ...newMovies]); // 기존 데이터에 새 데이터 추가
      setHasMore(response.data.page < response.data.total_pages); // 다음 페이지가 있는지 확인
    } catch (error) {
      console.error("영화 데이터를 가져오는 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 페이지 변경 시 데이터를 가져옴
  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      !isLoading &&
      hasMore
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // 스크롤 이벤트 등록
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, hasMore]);

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
      {isLoading && <CardSkeleton number={10} />} {/* 로딩 중 스켈레톤 */}
    </MoviesContainer>
  );
};

export default Popular;

const MoviesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-gap: 15px;
  padding: 20px;
`;
