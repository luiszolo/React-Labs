import React from 'react';
import axios from 'axios';
import '../index.css';
import Sample from './sample.js'

export default class Home extends React.Component{

  constructor(props){
    super(props);
    this.state={
        validateOp: undefined,
        isSubmitDisabled: true,
    }}
    
    state = {
        status: '', 
        samplesLength: '', 
        name:'', 
      }
 

      handleOnBlur=(e)=>{
        if(/[a-zA-Z]/.test(e.target.value)){
            this.setState({
                validateOp: true,
                isSubmitDisabled: false
                
            })
        }else if(e.target.value===""){
            this.setState({
                validateOp: undefined,
            })
        }else{
            this.setState({
                validateOp: false,
                isSubmitDisabled: true
            })
        }
    }

  handleChangeName = event => {
    this.setState({ 
      name: event.target.value,
    } );// este name es el de la variable
  }

  canSubmit() {
    const { name } = this.state
    if (name.length >= 5) {
      this.setState({
        isSubmitDisabled: false
      })
    }
    else {
      this.setState({
        isSubmitDisabled: true
      })
    }
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


      const {
        handleOnBlur,
        state: {
            validateOp,
        }
      } = this;

    

      let operatorClassName="sample form-control";
      let message=" "

      if(validateOp===false){
        operatorClassName= "sample form-control border-danger"
        message="Incorret syntax"
    }else if(validateOp===true){
      operatorClassName= "sample form-control border-success"
        message=" "
    }
    else{
      operatorClassName="sample form-control"
    }

        return(<div className="col col-sm-6 offset-sm-4">
            <div className="col mx-auto d-block component ">
                <img src="images/logo.png" className="logo pb-3"alt="BSI logo"/>
            

        
            </div>
          <h1>ADD Test</h1>
            <form onSubmit={this.handleSubmit}>
            <label className="pr-1 form-inline">
                Name of the Test:
                <input type="text" className={operatorClassName} name="name" onChange={this.handleChangeName} onBlur={handleOnBlur} />
                Remember to refresh the page to see the results in the menu
                <label className="col col-4 mr-1">{message}</label>
              </label>
              <label className="pr-1 form-inline">
                How many attributes:
                <input type="text" className="form-control m-1" name="samplesLength" onChange={this.handleChangeSampleLenght} />
              </label>
              <label className="col col-4 mr-1">{message}</label>
           
              <label className="pr-1 form-inline">
                status (1 or 0):
                <input type="text" className="form-control m-1" name="status" onChange={this.handleChangeStatus} />
              </label>
              <label className="col col-4 mr-1">{message}</label>

                   <button 
                        type="submit" 
                        className="btn btn-primary col-6"  
                        disabled={this.state.isSubmitDisabled}
                        onClick={() => {window.alert('Saved reload page')}}
                    >
                    Save Data
                    </button>

              
          </form>
        </div>
        
        )
    }
}








