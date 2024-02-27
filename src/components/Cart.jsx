export function Cart({onCheckout, cart, onClose, onAdd, onRemove}) {
  
  const dupes = cart.reduce((acc, cur) => {
	const cartMeal = acc.find((meal) => meal.id === cur.id);
	if (cartMeal) {
	  cartMeal.quantity += 1;
	  cartMeal.totalPrice += +cur.price;
	} else {
	  acc.push({...cur, quantity: 1, totalPrice: +cur.price});
	}
	return acc;
  }, [])
  
  const total = dupes.reduce((acc, cur) => acc + cur.totalPrice, 0)
  
  return (
	<div className={"cart"}>
	  <h2>Your cart</h2>
	  <ul>
		{cart.map((item) => (
		  <li key={item.id} className={"cart-item"}>
			<p>{item.name} - {item.quantity} x ${item.price}</p>
			<div className={"cart-item-actions"}>
			  <button
				onClick={() => onRemove(item.id)}
			  >
				-
			  </button>
			  <p>{item.quantity}</p>
			  <button
				onClick={() => onAdd(item)}
			  >
				+
			  </button>
			</div>
		  </li>
		))}
	  </ul>
	  <p className={"cart-total"}>${cart.reduce((acc, cur) => acc + cur.totalPrice, 0).toFixed(2)}</p>
	  
	  <div className={"modal-actions"}>
		<p onClick={onClose}>Close</p>
		<button className={"button"} onClick={onCheckout}>Go To Checkout</button>
	  </div>
	</div>
  )
}