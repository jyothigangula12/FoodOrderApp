import React, {useEffect, useCallback} from 'react';
 const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
]; 

  /* async function addMealHandler(DUMMY_MEALS) {
    console.log(DUMMY_MEALS);
    const response = await fetch('https://react-http-cbdbb-default-rtdb.europe-west1.firebasedatabase.app/meals.json', {
      method : 'POST',
      body: JSON.stringify(DUMMY_MEALS),
      headers : {
        'Content-Type' : 'application/json'
      }
    })
    const data = await response.json()
    console.log(data)
  } */
export default DUMMY_MEALS;
