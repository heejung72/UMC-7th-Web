//navbar.jsx
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
    &: hover {
            color: white;
        }
`;

const Logo = styled.h1`
  cursor: pointer;
  color: #red;
  &:hover {
    color: #yellow;
  }
`;

const Log = styled.log`
  width: 200px;
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
const Sign = styled.Sign`
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
const Navbar = () => {
  return (
    <Nav>
      <Link to="/">
        <Logo>YOUNGCHA</Logo>
      </Link>
      <div>
        <Link to="/login">
          <Log>로그인</Log>
        </Link>
        <Link to="/signup">
          <Sign>회원가입</Sign>
        </Link>
      </div>
    </Nav>
  );
};

export default Navbar;
