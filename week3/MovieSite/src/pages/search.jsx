import styled from "styled-components";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";
import MovieCard from '../components/moviecards';
import { debounce } from "../utils/debounce";

const Search = () => {
    const [searchValue, setSearchValue] = useState("");
    const [debouncedValue, setDebouncedValue] = useState("");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams({ mq: "" });

    const mq = searchParams.get('mq');

    // 입력 필드 변경 시 검색어 업데이트
    const onChangeSearchValue = (event) => {
        setSearchValue(event.target.value);
    };

    // 검색어가 변경될 때 debounce 적용
    useEffect(() => {
        const debouncedSearch = debounce((value) => {
            setDebouncedValue(value);
        }, 500); // 500ms 지연

        debouncedSearch(searchValue);
    }, [searchValue]);

    // 검색어가 변경되면 URL 업데이트
    useEffect(() => {
        if (debouncedValue && debouncedValue !== mq) {
            navigate(`/search?mq=${debouncedValue}`);
        }
    }, [debouncedValue, mq, navigate]);

    // API 요청 URL
    const url = `/search/movie?query=${debouncedValue}&include_adult=false&language=ko-KR&page=1`;
    const { data: movies, isLoding, isError } = useCustomFetch(url);

    // Enter 키로 검색 기능
    const handleSearchMovieWithKeyDown = (e) => {
        if (e.key === 'Enter') {
            navigate(`/search?mq=${searchValue}`);
        }
    };

    return (
        <>
            <SearchContainer>
                <input
                    placeholder="영화 제목을 입력해주세요 ..."
                    value={searchValue}
                    onChange={onChangeSearchValue}
                    onKeyDown={handleSearchMovieWithKeyDown}
                />
                <button onClick={() => navigate(`/search?mq=${searchValue}`)}>검색</button>
            </SearchContainer>
            <MovieGrid>
                {movies?.data?.results.map((movie) => (
                    <MovieCard key={movie.id} poster={movie.poster_path} movie={movie} />
                ))}
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
        border: 1px solid rgb(220, 220, 220);
    }
    button {
        width: 80px;
        background-color: #f82e62;
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
    grid-template-columns: repeat(9, 1fr);
    grid-gap: 15px;
    padding: 0 15px;

    @media (max-width: 1200px) {
        grid-template-columns: repeat(6, 1fr);
    }
    @media (max-width: 900px) {
        grid-template-columns: repeat(4, 1fr);
    }
    @media (max-width: 600px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;
