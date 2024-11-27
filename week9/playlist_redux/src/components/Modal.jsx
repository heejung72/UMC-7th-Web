import ModalButton from "./ModalButton";

const Modal = ({children}) => {
    return (
        <aside className ="modal-container" onClick={(e) => {}}>
            <div className="modal">
                {children}
                <ModalBUtton />
            </div>
        </aside>
    );
};

export default Modal;