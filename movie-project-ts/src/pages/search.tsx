import styled from "styled-components";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";
import MovieCard from '../components/moviecards';
import { debounce } from "../utils/debounce";

// Define types for movie data
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

const Search: React.FC = () => {
    const [searchValue, setSearchValue] = useState<string>(""); // 검색어
    const [debouncedValue, setDebouncedValue] = useState<string>(""); // 디바운스된 검색어
    const navigate = useNavigate();
    const [searchParams] = useSearchParams(); // searchParams는 기본값 없이 설정 가능

    const mq = searchParams.get('mq'); // URL 파라미터에서 검색어 추출

    // 입력 필드 변경 시 검색어 업데이트
    const onChangeSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    // 검색어가 변경될 때 debounce 적용
    useEffect(() => {
        const debouncedSearch = debounce((value: string) => {
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
    const { data: movies, isLoding, isError } = useCustomFetch<ApiResponse>(url);

    // Enter 키로 검색 기능
    const handleSearchMovieWithKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
                {movies?.results.map((movie) => (
                    <MovieCard key={movie.id} poster={movie.poster_path} movie={movie} />
                ))}
            </MovieGrid>
        </>
    );
};

export default Search;

// 스타일 컴포넌트 정의
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
