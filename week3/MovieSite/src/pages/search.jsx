import styled from "styled-components";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";
import MovieCard from '../components/moviecards'; 

const Search = () => {
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    const onChangeSearchValue = (event) => {
        setSearchValue(event.target.value);
    };

    const [searchParams, setSearchParams] = useSearchParams({
        mq: ""
    });

    const mq = searchParams.get('mq');

    const handleSearchMovie = () => {
        if (mq == searchValue)
            return;
        navigate(`/search?mq=${searchValue}`); // 백틱을 사용한 템플릿 문자열
    };

    const handleSearchMovieWithKeyDown = (e) => {
        if(e.key == 'Enter'){
            handleSearchMovie();
        }
    };

    const url = `/search/movie?query=${searchValue}&include_adult=false&language=ko-KR&page=1`;
    const {data : movies, isLoding, isError} = useCustomFetch(url);

    return (
        <><SearchContainer>
            <input
                placeholder="영화 제목을 입력해주세요 ..."
                value={searchValue}
                onChange={onChangeSearchValue}
                onKeyDown={handleSearchMovieWithKeyDown}
            />
            <button onClick={handleSearchMovie}>검색</button>
        </SearchContainer>
        <div>
        {movies.data?.results.map((movie) => (
            <MovieCard
            key={movie.id}
            poster={movie.poster_path}
            movie = {movie} /> 
          ))}
          </div>
          </>
    );
};

export default Search;

const SearchContainer = styled.div`
    display: flex;
    justify-content : center;
    input{
    flex:1;
    padding:15px;
    border: 1px solid rgb(220,220,220);
    }
    button{
    width:80px;
    background-color:#F82E62;
    color: white;
    cursor: pointer;
    border:none;
    border-top-right-radius:5px;
    border-bottom-right-radius:5px
    }
`
const div = styled.div`
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); /* 150px 이상 크기의 카드로 자동 배치 */
    grid-gap: 15px;
    padding: 0 15px;  /* 여백을 주어서 내용이 너무 끝에 붙지 않도록 함 */
`;
