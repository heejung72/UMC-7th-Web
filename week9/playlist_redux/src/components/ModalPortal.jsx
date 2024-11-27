import { Children } from "react";
import reactDom from "react-dom";

const ModalPortal = ({Children}) => {
    if (typeof window === "underfined") {
        return null;
    }

    const node = document.getElementById("portal");

    return reactDom.createPortal(Children, none);

};

export default ModalPortal; 