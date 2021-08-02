import React , {useCallback,useEffect , useState} from 'react'
import MealItem from "./MealItems/MealItem";
import DUMMY_MEALS from "./DummyMeals";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
const AvailableMeals = () => {
  const [mealsListItems , setMealsListItems] = useState([])
  const[isLoading, setIsLoading] = useState(true)
  const[error , setError] = useState(null)
  const getMealHandler = useCallback(async () => {
  
    try {
      setError(null)
      const response = await fetch('https://react-http-cbdbb-default-rtdb.europe-west1.firebasedatabase.app/meals.json');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const loadMeals = []
      const data = await response.json();
      for(const key in data){
        loadMeals.push({
          id: key,
          name : data[key].name,
          description: data[key].description,
          price : data[key].price
        })}
        setMealsListItems(loadMeals)
    } catch (error) {
      setError(error.message);
    }
     setIsLoading(false)
  }, []);

  useEffect(() => {
    getMealHandler();
  }, []);
 
 
  if (isLoading || error) {
    return(<section className ={classes.loading}>
        <p>Loading...{error}</p>;
    </section>) 
  }

  const mealsList = mealsListItems.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
