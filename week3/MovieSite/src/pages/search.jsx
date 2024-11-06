import { useState } from "react";
import styled from "styled-components";
import MovieCard from "../components/moviecards"; // 실제 영화 카드 컴포넌트
import SkeletonCard from "../components/skeleton/SkeletonCard"; // Skeleton 로딩 컴포넌트

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
  const [movies, setMovies] = useState([]); // 검색된 영화 목록 상태
  const [loading, setLoading] = useState(false); // 로딩 상태

  const handleSearch = async () => {
    if (!searchQuery) return; // 검색어가 없으면 아무것도 하지 않음

    setLoading(true); // 검색 시작 시 로딩 상태 활성화

    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=YOUR_API_KEY`);
      const data = await response.json();

      setMovies(data.results || []);
    } catch (error) {
      console.error("Error fetching movie data:", error);
      setMovies([]); // 에러 발생 시 빈 배열로 초기화
    } finally {
      setLoading(false); // 로딩 완료 후 로딩 상태 비활성화
    }
  };

  return (
    <Container>
      <SearchWrapper>
        <SearchInput 
          type="text" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          placeholder="영화를 검색하세요..."
        />
        <SearchButton onClick={handleSearch}>검색</SearchButton>
      </SearchWrapper>

      <MoviesContainer>
        {loading ? (
          // 로딩 중에는 Skeleton UI 표시
          Array(6).fill().map((_, index) => <SkeletonCard key={index} />)
        ) : (
          movies.length > 0 ? (
            // 영화가 있을 경우 MovieCard 컴포넌트로 영화 목록 출력
            movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          ) : (
            <NoMoviesMessage>{searchQuery ? `"${searchQuery}"` + " 검색된 영화가 없습니다." : "검색어를 입력해 주세요."}</NoMoviesMessage>
          )
        )}
      </MoviesContainer>
    </Container>
  );
};

export default SearchPage;

const Container = styled.div`
  color: white;
  padding: 20px;
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 300px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-right: 10px;
  font-size: 16px;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  background-color: #e83261;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const MoviesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const NoMoviesMessage = styled.div`
  color: white;
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
`;
