import React from 'react';

import Sample from './sample.js'



export default class Test extends React.Component{
    constructor(props){
        super(props);
        this.state={
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
                validateOp,
            }
          } = this;

        const format="SA-##-#####"

        let operatorClassName="sample form-control";
        let message=" "

        if(validateOp===false){
            operatorClassName= "sample form-control border-danger"
            message="Incorret syntax"
        }else if(validateOp===true){
            operatorClassName= "sample form-control border-success"
            message=" "
        }
        else{
            operatorClassName="sample form-control"
        }

        return(<div className="col offset-2 col-8">
            <h1>Electricity test</h1>
            <form>
                <div className="row form-inline pb-5">
                    <label className="pr-1 col col-2">Operator ID:</label>
                    <input 
                        type="text" 
                        className={operatorClassName}
                        name="operator" 
                        placeholder="#####"
                        onBlur={handleOnBlur}
                        />
                    <label className="col col-4 mr-1">{message}</label>
                </div>
                
                <div className="form-group">
                    <h5>Sample Barcodes</h5>
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
                </div>
            <input type="submit"  className="btn btn-primary offset-4" value="Save data"/>
            </form>
        </div>)
    }
}