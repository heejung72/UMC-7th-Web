import CartItem from "./CartItem";
import useCartStore from "../store/useCartStore";
import styled from "styled-components";

const CartContainer = () => {
  const { cartItems, total, amount, openModal } = useCartStore();

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
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            총 가격 <span>₩ {total}원</span>
          </h4>
        </div>
        <button className="btn clear-btn" onClick={() => openModal("장바구니를 초기화하시겠습니까?")}>
          장바구니 초기화
        </button>
      </footer>
    </StyledCartContainer>
  );
};

export default CartContainer;

const StyledCartContainer = styled.section`
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

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
      border: 1px solid #ddd;
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
      width: 100%;
      margin-top: 10px;
    }

    .clear-btn:hover {
      background: #ff4a4a;
    }
  }
`;
