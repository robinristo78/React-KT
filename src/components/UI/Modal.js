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
            <h2>Your Cart</h2>
            <ul>
                {props.items.map((item) => (
                    <li key={item.id} className="cart-item">
                        <p>
                            {item.name} - {item.quantity}
                        </p>
                    </li>
                ))}
            </ul>
            <p className="cart-total">
                <strong>Total: </strong> {new Intl.NumberFormat("de-DE", {style: "currency", currency: "EUR"}).format(props.totalPrice.toFixed(2))}
            </p>
            <p className="modal-actions">
                <button className="text-button" onClick={props.onClose}>Close</button>
                <button className="button" onClick={props.onCheckout}>Checkout</button>
            </p>
        </dialog>
    );
};

export default Modal;