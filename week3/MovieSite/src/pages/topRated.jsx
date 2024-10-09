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
import  { useEffect, useState } from 'react';
import axios from 'axios';

const TopRated = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(
        'https://api.themoviedb.org/3/movie/top_rated?api_key=YOUR_API_KEY&language=ko-KR'
      );
      setMovies(response.data.results);
    };
    fetchMovies();
  }, []);

  return (<Title>
    <PageContainer> <div>
      <h1>높은 평가를 받은 영화</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div></PageContainer></Title>
  );
};

export default TopRated;
