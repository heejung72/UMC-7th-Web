import useCartStore from "../store/useCartStore";
import useModalStore from "../store/useModalStore";
import styled from "styled-components";

const ModalButton = () => {
  const { clearCart } = useCartStore(); // 장바구니 초기화 함수
  const { closeModal } = useModalStore(); // 모달 닫기 함수

  // 핸들러 함수 정의
  const confirmHandler = () => {
    clearCart(); // 장바구니 초기화
    closeModal(); // 모달 닫기
  };

  const cancelHandler = () => {
    closeModal(); // 모달 닫기
  };

  return (
    <StyledModalButton>
      <button
        type="button"
        className="btn-confirm-btn"
        onClick={confirmHandler} // 장바구니 초기화 및 모달 닫기
      >
        네
      </button>
      <button
        type="button"
        className="btn-clear-btn"
        onClick={cancelHandler} // 모달 닫기
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
    transition: background 0.2s ease;
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
