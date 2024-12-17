import styled from 'styled-components';
import CardSkeleton from './card-skeleton';

// 스타일링된 컴포넌트
const Container = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(8, 1fr); 
  grid-gap: 15px;
`;

// props의 타입 정의
interface CardListSkeletonProps {
  number: number;
}

const CardListSkeleton: React.FC<CardListSkeletonProps> = ({ number }) => {
  return (
    <Container>
      {new Array(number).fill(0).map((_, index) => (
        <CardSkeleton key={index} /> // 고유한 key 값으로 index 사용
      ))}
    </Container>
  );
};

export default CardListSkeleton;
