import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const PageContainer = styled.div`
  background-color: #111111;
  min-height: 100vh;
  min-width: 170vh;
`;
const Title = styled.h1`
  color: white; 
  margin-left:10px;
   font-size: 15px; 
`;
const Popular = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(
        'https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY&language=ko-KR'
      );
      setMovies(response.data.results);
    };
    fetchMovies();
  }, []);

  return (
    <PageContainer><Title><div>
      <h1>인기있는 영화</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div></Title></PageContainer>
  );
};

export default Popular;
