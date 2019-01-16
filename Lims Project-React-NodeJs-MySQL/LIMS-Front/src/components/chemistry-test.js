import React from 'react';
import axios from 'axios';
import Sample from './sample.js'

import '../index.css';

export default class ChemistryTest extends React.Component{

  constructor(props){
    super(props);
    }
        state = { //In this chunk we are preparing the states that are going to be inserted in our json for POST method to the API
            id: '',
            name:'', 
            sample1:'none',
            value1:'',
          }//Here we are taking the input user data and inserting it to our states
          handleChangeOperator = event => {
            this.setState({ 
              id: event.target.value,//Var x = input.text
            } );
          }
          handleChangeSample1 = event => {
            this.setState({ 
              sample1: event.target.value,
            } );
          }
          handleChangeAtrtribute1 = event => {
            this.setState({ 
              value1: event.target.value,
            } );
          }
        handleChange(event) {
          this.setState({
          }, function(){ this.canSubmit()})
        }
      canSubmit() { //Simple validation for the Operator. Will change in Post Validation
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
      handleSubmit = event => {// This part is creating the new const that are going to take the values from our previus states that have the user input
        event.preventDefault();
        const sample1 =  this.state.sample1
        const operator = this.state.id
        const value1= this.state.value1//cuando se manda como un solo string aunque pongas las , estan dentro del string si pones
        // +","+ el string que te dara es "sample1,sample2" cuando el json tiene que mandarse como "sample1","sample2"
        // Our POST is using AXIOS the sintaxis is as follows: (TLDR: is sending a json to our API)
      //axios.(Method)((URL of API),{Our json its part default values like test:"Heat Test but other parts like operator are taken from the handleSubmit"})     
        axios.post(`http://localhost:4000/api/test-forms/add`, {operator,test:"Chemistry Test", samples:[sample1],attributes:[{name:"CHEMISTRY",value:value1}]})
      }
        render(){ //Making the Form
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
                        id="input"
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
                    <input type="text" id="input" className="form-control m-1" name="value1" onChange={this.handleChangeAtrtribute1} />
                  </label>
                  <h1>Sample Barcodes</h1>
                    <div className="form-group">
                        <input 
                        id="input"
                        type="text" 
                        className={operatorClassName}
                        name="sample1" 
                        number={1}
                        format={format}
                        placeholder="SA-##-#####"
                        onChange={this.handleChangeSample1}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary col-6"
                        onClick="document.getElementById('input').value = ''"//Trabajar en el clear 
                        onClick={() => {window.alert('You Added a Sample')}}
                    >
                    Save Data
                    </button>
                   
              </form>
            </div>
            )
        }
    }
    