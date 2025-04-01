import { createContext, useState } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {},
});

export const CartProvider = (props) => {
    const [cartItems, setCartItems] = useState([]);

    const addItemHandler = (item) => {
        setCartItems((prevItems) => [...prevItems, item]);
    }

    const contextValue = {
        items: cartItems,
        addItem: addItemHandler,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartContext;