import React from 'react';
import axios from 'axios';

import '../index.css';

export default class SpinnerTest extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name: "Spinner Test",
            operator: 0,
            messageOp: "",
            validOp: undefined,
            messageSamples: Array(5).fill(null),
            validSamples: undefined,
            velocity: 0,
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
            this.updateSamples(null,index-1)
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
        const nulls = this.state.samples.filter((sample)=>{return sample===null})
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

    handleChangeVelocity = event => {
        this.setState({ 
            velocity: event.target.value,
        } );
    }

 

    handleSubmit = event => {
        event.preventDefault();

        const operator= this.state.operator
        const velocity = this.state.velocity

        const samples = this.state.samples.filter((sample)=>{return ((/SA-\d\d-\d\d\d\d\d/.test(sample) && sample.length===11))})
   
        samples.forEach((sample)=>{
            axios.post(`http://10.2.1.94:4000/api/test-forms/add`,{
                operator,
                test:"Spinner Test",
                samples:[sample],
                attributes:[{
                    name: "Velocity",
                    value: velocity
                }]
            })
        })
    }

    render(){
        const {
            addSample,
            validateOperator,
            validateSamples,
            state: {
                name,
                messageOp,
                validOp,
                messageSamples,
                validSamples,
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
                        <label className="col col-lg-5 col-4 text-right d-block">Velocity (RPM):</label>
                        <input 
                            type="number" 
                            className={"sample col-lg-3 col-3 form-control"}
                            placeholder="###"
                            name="temperature" 
                            onChange={this.handleChangeVelocity}
                        />
                        <label className="col col-lg-5 col-4">{" "}</label>
                    </div>
   
                    <div>
                        <h5 className="text-center">Sample Barcodes</h5>
                    <div className="row form-inline pb-1">
                        <label className="col col-lg-5 col-sm-4 text-right d-block">{"#1"}</label>
                        <input 
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
                        type="text"
                        className={"sample col-lg-3 col-4 form-control"}
                        name={"sample5"} 
                        placeholder={format}
                        onBlur={validateSamples}
                        onChange={addSample}
                        />
                        <label className={labelClass}>{messageSamples[4]}</label> 
                    </div>
                    <div className="row form-inline pb-1">
                        <label className="col col-lg-5 col-sm-4 text-right d-block">{"#6"}</label>
                        <input 
                        type="text"
                        className={"sample col-lg-3 col-4 form-control"}
                        name={"sample6"} 
                        placeholder={format}
                        onBlur={validateSamples}
                        onChange={addSample}
                        />
                        <label className={labelClass}>{messageSamples[5]}</label> 
                    </div>
                    <div className="row form-inline pb-1">
                        <label className="col col-lg-5 col-sm-4 text-right d-block">{"#7"}</label>
                        <input 
                        type="text"
                        className={"sample col-lg-3 col-4 form-control"}
                        name={"sample7"} 
                        placeholder={format}
                        onBlur={validateSamples}
                        onChange={addSample}
                        />
                        <label className={labelClass}>{messageSamples[6]}</label> 
                    </div>
                    <div className="row form-inline pb-1">
                        <label className="col col-lg-5 col-sm-4 text-right d-block">{"#8"}</label>
                        <input 
                        type="text"
                        className={"sample col-lg-3 col-4 form-control"}
                        name={"sample8"} 
                        placeholder={format}
                        onBlur={validateSamples}
                        onChange={addSample}
                        />
                        <label className={labelClass}>{messageSamples[7]}</label> 
                    </div>
                    <div className="row form-inline pb-1">
                        <label className="col col-lg-5 col-sm-4 text-right d-block">{"#9"}</label>
                        <input 
                        type="text"
                        className={"sample col-lg-3 col-4 form-control"}
                        name={"sample9"} 
                        placeholder={format}
                        onBlur={validateSamples}
                        onChange={addSample}
                        />
                        <label className={labelClass}>{messageSamples[8]}</label> 
                    </div>
                    <div className="row form-inline pb-1">
                        <label className="col col-lg-5 col-sm-4 text-right d-block">{"#10"}</label>
                        <input 
                        type="text"
                        className={"sample col-lg-3 col-4 form-control"}
                        name={"sample10"} 
                        placeholder={format}
                        onBlur={validateSamples}
                        onChange={addSample}
                        />
                        <label className={labelClass}>{messageSamples[9]}</label> 
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary col-4 col-lg-2 offset-4 offset-lg-5 mt-3"
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