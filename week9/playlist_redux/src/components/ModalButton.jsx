import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { closeModal } from "../features/modal/modalSlice";
import styled from "styled-components";

const ModalButton = () => {
    const dispatch = useDispatch();

    return (
        <StyledModalButton>
            <button
                type="button"
                className="btn-confirm-btn"
                onClick={() => {
                    dispatch(clearCart());
                    dispatch(closeModal());
                }}
            >
                네
            </button>
            <button
                type="button"
                className="btn-clear-btn"
                onClick={() => {
                    dispatch(closeModal());
                }}
            >
                아니요
            </button>
        </StyledModalButton>
    );
};

export default ModalButton;

const StyledModalButton = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  button {
    flex: 1;
    margin: 0 5px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
  }

  .btn-confirm-btn {
    background: #28a745;
    color: white;
  }
  .btn-confirm-btn:hover {
    background: #218838;
  }

  .btn-clear-btn {
    background: #ff6b6b;
    color: white;
  }
  .btn-clear-btn:hover {
    background: #ff4a4a;
  }
`;
