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

const NowPlaying = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=YOUR_API_KEY&language=ko-KR&page=1`);
        setMovies(response.data.results); // API 결과값 설정
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
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} /> 
        ))}
      </MovieGrid>
    </div>
  );
};

export default NowPlaying;
