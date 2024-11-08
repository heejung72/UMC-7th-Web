import styled from "styled-components";
import useCustomFetch from "../hooks/useCustomFetch";
import { useSearchParams } from "react-router-dom";
import CardListSkeleton from "../components/Skeleton/SkeletonCard";
import MovieCard from "./moviecards";


const SearchMovieList = () => {
    const [searchParam, setSearchParams] = useSearchParams({
        mq: ''
    });
    const mq = searchParam.get('mq');

    const debounceText = useDebounce(mq, 200);

    const url = `/search/movie?query=${debounceText}&include_adult=false&language=ko-KR&page=1`;
    const {data: movies, isLoading, isError} = useCustomFetch(url);

    if(isLoading){
        return (
            <MoviesContainer>
                <CardListSkeleton number={20}/>
            </MoviesContainer>
        )
    }

    if(mq && movies.data?.results.length === 0) {
        return (
            <MoviesContainer>
                <h1>해당하는 검색어 {mq}에 해당하는 데이터가 없습니다.</h1>
            </MoviesContainer>
        )
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
    )
}

export default SearchMovieList;

const MoviesContainer = styled.div`
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    grid-gap: 15px;
`;