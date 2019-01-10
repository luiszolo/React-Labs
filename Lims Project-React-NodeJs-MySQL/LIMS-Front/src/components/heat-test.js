import React from 'react';
import axios from 'axios';
import Sample from './sample.js'

export default class HeatTest extends React.Component{

  constructor(props){
    super(props);
    this.state={
        validateOp: undefined,
    }
}  


    state = {
        id: '', // Table Operator
        value: '', //Table SampleValue
        name:'', //Table Sample

      }
 
      handleOnBlur=(e)=>{
        if(/\d\d\d\d\d/.test(e.target.value)){
            this.setState({
                validateOp: true,
                
            })
        }else if(e.target.value===""){
            this.setState({
                validateOp: undefined,
            })
        }else{
            this.setState({
                validateOp: false,
            })
        }
    }

  handleChange = event => {
    this.setState({ 
      id: event.target.value,
      name: event.target.value,
      value: event.target.value
    } );// este name es el de la variable
  }

  handleSubmit = event => {
    event.preventDefault();

    const name =  this.state.name // este name2 es puro show no afecta lo imprme en la consola asi nomas //
    axios.post(`http://localhost:4000/api/Samples/add`, {name})// al  parecer este name tiene que ser el nombre de la columna
      .then(res => {
        
        console.log(res);
        console.log(res.data);
      });
  }
    render(){

      const {
        handleOnBlur,
        state: {
            validateOp,
        }
      } = this;

      
      const format="SA-##-#####"

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
        return(
          <div className="col col-sm-6 offset-sm-4">
          <h1>Heat Test</h1>
            <form onSubmit={this.handleSubmit}>
              <label className="pr-1 form-inline">
                Operator ID:
                <input 
                        type="text" 
                        className={operatorClassName}
                        name="operator" 
                        placeholder="#####"
                        onBlur={handleOnBlur}
                        />
                        <label className="col col-4 mr-1">{message}</label>
              </label>
              <label className="pr-1 form-inline">
                Tempature (C):
                <input type="text" className="form-control m-1" name="value" onChange={this.handleChange} />
              </label>
              <label className="pr-1 form-inline">
                Time elapse (sec):
                <input type="text" className="form-control m-1" name="Time" onChange={this.handleChange} />
              </label>

              <h1>Sample Barcodes</h1>
                <div className="form-group">
                    <Sample
                        number={1}
                        message={""}
                        format={format}
                        name="name"
                        onChange={this.handleChange}

                    />
                    <Sample
                        number={2}
                        message={""}
                        format={format}
                    />
                    <Sample
                        number={3}
                        message={""}
                        format={format}
                    />
                    <Sample
                        number={4}
                        message={""}
                        format={format}
                    />
                    <Sample
                        number={5}
                        message={""}
                        format={format}
                    />
                    
                </div>




                        <button type="submit" className="btn btn-primary col-6"  onClick={() => { 
            window.alert('You Added a Sample')} 
            }>Save Data</button>

              
          </form>
        </div>
        )
    }
}