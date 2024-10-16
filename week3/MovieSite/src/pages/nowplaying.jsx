import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components'; 
import MovieCard from "../components/moviecards"; 

const MovieGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
`;

const MovieItem = styled.div`
  width: 200px;
  position: relative; 
  text-align: left; 
  color: white;
`;

const Poster = styled.img`
  width: 100%;
  border-radius: 10px;
`;

const TextWrapper = styled.div`
  margin-top: 5px; /* 포스터와 텍스트 사이의 간격 */
  
  h2 {
    font-size: 16px; 
    margin: 0;
  }

  p {
    font-size: 14px; 
    margin: 5px 0 0;
    color: white; 
  }
`;

const NowPlaying = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axiosInstance.get(`/movie/now_playing?language=ko-KR&page=1`)
        setMovies(movieData); 
      } catch (error) {
        console.error('Error fetching now playing movies:', error);
      }
    };

    getMovies();
  }, []);

  return (
    <div>
      <h1>현재 상영중인 영화</h1>
      <MovieGrid>
        {movies.map(movie => (
          <MovieItem key={movie.id}>
            <Poster src={movie.posterPath} alt={movie.title} />
            <TextWrapper>
              <h2>{movie.title}</h2> 
              <p>개봉일: {movie.releaseDate}</p>
            </TextWrapper>
          </MovieItem>
        ))}
      </MovieGrid>
    </div>
  );
};

export default NowPlaying;
