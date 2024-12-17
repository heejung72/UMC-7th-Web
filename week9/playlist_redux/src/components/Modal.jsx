// src/components/Modal
import useModalStore from "../store/useModalStore";
import styled from "styled-components";
import ModalButton from "./ModalButton";

const Modal = () => {
  const { isOpen, content, closeModal } = useModalStore(); // Zustand 상태 사용

  if (!isOpen) return null; // 모달이 닫힌 상태면 아무것도 렌더링하지 않음

  return (
    <StyledModal>
      <div className="modal-content">
        {content}
        <ModalButton />
        <button className="close-btn" onClick={closeModal}>
          닫기
        </button>
      </div>
    </StyledModal>
  );
};

export default Modal;

const StyledModal = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 300px;
    text-align: center;
  }

  .close-btn {
    margin-top: 10px;
    background-color: #333;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
  }
`;

