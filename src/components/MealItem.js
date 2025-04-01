import { useContext } from "react";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";

const MealItem = (props) => {

    const cartContext = useContext(CartContext);

    const price = new Intl.NumberFormat("de-DE", {style: "currency", currency: "EUR"})
        .format(props.meal.price,);


    const addToCartHandler = () => {
        cartContext.addItem({
            id: props.meal.id,
            name: props.meal.name,
            price: props.meal.price,
            description: props.meal.description,
        });
    }

    return (
        <li className="meal-item">
            <article>
                <img src={require(`../assets/${props.meal.image}`)} alt={props.meal.name}/>
                <div>
                    <h3>{props.meal.name}</h3>
                    <p className="meal-item-price">{price}</p>
                    <p className="meal-item-description">{props.meal.description}</p>
                </div>
                <p className="meal-item-actions">
                    <Button onClick={addToCartHandler}>Add to Cart</Button>
                </p>
            </article>
        </li>
        
    )
}

export default MealItem