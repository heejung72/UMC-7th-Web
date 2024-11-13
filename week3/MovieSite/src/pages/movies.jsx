import styled from "styled-components";
import { useNavigate } from "react-router-dom";


const Movies = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <div className="title">카테고리</div>
      <CategoryWrapper>
        <div className="nowplaying category" onClick={() => navigate('/movies/nowplaying')}>현재 상영중인</div>
        <div className="popular category" onClick={() => navigate('/movies/popular')}>인기있는</div>
        <div className="toprated category" onClick={() => navigate('/movies/toprated')}>높은 평가를 받은</div> {/* 경로와 클래스명 수정 */}
        <div className="upcoming category" onClick={() => navigate('/movies/upcoming')}>개봉 예정중인</div>                
      </CategoryWrapper>
    </Container>
  );
};

export default Movies;

const Container = styled.div`
  padding: 20px;
  .title {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 20px;
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;

   .nowplaying {
    background-image: url('../mocks/1.jpeg'); 
    background-size: cover; /* 이미지 크기 조정 */
    background-position: center; /* 이미지 위치 조정 */
  }
  .popular {
    background-image: url('../mocks/2.jpeg');
    background-size: cover;
    background-position: center;
  }
  .toprated {
    background-image: url('../mocks/3.jpeg');
    background-size: cover;
    background-position: center;
  }
  .upcoming {
    background-image: url('../mocks/4.jpeg');
    background-size: cover;
    background-position: center;
  }


  .category {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
    width: 250px;
    height: 250px;
    border-radius: 20px;
    color: white;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    opacity: 1;
  }
`;
