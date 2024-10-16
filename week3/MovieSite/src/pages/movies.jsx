import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Movies = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <div className="title">카테고리</div>
            <CategoryWrapper>
                <div className="nowplaying category" onClick={() => navigate('/movies/nowplaying')}>현재 상영중인</div>
                <div className="popular category" onClick={() => navigate('/movies/popular')}> 인기있는</div>
                <div className="toprated category" onClick={() => navigate('/movies/topRated')}>높은 평가를 받은</div>
                <div className="upcoming category" onClick={() => navigate('/movies/upcoming')}>개봉 예정중인</div>                
            </CategoryWrapper>
        </Container>
    );
};

export default Movies;

const Container = styled.div`
.title {
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 20px;
    }
`

const CategoryWrapper = styled.div`
    display: flex;
    align-items: center;

    .nowplaying{ background-color: red; }
    .popular { background-color: orange; }
    .topRated { background-color: yellow; }
    .upcoming { background-color: green; }

    .category {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 20px;
        width: 250px;
        height: 100px;
        border-radius: 20px;
        color: black;
        cursor: pointer;
    }
`;