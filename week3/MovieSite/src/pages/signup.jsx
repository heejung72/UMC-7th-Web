
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
const SignupPage = () => {
  return (<PageContainer>
    <Title><h1>회원가입 페이지</h1></Title>
</PageContainer>);};

export default SignupPage;
