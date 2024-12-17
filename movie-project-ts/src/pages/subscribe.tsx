import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { axiosInstance } from "../apis/axios-instance";

// Type Definitions
interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

interface TVShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
}

const MovieSliderWithTV: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [tvShows, setTvShows] = useState<TVShow[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // 영화 데이터 가져오기
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axiosInstance.get(
          `/trending/movie/day?language=ko-KR`
        );
        setMovies(response.data.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  // TV 데이터 가져오기
  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        const response = await axiosInstance.get(
          `/trending/tv/day?language=ko-KR`
        );
        setTvShows(response.data.results || []);
      } catch (error) {
        console.error("Error fetching TV shows:", error);
      }
    };
    fetchTVShows();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === movies.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [movies]);

  if (!movies.length) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      {/* 영화 슬라이더 섹션 */}
      <SliderContainer>
        <div className="progress-bar">
          <div className="progress"></div>
        </div>
        <div className="slider">
          <button
            className="slider-button left"
            onClick={() =>
              setCurrentIndex((prevIndex) =>
                prevIndex === 0 ? movies.length - 1 : prevIndex - 1
              )
            }
          >
            &lt;
          </button>
          <div
            className="slides"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {movies.map((movie) => (
              <div className="slide" key={movie.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <p>{movie.overview.substring(0, 100)}...</p>
                </div>
              </div>
            ))}
          </div>
          <button
            className="slider-button right"
            onClick={() =>
              setCurrentIndex((prevIndex) =>
                prevIndex === movies.length - 1 ? 0 : prevIndex + 1
              )
            }
          >
            &gt;
          </button>
        </div>
      </SliderContainer>

      {/* TV 가로 스크롤 섹션 */}
      <TVListContainer>
        <h2>TV 추천 리스트</h2>
        <div className="tv-list">
          {tvShows.map((show) => (
            <div className="tv-item" key={show.id}>
              {/* TVDetail로 이동하는 링크 */}
              <Link to={`/tv/${show.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={show.name}
                />
              </Link>
              <div className="tv-info">
                <h3>{show.name}</h3>
                <p>{show.overview.substring(0, 50)}...</p>
              </div>
            </div>
          ))}
        </div>
      </TVListContainer>
    </Container>
  );
};

export default MovieSliderWithTV;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
`;

const SliderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center; /* 전체 슬라이더를 중앙에 정렬 */
  .slider {
    position: relative;
    width: 100%;
    height: 750px;
    display: flex;
    justify-content: center;
    overflow: hidden;
  }
  .slides {
    display: flex;
    transition: transform 0.5s ease-in-out;
  }
  .slide {
    min-width: 100%;
    display: flex; /* 자식 요소 정렬 */
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .slide img {
    width: 50%; /* 이미지 너비를 60%로 설정 */
    height: auto;
    border-radius: 10px;
    margin: 0 auto;
  }
  .movie-info {
    position: absolute;
    bottom: 20px;
    left: 20px;
    color: white;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
  }
  .slider-button {
    position: absolute;
    top: 50%; /* 버튼을 슬라이드 이미지의 중앙에 위치 */
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    font-size: 2.5rem;
    z-index: 10;
    border-radius: 50%; /* 버튼을 둥글게 */
  }
  .slider-button.left {
    left: 20px; /* 왼쪽 버튼 */
  }
  .slider-button.right {
    right: 20px; /* 오른쪽 버튼 */
  }
  .progress-bar {
    position: absolute;
    bottom: 620px; /* 위치가 슬라이더 아래로 숨겨질 가능성 */
    left: 550px;
    width: 40%;
    height: 5px;
    background: rgba(255, 255, 255, 0.3);
  }

  .progress {
    height: 100%;
    background: white;
    animation: progress 3s linear infinite;
  }

  @keyframes progress {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
  .indicators {
    position: absolute;
    bottom: 10px;
    right: 20px;
    display: flex;
    gap: 5px;
  }
  .dot {
    width: 10px;
    height: 10px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    transition: background 0.3s;
  }
  .dot.active {
    background: white;
  }
`;

const TVListContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  background: #000;
  color: white;
  padding: 20px;
  border-radius: 10px;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }

  /* TV 가로 스크롤 섹션 */
  .tv-list {
    display: flex;
    gap: 15px;
    overflow-x: auto;
    padding-bottom: 10px;
    scrollbar-width: thin; /* 파이어폭스에서의 기본 스크롤바 스타일 */
    scrollbar-color: #888 #333; /* 파이어폭스 스크롤바 색상 */
  }

  /* 웹킷 브라우저에서 스크롤바 스타일 커스터마이징 */
  .tv-list::-webkit-scrollbar {
    height: 8px; /* 세로 스크롤바의 높이 */
  }

  .tv-list::-webkit-scrollbar-track {
    background: #333; /* 트랙 배경 색 */
    border-radius: 10px; /* 트랙의 모서리 둥글게 */
  }

  .tv-list::-webkit-scrollbar-thumb {
    background-color: #888; /* 스크롤바 색 */
    border-radius: 10px; /* 스크롤바의 모서리 둥글게 */
    border: 2px solid #333; /* 스크롤바 테두리 색 */
  }

  .tv-list::-webkit-scrollbar-thumb:hover {
    background-color: #555; /* 마우스를 올렸을 때 색 변경 */
  }

  .tv-item {
    flex: 0 0 auto; /* 가로로 정렬 */
    width: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .tv-item img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }

  .tv-info {
    margin-top: 10px;
  }

  .tv-info h3 {
    font-size: 0.9rem;
    margin: 0;
  }

  .tv-info p {
    font-size: 0.8rem;
    color: #ccc;
  }
`;
