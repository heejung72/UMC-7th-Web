import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch"; // 커스텀 훅을 사용하여 API 호출

const TVDetail = () => {
  const { tvId } = useParams(); // URL 파라미터에서 TV 프로그램 ID 가져오기

  const { data: tv, isLoading, isError } = useCustomFetch(`/tv/${tvId}?language=ko-KR`);
  const { data: actors } = useCustomFetch(`/tv/${tvId}/credits?language=ko-KR`);

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
        <h1>죄송합니다, TV 프로그램 정보를 불러오는 데 문제가 발생했습니다.</h1>
      </ErrorContainer>
    );
  }

  return (
    <DetailContainer>
      <TopContainer>
        <Gradient>
          <BackdropPathWrapper>
            <img
              src={`https://image.tmdb.org/t/p/w500${tv.data?.backdrop_path}`}
              alt="TV 프로그램 배경"
            />
          </BackdropPathWrapper>
        </Gradient>
        <InfoWrapper>
          <h1>{tv.data?.name}</h1>
          <div>평균: {tv.data?.vote_average}</div>
          <div>첫 방영일: {tv.data?.first_air_date}</div>
          <div>에피소드 수: {tv.data?.number_of_episodes}개</div>
          <div>시즌 수: {tv.data?.number_of_seasons}개</div>
          <div className="tagline">{tv.data?.tagline}</div>
          <div>{tv.data?.overview}</div>
        </InfoWrapper>
      </TopContainer>

      <BottomContainer>
        <h2>감독 및 출연진</h2>
        <PeopleContainer>
          {actors.data?.cast.map((actor) => (
            <ProfileWrapper key={actor.id}>
              <ProfileImgWrapper>
                <img
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt={`${actor.name} 프로필`}
                />
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

export default TVDetail;

// 스타일 컴포넌트 정의
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
  background-color: black;
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
  padding: 10px;
  h1 {
    font-size: 24px;
  }

  .tagline {
    font-style: italic;
    font-weight: bold;
    font-size: 20px;
    padding: 15px 0;
  }

  div {
    font-size: 14px;
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
  margin-top: 5px;
`;

const PeopleContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 15px;
`;

const ProfileWrapper = styled.div`
  color: white;
  text-align: center;
`;

const ProfileImgWrapper = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1.5px solid white;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
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
