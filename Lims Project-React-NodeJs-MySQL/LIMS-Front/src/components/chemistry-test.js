import React from 'react';
import axios from 'axios';

import '../index.css';

export default class ChemistryTest extends React.Component{
  constructor(props){
    super(props);
    this.state={
        name: "Chemistry Test",
        operator: "",
        messageOp: "",
        validOp: undefined,
        chemistry: "",
        messageCh: "",
        validCh: undefined,
        sample: "",
        validSample: undefined,
        messageSample: "",
        messageAPI: ""
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

validateChemistry=(e)=>{
    const chemistry = e.target.value

    if(/CH-\d\d-\d\d\d\d\d/.test(chemistry) && chemistry.length===11){
        this.setState({
            chemistry: chemistry,
            validCh: true,
        })
    }else if(chemistry===""){
        this.setState({
            messageCh: "",
            validCh: false,
        })
    }else{
        this.setState({
            chemistry: "",
            messageCh: "Invalid syntax",
            validCh: false,
        })
    }
}

addSample=(e)=>{
    const sample = e.target.value

    if(/SA-\d\d-\d\d\d\d\d/.test(sample) && sample.length===11){
                this.setState({
                    sample: sample,
                    messageSample: "",
                    validSample: true,
                })

        // axios.get(`http://10.2.1.94:4000/api/samples/${sample}`) //manda el get con el codigo del sample ejemplo: SA-12-12342
        // .then(res => {
        //     if (res.data.message) { //si devuelve el no existe se pone que no valida por que pues no existe XD
        //         const message=res.data.message

        //         this.setState({
        //             messageSample: message,
        //         })
        //     } else {
        //         this.setState({
        //             sample: sample,
        //             messageSample: "",
        //             validSample: true,
        //         })
        //     }
        // })
    }else if(sample===""){
        this.setState({
            messageSample: "",
            validSample: false
        })
    }else{
        this.setState({
            messageSample: "Incorrect syntax",
            validSample: false
        })
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
            messageOp: "",
            validOp: undefined,
        })
    }else{
        this.setState({
            validOp: false,
        })
    }
}

handleSubmit = event => {
    event.preventDefault();

    const operator= this.state.operator
    const chemistry = this.state.chemistry
    const sample =this.state.sample

    axios.post(`http://10.2.1.94:4000/api/test-forms/add`,{
        operator,
        test: "Chemistry Test",
        samples: [sample],
        attributes:[{
            name: "Chemistry",
            value: chemistry
        }]
    })
    .then( res=> {
        if (res.data.message==="Insertion completed") {
            console.log(res.data.message)
            this.setState({
                sample: "",
                messageAPI: res.data.message,
                validSamples: false,
            })
        } else {
            console.log(res.data.message)
            this.setState({
                messageAPI: "Sample already went through this Test"
            });
        }
      })
}

render(){
    const {
        addSample,
        validateOperator,
        validateChemistry,
        state: {
            name,
            messageOp,
            validOp,
            messageCh,
            validCh,
            messageSample,
            validSample,
            messageAPI,
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
                    <label className="col col-lg-5 col-4 text-right d-block">Chemistry:</label>
                    <input 
                        type="text" 
                        className={"sample col-lg-3 col-3 form-control"}
                        name="chemistry"
                        placeholder="CH-##-#####"
                        onBlur={validateChemistry}
                    />
                    <label className="col col-lg-4 col-4 text-danger">{messageCh}</label>
                </div>
                <div>
                    <h5 className="text-center">Sample Barcode</h5>
                <div className="row form-inline pb-1">
                    <label className="col col-lg-5 col-sm-4 text-right d-block">{"#1"}</label>
                    <input 
                        type="text"
                        className={"sample col-lg-3 col-4 form-control"}
                        name={"sample1"}
                        value={this.state.sample}
                        placeholder={format}
                        onChange={addSample}
                    />
                    <label className={labelClass}>{messageSample}</label> 
                </div>
                
                </div>
                <label className={"col-4 offset-4 offset-lg-5 mt-3"}>{messageAPI}</label>
                <button
                    type="submit"
                    className="btn btn-primary col-4 col-lg-2 offset-4 offset-lg-5 mt-3"
                    disabled={(validOp && validCh && validSample) ? false : true}
                >
                Save Data
                </button>
            </form>
        </div>
      </div>)
    }
}