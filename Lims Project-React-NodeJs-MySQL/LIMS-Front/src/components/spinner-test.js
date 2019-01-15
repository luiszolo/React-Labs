import React from 'react';
import axios from 'axios';
import Sample from './sample.js'

import '../index.css';

export default class SpinnerTest extends React.Component{

  constructor(props){
    super(props);
    this.state={
        validateOp: undefined,
        isSubmitDisabled: true,
    }}

        state = {
            id: '', // Table Operator
            //value: '', //Table SampleValue
            name:'', //Table Sample
            sample1:'',
            sample2:'',
            sample3:'',
            sample4:'',
            sample5:'',
            value1:'',
 

    
          }

          

          handleChangeOperator = event => {
            this.setState({ 
              id: event.target.value,
            } );// este name es el de la variable
          }

          handleChangeSample1 = event => {
            this.setState({ 
              sample1: event.target.value,
            } );// este name es el de la variable
          }

          handleChangeSample2 = event => {
            this.setState({ 
              sample2: event.target.value,
            } );// este name es el de la variable
          }
          handleChangeSample3 = event => {
            this.setState({ 
              sample3: event.target.value,
            } );// este name es el de la variable
          }          
          handleChangeSample4 = event => {
            this.setState({ 
              sample4: event.target.value,
            } );// este name es el de la variable
          }
          handleChangeSample5 = event => {
            this.setState({ 
              sample5: event.target.value,
            } );// este name es el de la variable
          }
          handleChangeSample6 = event => {
            this.setState({ 
              sample6: event.target.value,
            } );// este name es el de la variable
          }

          handleChangeSample7 = event => {
            this.setState({ 
              sample7: event.target.value,
            } );// este name es el de la variable
          }
          handleChangeSample8 = event => {
            this.setState({ 
              sample8: event.target.value,
            } );// este name es el de la variable
          }          
          handleChangeSample9 = event => {
            this.setState({ 
              sample9: event.target.value,
            } );// este name es el de la variable
          }
          handleChangeSample10 = event => {
            this.setState({ 
              sample10: event.target.value,
            } );// este name es el de la variable
          }
          handleChangeAtrtribute1 = event => {
            this.setState({ 
              value1: event.target.value,
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
    
        const sample1 =  this.state.sample1
        const sample2 =  this.state.sample2
        const sample3 =  this.state.sample3
        const sample4 =  this.state.sample4
        const sample5 =  this.state.sample5 
        const sample6 =  this.state.sample6
        const sample7 =  this.state.sample7
        const sample8 =  this.state.sample8
        const sample9 =  this.state.sample9
        const sample10 = this.state.sample10 
        const operator = this.state.id
        const value1= this.state.value1

        axios.post(`http://localhost:4000/api/test-forms/add`, {operator,test:"Heat Test", samples:[sample1,sample2,sample3,sample4,sample5,sample6,sample7,sample8,sample9,sample10],attributes:[{name:"Velocity",value:value1}] })// al  parecer este name tiene que ser el nombre de la columna
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
                    Velocity (Sec):
                    <input type="text" className="form-control m-1" name="value1" onChange={this.handleChangeAtrtribute1} />
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
                        // onBlur={handleOnBlur}
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
                        // onBlur={handleOnBlur}
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
                        // onBlur={handleOnBlur}
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
                        // onBlur={handleOnBlur}
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
                        // onBlur={handleOnBlur}
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
                        // onBlur={handleOnBlur}
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
                        // onBlur={handleOnBlur}
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
                        // onBlur={handleOnBlur}
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
                        // onBlur={handleOnBlur}
                        onChange={this.handleChangeSample9}
                        />
                        <label className="col col-4 mr-1">{message}</label>




                                                <input 
                        type="text" 
                        className={operatorClassName}
                        name="sample10" 
                        number={10}
                        format={format}
                        placeholder="SA-##-#####"
                        // onBlur={handleOnBlur}
                        onChange={this.handleChangeSample10}
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