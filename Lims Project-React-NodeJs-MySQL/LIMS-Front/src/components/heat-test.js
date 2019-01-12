import React from 'react';
import axios from 'axios';
import Sample from './sample.js'

import '../index.css';

export default class HeatTest extends React.Component{

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

          

          handleChangeOperator = event => {
            this.setState({ 
              id: event.target.value,
            } );// este name es el de la variable
          }

          handleChangeSample = event => {
            this.setState({ 
              name: event.target.value,
            } );// este name es el de la variable
          }
          handleOnBlur=(e)=>{
            if(/\d\d\d\d\d/.test(e.target.value)&& e.target.value.length===5){
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



        handleChange(event) {
          this.setState({
            // use dynamic name value to set our state object property
            //name: event.target.value,
            //id: event.target.value
          }, function(){ this.canSubmit()})
      
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
    
      handleSubmit = event => {
        event.preventDefault();
    
        const sample =  this.state.name 
        const operator = this.state.id
        axios.post(`http://localhost:4000/api/logs/add`, {operator, sample, test:"Heat Test", status:"Sample Ready for Chemistry" })// al  parecer este name tiene que ser el nombre de la columna
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
                        onChange={this.handleChangeOperator}
                        />
                        <label className="col col-4 mr-1">{message}</label>
                  </label>
                  <label className="pr-1 form-inline">
                    Temperature (C):
                    <input type="text" className="form-control m-1" name="value" onChange={this.handleChangeAtrtribute} />
                  </label>
                  <label className="pr-1 form-inline">
                    Time elapse (sec):
                    <input type="text" className="form-control m-1" name="value" onChange={this.handleChangeAtrtribute} />
                  </label>
                  <h1>Sample Barcodes</h1>
                    <div className="form-group">
                    
                    <input 
                        type="text" 
                        className={operatorClassName}
                        name="sample" 
                        number={1}
                        format={format}
                        placeholder="SA-##-#####"
                        // onBlur={handleOnBlur}
                        onChange={this.handleChangeSample}
                        />
                        <label className="col col-4 mr-1">{message}</label>


                                            <input 
                        type="text" 
                        className={operatorClassName}
                        name="sample" 
                        number={2}
                        format={format}
                        placeholder="SA-##-#####"
                        // onBlur={handleOnBlur}
                        onChange={this.handleChangeSample}
                        />
                        <label className="col col-4 mr-1">{message}</label>



                                            <input 
                        type="text" 
                        className={operatorClassName}
                        name="sample" 
                        number={3}
                        format={format}
                        placeholder="SA-##-#####"
                        // onBlur={handleOnBlur}
                        onChange={this.handleChangeSample}
                        />
                        <label className="col col-4 mr-1">{message}</label>




                                            <input 
                        type="text" 
                        className={operatorClassName}
                        name="sample" 
                        number={4}
                        format={format}
                        placeholder="SA-##-#####"
                        // onBlur={handleOnBlur}
                        onChange={this.handleChangeSample}
                        />
                        <label className="col col-4 mr-1">{message}</label>



                        <input 
                        type="text" 
                        className={operatorClassName}
                        name="sample" 
                        number={5}
                        format={format}
                        placeholder="SA-##-#####"
                        // onBlur={handleOnBlur}
                        onChange={this.handleChangeSample}
                        />
                        <label className="col col-4 mr-1">{message}</label>
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