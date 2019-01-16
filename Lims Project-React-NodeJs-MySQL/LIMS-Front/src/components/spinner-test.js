import React from 'react';
import axios from 'axios';
import Sample from './sample.js'

import '../index.css';

export default class SpinnerTest extends React.Component{
  constructor(props){
    super(props);
    }
        state = { //In this chunk we are preparing the states that are going to be inserted in our json for POST method to the API
            id: '',
            name:'', 
            sample1:'none',
            sample2:'none',
            sample3:'none',
            sample4:'none',
            sample5:'none',
            sample6:'none',
            sample7:'none',
            sample8:'none',
            sample9:'none',
            sample0:'none',
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
          handleChangeSample2 = event => {
            this.setState({ 
              sample2: event.target.value,
            } );
          }
          handleChangeSample3 = event => {
            this.setState({ 
              sample3: event.target.value,
            } );
          }          
          handleChangeSample4 = event => {
            this.setState({ 
              sample4: event.target.value,
            } );
          }
          handleChangeSample5 = event => {
            this.setState({ 
              sample5: event.target.value,
            } );
          }
          handleChangeSample6 = event => {
            this.setState({ 
              sample6: event.target.value,
            } );
          }
          handleChangeSample7 = event => {
            this.setState({ 
              sample7: event.target.value,
            } );
          }
          handleChangeSample8 = event => {
            this.setState({ 
              sample8: event.target.value,
            } );
          }          
          handleChangeSample9 = event => {
            this.setState({ 
              sample9: event.target.value,
            } );
          }
          handleChangeSample0 = event => {
            this.setState({ 
              sample0: event.target.value,
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
        const sample2 =  this.state.sample2
        const sample3 =  this.state.sample3
        const sample4 =  this.state.sample4
        const sample5 =  this.state.sample5 
        const sample6 =  this.state.sample6
        const sample7 =  this.state.sample7
        const sample8 =  this.state.sample8
        const sample9 =  this.state.sample9
        const sample0 =  this.state.sample0 
        const operator = this.state.id
        const value1= this.state.value1 //cuando se manda como un solo string aunque pongas las , estan dentro del string si pones
        // +","+ el string que te dara es "sample1,sample2" cuando el json tiene que mandarse como "sample1","sample2"
        // Our POST is using AXIOS the sintaxis is as follows: (TLDR: is sending a json to our API)
      //axios.(Method)((URL of API),{Our json its part default values like test:"Heat Test but other parts like operator are taken from the handleSubmit"})     
        axios.post(`http://localhost:4000/api/test-forms/add`, {operator,test:"Spinner Test", samples:[sample1],attributes:[{name:"Velocity",value:value1}]})
        axios.post(`http://localhost:4000/api/test-forms/add`, {operator,test:"Spinner Test", samples:[sample2],attributes:[{name:"Velocity",value:value1}]})
        axios.post(`http://localhost:4000/api/test-forms/add`, {operator,test:"Spinner Test", samples:[sample3],attributes:[{name:"Velocity",value:value1}]})
        axios.post(`http://localhost:4000/api/test-forms/add`, {operator,test:"Spinner Test", samples:[sample4],attributes:[{name:"Velocity",value:value1}]})
        axios.post(`http://localhost:4000/api/test-forms/add`, {operator,test:"Spinner Test", samples:[sample5],attributes:[{name:"Velocity",value:value1}]})
        axios.post(`http://localhost:4000/api/test-forms/add`, {operator,test:"Spinner Test", samples:[sample6],attributes:[{name:"Velocity",value:value1}]})
        axios.post(`http://localhost:4000/api/test-forms/add`, {operator,test:"Spinner Test", samples:[sample7],attributes:[{name:"Velocity",value:value1}]})
        axios.post(`http://localhost:4000/api/test-forms/add`, {operator,test:"Spinner Test", samples:[sample8],attributes:[{name:"Velocity",value:value1}]})
        axios.post(`http://localhost:4000/api/test-forms/add`, {operator,test:"Spinner Test", samples:[sample9],attributes:[{name:"Velocity",value:value1}]})
        axios.post(`http://localhost:4000/api/test-forms/add`, {operator,test:"Spinner Test", samples:[sample0],attributes:[{name:"Velocity",value:value1}]})
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
              <h1>Spinner Test</h1>
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
                    <input type="text" className="form-control m-1" name="value1" onChange={this.handleChangeAtrtribute1} />
                  </label>
                  <label className="pr-1 form-inline">
                    Time elapse (sec):
                    <input type="text" className="form-control m-1" name="value2" onChange={this.handleChangeAtrtribute2} />
                  </label>
                  <h1>Sample Barcodes</h1>
                    <div className="form-group">
                        <input 
                        type="text" 
                        className={operatorClassName}
                        name="sample1" 
                        number={1}
                        format={format}
                        placeholder="SA-##-#####"
                        onChange={this.handleChangeSample1}
                        />
                        <label className="col col-4 mr-1">{message}</label>
                        <input 
                        type="text" 
                        className={operatorClassName}
                        name="sample2" 
                        number={2}
                        format={format}
                        placeholder="SA-##-#####"
                        onChange={this.handleChangeSample2}
                        />
                        <label className="col col-4 mr-1">{message}</label>
                        <input 
                        type="text" 
                        className={operatorClassName}
                        name="sample3" 
                        number={3}
                        format={format}
                        placeholder="SA-##-#####"
                        onChange={this.handleChangeSample3}
                        />
                        <label className="col col-4 mr-1">{message}</label>
                        <input 
                        type="text" 
                        className={operatorClassName}
                        name="sample4" 
                        number={4}
                        format={format}
                        placeholder="SA-##-#####"
                        onChange={this.handleChangeSample4}
                        />
                        <label className="col col-4 mr-1">{message}</label>
                        <input 
                        type="text" 
                        className={operatorClassName}
                        name="sample5" 
                        number={5}
                        format={format}
                        placeholder="SA-##-#####"
                        onChange={this.handleChangeSample5}
                        />
                        <label className="col col-4 mr-1">{message}</label>
                        <input 
                        type="text" 
                        className={operatorClassName}
                        name="sample6" 
                        number={6}
                        format={format}
                        placeholder="SA-##-#####"
                        onChange={this.handleChangeSample6}
                        />
                        <label className="col col-4 mr-1">{message}</label>
                        <input 
                        type="text" 
                        className={operatorClassName}
                        name="sample7" 
                        number={7}
                        format={format}
                        placeholder="SA-##-#####"
                        onChange={this.handleChangeSample7}
                        />
                        <label className="col col-4 mr-1">{message}</label>
                        <input 
                        type="text" 
                        className={operatorClassName}
                        name="sample8" 
                        number={8}
                        format={format}
                        placeholder="SA-##-#####"
                        onChange={this.handleChangeSample8}
                        />
                        <label className="col col-4 mr-1">{message}</label>
                        <input 
                        type="text" 
                        className={operatorClassName}
                        name="sample9" 
                        number={9}
                        format={format}
                        placeholder="SA-##-#####"
                        onChange={this.handleChangeSample9}
                        />
                        <label className="col col-4 mr-1">{message}</label>
                        <input 
                        type="text" 
                        className={operatorClassName}
                        name="sample0" 
                        number={0}
                        format={format}
                        placeholder="SA-##-#####"
                        onChange={this.handleChangeSample0}
                        />
                        <label className="col col-4 mr-1">{message}</label>
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary col-6"
                        onClick={() => {window.alert('You Added a Sample')}}
                    >
                    Save Data
                    </button>
              </form>
            </div>
            )
        }
    }