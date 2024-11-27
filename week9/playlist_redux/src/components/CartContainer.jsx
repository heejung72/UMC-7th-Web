import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../features/modal/modalSlice";
import styled from "styled-components";

const CartContainer = () => {
  const dispatch = useDispatch();
  const { amount, cartItems, total } = useSelector((store) => store.cart);

  if (amount < 1) {
    return (
      <StyledCartContainer>
        <header>
          <h2>당신이 선택한 음반</h2>
          <h4 className="empty-cart">장바구니가 비어 있습니다</h4>
        </header>
      </StyledCartContainer>
    );
  }

  return (
    <StyledCartContainer>
      <header>
        <h2>당신이 선택한 음반</h2>
      </header>
      <div>
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            총 가격 <span>\ {total}원</span>
          </h4>
        </div>
        <button
          className="btn clear-btn"
          onClick={() => {
            dispatch(openModal());
          }}
        >
          장바구니 초기화
        </button>
      </footer>
    </StyledCartContainer>
  );
};

export default CartContainer;

export const StyledCartContainer = styled.section`
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;

  header h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  .empty-cart {
    color: #888;
    font-style: italic;
  }

  footer {
    margin-top: 20px;

    hr {
      margin: 10px 0;
    }

    .cart-total {
      display: flex;
      justify-content: space-between;
      font-size: 1.2rem;
      font-weight: bold;
    }

    .clear-btn {
      background: #ff6b6b;
      color: #fff;
      border: none;
      padding: 10px 15px;
      border-radius: 5px;
      cursor: pointer;
    }

    .clear-btn:hover {
      background: #ff4a4a;
    }
  }
`;
