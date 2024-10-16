import styled from "styled-components";
import MovieCard from "../components/moviecards"; 
import useCustomFetch from "../hooks/useCustomFetch";

const Popular = () => {
    const {data: movies, isLoading, isError} = useCustomFetch(`/movie/popular?language=ko-kr&page=1`);
    if (isLoading) {
        return(
            <div>
                <h1>로딩중 입니다.</h1>
            </div>
        );
    }
    if (isError) {
        return(
            <div>
                <h1>에러</h1>
            </div>
        );
    }
    return (
        <MoviesContainer>
            {movies.data?.results.map((movie) => (
                <MovieCard 
                    key = {movie.id}
                    movie = {movie}
                />
            ))}
        </MoviesContainer>
    );
};

export default Popular;

const MoviesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    grid-gap: 15px;
`;