import React from 'react';
import axios from 'axios';

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
            temperature: 0,
            messageTemp: "",
            validTemp: undefined,
            time: 0,
            messageTime: "",
            validTime: undefined,
            samples: Array(5).fill(""),
            buttonTitle:"",
            loading: false,
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

    handleChangeTemperature = event => {
        if(event.target.value>0){
            this.setState({
                temperature: event.target.value,
                messageTemp: "",
                validTemp: true,
            });
        }else if(event.target.value===""){
            this.setState({
                messageTemp: "Cant be Blank",
                validTemp: false,
            });
        }else{
            this.setState({
                messageTemp: "The value can't be 0",
                validTemp: false,
            });
        }
    }

    handleChangeTime = event => {
        if(event.target.value>0){
            this.setState({
                time: event.target.value,
                messageTime: "",
                validTime: true,
            });
        }else if(event.target.value===""){
            this.setState({
                messageTime: "Cant be Blank",
                validTime: false,
            });
        }else{
            this.setState({
                messageTime: "The value can't be 0",
                validTime: false,
            });
        }
    }
    addSample=(e)=>{
        const sampleNumber = parseInt(e.target.name.replace("sample",""))
        const sample = e.target.value

        if(sample.length<=11){
            this.updateSamples(sample,sampleNumber-1)
        }
    }

    validateOperator=(e)=>{
        const operator = e.target.value

        if(/[1-99999]/.test(operator) && operator.length <= 5){
            axios.get(`http://10.2.1.94:4000/api/operators/` + operator) 
            .then(res => {
                if (res.data.message) { 
                    this.setState({
                        messageOp: "The operator doesn't exist",
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
        const messages = this.state.messageSamples
        const noMessages = this.state.messageSamples.filter((sample)=>{return sample===""})
        console.log(noMessages)
        samples.forEach((sample,sampleNumber)=>{
            if(!(/SA-\d\d-\d\d\d\d\d/.test(sample)) && sample!==""){
                this.setState({
                    validSamples: false,
                })
                this.updateSamplesMessage("Incorrect syntax", sampleNumber)

                
            }else if(sample===""){
                this.updateSamplesMessage("", sampleNumber)
            }else{
                this.updateSamplesMessage("", sampleNumber)
                axios.get(`http://10.2.1.94:4000/api/samples/${sample}/Heat Test`)
                .then(res => {
                    if (res.data.message) {
                        this.updateSamplesMessage(res.data.message, sampleNumber)
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

                if(correctSamples.length !== 0 && noMessages.length >= 4){
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



    handleSubmit = event => {
        event.preventDefault();
        this.setState({
            loading:true
        })
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
                        loading:false,
                    })
                } else {
                    console.log(res.data.message)
                    this.setState({
						messageAPI: "Sample is not ready for this test"
                    });
                }
              }).catch( () => {
                alert("Conection Timed Out");
                this.setState({
                    loading: false
                });
            });
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
                messageTemp,
                validTemp,
                messageTime,
                validTime,
                messageSamples,
                validSamples,
                samples,
                messageAPI,
                buttonTitle,
            }
        } = this;

        const format="SA-##-#####"
        const regularLabels = "col-md-12 col-sm-12 col-lg-2 col-xl-2 d-block"
        const inputs = "col-md-12 col-sm-12 col-lg-5 col-xl-5 form-control"
        const warningLabels = "col-md-12 col-sm-12 col-lg-10 col-xl-10 text-danger text-center"

        let operatorInput = inputs;

        let data;
        if (this.state.loading) {
          data = <img src='/images/spinner.gif' id='spinner'/>
        } 

        if(validOp===false){
            operatorInput= operatorInput += " border-danger"
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
            <div className="col-sm-12  col-xl-10">
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
                        <label className={regularLabels}>Temperature (C):</label>
                        <input 
                            type="number" 
                            className={inputs}
                            placeholder="###"
                            name="temperature" 
                            onChange={this.handleChangeTemperature}
                        />
                        <label className={warningLabels}>{messageTemp}</label>
                    </div>
                    <div className="row justify-content-center form-inline mb-3">
                        <label className={regularLabels}>Time elapse (sec):</label>
                        <input type="number" 
                            className={inputs}
                            placeholder="###"
                            name="time" 
                            onChange={this.handleChangeTime}
                        />
                        <label className={warningLabels}>{messageTime}</label>
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
                    <div className="row justify-content-center form-inline mb-2">
                        <label className={regularLabels}>Sample 3:</label>
                        <input 
                        value={samples[2]}
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
                        value={samples[3]}
                        type="text"
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
                        value={samples[4]}
                        type="text"
                        className={inputs}
                        name={"sample5"} 
                        placeholder={format}
                        onBlur={validateSamples}
                        onChange={addSample}
                        />
                        <label className={warningLabels}>{messageSamples[4]}</label> 
                        </div>
                    </div>
					<div className='row justify-content-center'>
                    <label className={"col-lg-3 col-sm-10 text-center col-md-6  mt-3"}><p id="succes">{messageAPI}</p></label>
					</div>
					<div className='row justify-content-center'>
                    <button
                        value={samples[5]}
                        type="submit"
                        className="btn btn-primary col-md-6 col-sm-10 col-lg-3"
                        disabled={(validOp && validTemp && validTime && validSamples) ? false : true}
                        onMouseEnter={settingTitle}
                        title={buttonTitle}
                    >
                    Save Data
                    {data}
                    </button>
					</div>
                </form>
            </div>
        </div>)
    }
}
