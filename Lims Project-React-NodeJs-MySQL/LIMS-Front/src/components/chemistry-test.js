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
        OperatorExists:false,
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

        axios.post(`http://localhost:4000/api/logs/add`, {operator, sample, test:"Chemistry Test", status:"Sample Ready for Heat" })// al  parecer este name tiene que ser el nombre de la columna
          .then(res => {
            console.log(res);
            console.log(res.data);
          });
      }

      handleOnBlur=(e)=>{
        const operator = this.state.id
        axios.get(`http://10.2.1.94:4000/api/operators/`+operator)//manda el get con el nombre del operador ejemplo: 12345
        .then(res => {
          if (res.data.message) {//si devuelve el no existe se pone que no valida por que pues no existe XD
            this.setState({
              // OperatorExists: false
              validateOp: false,
              isSubmitDisabled: true
            });
          } else  {
            this.setState({//si te regresa cualquier cosa como un json con info es que si existe y pues se valida una vez que se comprueba que existe hay que hacer las validaciones este 
              validateOp: true,//es el primer filtro saber si existe o no
              isSubmitDisabled: false
              // OperatorExists: true
            });
          }
        })
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
                        onChange={this.handleChangeOperator}
                        />
                        <label className="col col-4 mr-1">{message}</label>
                  </label>
                  <label className="pr-1 form-inline">
                    Chemistry:
                    <input type="text" className="form-control m-1" name="value" onChange={this.handleChangeAtrtribute} />
                  </label>
                  <h1>Sample Barcodes</h1>
                    <div className="form-group">
                    <input 
                        type="text" 
                        className={operatorClassName}
                        name="name" 
                        // placeholder="#####"
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