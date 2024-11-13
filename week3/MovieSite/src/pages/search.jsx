import styled from "styled-components";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";
import MovieCard from '../components/moviecards';
import CardListSkeleton from "../components/skeleton/card-list-skeleton"; // Updated to use CardListSkeleton for multiple skeletons
import SearchMovieList from "../components/search-movie-list"

const Search = () => {
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams({ mq: '' });

    const mq = searchParams.get('mq');

    const onChangeSearchValue = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSearchMovie = () => {
        if (mq === searchValue) return;
        navigate(`/search?mq=${searchValue}`);
    };

    const handleSearchMovieWithKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearchMovie();
        }
    };

    const url = `/search/movie?query=${searchValue}&include_adult=false&language=ko-KR&page=1`;
    const { data: movies, isLoading, isError } = useCustomFetch(url);

    return (
        <>
            <SearchContainer>
                <input
                    placeholder="영화 제목을 입력해주세요 ..."
                    value={searchValue}
                    onChange={onChangeSearchValue}
                    onKeyDown={handleSearchMovieWithKeyDown}
                />
                <button onClick={handleSearchMovie}>검색</button>
            </SearchContainer>
            <MovieGrid>
                {isLoading ? (
                    <CardListSkeleton number={20} /> // Display 20 skeletons while loading
                ) : (
                    movies?.data?.results.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            poster={movie.poster_path}
                            movie={movie}
                        />
                    ))
                )}
                {isError && <ErrorMessage>에러 발생</ErrorMessage>}
            </MovieGrid>
        </>
    );
};

export default Search;

const SearchContainer = styled.div`
    display: flex;
    justify-content: center;
    input {
        flex: 1;
        padding: 15px;
        border: 1px solid rgb(220,220,220);
    }
    button {
        width: 80px;
        background-color: #F82E62;
        color: white;
        cursor: pointer;
        border: none;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }
`;

const MovieGrid = styled.div`
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(9, 1fr); /* 9 items per row */
    grid-gap: 15px;
    padding: 0 15px;
`;

const ErrorMessage = styled.h1`
    color: white;
    text-align: center;
    width: 100%;
`;
