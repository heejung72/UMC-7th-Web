
import styled from 'styled-components';

const PageContainer = styled.div`
  background-color: #111111;
  min-height: 100vh;
  min-width: 170vh;
`;
const Title = styled.h1`
  color: white; 
  margin-left:10px;
   font-size: 15px; 
`;
const SearchPage = () => {
  return (
    <PageContainer><Title><div style={{ color: 'white', fontSize: '24px', padding: '20px' }}>
      검색페이지 야호 ~!
    </div></Title> </PageContainer>
  );
};

export default SearchPage;
