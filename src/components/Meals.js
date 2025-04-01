import { useEffect } from "react";

const Meals = () => {
    return (
        <ul id="meals">
            {/* <h2>create list of meals, using fetch data from backend.</h2> */}
            { 
                // list of meals
                useEffect(() => {
                    const fetchMeals = async () => {
                        try {
                            const response = await fetch("http://localhost:3001/meals");
                            const data = await response.json();
                            console.log("data", data);
                        } catch (error) {
                            console.error("Error fetching meals:", error);
                        }
                    }

                    fetchMeals();
                })
            }
        </ul>
    )
}

export default Meals