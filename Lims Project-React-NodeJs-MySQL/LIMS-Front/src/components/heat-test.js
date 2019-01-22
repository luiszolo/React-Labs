import React from 'react';
import axios from 'axios';

import '../index.css';

export default class HeatTest extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name: "Heat Test",
            operator: '',
            messageOp: "",
            validOp: undefined,
            messageSamples: Array(5).fill(""),
            validSamples: undefined,
            temperature: "",
            time: 0,
            samples: Array(5).fill(""),
            buttonTitle:"",
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

    updateSamplesMessage=(value,position)=>{
        this.setState(state=>{
            let messageSamples = state.messageSamples.map((message,i)=>{
                if(i===position){
                    return message=value
                } else {
                    return message;
                    }
            })
            return {
                messageSamples,
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
                if (res.data.message) { //si devuelve el no existe se pone que no valida por que pues no existe XD
                    const message=res.data.message
                    this.updateSamplesMessage(message,index-1)
                } else {
                    let exists = false
                    samples.forEach((value)=>{
                        if(sample===value){
                            this.updateSamplesMessage("This sample is repeated",index-1)
                            return exists = true
                    }})
                    if(exists===false){
                        this.updateSamples(sample,index-1)
                        this.updateSamplesMessage(null,index-1)
                    }
                }
            })
        }else{
            this.updateSamples("",index-1)
            this.updateSamplesMessage("Incorrect format",index-1)
        }
    }

    validateOperator=(e)=>{
        const operator = e.target.value

        if(/\d\d\d\d\d/.test(operator) && operator.length===5){
            axios.get(`http://10.2.1.94:4000/api/operators/` + operator) //manda el get con el nombre del operador ejemplo: 12345
            .then(res => {
                if (res.data.message) { //si devuelve el no existe se pone que no valida por que pues no existe XD
                    this.setState({
                        messageOp: res.data.message,
                        validOp: false,
                    })
                } else  {
                    this.setState({
                        operator: operator,
                        messageOp: "",
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
        const nulls = this.state.samples.filter((sample)=>{return sample==""})
        if(nulls.length===5){
            this.setState({
                validSamples: false
            })
        }else{
            this.state.samples.forEach((sample)=>{
                if(/SA-\d\d-\d\d\d\d\d/.test(sample) && sample.length===11){
                    this.setState({
                        validSamples: true
                    })
                }else if(sample==""){
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

    handleChangeTemperature = event => {
        this.setState({ 
            temperature: event.target.value,
        } );
    }

    handleChangeTime = event => {
        this.setState({ 
            time: event.target.value,
        } );
    }



    handleSubmit = event => {
        event.preventDefault();

        const operator= this.state.operator
        const temperature = this.state.temperature
        const time = this.state.time

        const samples = this.state.samples.filter((sample)=>{return ((/SA-\d\d-\d\d\d\d\d/.test(sample) && sample.length===11))})
   
        samples.forEach((sample)=>{
            axios.post(`http://10.2.1.94:4000/api/test-forms/add`,{
                operator,
                test:"Heat Test",
                samples:[sample],
                attributes:[{
                    name: "Temperature",
                    value: temperature
                },
                {
                    name: "Time Elapse",
                    value: time
                }]
            })

            .then( res=> {
                if (res.data.message==="Insertion completed") {
                    console.log(res.data.message)
                    this.setState({
						operator: 0, 
						samples: Array(10).fill(""),
						messageAPI: res.data.message,
                        validSamples: false,
                        operator:"",
                    })
      
                } else {
                    console.log(res.data.message)
                    this.setState({
						messageAPI: "Sample already went through this Test"
                    });
                }
              })
        })

    }
    settingTitle=()=>{
        const val =this.state.validOp;
        if(val==true){
            this.setState({
                buttonTitle:"Form is Ready"
            })
        }
        else{
            this.setState({
            buttonTitle:"Form not ready"
        })
        }
    }
    render(){
        const {
            addSample,
            validateOperator,
            validateSamples,
            settingTitle,
          
            state: {
                name,
                messageOp,
                validOp,
                messageSamples,
                validSamples,
                temperature,
                samples,
                messageAPI,
                buttonTitle,
                
            }
        } = this;
        const {operator} = this.state;
        const format="SA-##-#####"
        const labelClass="col col-lg-4 col-sm-4 text-danger"

        let operatorClassName="sample col-lg-3 col-3 form-control";

        if(validOp===false){
            operatorClassName= operatorClassName +=" border-danger"
        }else if(validOp===true){
            operatorClassName= operatorClassName += " border-success"
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
                            //value={operator}
                            type="text" 
                            className={operatorClassName}
                            name="operator" 
                            placeholder="#####"
                            onBlur={validateOperator}
                            
                        />
                        <label className={labelClass}>{messageOp}</label>
                    </div>
                    <div className="row form-inline pb-3">
                        <label className="col col-lg-5 col-4 text-right d-block">Temperature (C):</label>
                        <input 
                        //value={temperature}
                            type="number" 
                            className={"sample col-lg-3 col-3 form-control"}
                            placeholder="###"
                            name="temperature" 
                            onChange={this.handleChangeTemperature}
                        />
                        <label className="col col-lg-5 col-4">{" "}</label>
                    </div>
                    <div className="row form-inline pb-3">
                        <label className="col col-lg-5 col-4 text-right d-block">Time elapse (sec):</label>
                        <input type="number" 
                            className={"sample col-lg-3 col-3 form-control"}
                            placeholder="###"
                            name="time" 
                            onChange={this.handleChangeTime}
                        />
                        <label className="col col-lg-5 col-4">{" "}</label>
                    </div>
                    <div>
                        <h5 className="text-center">Sample Barcodes</h5>
                    <div className="row form-inline pb-1">
                        <label className="col col-lg-5 col-sm-4 text-right d-block">{"#1"}</label>
                        <input 
                        //value={samples[0]}
                            type="text"
                            className={"sample col-lg-3 col-4 form-control"}
                            name={"sample1"} 
                            placeholder={format}
                            onBlur={validateSamples}
                            onChange={addSample}
                        />
                        <label className={labelClass}>{messageSamples[0]}</label> 
                    </div>
                    <div className="row form-inline pb-1">
                        <label className="col col-lg-5 col-sm-4 text-right d-block">{"#2"}</label>
                        <input 
                        //value={samples[1]}
                            type="text"
                            className={"sample col-lg-3 col-4 form-control"}
                            name={"sample2"}
                            placeholder={format}
                            onBlur={validateSamples}
                            onChange={addSample}
                        />
                        <label className={labelClass}>{messageSamples[1]}</label> 
                    </div>
                    <div className="row form-inline pb-1">
                        <label className="col col-lg-5 col-sm-4 text-right d-block">{"#3"}</label>
                        <input 
                        //value={samples[2]}
                            type="text"
                            className={"sample col-lg-3 col-4 form-control"}
                            name={"sample3"} 
                            placeholder={format}
                            onBlur={validateSamples}
                            onChange={addSample}
                        />
                        <label className={labelClass}>{messageSamples[2]}</label> 
                    </div>
                    <div className="row form-inline pb-1">
                        <label className="col col-lg-5 col-sm-4 text-right d-block">{"#4"}</label>
                        <input 
                        //value={samples[3]}
                        type="text"
                        className={"sample col-lg-3 col-4 form-control"}
                        name={"sample4"} 
                        placeholder={format}
                        onBlur={validateSamples}
                        onChange={addSample}
                        />
                        <label className={labelClass}>{messageSamples[3]}</label> 
                    </div>
                    <div className="row form-inline pb-1">
                        <label className="col col-lg-5 col-sm-4 text-right d-block">{"#5"}</label>
                        <input 
                        //value={samples[4]}
                        type="text"
                        className={"sample col-lg-3 col-4 form-control"}
                        name={"sample5"} 
                        placeholder={format}
                        onBlur={validateSamples}
                        onChange={addSample}
                        />
                        <label className={labelClass}>{messageSamples[4]}</label> 
                        </div>
                    </div>
                    <label className={"col-4 offset-4 offset-lg-5 mt-3"}>{messageAPI}</label>
                    <button
                    value={samples[5]}
                        type="submit"
                        className="btn btn-primary col-4 col-lg-2 offset-4 offset-lg-5 mt-3"
                        disabled={(validSamples && validOp) ? false : true}
                        onMouseEnter={settingTitle}
                        title={buttonTitle}
                    >
                    Save Data
                    </button>
                </form>
            </div>
          </div>)
        }
    }