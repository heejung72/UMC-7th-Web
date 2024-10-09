import styled from 'styled-components';

const PageContainer = styled.div`
  background-color: #111111;
  min-height: 100vh;
  min-width: 170vh;
`;
const Title = styled.h1`
  color: white; 
  margin-left:10px;
`;
const LoginPage = () => {
  return(<PageContainer><Title>로그인 페이지</Title>
</PageContainer>); };

export default LoginPage;
