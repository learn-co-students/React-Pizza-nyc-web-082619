import React from "react"

const Pizza = (props) => {
  return(
    <tr>
      <td>{props.topping}</td>
      <td>{props.size}</td>
      <td>{props.vegetarian ? "Yep" : "Nep"}</td>
      <td><button type="button" onClick={()=>props.changeActivePizza(props.id)} className="btn btn-primary">Edit Pizza</button></td>
    </tr>
  )
}

export default Pizza
