import { ChevronDown, ChevronUp } from "../constants/icons";
import { increase, decrease, removeItem } from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const CartItem = ({ id, title, singer, price, img }) => {
    const dispatch = useDispatch();
    // Redux 상태에서 amount 값을 가져옴
    const amount = useSelector((state) =>
        state.cart.cartItems.find(item => item.id === id)?.amount
    );

    return (
        <StyledCartItem>
            <img src={img} alt={`${title} 이미지`} />
            <div>
                <h4>
                    {title} | {singer}
                </h4>
                <h4 className="item-price">\ {price}</h4>
            </div>
            <div>
                <button
                    className="amount-btn"
                    onClick={() => dispatch(increase(id))} // 수량 증가
                >
                    <ChevronUp style={{ width: "20px", height: "20px" }} />
                </button>
                <p className="amount">{amount}</p>
                <button
                    className="amount-btn"
                    onClick={() => {
                        if (amount === 1) {
                            dispatch(removeItem(id)); // 수량이 1이면 아이템 제거
                            return;
                        }
                        dispatch(decrease(id)); // 수량 감소
                    }}
                >
                    <ChevronDown style={{ width: "20px", height: "20px" }} />
                </button>
            </div>
        </StyledCartItem>
    );
};

export default CartItem;

const StyledCartItem = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;

  img {
    width: 200px;
    height: 200px;
    border-radius: 5px;
    margin-right: 15px;
  }

  h4 {
    margin-left: 10px;
  }

  .item-price {
    color: #333;
    font-weight: bold;
  }

  .amount-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    padding: 10px;
    display: inline-block;
  }

  .amount {
    font-size: 1rem;
    margin: 0 10px;
  }
`;
