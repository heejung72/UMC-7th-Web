import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../features/modal/modalSlice";

const CartContainer = () => {
  const dispatch = useDispatch();
  const { amount, cartItems, total } = useSelector((store) => store.cart);

  if (amount < 1) {
    return (
      <section className="cart">
        <header>
          <h2>당신이 선택한 음반</h2>
          <h4 className="empty-cart">장바구니가 비어 있습니다</h4>
        </header>
      </section>
    );
  }

  return (
    <section className="cart">
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
    </section>
  );
};

export default CartContainer;
