import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components'; 
import MovieCard from '../components/moviecards'; 
import {axiosInstance} from '../apis/axios-instance';
import useCustomFetch from "../hooks/useCustomFetch";

const UpComing = () => {
    const { data: movies, isLoading, isError } = useCustomFetch(`/movie/upcoming?language=ko-kr&page=1`); // 올바른 API 엔드포인트 확인
    
    if (isLoading) {
        return (
            <div>
                <h1>로딩중 입니다.</h1>
            </div>
        );
    }
    
    if (isError) {
        return (
            <div>
                <h1>에러가 발생했습니다.</h1>
            </div>
        );
    }

    return (
        <MoviesContainer>
            {movies.data?.results.map((movie) => (
                <MovieCard 
                    key={movie.id}
                    poster={movie.poster_path}
                    title={movie.title}
                    releaseDate={movie.release_date}
                    movie = {movie}
                />
            ))}
        </MoviesContainer>
    );
};

export default UpComing;
const MoviesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    grid-gap: 15px;
`;
