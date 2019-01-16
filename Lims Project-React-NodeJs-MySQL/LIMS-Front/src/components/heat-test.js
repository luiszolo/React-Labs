import React from 'react';
import axios from 'axios';

import '../index.css';

export default class HeatTest extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name: "Heat Test",
            testName: "Electricity test",
            id: '',
            validOp: undefined,
            validSamples: undefined,
            value1:'',
            value2:'',
            samples: Array(5).fill(null),
        }
    }

    updateSamples=(value,position)=>{
        this.setState(state=>{
            let samples = state.samples.map((sample,i)=>{
                if(i===position){
                    return sample=value
                } else {
                    return sample;
                    }
            })
            return {
                samples,
            };
        })
    }

    addSample=(e)=>{
        const index =e.target.name.replace("sample","")
        const sample = e.target.value
        const samples = this.state.samples

        if(/SA-\d\d-\d\d\d\d\d/.test(sample) && sample.length===11){
            axios.get(`http://10.2.1.94:4000/api/samples/${sample}`) //manda el get con el codigo del sample ejemplo: SA-12-12342
            .then(res => {
                if (res.data==={}) { //si devuelve el no existe se pone que no valida por que pues no existe XD
                    console.log("No esta en la base de datos")
                } else  {
                    let exists = false
                    samples.map((value)=>{
                        if(sample===value){
                        return exists=true
                    }})
                    if(exists===false){
                        this.updateSamples(sample,index-1)
                    }
                }
            })
        }else{
            this.updateSamples(null,index-1)
        }
    }

    validateOperator=(e)=>{
        const operator = e.target.value
        if(/\d\d\d\d\d/.test(operator) && operator.length===5){
            axios.get(`http://10.2.1.94:4000/api/operators/` + operator) //manda el get con el nombre del operador ejemplo: 12345
            .then(res => {
                if (res.data.message) { //si devuelve el no existe se pone que no valida por que pues no existe XD
                    console.log(res.data.message)
                } else  {
                    this.setState({
                        validOp: true,
                    })
                }
            })
        }else if(operator===""){
            this.setState({
                validOp: undefined,
            })
        }else{
            this.setState({
                validOp: false,
            })
        }
    }

    validateSamples=()=>{
        const nulls = this.state.samples.filter((sample)=>{return sample==null})
        if(nulls.length===10){
            this.setState({
                validSamples: false
            })
        }else{
            this.state.samples.map((sample)=>{
                if(/SA-\d\d-\d\d\d\d\d/.test(sample) && sample.length===11){
                    this.setState({
                        validSamples: true
                    })
                }else if(sample===null){
                    this.setState({
                        validSamples: true
                    })
                }
                else{
                    this.setState({
                        validSamples: false
                    })
                }
            })
        }
    }

    handleChangeAtrtribute1 = event => {
    this.setState({ 
        value1: event.target.value,
    } );
    }

    handleChangeAtrtribute2 = event => {
    this.setState({ 
        value2: event.target.value,
    } );
    }

    // handleSubmit = event => {
    // // This part is creating the new const that are going to take the values from our previus states that have the user input
    //     event.preventDefault();
    //     const operator = this.state.id

    //     const value1 = this.state.value1
    //     const value2 = this.state.value2
    //     //cuando se manda como un solo string aunque pongas las , estan dentro del string si pones
    //     // +","+ el string que te dara es "sample1,sample2" cuando el json tiene que mandarse como "sample1","sample2"
    //     // Our POST is using AXIOS the sintaxis is as follows: (TLDR: is sending a json to our API)
    //     //axios.(Method)((URL of API),{Our json its part default values like test:"Heat Test but other parts like operator are taken from the handleSubmit"})     
    //     axios.post(`http://localhost:4000/api/test-forms/add`, {operator,test:"Heat Test", samples:[sample1],attributes:[{name:"Temperature",value:value1},{name:"Time Elapse",value2}] })
    //     axios.post(`http://localhost:4000/api/test-forms/add`, {operator,test:"Heat Test", samples:[sample2],attributes:[{name:"Temperature",value:value1},{name:"Time Elapse",value2}] })
    //     axios.post(`http://localhost:4000/api/test-forms/add`, {operator,test:"Heat Test", samples:[sample3],attributes:[{name:"Temperature",value:value1},{name:"Time Elapse",value2}] })
    //     axios.post(`http://localhost:4000/api/test-forms/add`, {operator,test:"Heat Test", samples:[sample4],attributes:[{name:"Temperature",value:value1},{name:"Time Elapse",value2}] })
    //     axios.post(`http://localhost:4000/api/test-forms/add`, {operator,test:"Heat Test", samples:[sample5],attributes:[{name:"Temperature",value:value1},{name:"Time Elapse",value2}] })
    // }
        render(){ //Making the Form
            const {
                addSample,
                validateOperator,
                validateSamples,
                state: {
                    name,
                    validOp,
                    validSamples,
                }
              } = this;

          const format="SA-##-#####"

          let operatorClassName="sample col-lg-3 col-3 form-control";
          let message=" "
  
          if(validOp===false){
              operatorClassName= operatorClassName +=" border-danger"
              message="Incorret syntax"
          }else if(validOp===true){
              operatorClassName= operatorClassName += " border-success"
              message=" "
          }
          else{
              operatorClassName="sample col-lg-3 col-3 form-control"
          }

          return(<div>
              <div className="col col-12 pb-3">
                  <h1 className="text-center">{name}</h1>
              </div>
              <div className="col col-12">
              <form onSubmit={this.handleSubmit}>
                  <div className="row form-inline pb-3">
                      <label className="col col-lg-5 col-4 text-right d-block">Operator #</label>
                      <input 
                          type="text" 
                          className={operatorClassName}
                          name="operator" 
                          placeholder="#####"
                          onBlur={validateOperator}
                          onChange={this.handleChangeOperator}
                          />
                      <label className="col col-lg-5 col-4">{message}</label>
                  </div>
                  <div className="row form-inline pb-3">
                      <label className="col col-lg-5 col-4 text-right d-block">Temperature (C):</label>
                      <input 
                          type="text" 
                          className={"sample col-lg-3 col-3 form-control"}
                          placeholder="###"
                          name="value1" 
                          onChange={this.handleChangeAtrtribute1}
                      />
                      <label className="col col-lg-5 col-4">{message}</label>
                  </div>
                  <div className="row form-inline pb-3">
                  <label className="col col-lg-5 col-4 text-right d-block">Time elapse (sec):</label>
                  <input type="text" 
                      className={"sample col-lg-3 col-3 form-control"}
                      placeholder="###"
                      name="value2" 
                      onChange={this.handleChangeAtrtribute2}
                  />
                  <label className="col col-lg-5 col-4">{message}</label>
              </div>
              <div>
                  <h5 className="text-center">Sample Barcodes</h5>
                  <div className="row form-inline pb-1">
                      <label className="col col-lg-5 col-sm-4 text-right d-block">{"#1"}</label>
                      <input 
                            type="text"
                            className={"sample col-lg-3 col-4 form-control"}
                            name={"sample1"} 
                            onBlur={validateSamples}
                            onChange={addSample}
                      />
                      <label className="col col-lg-4 col-sm-4">{" "}</label> 
                  </div>
                  <div className="row form-inline pb-1">
                      <label className="col col-lg-5 col-sm-4 text-right d-block">{"#2"}</label>
                      <input 
                            type="text"
                            className={"sample col-lg-3 col-4 form-control"}
                            name={"sample1"}
                            placeholder={format}
                            onBlur={validateSamples}
                            onChange={addSample}
                        />
                      <label className="col col-lg-4 col-sm-4">{" "}</label> 
                  </div>
                  <div className="row form-inline pb-1">
                      <label className="col col-lg-5 col-sm-4 text-right d-block">{"#3"}</label>
                      <input 
                            type="text"
                            className={"sample col-lg-3 col-4 form-control"}
                            name={"sample3"} 
                            placeholder={format}
                            onBlur={validateSamples}
                            onChange={addSample}
                      />
                      <label className="col col-lg-4 col-sm-4">{" "}</label> 
                  </div>
                  <div className="row form-inline pb-1">
                      <label className="col col-lg-5 col-sm-4 text-right d-block">{"#4"}</label>
                      <input 
                        type="text"
                        className={"sample col-lg-3 col-4 form-control"}
                        name={"sample4"} 
                        placeholder={format}
                        onBlur={validateSamples}
                        onChange={addSample}
                      />
                      <label className="col col-lg-4 col-sm-4">{" "}</label> 
                  </div>
                  <div className="row form-inline pb-1">
                      <label className="col col-lg-5 col-sm-4 text-right d-block">{"#5"}</label>
                      <input 
                        type="text"
                        className={"sample col-lg-3 col-4 form-control"}
                        name={"sample5"} 
                        placeholder={format}
                        onBlur={validateSamples}
                        onChange={addSample}
                      />
                      <label className="col col-lg-4 col-sm-4">{" "}</label> 
                      </div>
              </div>
              <button 
                  type="submit" 
                  className="btn btn-primary col-4 col-lg-2 offset-4 offset-lg-5 mt-5"
                  disabled={(validSamples && validOp) ? false : true}
                  onClick={() => {window.alert('You Added a Sample')}}
              >
              Save Data
              </button>
              </form>
              </div>
          </div>)
        }
    }