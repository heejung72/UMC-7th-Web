import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate();

  return (
    
    <CategoryContainer>
      <CategoryTitle>카테고리</CategoryTitle>
      <CategoryBox onClick={() => navigate('/movies/now-playing')}>현재 상영중인</CategoryBox>
      <CategoryBox onClick={() => navigate('/movies/popular')}>인기있는</CategoryBox>
      <CategoryBox onClick={() => navigate('/movies/top-rated')}>높은 평가를 받은</CategoryBox>
      <CategoryBox onClick={() => navigate('/movies/up-coming')}>개봉 예정중인</CategoryBox>
    </CategoryContainer>
  );
};

const CategoryContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 2rem;
`;

const CategoryBox = styled.div`
  background-color: #444;
  padding: 2rem;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f50057;
  }
`;
const CategoryTitle = styled.h2`
  font-size: 2rem; /* H2 크기로 설정 */
  color: white; /* 필요에 따라 색상 조정 */
`;

export default Categories;
