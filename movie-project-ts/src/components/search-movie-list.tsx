import styled from "styled-components";
import useCustomFetch from "../hooks/useCustomFetch";
import { useSearchParams } from "react-router-dom";
import CardListSkeleton from "../components/skeleton/card-list-skeleton"; // Use CardListSkeleton for multiple skeletons
import MovieCard from "./moviecards";

// Define the shape of the movie data
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  // Add other movie fields if needed
}

interface MovieResponse {
  results: Movie[];
}

const SearchMovieList = () => {
  const [searchParam] = useSearchParams();
  const mq = searchParam.get("mq");
  
  // Construct the URL only if 'mq' exists
  const url = mq
    ? `/search/movie?query=${mq}&include_adult=false&language=ko-KR&page=1`
    : null;

  // Fetch data using custom hook
  const { data: movies, isLoading, isError } = useCustomFetch<MovieResponse>(url);

  // Error handling
  if (isError) {
    return (
      <MoviesContainer>
        <h1 style={{ color: "white" }}>에러 발생</h1>
      </MoviesContainer>
    );
  }

  // Loading state with skeletons and loading message
  if (isLoading) {
    return (
      <MoviesContainer>
        <h1 style={{ color: "white", textAlign: "center", width: "100%" }}>
          로딩 중 입니다 ...
        </h1>
        <CardListSkeleton number={20} /> {/* Display 20 skeleton cards while loading */}
      </MoviesContainer>
    );
  }

  // No results handling
  if (mq && movies?.results?.length === 0) {
    return (
      <MoviesContainer>
        <h1 style={{ color: "white" }}>
          해당하는 검색어 "{mq}"에 해당하는 데이터가 없습니다.
        </h1>
      </MoviesContainer>
    );
  }

  // Display movies if data is available
  return (
    <MoviesContainer>
      {movies?.results?.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </MoviesContainer>
  );
};

export default SearchMovieList;

const MoviesContainer = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-gap: 15px;
  padding: 0 15px;
`;

