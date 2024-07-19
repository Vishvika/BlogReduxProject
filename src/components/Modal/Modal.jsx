import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import './modal.css';

const Modal = forwardRef(function Modal({children}, ref){
    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return{
            open(){
                dialog.current.showModal();
            }
        }
    })

    // if(!dialog.current) return null;

    return createPortal(
        <dialog className="modal-dialog" ref={dialog}> 
            <div className="modal-content">
                {children}
                <form method="dialog">
                    <button className="btn">
                        Okay
                    </button> 
                </form> 
           </div>
        </dialog>, 
        document.getElementById("modal-root"))
})

export default Modal;



