import React from 'react';
import axios from 'axios';
import Sample from './sample.js'

import '../index.css';

export default class ChemistryTest extends React.Component{

  constructor(props){
    super(props);
    this.state={
        validateOp: undefined,
        isSubmitDisabled: true,
    }}

        state = {
            id: '', // Table Operator
            value: '', //Table SampleValue
            name:'', //Table Sample
    
          }

          handleOnBlur=(e)=>{
            if(/\d\d\d\d\d/.test(e.target.value)){
                this.setState({
                    validateOp: true,
                    isSubmitDisabled: false
                    
                })
            }else if(e.target.value===""){
                this.setState({
                    validateOp: undefined,
                    isSubmitDisabled: true
                })
            }else{
                this.setState({
                    validateOp: false,
                    isSubmitDisabled: true
                })
            }
        }



        handleChange(event) {
          this.setState({
            // use dynamic name value to set our state object property
            name: event.target.value,
          }, function(){ this.canSubmit()})
      
        }
    //   canSubmit() {
    //     const { name } = this.state
    //     if (name.length >= 5) {
    //       this.setState({
    //         isSubmitDisabled: false
    //       })
    //     }
    //     else {
    //       this.setState({
    //         isSubmitDisabled: true
    //       })
    //     }
    //   }
    
      handleSubmit = event => {
        event.preventDefault();
    
        const name =  this.state.name // este name2 es puro show no afecta lo imprme en la consola asi nomas //
    
        axios.post(`http://localhost:4000/api/samplevalue/add`, {name,})// al  parecer este name tiene que ser el nombre de la columna
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
              <h1>Chemistry Test</h1>
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
                    Chemistry:
                    <input type="text" className="form-control m-1" name="value" onChange={this.handleChangeAtrtribute} />
                  </label>
                  <h1>Sample Barcodes</h1>
                    <div className="form-group">
                        <Sample
                            number={1}
                            format={format}
                        />
                    </div>
                    <button
                        type="submit" 
                        className="btn btn-primary col-6"  
                        disabled={this.state.isSubmitDisabled}
                        onClick={() => {window.alert('You Added a Sample')}}
                    >
                    Save Data
                    </button>
              </form>
            </div>
            )
        }
    }