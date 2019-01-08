import React from 'react';
import axios from 'axios';

export default class HeatTest extends React.Component{

    
    state = {
        name: '',
      }
        
  handleChange = event => {
    this.setState({ name: event.target.value} );// este name es el de la variable
  }

  handleSubmit = event => {
    event.preventDefault();

    const name =  this.state.name // este name2 es puro show no afecta lo imprme en la consola asi nomas //Ok al parecer solo es quitar este name 2 e imprmirmi el puro state.name y deberia de jalar 
    

    axios.post(`http://localhost:4000/api/tests/insert`, {name})// al  parecer este name tiene que ser el nombre de la columna
      .then(res => {
          console.log(event.target.value);
        console.log(res);
        console.log(res.data);
      })
  }
    render(){
        return(
            <div className="col col-sm-6 offset-sm-4">
                        <form onSubmit={this.handleSubmit}>
          <label>
            Person Name:
            <input type="text" name="name" onChange={this.handleChange} />
          </label>
          <button type="submit">Add</button>
        </form>
            </div>
        )
    }
}