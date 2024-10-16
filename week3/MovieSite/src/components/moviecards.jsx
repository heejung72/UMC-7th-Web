import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <MovieItem onClick={() => { navigate(`/movies/${movie.id}`); }}>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="영화 포스터" />
      <div className='overView' />
      <Info>
        <div className="title">{movie.title}</div>
        <div className="release_date">{movie.release_date}</div>
      </Info>
    </MovieItem>
  );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        poster_path: PropTypes.string,
        title: PropTypes.string,
        release_date: PropTypes.string
    }).isRequired,
};

export default MovieCard;

const MovieItem = styled.div`
    position: relative; /* 부모 요소 */
    cursor: pointer;
    
  img {
    width: 100%;
    border-radius: 10px;
  }

  .overView {
    position: absolute; /* 자식 요소: 부모로부터 위치 맞추기 */
    top: 0;
    left: 0; 
    width: 100%; 
    height: 100%;
    border-radius: 10px; /* img와 같이 */
    background-color: rgba(0, 0, 0, 0.6); /* 배경색 및 투명도 설정 */
    opacity: 0; /* 처음에는 투명하게 */
    transition: opacity 0.3s; /* 부드러운 전환 효과 */
  }

  &:hover .overView {
    opacity: 1; /* hover 시 불투명도 증가 */
  }
`;

const Info = styled.div`
  padding: 10px; /* 아래쪽 여백 추가 */
  background-color: rgba(0, 0, 0, 0.6); /* 배경색 설정 */
  border-radius: 0 0 10px 10px; /* 아래쪽 모서리 둥글게 */
  color: white; /* 텍스트 색상 */
  text-align: left; /* 텍스트 왼쪽 정렬 */
.title {
    font-size: 12px; /* 제목 글씨 크기 조정 */
  }

  .release_date {
    font-size: 12px; /* 출시 날짜 글씨 크기 조정 */
  }
`;


