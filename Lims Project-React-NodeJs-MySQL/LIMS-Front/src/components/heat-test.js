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
        const sampleNumber = parseInt(e.target.name.replace("sample",""))
        const sample = e.target.value

        this.updateSamples(sample,sampleNumber-1)
    }

    validateOperator=(e)=>{
        const operator = e.target.value

        if(/\d\d\d\d\d/.test(operator) && operator.length===5){
            this.setState({
                operator: operator,
                messageOp: "",
                validOp: true,
            })
            axios.get(`http://10.2.1.94:4000/api/operators/` + operator) 
            .then(res => {
                if (res.data.message) { 
                    this.setState({
                        messageOp: "Operator dosent exist",
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
                messageOp: "Field can't be blank", //that's racist
                validOp: undefined,
            })
        }else{
            this.setState({
                validOp: false,
                messageOp: "Invalid Syntax",
            })
        }
    }
    validateSamples=(e)=>{
        const sampleNumber =e.target.name.replace("sample","")
        const sample = e.target.value

        const samples = this.state.samples
        const correctSamples = samples.filter((sample)=>{return /SA-\d\d-\d\d\d\d\d/.test(sample) && sample.length===11})

        if(!(/SA-\d\d-\d\d\d\d\d/.test(sample)) && sample!==""){
            this.updateSamplesMessage("Incorrect syntax", sampleNumber-1)
            this.setState({
                validSamples: false,
            })
        }else if(sample===""){
            this.updateSamplesMessage("", sampleNumber-1)
        }else{
            this.updateSamplesMessage("", sampleNumber-1)
            axios.get(`http://10.2.1.94:4000/api/samples/${sample}`)
            .then(res => {
                if (res.data.message) {
                    this.updateSamplesMessage(res.data.message, sampleNumber-1)
                    this.setState({
                        validSamples: false,
                    })
                } else {
                    samples.forEach((value,index)=>{
                        if(sample===value && index!==sampleNumber-1){
                            this.updateSamplesMessage("This sample is repeated", sampleNumber-1)
                            this.setState({
                                validSamples: false,
                            })
                        }else if(sample===""){
                            this.updateSamplesMessage("", sampleNumber-1)
                        }
                    })
                }
            })
            this.setState({
                validSamples: true,
            })
        }
        if(correctSamples.length>0){
            this.setState({
                validSamples: true,
            })
        }else{
            this.setState({
                validSamples: false,
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
                test:this.state.name,
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
                    })
      
                } else {
                    console.log(res.data.message)
                    this.setState({
						messageAPI: "Sample is not ready for this test"
                    });
                }
              })
        })

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
                samples,
                messageAPI,
                buttonTitle,
                
            }
        } = this;

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