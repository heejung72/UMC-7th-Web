import { useEffect, useState } from "react";
import styled from "styled-components";
import MovieCard from "../components/moviecards";
import CardSkeleton from "../components/skeleton/card-skeleton";
import { axiosInstance } from "../apis/axios-instance";
import Pagination from "../components/pagination";

// 장르 및 옵션 설정
const genres = {
  영화: "movie", // 기본 영화
  애니메이션: 16, // 애니메이션 장르 ID
  호러: 27, // 호러 장르 ID
  독일: "DE", // 독일 영화 (국가 코드)
};

const Purchase = () => {
  const [movies, setMovies] = useState([]); // 영화 데이터
  const [selectedGenre, setSelectedGenre] = useState("영화"); // 기본 선택된 장르
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  // 선택된 장르에 따라 영화 데이터를 가져오는 함수
  const fetchMovies = async (genre, page) => {
    setIsLoading(true);
    try {
      let url = "";
      if (genre === "영화") {
        // 영화 장르인 경우, Trending 영화 가져오기
        url = `/trending/movie/week?language=ko-KR&page=${page}`;
      } else if (genre === "독일") {
        // 한국 영화 가져오기 (with_origin_country=KR)
        url = `/discover/movie?language=ko-KR&with_origin_country=${genres[genre]}&page=${page}`;
      } else {
        // 특정 장르(애니메이션, 호러)에 따라 데이터 가져오기
        url = `/discover/movie?language=ko-KR&with_genres=${genres[genre]}&page=${page}`;
      }

      const response = await axiosInstance.get(url);
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("영화 데이터를 가져오는 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 장르 변경 및 페이지 변경 시 데이터 가져오기
  useEffect(() => {
    fetchMovies(selectedGenre, currentPage);
  }, [selectedGenre, currentPage]);

  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 장르 탭 클릭 핸들러
  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1); // 장르 변경 시 첫 페이지로 이동
  };

  // 로딩 중 상태일 때
  if (isLoading && movies.length === 0) {
    return (
      <div>
        <CardSkeleton number={20} />
        <h1>로딩 중입니다...</h1>
      </div>
    );
  }

  // 데이터가 없는 경우
  if (!isLoading && movies.length === 0) {
    return (
      <div>
        <h1>영화 데이터를 가져올 수 없습니다.</h1>
      </div>
    );
  }

  return (
    <>
      {/* 장르 선택 탭 */}
      <GenreTabs>
        {Object.keys(genres).map((genre) => (
          <GenreTab
            key={genre}
            className={selectedGenre === genre ? "active" : ""}
            onClick={() => handleGenreChange(genre)}
          >
            #{genre}
          </GenreTab>
        ))}
      </GenreTabs>

      {/* 영화 카드 그리드 */}
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

      {/* 로딩 중 스켈레톤 */}
      {isLoading && <CardSkeleton number={10} />}

      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Purchase;

// 스타일 컴포넌트 정의
const GenreTabs = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const GenreTab = styled.button`
  margin: 0 10px;
  padding: 10px 20px;
  border: none;
  background-color: #444;
  color: #fff;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;

  &.active {
    background-color: #fff;
    color: #444;
    font-weight: bold;
  }

  &:hover {
    background-color: #555;
  }
`;

const MoviesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr); /* 한 줄에 5개의 카드 */
  grid-gap: 15px;
  padding: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* 모바일에서는 2개씩 */
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* 더 작은 화면에서는 1개씩 */
  }
`;
