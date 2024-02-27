export function Input({labelText, id,  ...props}) {
  return (
	<div className={"control"}>
	  
	  <label htmlFor={id}>{labelText}</label>
	  <input id={id} {...props}/>
	</div>
  )
}