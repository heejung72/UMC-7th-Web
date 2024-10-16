import styled from "styled-components";
import useCustomFetch from "../hooks/useCustomFetch";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
    const { movieId } = useParams();

    const { data: movies, isLoading, isError } = useCustomFetch(`/movie/${movieId}?language=ko-KR`);
    const { data: actors } = useCustomFetch(`/movie/${movieId}/credits?language=ko-KR`);

    if (isLoading) {
        return (
            <LoadingContainer>
                <h1>로딩중입니다...</h1>
            </LoadingContainer>
        );
    }

    if (isError) {
        return (
            <ErrorContainer>
                <h1>죄송합니다, 영화 정보를 불러오는 데 문제가 발생했습니다.</h1>
            </ErrorContainer>
        );
    }

    return (
        <DetailContainer>
            <TopContainer>
                <Gradient>
                    <BackdropPathWrapper>
                        <img src={`https://image.tmdb.org/t/p/w500${movies.data?.backdrop_path}`} alt="영화 배경" />
                    </BackdropPathWrapper>
                </Gradient>
                <InfoWrapper>
                    <h1>{movies.data?.title}</h1>
                    <div>평균: {movies.data?.vote_average}</div>
                    <div>개봉일: {movies.data?.release_date}</div>
                    <div>러닝타임: {movies.data?.runtime}분</div>
                    <div className="tagline">{movies.data?.tagline}</div>
                    <div>{movies.data?.overview}</div>
                </InfoWrapper>
            </TopContainer>

            <BottomContainer>
                <h2>감독 및 출연진</h2>
                <PeopleContainer>
                    {actors.data?.cast.map((actor) => (
                        <ProfileWrapper key={actor.id}>
                            <ProfileImgWrapper>
                                <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={`${actor.name} 프로필`} />
                            </ProfileImgWrapper>
                            <NameWrapper>
                                <div className="name">{actor.name}</div>
                                <div className="role">{actor.character} ({actor.known_for_department})</div>
                            </NameWrapper>
                        </ProfileWrapper>
                    ))}
                </PeopleContainer>
            </BottomContainer>
        </DetailContainer>
    );
};

export default MovieDetail;

const LoadingContainer = styled.div`
    color: white;
    text-align: center;
    margin-top: 50px;
`;

const ErrorContainer = styled.div`
    color: white;
    text-align: center;
    margin-top: 50px;
`;

const DetailContainer = styled.div`
    padding: 0px;
    background-color: black; // 어두운 배경으로 변경
`;

const TopContainer = styled.div`
    color: white;
    height: 400px;
    position: relative;
`;

const Gradient = styled.div`
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    ::before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border-radius: 20px;
        background: linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0.5) 50%, transparent 70%);
    }
`;

const InfoWrapper = styled.div`
    z-index: 2;
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    width: 450px;
    height: 100%;
    padding: 10px; // padding 추가
        h1 {
        font-size: 24px; /* 제목 크기 */
    }

    .tagline {
        font-style: italic;
        font-weight: bold;
        font-size: 20px; /* 태그라인 크기 */
        padding: 15px 0;
    }

    div {
        font-size: 14px; /* 평점, 출시일 등 글씨 크기 조정 */
    }
    .tagline {
        font-style: italic;
        font-weight: bold;
        font-size: 15px;
        padding: 15px 0;
    }
`;

const BackdropPathWrapper = styled.div`
    height: 85%;
    img {
        width: 100%;
        height: 100%;
        border-radius: 20px;
    }
`;

const BottomContainer = styled.div`
    color: white;
    margin-top: 5px; // 위쪽 여백 추가
`;

const PeopleContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-gap: 15px;
`;

const ProfileWrapper = styled.div`
    color: white;
    text-align: center; // 가운데 정렬
`;

const ProfileImgWrapper = styled.div`
    width: 100px; /* 원하는 크기로 조정 */
    height: 100px; /* 원하는 크기로 조정 */
    border-radius: 50%;
    border: 1.5px solid white;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain; /* 이미지를 박스 안에 맞게 조정 */
    }
`;

const NameWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .name {
        font-weight: bold;
        font-size: 10px;
    }
    .role {
        font-size: 11px;
        color: gray;
    }
`;
