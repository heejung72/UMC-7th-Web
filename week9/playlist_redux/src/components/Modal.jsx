import ModalButton from "./ModalButton";
import styled from "styled-components";

const Modal = ({ children }) => {
  return (
    <StyledModal>
      <div className="modal-content">
        {children}  {/* ModalButton 추가 */}
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
`;
