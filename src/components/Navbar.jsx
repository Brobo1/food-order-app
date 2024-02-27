import imgLogo from '../assets/logo.jpg';
import {Modal} from "./Modal.jsx";

export function Navbar({onCartClick, cart}) {
  
  
  return (
	<>
	  <header id={"main-header"}>
		<div id={"title"}>
		  <img src={imgLogo} alt="logo"/>
		  <h1>reactfood</h1>
		</div>
		<button onClick={onCartClick}>
		  cart({cart.length})
		</button>
	  </header>
	
	</>
  )
}