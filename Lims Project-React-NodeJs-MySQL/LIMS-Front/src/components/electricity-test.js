import React from 'react';
import axios from 'axios';

export default class ElectricityTest extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name: "Electricity test",
            validOp: undefined,
            validSamples: undefined,
            samples: Array(10).fill(null),
            id: '',
            messageAPI:'',
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

    addSample=(e)=>{
        const index =e.target.name.replace("sample","")
        const sample = e.target.value
        const samples = this.state.samples

        if(/SA-\d\d-\d\d\d\d\d/.test(sample) && sample.length===11){
            axios.get(`http://10.2.1.94:4000/api/samples/${sample}`) //manda el get con el codigo del sample ejemplo: SA-12-12342
            .then(res => {
                if (res.data==={}) { //si devuelve el no existe se pone que no valida por que pues no existe XD
                    console.log("No esta en la base de datos")
                } else  {
                    let exists = false
                    samples.forEach((value)=>{
                        if(sample===value){
                        return exists=true
                    }})
                    if(exists===false){
                        this.updateSamples(sample,index-1)
                    }
                }
            })
        }else{
            this.updateSamples(null,index-1)
        }
    }

    validateSamples=()=>{
        const nulls = this.state.samples.filter((sample)=>{return sample==null})
        if(nulls.length===10){
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


    handleChangeOperator = event => {
        this.setState({ 
          id: event.target.value,//Var x = input.text
        } );
      }
      handleSubmit = event => {// This part is creating the new const that are going to take the values from our previus states that have the user input
        event.preventDefault();
        const operator= this.state.id
        const samples = this.state.samples.filter((sample)=>{return ((/SA-\d\d-\d\d\d\d\d/.test(sample) && sample.length===11))})
         //cuando se manda como un solo string aunque pongas las , estan dentro del string si pones
        // +","+ el string que te dara es "sample1,sample2" cuando el json tiene que mandarse como "sample1","sample2"
        // Our POST is using AXIOS the sintaxis is as follows: (TLDR: is sending a json to our API)
      //axios.(Method)((URL of API),{Our json its part default values like test:"Heat Test but other parts like operator are taken from the handleSubmit"})     
        samples.forEach((sample)=>{
            axios.post(`http://localhost:4000/api/test-forms/add`, {operator,test:"Electricity Test", samples:[sample]})
            

            .then( res=> {
                if (res.data.message) { //si devuelve el no existe se pone que no valida por que pues no existe XD
                  console.log(res.data.message)
                  this.setState({
                    messageAPI:res.data.message,
                  })
      
                } else {
                  this.setState({ // this is for reseting the inputs
                    id: '', 
                    sample1:'',
                    value1:'',
                  });
                }
              });


        })
      }
    render(){
        const {
            addSample,
            validateOperator,
            validateSamples,
            state: {
                name,
                validOp,
                validSamples,
            }
          } = this;

        const format="SA-##-#####"
        const{messageAPI}=this.state;
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
                <form onSubmit={this.handleSubmit}>
                    <div className="row form-inline pb-3">
                        <label className="col col-lg-5 col-4 text-right d-block">Operator #</label>
                        <input
                            type="text"
                            className={operatorClassName}
                            name="operator"
                            placeholder="#####"
                            onBlur={validateOperator}
                            onChange={this.handleChangeOperator}
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
                                onBlur={validateSamples}
                                onChange={addSample}
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
                                onBlur={validateSamples}
                                onChange={addSample}
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
                                onBlur={validateSamples}
                                onChange={addSample}
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
                                onBlur={validateSamples}
                                onChange={addSample}
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
                                onBlur={validateSamples}
                                onChange={addSample}
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
                                onBlur={validateSamples}
                                onChange={addSample}
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
                                onBlur={validateSamples}
                                onChange={addSample}
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
                                onBlur={validateSamples}
                                onChange={addSample}
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
                                onBlur={validateSamples}
                                onChange={addSample}

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
                                onBlur={validateSamples}
                                onChange={addSample}

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
                        <p>{messageAPI}</p>
                </form>
            </div>
        </div>)
    }
}