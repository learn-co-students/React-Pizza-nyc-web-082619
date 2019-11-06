import React from "react"

class PizzaForm extends React.Component {

  state=({
    topping: null,
    size: null,
    vegetarian: null
  })

  formValue = (key) => {
    if(this.state[key] !== null) return this.state[key]
    else if (this.props.activePizza) return this.props.activePizza[key]
    else return ""
  }

  changeState = (event, state) => {
    console.log(this.state)
    this.setState({
      [state]: event.target.value
    })
  }

  pizzaConstructor = () => {
    return {
      id: this.props.activePizza.id,
      size: this.state.size ? this.state.size : this.props.activePizza.size,
      vegetarian: this.state.vegetarian !==null ? this.state.vegetarian === 'true' ? true : false : this.props.activePizza.vegetarian === 'true' ? true : false,
      topping: this.state.topping ? this.state.topping : this.props.activePizza.topping
    }
  }

  updatePizza = () => {
    const updatedPizza = this.pizzaConstructor()
    console.log(updatedPizza)
    const fetchObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(updatedPizza)
    }

    fetch("http://localhost:3000/pizzas/" + this.props.activePizza.id, fetchObj)
    .then(res => res.json())
    .then(this.props.mapTrick)
  }

  render(){
    return(
        <div className="form-row">
          <div className="col-5">
              <input type="text" className="form-control" placeholder="Pizza Topping" onChange={(event)=>this.changeState(event, "topping")} value={this.formValue("topping")}/>
          </div>
          <div className="col">
            <select onChange={(event)=>this.changeState(event, "size")} name="size" value={this.props.activePizza ? this.formValue("size") : "Small"} className="form-control">
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
          <div className="col">
              <select onChange={(event)=>this.changeState(event, "vegetarian")} value={this.props.activePizza ? this.formValue("vegetarian") : "Not Vegetarian"} className="form-control">
                <option value="true">Vegetarian</option>
                <option value="false">Not Vegetarian</option>
              </select>
          </div>
          <div className="col">
            <button onClick={this.updatePizza} type="submit" className="btn btn-success">Submit</button>
          </div>
        </div>

    )
  }
}

export default PizzaForm
