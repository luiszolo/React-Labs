import React from 'react';

import Sample from './sample.js'

export default class Test extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name: "Electricity test",
            validateOp: undefined,
        }
    }

    handleOnBlur=(e)=>{
        if(/\d\d\d\d\d/.test(e.target.value)){
            this.setState({
                validateOp: true,
            })
        }else if(e.target.value===""){
            this.setState({
                validateOp: undefined,
            })
        }else{
            this.setState({
                validateOp: false,
            })
        }
    }

    render(){
        const {
            handleOnBlur,
            state: {
                name,
                validateOp,
            }
          } = this;

        const format="SA-##-#####"

        let operatorClassName="sample col-lg-3 col-5 form-control";
        let message=" "

        if(validateOp===false){
            operatorClassName= "sample col-lg-3 col-5 form-control border-danger"
            message="Incorret syntax"
        }else if(validateOp===true){
            operatorClassName= "sample col-lg-3 col-5 form-control border-success"
            message=" "
        }
        else{
            operatorClassName="sample col-lg-3 col-6 form-control"
        }

        return(<div>
            <div className="col col-12 pb-3">
                <h1 className="text-center">{name}</h1>
            </div>
            <div className="col col-12">
                <form>
                    <div className="form-inline pb-3">
                        <label className="col col-lg-5 col-3 text-right d-block mr-1">Operator ID:</label>
                        <input
                            type="text" 
                            className={operatorClassName}
                            name="operator" 
                            placeholder="#####"
                            onBlur={handleOnBlur}
                            />
                        <label className="col col-lg-4 col-4 mr-1">{message}</label>
                    </div>
                    <div>
                        <h5 className="text-center">Sample Barcodes</h5>
                        <Sample
                            number={1}
                            format={format}
                        />
                        <Sample
                            number={2}
                            format={format}
                        />
                        <Sample
                            number={3}
                            format={format}
                        />
                        <Sample
                            number={4}
                            format={format}
                        />
                        <Sample
                            number={5}
                            format={format}
                        />
                        <Sample
                            number={6}
                            format={format}
                        />
                        <Sample
                            number={7}
                            format={format}
                        />
                        <Sample
                            number={8}
                            format={format}
                        />
                        <Sample
                            number={9}
                            format={format}
                        />
                        <Sample
                            number={10}
                            format={format}
                        />
                        <button
                            type="submit"
                            className="btn btn-primary col-4 offset-4 col-lg-2 offset-lg-5 mt-5"
                            onClick={() => {window.alert('You Added a Sample')}}
                        >
                        Save Data
                        </button>
                    </div>
                </form>
            </div>
        </div>)
    }
}