import React from 'react';
import axios from 'axios';
import '../index.css';

export default class Home extends React.Component{

    
    state = {
        id: '', // Table Operator
        value: '', //Table SampleValue
        name:'', //Table Sample

      }
 
  handleChange = event => {
    this.setState({ 
   
      name: event.target.value,

    } );// este name es el de la variable
  }

  handleSubmit = event => {
    event.preventDefault();

    const name =  this.state.name // este name2 es puro show no afecta lo imprme en la consola asi nomas //

    axios.post(`http://localhost:4000/api/tests/add`, {name})// al  parecer este name tiene que ser el nombre de la columna
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }
    render(){
        return(<div className="col col-sm-6 offset-sm-4">
            <div className="col mx-auto d-block component ">
                <img src="images/logo.png" className="logo pb-3"alt="BSI logo"/>
            
                <h1 className="text-center">Add Test</h1>
                <form onSubmit={this.handleSubmit}>
                    <label className="pr-1 form-inline">
                        Name of the Test:
                        <input type="text" className="form-control m-1" name="name" onChange={this.handleChange} />
                        Remember to refresh the page to see the results in the menu
                    </label>
                <button
                    type="submit"
                    className="btn btn-primary col-6"
                    onClick={() => {window.alert('You Added a Sample')}}
                >
                Save Data
                </button>
            </form>
            </div>
        </div>
        
        )
    }
}








