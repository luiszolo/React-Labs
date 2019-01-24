import React from 'react';
import axios from 'axios';

export default class ElectricityTest extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name: "Electricity Test",
            operator: 0,
            messageOp: "",
            validOp: undefined,
            messageSamples: Array(10).fill(""),
            validSamples: undefined,
            samples: Array(10).fill(""),
            messageAPI: "",
        }
    }
    
    updateSamples=(value,position)=>{
        this.setState(state=>{
            let samples = state.samples.map((sample,i)=>{
                if(position===i){
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
            const messageSamples = state.messageSamples.map((message,i)=>{
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
    
    validateOperator=(e)=>{
        const operator = e.target.value

        if(/[1-99999]/.test(operator)){
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

    validateSamples=()=>{
        const samples = this.state.samples
        const correctSamples = samples.filter((sample)=>{return /SA-\d\d-\d\d\d\d\d/.test(sample) && sample.length===11})

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
                axios.get(`http://10.2.1.94:4000/api/samples/${sample}/Electricity Test`)
                .then(res => {
                    console.log(res.data)
                    if (res.data.Sample) {
                        this.updateSamplesMessage("The sample already exists", sampleNumber)
                        this.setState({
                            validSamples: false,
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
                this.setState({
                    validSamples: true,
                })
            }
        })

        if(correctSamples.length>0){
            this.setState({
                validSamples: true,
            })
        }else{
            this.setState({
                validSamples: false,
            })
        }
        
        this.setState({
            messageAPI:""
        })
    }

    addSample=(e)=>{
        const sampleNumber =e.target.name.replace("sample","")
        const sample = e.target.value

        this.updateSamples(sample,sampleNumber-1)
    }

    handleSubmit = event => {
        event.preventDefault();

        const operator= this.state.operator

        const samples = this.state.samples.filter((sample)=>{return ((/SA-\d\d-\d\d\d\d\d/.test(sample) && sample.length===11))})
   
        samples.forEach((sample)=>{
            axios.post(`http://10.2.1.94:4000/api/test-forms/add`,{
                operator,
                test: this.state.name,
                samples: [sample],
            })
            .then( res=> {
                if (res.data.message==="Insertion completed") {
                    console.log(res.data.sampleErrorList)
                    this.setState({
						operator: 0, 
						samples: Array(10).fill(""),
						messageAPI: res.data.message,
						validSamples: false,
                    })
      
                } else {
                    console.log(res.data.sampleErrorList)
                    this.setState({
						messageAPI: "Sample already went through this Test"
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
            state: {
                name,
                messageOp,
                validOp,
                messageSamples,
                validSamples,
                messageAPI,
                samples,
            }
        } = this;

        const format="SA-##-#####"
        const regularLabels = "col col-3 col-sm-4 col-lg-5 col-xl-4 text-right d-block"
        const inputs = "col col-4 col-sm-3 col-lg-3 col-xl-3 form-control"
        const warningLabels = "col col-4 col-sm-5 col-lg-4 col-xl-3 text-danger"

        let operatorInput= inputs

        if(validOp===false){
            operatorInput= operatorInput += " border-danger"
        }else if(validOp===true){
            operatorInput= operatorInput += " border-success"
        }else{
            operatorInput = inputs
        }

        return(<div className="component offset-xl-2">
            <div className="col col-12 col-xl-10 pb-3">
                <h1 className="text-center">{name}</h1>
            </div>
            <div className="col col-12 col-xl-10">
                <form onSubmit={this.handleSubmit}>
                    <div className="row form-inline pb-3">
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
                    <div>
                        <h5 className="text-center">Sample Barcodes</h5>
                        <div className="row form-inline pb-1">
                            <label className={regularLabels}>{"#1"}</label>
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
                        <div className="row form-inline pb-1">
                            <label className={regularLabels}>{"#2"}</label>
                            <input 
                                value={samples[1]}
                                type="text"
                                className={inputs}
                                name={"sample2"}
                                placeholder={format}
                                onBlur={validateSamples}
                                onChange={addSample}
                            />
                            <label className={warningLabels}>{messageSamples[1]}</label> 
                        </div>
                        <div className="row form-inline pb-1">
                            <label className={regularLabels}>{"#3"}</label>
                            <input 
                                type="text"
                                value={samples[2]}
                                className={inputs}
                                name={"sample3"} 
                                placeholder={format}
                                onBlur={validateSamples}
                                onChange={addSample}
                            />
                            <label className={warningLabels}>{messageSamples[2]}</label> 
                        </div>
                        <div className="row form-inline pb-1">
                            <label className={regularLabels}>{"#4"}</label>
                            <input 
                                type="text"
                                value={samples[3]}
                                className={inputs}
                                name={"sample4"} 
                                placeholder={format}
                                onBlur={validateSamples}
                                onChange={addSample}
                            />
                            <label className={warningLabels}>{messageSamples[3]}</label> 
                        </div>
                        <div className="row form-inline pb-1">
                            <label className={regularLabels}>{"#5"}</label>
                            <input 
                                type="text"
                                value={samples[4]}
                                className={inputs}
                                name={"sample5"} 
                                placeholder={format}
                                onBlur={validateSamples}
                                onChange={addSample}
                            />
                            <label className={warningLabels}>{messageSamples[4]}</label> 
                        </div>
                        <div className="row form-inline pb-1">
                            <label className={regularLabels}>{"#6"}</label>
                            <input 
                                type="text"
                                value={samples[5]}
                                className={inputs}
                                name={"sample6"} 
                                placeholder={format}
                                onBlur={validateSamples}
                                onChange={addSample}
                            />
                            <label className={warningLabels}>{messageSamples[5]}</label> 
                        </div>
                        <div className="row form-inline pb-1">
                            <label className={regularLabels}>{"#7"}</label>
                            <input 
                                type="text"
                                value={samples[6]}
                                className={inputs}
                                name={"sample7"} 
                                placeholder={format}
                                onBlur={validateSamples}
                                onChange={addSample}
                            />
                            <label className={warningLabels}>{messageSamples[6]}</label> 
                        </div>
                        <div className="row form-inline pb-1">
                            <label className={regularLabels}>{"#8"}</label>
                            <input 
                                type="text"
                                value={samples[7]}
                                className={inputs}
                                name={"sample8"} 
                                placeholder={format}
                                onBlur={validateSamples}
                                onChange={addSample}
                            />
                            <label className={warningLabels}>{messageSamples[7]}</label> 
                        </div>
                        <div className="row form-inline pb-1">
                            <label className={regularLabels}>{"#9"}</label>
                            <input 
                                type="text"
                                value={samples[8]}
                                className={inputs}
                                name={"sample9"} 
                                placeholder={format}
                                onBlur={validateSamples}
                                onChange={addSample}
                            />
                            <label className={warningLabels}>{messageSamples[8]}</label> 
                        </div>
                        <div className="row form-inline pb-1">
                            <label className={regularLabels}>{"#10"}</label>
                            <input 
                                type="text"
                                value={samples[9]}
                                className={inputs}
                                name={"sample10"}
                                placeholder={format}
                                onBlur={validateSamples}
                                onChange={addSample}
                            />
                            <label className={warningLabels}>{messageSamples[9]}</label>
                        </div>
                    </div>
                    <label id="succes" className={"col-4 offset-4 offset-lg-5 mt-3"}>
                    {messageAPI}
                    </label>
                    <button
                        type="submit"
                        className="btn btn-primary col-4 col-sm-2 col-lg-2 offset-4 offset-sm-5  mt-3"
                        disabled={(validSamples && validOp) ? false : true}
                        title={(validSamples && validOp) ? "Form is ready" : "Form not ready"}
                    >
                    Save Data
                    </button>
                </form>
            </div>
          </div>)
    }
}
