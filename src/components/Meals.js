import { useEffect, useState } from "react";
import MealItem from "./MealItem";

const Meals = () => {
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await fetch("http://localhost:3001/meals");
                if (!response.ok) {
                    throw new Error("Failed to fetch meals");
                }
                const data = await response.json();
                setMeals(data);
            } catch (error) {
                console.error("Error fetching meals:", error);
            }
        };
    
        fetchMeals();
    }, []);

    return (
        <ul id="meals">
            {/* <h2>create list of meals, using fetch data from backend.</h2> */}
            { 
                // list of meals
                meals.map((meal) => (
                    <MealItem key={meal.id} meal={meal} />
                ))

            }
        </ul>
    )
}

export default Meals