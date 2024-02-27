import {Navbar}                from "./components/Navbar.jsx";
import {MealCard}              from "./components/MealCard.jsx";
import {MealDisplay}           from "./components/MealDisplay.jsx";
import {useEffect, useState}   from "react";
import {fetchMeals, postOrder} from "./http.js";
import {Modal}                 from "./components/Modal.jsx";
import {Cart}                  from "./components/Cart.jsx";
import {Checkout}              from "./components/Checkout.jsx";

function App() {
  const [modalOpen, setModalOpen]     = useState(false);
  const [meals, setMeals]             = useState([]);
  const [cart, setCart]               = useState([]);
  const [checkout, setCheckout]       = useState(true);
  const [orderToBack, setOrderToBack] = useState();
  
  useEffect(() => {
	async function fetchMeal() {
	  setMeals(await fetchMeals())
	}
	
	fetchMeal();
  }, []);
  
  function handleCartClick() {
	setModalOpen(true);
  }
  
  function handleCartClose() {
	setModalOpen(false);
	setCheckout(true);
  }
  
  function handleCartAdd(meal) {
	const existingCartMeal = cart.find(cartMeal => cartMeal.id === meal.id);
	if (existingCartMeal) {
	  existingCartMeal.quantity += 1;
	  existingCartMeal.totalPrice = existingCartMeal.quantity * parseFloat(meal.price);
	} else {
	  // Add only relevant fields to the cart.
	  const newItem = {
		id:         meal.id,
		name:       meal.name,
		price:      meal.price,
		quantity:   1,
		totalPrice: parseFloat(meal.price),  // Set initial total price
	  };
	  cart.push(newItem);
	}
	// Update cart state
	setCart([...cart]);
  }
  
  function handleCartRemove(id) {
	const existingCartMeal = cart.find(cartMeal => cartMeal.id === id);
	if (existingCartMeal && existingCartMeal.quantity > 1) {
	  existingCartMeal.quantity -= 1;
	  existingCartMeal.totalPrice = existingCartMeal.quantity * parseFloat(existingCartMeal.price);
	} else {
	  const itemIndex = cart.findIndex(cartMeal => cartMeal.id === id);
	  if (itemIndex !== -1) {
		cart.splice(itemIndex, 1);
	  }
	}
	// Update cart state
	setCart([...cart]);
  }
  
  function handleCheckout() {
	setCheckout(false);
  }
  
  function handleOrderInfo(order) {
	setOrderToBack(order);
	// Here you can call your api after setting the state
	postOrder(order);
  }
  
  return (
	<>
	  <Modal
		open={modalOpen}
		onClose={handleCartClose}
	  >
		{checkout ?
		 <Cart
		   cart={cart}
		   onClose={handleCartClose}
		   onAdd={handleCartAdd}
		   onRemove={handleCartRemove}
		   onCheckout={handleCheckout}
		 /> :
		 <Checkout
		   onClose={handleCartClose}
		   cart={cart}
		   setOrderToBack={handleOrderInfo}
		   handleSubmitOrder={handleOrderInfo}
		 />
		}
	  </Modal>
	  
	  <Navbar onCartClick={handleCartClick} cart={cart}/>
	  <MealDisplay meals={meals} onAddToCart={handleCartAdd}/>
	</>
  );
}

export default App;
