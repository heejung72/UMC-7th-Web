import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MovieCard = ({movie}) => {
    const navigate = useNavigate();

    return(
        <MovieItem onClick={() => {navigate(`/movies/${movie.id}`);}}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt='영화 포스터' />
            <div className='overView'/>
            <Info>
                <div className="title">{movie.title}</div>
                <div className="release_date">{movie.release_date}</div>    
            </Info>        
        </MovieItem>
    );
}

export default MovieCard;

const MovieItem = styled.div`
    position: relative; /*부모 요소*/
    cursor: pointer;
    img {
        width: 100%;
        border-radius: 10px;
    }

    &:hover .overView{
        display: block; 
        position: absolute; /*자식 요소: 부모로부터 위치 맞추기*/
        top: 0;
        left: 0; 
        width: 100%; 
        height: 100%;
        border-radius: 10px;/*img와 같이*/
        background-color: rgba(0, 0, 0, 0.6); /* 배경색 및 투명도 설정 */
    }
`;

const Info = styled.div`
    color: white;
    border-radius: 10px;

    .title {
        font-size: 15px;
        font-weight: bold;
    }
    .release_date {
        font-size: 10px;
    }
`;
