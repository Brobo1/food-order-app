import {MealCard}            from "./MealCard.jsx";
import {useEffect, useState} from "react";
import {fetchMeals}          from "../http.js";

export function MealDisplay({meals, onAddToCart}) {

  
  return (
	<div id={"meals"}>
	  {meals.map((meal) => (
		<MealCard key={meal.id} meal={meal} onAddToCart={onAddToCart}/>
	  ))}
	</div>
  )
}