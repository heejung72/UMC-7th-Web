import { useEffect, useState } from 'react'; 
import axios from 'axios';
import styled from 'styled-components';

const PageContainer = styled.div`
  background-color: black;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: white;
  margin-left: 10px;
  font-size: 20px;
`;

const MovieBoxContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80%;
`;

const Box = styled.div`
  width: 200px;
  height: 100px;
  margin: 20px;
  background-color: ${(props) => props.color};
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
    <PageContainer>
      <Title>현재 상영중인 영화</Title>
      <MovieBoxContainer>
        <Box color="red">현재 상영중인</Box>
        <Box color="yellow">인기있는</Box>
        <Box color="green">높은 평가를 받은</Box>
        <Box color="blue">개봉 예정중인</Box>
      </MovieBoxContainer>
    </PageContainer>
  );
};

export default NowPlaying;
