import React from 'react';
import axios from 'axios';
import '../index.css';

export default class Home extends React.Component{

    
    state = {
        status: '', 
        samplesLength: '', 
        name:'', 

      }
 
  handleChangeName = event => {
    this.setState({ 
      name: event.target.value,
    } );// este name es el de la variable
  }

  handleChangeSampleLenght = event => {
    this.setState({
      samplesLength: event.target.value,
    } );// este name es el de la variable
  }

  handleChangeStatus = event => {
    this.setState({
      status: event.target.value,
    } );// este name es el de la variable
  }

  handleSubmit = event => {
    event.preventDefault();

    const name =  this.state.name 
    const samplesLength=this.state.samplesLength
    const status = this.state.status

    axios.post(`http://localhost:4000/api/tests/add`, {name, samplesLength,status})// al  parecer este name tiene que ser el nombre de la columna
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
          <h1>ADD Test</h1>
            <form onSubmit={this.handleSubmit}>
              <label className="pr-1 form-inline">
                Name of the Test:
                <input type="text" className="form-control m-1" name="name" onChange={this.handleChangeName} />
                Remember to refresh the page to see the results in the menu
              </label>
              <label className="pr-1 form-inline">
                How many attributes:
                <input type="text" className="form-control m-1" name="samplesLength" onChange={this.handleChangeSampleLenght} />
              </label>
           
              <label className="pr-1 form-inline">
                status (1 or 0):
                <input type="text" className="form-control m-1" name="status" onChange={this.handleChangeStatus} />
              </label>

            <button type="submit" className="btn btn-primary col-6"  onClick={() => { 
            window.alert('You Added a Test (Please Reload page();)')} 
            }>Save Data</button>

              
          </form>
        </div>
        
        )
    }
}








