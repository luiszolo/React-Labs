import React from 'react';
import axios from 'axios';

export default class Test extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name: "Electricity test",
            validOp: undefined,
            validSamples: undefined,
            samples: Array(10).fill(null),
        }
    }

    updateSamples=(value,position)=>{
        this.setState(state=>{
            let newSamples= state.samples
            newSamples = state.samples.map((sample,i)=>{
                if(i==position){
                    return newSamples[i]=value
                } else {
                    return sample;
                  }
            })
            return {
                newSamples,
            };
        })
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

    validateSamples=(e)=>{
        const index =e.target.name.replace("sample","")
        const sample = e.target.value
        const samples = this.state.samples

        if(/SA-\d\d-\d\d\d\d\d/.test(sample) && sample.length===11){
            axios.get(`http://10.2.1.94:4000/api/samples/` + sample) //manda el get con el codigo del sample ejemplo: SA-12-12342
            .then(res => {
                if (res.data=={}) { //si devuelve el no existe se pone que no valida por que pues no existe XD
                    console.log("No esta en la base de datos")
                } else  {
                    let exists = false
                    samples.map((value)=>{
                        if(sample===value){
                        exists=true
                    }})
                    if(exists===false){
                        this.updateSamples(sample,index-1)
                    }
                }
            })
        }else if(sample===""){
            this.updateSamples(null,index-1)
        }else{
            this.setState({
                validSamples: false,
            })
        }
    }

    render(){
        const {
            validateSamples,
            validateOperator,
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
                <form>
                    <div className="row form-inline pb-3">
                        <label className="col col-lg-5 col-4 text-right d-block">Operator #</label>
                        <input
                            type="text"
                            className={operatorClassName}
                            name="operator"
                            placeholder="#####"
                            onBlur={validateOperator}
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
                                placeholder={format}
                                onChange={validateSamples}
                            />
                            <label className="col col-lg-4 col-sm-4">{" "}</label> 
                        </div>
                        <div className="row form-inline pb-1">
                            <label className="col col-lg-5 col-sm-4 text-right d-block">{"#2"}</label>
                            <input 
                                type="text"
                                className={"sample col-lg-3 col-4 form-control"}
                                name={"sample2"} 
                                placeholder={format}
                                onChange={validateSamples}
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
                                onChange={validateSamples}
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
                                onChange={validateSamples}
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
                                onChange={validateSamples}
                            />
                            <label className="col col-lg-4 col-sm-4">{" "}</label> 
                        </div>
                        <div className="row form-inline pb-1">
                            <label className="col col-lg-5 col-sm-4 text-right d-block">{"#6"}</label>
                            <input 
                                type="text"
                                className={"sample col-lg-3 col-4 form-control"}
                                name={"sample6"} 
                                placeholder={format}
                                onChange={validateSamples}
                            />
                            <label className="col col-lg-4 col-sm-4">{" "}</label> 
                        </div>
                        <div className="row form-inline pb-1">
                            <label className="col col-lg-5 col-sm-4 text-right d-block">{"#7"}</label>
                            <input 
                                type="text"
                                className={"sample col-lg-3 col-4 form-control"}
                                name={"sample7"} 
                                placeholder={format}
                                onChange={validateSamples}
                            />
                            <label className="col col-lg-4 col-sm-4">{" "}</label> 
                        </div>
                        <div className="row form-inline pb-1">
                            <label className="col col-lg-5 col-sm-4 text-right d-block">{"#8"}</label>
                            <input 
                                type="text"
                                className={"sample col-lg-3 col-4 form-control"}
                                name={"sample8"} 
                                placeholder={format}
                                onChange={validateSamples}
                            />
                            <label className="col col-lg-4 col-sm-4">{" "}</label> 
                        </div>
                        <div className="row form-inline pb-1">
                            <label className="col col-lg-5 col-sm-4 text-right d-block">{"#9"}</label>
                            <input 
                                type="text"
                                className={"sample col-lg-3 col-4 form-control"}
                                name={"sample9"} 
                                placeholder={format}
                                onChange={validateSamples}
                            />
                            <label className="col col-lg-4 col-sm-4">{" "}</label> 
                        </div>
                        <div className="row form-inline pb-1">
                            <label className="col col-lg-5 col-sm-4 text-right d-block">{"#10"}</label>
                            <input 
                                type="text"
                                className={"sample col-lg-3 col-4 form-control"}
                                name={"sample10"} 
                                placeholder={format}
                                onChange={validateSamples}
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
                        Save data
                        </button>
                </form>
            </div>
        </div>)
    }
}