import styled, { keyframes } from "styled-components";

// 애니메이션 정의
const skeleton = keyframes`
    0% {
        opacity: 1;
    }
    30% {
        opacity: 0.2;
    }
    50% {
        opacity: 0.4;
    }
    80% {
        opacity: 0.8;
    }
    100% {
        opacity: 1;
    }
`;

// 스타일 정의
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-gap: 15px;
  padding: 20px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const CardMain = styled.div`
  width: 140px;
  height: 210px;
  background-color: rgb(230, 230, 230);
  border-radius: 10px;
  overflow: hidden;
  animation: ${skeleton} 3s 1s infinite linear alternate;
`;

const TextWrapper = styled.div`
  width: 140px;
  height: 30px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 5px;
`;

const TitleBox = styled.div`
  background: rgb(230, 230, 230);
  height: 14px;
  border-radius: 5px;
  animation: ${skeleton} 3s 1s infinite linear alternate;
`;

const DescriptionBox = styled.div`
  background: rgb(230, 230, 230);
  height: 10px;
  border-radius: 5px;
  animation: ${skeleton} 3s 1s infinite linear alternate;
`;

// props 타입 정의
interface CardSkeletonProps {
  number?: number; // 기본값이 1인 선택적 속성
}

const CardSkeleton: React.FC<CardSkeletonProps> = ({ number = 1 }) => {
  return (
    <GridContainer>
      {Array.from({ length: number }).map((_, index) => (
        <CardContainer key={index}>
          <CardMain />
          <TextWrapper>
            <TitleBox />
            <DescriptionBox />
          </TextWrapper>
        </CardContainer>
      ))}
    </GridContainer>
  );
};

export default CardSkeleton;
