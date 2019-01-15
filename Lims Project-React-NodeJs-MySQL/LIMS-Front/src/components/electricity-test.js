import React from 'react';

export default class Test extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name: "Electricity test",
            validOp: undefined,
            samplesCounter: false,
            samples:[]
        }
    }

    validateOperator=(e)=>{
        if(/\d\d\d\d\d/.test(e.target.value) && e.target.value.length===5){
            this.setState({
                validOp: true,
            })
        }else if(e.target.value===""){
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
        const samples = this.state.samples
        let sample = e.target.value
        if(/SA-\d\d-\d\d\d\d\d/.test(sample) && sample.length===11){
            this.setState({
                samplesCounter: true,
                samples: this.state.samples.concat(sample),
            })
        }else if(sample===""){
            if(this.state.samplesCounter !== true){
                this.setState({
                    samplesCounter: false,
                })
            }
        }
        else{
            this.setState({
                samplesCounter: false,
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
                samplesCounter,
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
                            className="btn btn-primary col-4 offset-4 col-lg-2 offset-lg-5 mt-5"
                            disabled={(samplesCounter && validOp) ? false : true}
                            onClick={() => {window.alert('You Added a Sample')}}
                        >
                        Save Data
                        </button>
                </form>
            </div>
        </div>)
    }
}