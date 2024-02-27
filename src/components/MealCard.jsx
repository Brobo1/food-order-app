export function MealCard({meal, onAddToCart}) {
  return (
	<div className={"meal-item"}>
	  <article>
		<img src={`http://localhost:3000/${meal.image}`} alt="meal"/>
		<h3>{meal.name}</h3>
		<p className={"meal-item-description"}>{meal.description}</p>
		<p className={"meal-item-price"}>{meal.price}</p>
		<button className={"meal-item-actions"} onClick={() => onAddToCart(meal)}>Add to Cart</button>
	  </article>
	
	</div>
  )
}