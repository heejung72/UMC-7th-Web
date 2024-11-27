import { CartIcon } from "../constants/icons";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Navbar = () => {
    const { amount } = useSelector((state) => state.cart);

    return (
        <StyledNavbar>
            <div className="nav-center">
                <div className="nav-logo">
                    <h3>ReaL HEE PlayList</h3>
                    <CartIcon />
                </div>
                <div className="nav-container">
                    <div className="amount-container">
                        <p className="total-amount">{amount}</p>
                    </div>
                </div>
            </div>
        </StyledNavbar>
    );
};

export default Navbar;

// StyledNavbar 정의
const StyledNavbar = styled.nav`
  background: #333;
  color: #fff;
  padding: 10px 20px;
  position: sticky;
  top: 0;
  z-index: 100;

  .nav-center {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }

  .nav-logo {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  h3 {
    font-size: 1.5rem;
    color: #ff6b6b;
    margin: 0;
  }

  svg {
    width: 30px;
    height: 30px;
    fill: #fff;
    cursor: pointer;
  }

  .amount-container {
    background: #ff6b6b;
    color: #fff;
    font-size: 0.8rem;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    top: -5px;
    right : 950px;
  }
`;
