import { Children } from "react";
import reactDom from "react-dom";

const ModalPortal = ({ children }) => {
    if (typeof window === "undefined") {
        return null;
    }

    const node = document.getElementById("portal"); // Modal을 렌더링할 DOM 노드

    return reactDom.createPortal(children, node);
};

export default ModalPortal;
