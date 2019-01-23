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
    }

    // validateSamples=(e)=>{
    //     const sampleNumber = parseInt(e.target.name.replace("sample",""))
    //     const sample = e.target.value

    //     const samples = this.state.samples
    //     const correctSamples = samples.filter((sample)=>{return /SA-\d\d-\d\d\d\d\d/.test(sample) && sample.length===11})

    //     if(!(/SA-\d\d-\d\d\d\d\d/.test(sample)) && sample!==""){
    //         this.updateSamplesMessage("Incorrect syntax", sampleNumber-1)
    //         this.setState({
    //             validSamples: false,
    //         })
    //     }else if(sample===""){
    //         this.updateSamplesMessage("", sampleNumber-1)
    //     }else{
    //         this.updateSamplesMessage("", sampleNumber-1)
    //         axios.get(`http://10.2.1.94:4000/api/samples/${sample}`)
    //         .then(res => {

    //         })
    //         this.setState({
    //             validSamples: true,
    //         })
    //     }
    //     if(correctSamples.length>0){
    //         this.setState({
    //             validSamples: true,
    //         })
    //     }else{
    //         this.setState({
    //             validSamples: false,
    //         })
    //     }

    // }

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
                    <div>
                        <h5 className="text-center">Sample Barcodes</h5>
                        <div className="row form-inline pb-1">
                            <label className="col col-lg-5 col-sm-4 text-right d-block">{"#1"}</label>
                            <input 
                                value={samples[0]}
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
                                value={samples[1]}
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
                                value={samples[2]}
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
                                value={samples[3]}
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
                                value={samples[4]}
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
                                value={samples[5]}
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
                                value={samples[6]}
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
                                value={samples[7]}
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
                                value={samples[8]}
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
                                value={samples[9]}
                                className={"sample col-lg-3 col-4 form-control"}
                                name={"sample10"}
                                placeholder={format}
                                onBlur={validateSamples}
                                onChange={addSample}
                            />
                            <label className={labelClass}>{messageSamples[9]}</label>
                        </div>
                    </div>
                    <label className={"col-4 offset-4 offset-lg-5 mt-3"}>{messageAPI}</label>
                    <button
                        type="submit"
                        className="btn btn-primary col-4 col-lg-2 offset-4 offset-lg-5 mt-3"
                        disabled={(validSamples && validOp) ? false : true}
                        title={(validSamples && validOp) ? "Form is ready" : "Form not ready"}
                    >
                    {(validSamples && validOp) ? "Save data" : "Form not ready"}
                    </button>
                </form>
            </div>
          </div>)
    }
}
