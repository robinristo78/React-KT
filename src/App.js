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

    default:
        return state;
  }
};

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [cartState, dispatchCart] = useReducer(cartReducer, {
    items: []
  });

  const addItemHandler = (item) => {
    dispatchCart({ type: 'ADD_ITEM', item });
  };

  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

 return (
    <CartContext.Provider value={{ items: cartState.items, addItem: addItemHandler }}>
      <Header />
      <Meals />
      <Modal open={isModalOpen} onClose={closeModalHandler}>
        test
      </Modal>
    </CartContext.Provider>
  );
}

export default App;
