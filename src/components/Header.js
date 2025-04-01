import logo from '../assets/logo.jpg'
import CartContext from '../store/CartContext'
import Button from './UI/Button'
import { useContext } from 'react';


const Header = () => {

    const cartContext = useContext(CartContext);

    const cartItems = cartContext.items;

    const cartContentHandler = () => {
        console.log(cartItems);
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={logo}/>
                <h1>React Food Order App</h1>
            </div>
            <nav>
            <Button textOnly onClick={cartContentHandler}>Cart ({cartItems.length})</Button>
            </nav>
        </header>
    )
}

export default Header;