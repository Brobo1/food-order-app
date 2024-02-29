export async function fetchMeals() {
  const response = await fetch('http://localhost:3000/meals');
  const resData  = await response.json();
  if (!response.ok) {
	throw new Error('Meals not found');
  }
  return resData;
}

/*
export async function postOrder(order) {
  const response = await fetch('http://localhost:3000/orders', {
	method:  'POST',
	headers: {
	  'Content-Type': 'application/json',
	},
	body:    JSON.stringify(
	  {
		order: {
		  customer: {
			email:      'customer@example.com',
			name:       'customerName',
			street:     'streetName',
			['postal-code']: '23434',
			city:       'cityName',
		  },
		  items: [
			{
			  id: 'product1',
			  name: 'Product 1',
			  quantity: 3,
			  price: 10.0
			},
		  ]
		  
		}
	  }
	)
  });
  return response.json();
}
*/

export async function postOrder(order) {
  if (!order) return;
  
  console.log("order out", order);
  
  const response = await fetch('http://localhost:3000/orders', {
	method:  'POST',
	headers: {
	  'Content-Type': 'application/json',
	},
	body:    JSON.stringify({order}),
  });
  
  return response.json();
  
}