//navbar.jsx
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #333;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  cursor: pointer;
  color: #purple;
  &:hover {
    color: #red;
  }
`;

const Button = styled.button`
  background-color: #555;
  color: white;
  border: none;
  padding: 10px 15px;
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f4c542;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <Link to="/">
        <Logo>YOUNGCHA</Logo>
      </Link>
      <div>
        <Link to="/login">
          <Button>로그인</Button>
        </Link>
        <Link to="/signup">
          <Button>회원가입</Button>
        </Link>
      </div>
    </Nav>
  );
};

export default Navbar;
