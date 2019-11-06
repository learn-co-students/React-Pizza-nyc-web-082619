import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  state={
    pizzas: [],
    activePizza: null
  }

  componentDidMount(){
    fetch('http://localhost:3000/pizzas')
    .then(res => res.json())
    .then(pizzas=>{
      this.setState({
        pizzas: [...pizzas]
      })
    })
  }

  changeActivePizza = id => {
    this.setState({
      activePizza: this.state.pizzas.find(pizza=>pizza.id === id)
    })
  }

  mapTrick = newPizza => {
    this.setState({
      pizzas: this.state.pizzas.map(pizza=>{
        if(pizza.id === newPizza.id) return newPizza
        else return pizza
      })
    }) 
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm activePizza={this.state.activePizza} mapTrick={this.mapTrick}/>
        <PizzaList pizzas={this.state.pizzas} changeActivePizza={this.changeActivePizza}/>
      </Fragment>
    );
  }
}

export default App;
