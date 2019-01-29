import React from 'react';
import axios from 'axios';

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

    addSample=(e)=>{       
        if(e.target.value.length<=11){
            this.setState({
                sample: e.target.value,
            })
        }   
    }

    validateOperator=(e)=>{
        const operator = e.target.value

        if(/[1-99999]/.test(operator) && operator.length <= 5){
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

    validateChemistry=(e)=>{
        const chemistry = e.target.value

        if(/CH-\d\d\d\d\d/.test(chemistry) && chemistry.length===8){
            this.setState({
                chemistry: chemistry,
                validCh: true,
                messageCh: "",
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

    validateSample=(e)=>{
        const sample = e.target.value

        if(!(/SA-\d\d-\d\d\d\d\d/.test(sample)) && sample!==""){
            this.setState({
                messageSample: "Incorrect syntax",
                validSample: false,
            })
        }else if(sample===""){
            this.setState({
                messageSample: "",
                validSample: false,
            })
        }else{
            
            axios.get(`http://10.2.1.94:4000/api/samples/${sample}/Chemistry Test`).then(res => {
                console.log(res.data)
                if (res.data.message) {
                    this.setState({
                        messageSample:res.data.message,
                        validSample: false,
                    })
                } else {
                    this.setState({
                        messageSample: "",
                        validSample: true,
                    })
                }
            })
        }

        this.setState({
            messageAPI:""
        })
    }

    handleSubmit = event => {
        event.preventDefault();

        const operator= this.state.operator
        const chemistry = this.state.chemistry
        const sample =this.state.sample
        
        axios.post(`http://10.2.1.94:4000/api/test-forms/add`,{
            operator,
            test: this.state.name,
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
            }
            else if(res.data.message==="Samples are wrong") {
                this.setState({
                    messageAPI: "Sample went through the test already "
                });
            }

            else if(res.data.message==="This sample already passed CHEMESTRY TEST") {
                this.setState({
                    messageAPI: "This sample already passed CHEMESTRY TEST"
                });
            }
            else {
                console.log(res.data.message)
                this.setState({
                    messageAPI: "Sample is not ready for this test"
                });
            }
        }).catch( () => this.setState({ messageAPI:'The operation timed out'}));
    }

    render(){
        const {
            addSample,
            validateOperator,
            validateChemistry,
            validateSample,
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
        const regularLabels = "col-md-3 col-sm-12 col-lg-2 col-xl-2 d-block"
        const inputs = "col-md-3 col-sm-12 col-lg-5 col-xl-5 form-control"
        const warningLabels = "col-md-5 col-sm-12 col-lg-10 col-xl-10 text-danger text-center"

        let operatorInput = inputs;

        // if(validOp===false){
        //     operatorInput= operatorInput += "border-danger"
        // }else if(validOp===true){
        //     operatorInput= operatorInput += "border-success"
        // }
        // else{
        //     operatorInput = inputs
        // }

        return(<div className="row justify-content-center">
            <div className="col-lg-4 col-sm-12 m-4">
                <h1 className="text-center">{name}</h1>
            </div>
            <div className="col-sm-12 col-xl-10">
                <form onSubmit={this.handleSubmit}>
                <div className="row justify-content-center form-inline mb-3">
                        <label className={regularLabels}>Operator</label>
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
                        <label className={regularLabels}>Chemistry:</label>
                        <input 
                            type="text" 
                            className={inputs}
                            name="chemistry"
                            placeholder="CH-#####"
                            onBlur={validateChemistry}
                        />
                        <label className={warningLabels}>{messageCh}</label>
                    </div>
                    <div>
                        <h5 className="text-center m-4">Sample Barcode</h5>
                    <div className="row justify-content-center form-inline mb-3">
                        <label className={regularLabels}>{"Sample 1"}</label>
                        <input 
                            type="text"
                            className={inputs}
                            name={"sample1"}
                            value={this.state.sample}
                            placeholder={format}
                            onChange={addSample}
                            onBlur={validateSample}
                        />
                        <label className={warningLabels}>{messageSample}</label> 
                    </div>
                    
                    </div>
					<div className='row justify-content-center'>
                    <label className={"col-lg-3 col-sm-10 text-center col-md-6  mt-3"}><p id="succes">{messageAPI}</p></label>
					</div>
                    <div className='row justify-content-center'>
                    <button
                        type="submit"
                        className="btn btn-primary col-md-6 col-sm-10 col-lg-3"
                        disabled={(validOp && validCh && validSample) ? false : true}
                        title={(validSample && validOp) ? "Form is ready" : "Form not ready"}
                    >
                    Save Data
                    </button>
                    </div>
                </form>
            </div>
        </div>)
    }
}
