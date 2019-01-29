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
            messageSamples: Array(10).fill(""),
            validSamples: undefined,
            velocity: 0,
            messageVel: "",
            validVel: undefined,
            samples: Array(10).fill(""),
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
        const sampleNumber =e.target.name.replace("sample","")
        const sample = e.target.value

        if(sample.length<=11){
            this.updateSamples(sample,sampleNumber-1)
        }
    }

    validateOperator=(e)=>{
        const operator = e.target.value

        if(/[1-99999]/.test(operator) && operator.length<=5){
            axios.get(`http://10.2.1.94:4000/api/operators/` + operator) //manda el get con el nombre del operador ejemplo: 12345
            .then(res => {
                if (res.data.message) { //si devuelve el no existe se pone que no valida por que pues no existe XD
                    this.setState({
                        messageOp: "Operator dosent exist",
                        validOp: false,
                    })
                } else {
                    this.setState({
                        operator: operator,
                        messageOp: "",
                        validOp: true,
                    })
                }
            })
        }else if(operator===""){
            this.setState({
                messageOp: "Field can't be blank",
                validOp: undefined,
            })
        }else{
            this.setState({
                validOp: false,
                messageOp: "Invalid Syntax",
            })
        }
    }

    validateVelocity=()=>{
        const velocity=this.state.velocity
        if(velocity.length<=5){
            this.setState({
                validVel: true,
                messageVel: "",
            })
        }else if(this.state.velocity===""){
            this.setState({
                messageVel: "Cant be Blank",
                validVel: false,
            })
        }else{
            this.setState({
                messageVel: "Must be no more than 5 digits",
                validVel: false,
            })
        }
    }

    validateSamples=()=>{
        const samples = this.state.samples
        const correctSamples = samples.filter((sample)=>{return /SA-\d\d-\d\d\d\d\d/.test(sample) && sample.length===11})
        const messages = this.state.messageSamples
        const noMessages = messages.filter((sample)=>{return sample===""})

        samples.forEach((sample,sampleNumber)=>{
            if(!(/SA-\d\d-\d\d\d\d\d/.test(sample)) && sample!==""){
                this.updateSamplesMessage("Incorrect syntax", sampleNumber)
                this.setState({
                    validSamples: false,
                })
            }else if(sample===""){
                this.updateSamplesMessage("", sampleNumber)
            }else{
                this.updateSamplesMessage("", sampleNumber)
                axios.get(`http://10.2.1.94:4000/api/samples/${sample}/Spinner Test`)
                .then(res => {
                    if (res.data.message) {
                        this.updateSamplesMessage(res.data.message, sampleNumber)
                        this.setState({
                            validSamples: false,
                            messageSample:res.data.message,
                        })
                    } else {
                        samples.forEach((value,index)=>{
                            if(sample===value && index!==sampleNumber){
                                this.updateSamplesMessage("This sample is repeated", sampleNumber)
                                this.setState({
                                    validSamples: false,
                                })
                            }else if(sample===""){
                                this.updateSamplesMessage("", sampleNumber)
                            }
                        })
                    }
                })
                if(correctSamples.length > 0 && noMessages.length === 10){
                    this.setState({
                        validSamples: true,
                    })
                }else{
                    this.setState({
                        validSamples: false,
                    })
                }
            }
        })

        this.setState({
            messageAPI:""
        })
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
              }).catch( err => this.setState({ messageAPI:'The operation timed out'}));

        })
    }

    render(){
        const {
            addSample,
            validateOperator,
            validateVelocity,
            validateSamples,
            state: {
                name,
                messageOp,
                validOp,
                validVel,
                messageVel,
                messageSamples,
                validSamples,
                messageAPI,
                samples,
            }
        } = this;

        const format="SA-##-#####"
        const regularLabels = "col-md-3 col-sm-12 col-lg-2 col-xl-2 d-block"
        const inputs = "col-md-3 col-sm-12 col-lg-5 col-xl-5 form-control"
        const warningLabels = "col-md-5 col-sm-12 col-lg-10 col-xl-10 text-danger text-center"

        let operatorInput = inputs;

        if(validOp===false){
            operatorInput= operatorInput +=" border-danger"
        }else if(validOp===true){
            operatorInput= operatorInput += " border-success"
        }
        else{
            operatorInput = inputs
        }

        return(<div className="row justify-content-center">
            <div className="col-lg-4 col-sm-12 m-4">
                <h1 className="text-center">{name}</h1>
            </div>
            <div className="col-sm-12 col-xl-10">
                <form onSubmit={this.handleSubmit}>
                <div className="row justify-content-center form-inline mb-3">
                        <label className={regularLabels}>Operator #</label>
                        <input 
                            type="text" 
                            className={operatorInput}
                            name="operator" 
                            placeholder="#####"
                            onBlur={validateOperator}
                        />
                        <label className={warningLabels}>{messageOp}</label>
                    </div>
                    <div className="row justify-content-center form-inline mb-3">
                        <label className={regularLabels}>Velocity (RPM):</label>
                        <input 
                            type="number" 
                            className={inputs}
                            placeholder="#####"
                            name="velocity" 
                            onChange={this.handleChangeVelocity}
                            onBlur={validateVelocity}
                        />
                        <label className={warningLabels}>{messageVel}</label>
                    </div>
   
                    <div>
                    <h5 className="text-center m-4">Sample Barcodes</h5>
                    <div className="row justify-content-center form-inline mb-2">
                        <label className={regularLabels}>Sample 1:</label>
                        <input 
                            value={samples[0]}
                            type="text"
                            className={inputs}
                            name={"sample1"} 
                            placeholder={format}
                            onBlur={validateSamples}
                            onChange={addSample}
                        />
                        <label className={warningLabels}>{messageSamples[0]}</label> 
                    </div>
                    <div className="row justify-content-center form-inline mb-2">
                        <label className={regularLabels}>Sample 2:</label>
                        <input 
                            value={this.state.samples[1]}
                            type="text"
                            className={inputs}
                            name={"sample2"}
                            placeholder={format}
                            onBlur={validateSamples}
                            onChange={addSample}
                        />
                        <label className={warningLabels}>{messageSamples[1]}</label> 
                    </div>
                    <div className="row justify-content-center form-inline mb-2">
                        <label className={regularLabels}>Sample 3:</label>
                        <input 
                        value={this.state.samples[2]}
                            type="text"
                            className={inputs}
                            name={"sample3"} 
                            placeholder={format}
                            onBlur={validateSamples}
                            onChange={addSample}
                        />
                        <label className={warningLabels}>{messageSamples[2]}</label> 
                    </div>
                    <div className="row justify-content-center form-inline mb-2">
                        <label className={regularLabels}>Sample 4:</label>
                        <input 
                            type="text"
                            value={this.state.samples[3]}
                            className={inputs}
                            name={"sample4"} 
                            placeholder={format}
                            onBlur={validateSamples}
                            onChange={addSample}
                        />
                        <label className={warningLabels}>{messageSamples[3]}</label> 
                    </div>
                    <div className="row justify-content-center form-inline mb-2">
                        <label className={regularLabels}>Sample 5:</label>
                        <input 
                            type="text"
                            value={this.state.samples[4]}
                            className={inputs}
                            name={"sample5"} 
                            placeholder={format}
                            onBlur={validateSamples}
                            onChange={addSample}
                        />
                        <label className={warningLabels}>{messageSamples[4]}</label> 
                    </div>
                    <div className="row justify-content-center form-inline mb-2">
                        <label className={regularLabels}>Sample 6:</label>
                        <input 
                            type="text"
                            value={this.state.samples[5]}
                            className={inputs}
                            name={"sample6"} 
                            placeholder={format}
                            onBlur={validateSamples}
                            onChange={addSample}
                        />
                        <label className={warningLabels}>{messageSamples[5]}</label> 
                    </div>
                    <div className="row justify-content-center form-inline mb-2">
                        <label className={regularLabels}>Sample 7:</label>
                        <input 
                            type="text"
                            value={this.state.samples[6]}
                            className={inputs}
                            name={"sample7"} 
                            placeholder={format}
                            onBlur={validateSamples}
                            onChange={addSample}
                        />
                        <label className={warningLabels}>{messageSamples[6]}</label> 
                    </div>
                    <div className="row justify-content-center form-inline mb-2">
                        <label className={regularLabels}>Sample 8:</label>
                        <input 
                            type="text"
                            value={this.state.samples[7]}
                            className={inputs}
                            name={"sample8"} 
                            placeholder={format}
                            onBlur={validateSamples}
                            onChange={addSample}
                        />
                        <label className={warningLabels}>{messageSamples[7]}</label> 
                    </div>
                    <div className="row justify-content-center form-inline mb-2">
                        <label className={regularLabels}>Sample 9:</label>
                        <input 
                            type="text"
                            value={this.state.samples[8]}
                            className={inputs}
                            name={"sample9"} 
                            placeholder={format}
                            onBlur={validateSamples}
                            onChange={addSample}
                        />
                        <label className={warningLabels}>{messageSamples[8]}</label> 
                    </div>
                    <div className="row justify-content-center form-inline mb-2">
                        <label className={regularLabels}>Sample 10:</label>
                        <input 
                            type="text"
                            value={this.state.samples[9]}
                            className={inputs}
                            name={"sample10"} 
                            placeholder={format}
                            onBlur={validateSamples}
                            onChange={addSample}
                        />
                        <label className={warningLabels}>{messageSamples[9]}</label> 
                        </div>
                    </div>
					<div className='row justify-content-center'>
                    <label className={"col-lg-3 col-sm-10 text-center col-md-6  mt-3"}><p id="succes">{messageAPI}</p></label>
					</div>
					<div className='row justify-content-center'>
                    <button
                        type="submit"
                        className="btn btn-primary col-md-6 col-sm-10 col-lg-3"
                        disabled={(validOp && validVel && validSamples) ? false : true}
                        title={(validSamples && validOp && validVel) ? "Form is ready" : "Form not ready"}
                    >
                    Save Data
                    </button>
                    </div>
                </form>
            </div>
          </div>)
        }
    }