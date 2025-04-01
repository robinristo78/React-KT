import React, { useReducer, useState } from 'react';
import Header from './components/Header';
import Meals from './components/Meals';
import CartContext from './store/CartContext';
import Modal from './components/UI/Modal';

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      //kontrolli kas on olemas. Leia indexi kaudu, et saaks pärast uuendada selle kaudu.
      const existItemIndex = state.items.findIndex(item => item.id === action.item.id);
      const existItem = state.items[existItemIndex];
      //
      
      let updatedItems;
      
      //Seega kui klikitud element juba eksisteerib kaardi elementide hulgas, 
      // siis seda uuesti lisada pole vaja, 
      // vaid suurendada selle kogus (quantity) ühe võrra.
      if (existItem) {
        const updatedItem = { ...existItem, quantity: existItem.quantity + 1 };
        updatedItems = [...state.items];
        updatedItems[existItemIndex] = updatedItem;
      }
      //Kui aga klikitud element veel ei eksisteeri, 
      // siis lihtsalt lisame selle elementi kaardi elementide hulka, 
      // määrates selle kogus 1-ga võrdseks.
      else {
        updatedItems = [...state.items, { ...action.item, quantity: 1 }];
      }

      return { items: updatedItems };
    }

    case 'CLEAR_CART':
      return { items: [] };

    default:
        return state;
  }
};

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartState, dispatchCart] = useReducer(cartReducer, {
    items: []
  });

  const addItemHandler = (item) => {
    dispatchCart({ type: 'ADD_ITEM', item });
  };

  const clearCartHandler = () => {
    dispatchCart({ type: 'CLEAR_CART' });
    setIsModalOpen(false);
    console.log('Checkout is finished');
  };

  const openModalHandler = () => {
    if (cartState.items.length === 0) {
      return;
    }
    setIsModalOpen(true);
    console.log('Checkout is processed');
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  const totalPrice = cartState.items.reduce((total, item) => total + item.price * item.quantity, 0);

 return (
    <CartContext.Provider value={{ items: cartState.items, addItem: addItemHandler }}>
      <Header onOpenCart={openModalHandler} />
      <Meals />
      {isModalOpen && (
        <Modal open={isModalOpen} onClose={closeModalHandler} onCheckout={clearCartHandler} items={cartState.items} totalPrice={totalPrice} />
      )}
    </CartContext.Provider>
  );
}

export default App;
