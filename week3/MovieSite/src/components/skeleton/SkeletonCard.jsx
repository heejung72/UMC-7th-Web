import styled from 'styled-components';

const SkeletonCard = () => {
  return (
    <SkeletonContainer>
      <SkeletonImage />
      <SkeletonTitle />
      <SkeletonText />
    </SkeletonContainer>
  );
};

export default SkeletonCard;

const SkeletonContainer = styled.div`
  width: 100%;
  max-width: 200px;
  background-color: #2c2c2c;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SkeletonImage = styled.div`
  width: 100%;
  height: 300px;
  background-color: #444;
  border-radius: 10px;
  animation: skeleton-loading 1.5s infinite linear;
  background: linear-gradient(90deg, #444 25%, #555 50%, #444 75%);
  background-size: 200% 100%;
  @keyframes skeleton-loading {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;

const SkeletonTitle = styled.div`
  width: 70%;
  height: 20px;
  background-color: #444;
  margin-top: 10px;
  border-radius: 5px;
  animation: skeleton-loading 1.5s infinite linear;
`;

const SkeletonText = styled.div`
  width: 50%;
  height: 15px;
  background-color: #444;
  margin-top: 5px;
  border-radius: 5px;
  animation: skeleton-loading 1.5s infinite linear;
`;
