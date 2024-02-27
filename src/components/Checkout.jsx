import {Input}    from "./Input.jsx";
import {useState} from "react";

export function Checkout({total, onClose, cart, setOrderToBack, handleSubmitOrder}) {
  
  function handleSubmit(event) {
	event.preventDefault();
	
	const fd   = new FormData(event.target);
	const data = Array.from(fd.entries()).reduce((obj, [key, value]) => {
	  obj[key] = value;
	  return obj;
	}, {});
	
	const items = cart.map((item) => ({
	  id:       item.id,
	  name:     item.name,
	  quantity: item.quantity,
	  price:    parseFloat(item.price),
	}));
	
	const order = {
	  customer: {...data},
	  items: items,
	};
	
	setOrderToBack(order);
	handleSubmitOrder();
  }
  
  return (
	<>
	  <h2>Checkout</h2>
	  <p>Total Amount: $432</p>
	  <form onSubmit={handleSubmit}>
		<Input type={"text"} id={"fname"} name={"name"} labelText={"Full Name"} required/>
		<Input type={"email"} id={"email"} name={"email"} labelText={"E-Mail Address"} required/>
		<Input type={"text"} id={"street"} name={"street"} labelText={"Street"} required/>
		<div className={"control-row"}>
		  <Input type={"number"} id={"postalcode"} name={"postal-code"} labelText={"Postal Code"}/>
		  <Input type={"text"} id={"city"} name={"city"} labelText={"City"}/>
		</div>
		
		<div className={"modal-actions"}>
		  <p onClick={onClose}>Close</p>
		  <button className={"button"}>Go To Checkout</button>
		
		</div>
	  </form>
	</>
  )
}