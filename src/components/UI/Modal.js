import { useEffect, useRef } from "react";

const Modal = (props) => {
    const dialogRef = useRef();

    useEffect(() => {
        const dialog = dialogRef.current;

        if (props.open) {
            dialog.showModal();
        } else {
            dialog.close();
        }
        
        return () => {
            if (dialog.open) {
                dialog.close();
            }
        };
    }, [props.open]);

    return ( 
        <dialog ref={dialogRef} className="modal">
            <div>
                {props.children}
                <button onClick={props.onClose}>
                    Close
                </button>
            </div>
        </dialog>
    );
};

export default Modal;