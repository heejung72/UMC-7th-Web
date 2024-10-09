import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const PageContainer = styled.div`
  background-color: #black;
  min-height: 100vh;
  min-width: 130vh;
`;
const Title = styled.h1`
  color: white; 
  margin-left:10px;
   font-size: 15px; 
`;
const NowPlaying = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(
        'https://api.themoviedb.org/3/movie/now_playing?api_key=YOUR_API_KEY&language=ko-KR'
      );
      setMovies(response.data.results);
    };
    fetchMovies();
  }, []);

  return (
    <PageContainer><Title>
      <h1>현재 상영중인 영화</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
   </Title> </PageContainer>
  );
};

export default NowPlaying;
