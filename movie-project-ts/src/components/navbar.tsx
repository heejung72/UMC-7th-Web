import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useState, useEffect } from 'react';

const Nav = styled.nav`
  display: flex;
  position: fixed;
  z-index: 100;
  width: 100vw;
  top: 0;
  justify-content: space-between;
  align-items: center;
  background-color: #131517;
  color: red;
  padding: 0 20px;
  height: 70px;
`;

const Logo = styled.h1<{ isClicked: boolean }>`
  cursor: pointer;
  color: ${(props) => (props.isClicked ? 'yellow' : '#e83261')};
  &:hover {
    color: yellow;
  }
`;

const Log = styled.div`
  width: 230px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  margin-right: 60px;

  a {
    color: white;
    text-decoration: none;
    margin: 0 5px;
    font-size: 15px;
  }
`;

const Sign = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e83261;
  border-radius: 5px;
  width: 90px;
  height: 40px;

  &:hover {
    background-color: blue;
  }
`;

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoggedIn(true);
      const email = localStorage.getItem('email');
      setUserName(email ? `${email.split('@')[0]}님 반갑습니다!` : '사용자님 반갑습니다');
    }
  }, []);

  const handleLogout = () => {
    // 로그아웃 처리: 로컬 스토리지에서 토큰 삭제
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('email');
    
    setIsLoggedIn(false);
    navigate('/login');  // 로그인 페이지로 리디렉션
  };

  return (
    <Nav>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Logo isClicked={false}>YOUNGCHA</Logo>
      </Link>
      <Log>
        {isLoggedIn ? (
          <>
            <span>{userName}</span>
            <button onClick={handleLogout} style={{ color: 'white', background: 'transparent', border: 'none', cursor: 'pointer' }}>로그아웃</button>
          </>
        ) : (
          <>
            <Link to="/login">로그인</Link>
            <Link to="/signup">
              <Sign>회원가입</Sign>
            </Link>
          </>
        )}
      </Log>
    </Nav>
  );
};

export default Navbar;
